"""Synthesize an original ambient backsound (180 s) for OWC-DESAL. No external services.

Chords change every 5 s, so every scene boundary (25/55/85/115/150) lands on a change.
Run: py -3.12 gen_music.py  ->  bgm.wav
"""
import wave
import numpy as np

SR = 48000
DUR = 180.0
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(9)

def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)

# chord voicings (MIDI); D minor world, resolving to F major at the end
CH = {
    "Dm9":    [50, 57, 60, 64, 65],
    "Bbmaj7": [46, 53, 57, 62, 65],
    "Fmaj7":  [41, 53, 57, 60, 64],
    "Csus2":  [48, 55, 62, 64, 67],
    "Gm9":    [43, 53, 57, 58, 62],
    "C":      [48, 55, 60, 64, 67],
    "Fmaj9":  [41, 53, 57, 60, 64, 67],
}
loop = ["Dm9", "Bbmaj7", "Fmaj7", "Csus2"]
seq = [loop[i % 4] for i in range(30)]               # 0-150 s
seq += ["Bbmaj7", "C", "Dm9", "Gm9", "C", "Fmaj9"]   # 150-180 s (scene 6)
BLOCK = 5.0

def env_block(i, fade=1.2, hold_last=False):
    """Crossfading window for chord block i."""
    a = i * BLOCK
    b = DUR if (hold_last and i == len(seq) - 1) else (i + 1) * BLOCK
    e = np.clip((t - (a - fade / 2)) / fade, 0, 1) * np.clip(((b + fade / 2) - t) / fade, 0, 1)
    return np.sin(e * np.pi / 2) ** 2

# ---- scene intensity curve (pure function of time) ----
def ramp(x, a, b):
    return np.clip((x - a) / (b - a), 0, 1)

intro = ramp(t, 0, 4)
arp_amt = ramp(t, 24, 28) * 0.55 + ramp(t, 54, 58) * 0.3 + ramp(t, 114, 118) * 0.15 - ramp(t, 168, 176) * 1.0
arp_amt = np.clip(arp_amt, 0, 1)
bass_amt = np.clip(ramp(t, 54, 58) - ramp(t, 170, 178), 0, 1)
high_amt = np.clip(ramp(t, 114, 118) - ramp(t, 146, 150) * 0.6 - ramp(t, 168, 176) * 0.4, 0, 1)
end_fade = 1 - ramp(t, 177.0, 180.0)

L = np.zeros(N)
R = np.zeros(N)

# ---- pad: detuned additive tones, slow breathing ----
breath = 0.85 + 0.15 * np.sin(2 * np.pi * t / 10.0)
for i, name in enumerate(seq):
    w = env_block(i, fade=1.6, hold_last=True)
    idx = w > 0
    tt = t[idx]
    for m in CH[name]:
        f = hz(m + 12) if m < 45 else hz(m)
        for det, side in ((-0.18, 0), (0.18, 1)):
            ph = rng.uniform(0, 2 * np.pi)
            ff = f * 2 ** (det / 12 / 8)
            s = np.sin(2 * np.pi * ff * tt + ph) + 0.28 * np.sin(4 * np.pi * ff * tt + ph) + 0.08 * np.sin(6 * np.pi * ff * tt)
            (L if side == 0 else R)[idx] += 0.06 * w[idx] * s
L *= breath * intro
R *= breath * intro

# ---- arpeggio: soft plucks, 8th notes at 96 BPM ----
STEP = 60 / 96 / 2
pattern = [0, 2, 1, 3, 2, 4, 3, 1]
arpL = np.zeros(N)
arpR = np.zeros(N)
nd = int(SR * 1.4)
k = np.arange(nd) / SR
for j in range(int(DUR / STEP)):
    t0 = j * STEP
    ci = min(int(t0 // BLOCK), len(seq) - 1)
    tones = sorted(CH[seq[ci]][1:])
    m = tones[pattern[j % 8] % len(tones)] + 12
    amp = arp_amt[min(int(t0 * SR), N - 1)]
    if amp <= 0.001:
        continue
    f = hz(m)
    note = (np.sin(2 * np.pi * f * k) + 0.25 * np.sin(4 * np.pi * f * k)) * np.exp(-k * 4.5) * (1 - np.exp(-k * 300))
    accent = 1.0 if j % 4 == 0 else 0.7
    s0 = int(t0 * SR)
    s1 = min(s0 + nd, N)
    pan = 0.5 + 0.3 * np.sin(j * 0.9)
    arpL[s0:s1] += 0.09 * amp * accent * (1 - pan) * note[: s1 - s0]
    arpR[s0:s1] += 0.09 * amp * accent * pan * note[: s1 - s0]
    # high octave sparkle in scene 5
    ha = high_amt[min(s0, N - 1)]
    if ha > 0.01 and j % 2 == 0:
        hn = np.sin(2 * np.pi * f * 2 * k) * np.exp(-k * 6) * (1 - np.exp(-k * 300))
        arpL[s0:s1] += 0.035 * ha * pan * hn[: s1 - s0]
        arpR[s0:s1] += 0.035 * ha * (1 - pan) * hn[: s1 - s0]
# dotted-8th echo for space
d = int(SR * STEP * 3)
for src, dst in ((arpL, arpR), (arpR, arpL)):
    echo = np.zeros(N)
    echo[d:] = src[:-d]
    dst += 0.35 * echo
L += arpL
R += arpR

# ---- bass: soft root pulse on each half bar ----
bass = np.zeros(N)
HB = 60 / 96 * 2
bd = int(SR * HB)
kb = np.arange(bd) / SR
for j in range(int(DUR / HB)):
    t0 = j * HB
    ci = min(int(t0 // BLOCK), len(seq) - 1)
    root = CH[seq[ci]][0]
    while root > 45:
        root -= 12
    a = bass_amt[min(int(t0 * SR), N - 1)]
    if a <= 0.001:
        continue
    f = hz(root)
    n = np.sin(2 * np.pi * f * kb) * (1 - np.exp(-kb * 40)) * np.exp(-kb * 1.2)
    s0 = int(t0 * SR)
    s1 = min(s0 + bd, N)
    bass[s0:s1] += 0.16 * a * n[: s1 - s0]
L += bass
R += bass

# ---- ocean: low-passed noise with slow swells (FFT filter) ----
def fft_lowpass(x, fc):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (f / fc) ** 4)
    return np.fft.irfft(X, len(x))

swell = 0.5 + 0.5 * np.sin(2 * np.pi * t / 8.5 - np.pi / 2)
for ch, ph in ((L, 0.0), (R, 1.3)):
    n = fft_lowpass(rng.standard_normal(N), 700)
    sw = 0.5 + 0.5 * np.sin(2 * np.pi * t / 8.5 - np.pi / 2 + ph)
    ch += 0.05 * n / np.std(n) * (0.25 + 0.75 * sw ** 2) * intro

# ---- reverb: FFT convolution with a decaying-noise impulse ----
def reverb(x, secs=3.2, mix=0.32, seed=0):
    r = np.random.default_rng(seed)
    n = int(SR * secs)
    ir = r.standard_normal(n) * np.exp(-np.arange(n) / SR * 2.2)
    ir = fft_lowpass(ir, 4000)
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return (1 - mix) * x + mix * y

L = reverb(L, seed=1)
R = reverb(R, seed=2)

L *= end_fade
R *= end_fade
peak = max(np.max(np.abs(L)), np.max(np.abs(R)))
L /= peak / 0.89
R /= peak / 0.89

pcm = (np.stack([L, R], axis=1) * 32767).astype("<i2")
with wave.open("bgm.wav", "wb") as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes(pcm.tobytes())
print("bgm.wav", DUR, "s")
