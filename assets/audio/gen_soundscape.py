"""Original soundscape for OWC-DESAL: a quiet music bed and a sound-effects stem.

Everything is synthesised here (no samples, no services) and is deterministic.
The effects follow the picture: assets/audio/motion.json carries the airflow,
rotor speed and wave amplitude sampled from the same simulation that drives the
cross-section (node src/export-motion.mjs). The bed is pre-carved under the
narration: word timings from every scene's words.json build a speech envelope
that ducks the bed, the 1-4 kHz band hardest, so the voice keeps its room.

    node src/export-motion.mjs
    python assets/audio/gen_soundscape.py      # needs numpy

Writes assets/audio/music.mp3 and assets/audio/sfx.mp3 (48 kHz stereo, film length; needs ffmpeg).
"""
import json
import subprocess
import wave
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SR = 48000
rng = np.random.default_rng(2026)

motion = json.loads((HERE / 'motion.json').read_text())
MR = motion['rate']
DUR = float(motion['total'])
N = int(SR * DUR)
t = np.arange(N) / SR
ST = {sc['id']: sc['start'] for sc in motion['scenes']}
WORDS = {}
for sc in motion['scenes']:
    WORDS[sc['id']] = (sc['voStart'], json.loads((ROOT / 'assets/vo' / (sc.get('vo') or '') / f"{sc['id']}.words.json").read_text())['words'])


def cue(sid, word, nth=1):
    """Root-timeline time of the nth spoken word starting with `word`."""
    off, ws = WORDS[sid]
    key = ''.join(ch for ch in word.lower() if ch.isalnum())
    c = 0
    for w in ws:
        if ''.join(ch for ch in w['w'].lower() if ch.isalnum()).startswith(key):
            c += 1
            if c == nth:
                return off + w['t']
    raise KeyError(f'{sid}: {word} #{nth}')


def curve(name):
    """100 Hz motion samples -> audio-rate envelope."""
    src = np.asarray(motion[name], dtype=float)
    return np.interp(t, np.arange(len(src)) / MR, src)


def ramp(x, a, b):
    return np.clip((x - a) / (b - a), 0, 1)


def smooth(x):
    return x * x * (3 - 2 * x)


def band(x, lo, hi, order=4):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    h = np.ones_like(f)
    if lo:
        h *= 1 / (1 + (lo / np.maximum(f, 1e-3)) ** order)
    if hi:
        h *= 1 / (1 + (f / hi) ** order)
    return np.fft.irfft(X * h, len(x))


def noise(lo, hi):
    n = band(rng.standard_normal(N), lo, hi)
    return n / (np.std(n) + 1e-12)


def env_follow(x, attack, release):
    """One-pole attack/release smoothing of a 0..1 control (at 100 Hz, then upsampled)."""
    step = int(SR / 100)
    xs = x[::step]
    out = np.zeros_like(xs)
    a_up, a_dn = np.exp(-1 / (attack * 100)), np.exp(-1 / (release * 100))
    y = 0.0
    for i, v in enumerate(xs):
        k = a_up if v > y else a_dn
        y = k * y + (1 - k) * v
        out[i] = y
    return np.interp(t, np.arange(len(out)) * step / SR, out)


# ---------------------------------------------------------------- narration envelope
speech = np.zeros(N)
for sid, (off, words) in WORDS.items():
    for w in words:
        a, b = off + w['t'], off + w['t'] + w['d']
        speech[int(a * SR):int(b * SR)] = 1
speech = env_follow(speech, 0.06, 0.55)

# ---------------------------------------------------------------- music bed
def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)

CH = {
    'Bm9': [47, 54, 57, 61, 62], 'Gmaj9': [43, 50, 54, 57, 62], 'Asus': [45, 52, 57, 59, 64],
    'Dadd9': [50, 57, 62, 64, 66], 'Em9': [40, 52, 55, 59, 62], 'A': [45, 52, 57, 61, 64],
}
# one chord per argument beat; changes land on scene cuts and on the key reveals
S2, S3, S4, S5, S7, S8, S6 = (ST[k] for k in ('s2', 's3', 's4', 's5', 's7', 's8', 's6'))
T_TITLE = cue('s1', 'bersih', 2) + 0.15
T_CRED = cue('s6', 'OWC-DESAL') - 0.25
PLAN = [(0, 'Bm9'), (cue('s1', 'Padahal'), 'Gmaj9'), (cue('s1', 'Bisakah'), 'Asus'), (T_TITLE, 'Dadd9'),
        (S2 + 5, 'Gmaj9'), (S2 + 11.5, 'Em9'), (S2 + 17.5, 'Asus'),
        (S3, 'Bm9'), (S3 + 6, 'Gmaj9'), (S3 + 12, 'A'),
        (S4, 'Em9'), (S4 + 6.5, 'Gmaj9'), (S4 + 12, 'Bm9'), (S4 + 17, 'Asus'),
        (S5, 'Dadd9'), (S5 + 7, 'Gmaj9'), (S5 + 15, 'Em9'), (S5 + 23, 'Asus'),
        (S7, 'Dadd9'), (S7 + 6, 'Bm9'), (S7 + 12.5, 'Gmaj9'), (S7 + 19, 'Asus'),
        (S8, 'Em9'), (S8 + 6, 'Bm9'), (S8 + 12, 'Gmaj9'), (S8 + 18, 'Asus'),
        (S6, 'Gmaj9'), (S6 + 4, 'Asus'), (T_CRED, 'Dadd9')]
bounds = [p[0] for p in PLAN] + [DUR + 2]

padL, padR = np.zeros(N), np.zeros(N)
for i, (a, name) in enumerate(PLAN):
    b = bounds[i + 1]
    fade = 1.6
    w = smooth(np.clip((t - (a - fade / 2)) / fade, 0, 1)) * smooth(np.clip(((b + fade / 2) - t) / fade, 0, 1))
    idx = w > 0
    tt = t[idx]
    for m in CH[name]:
        f = hz(m)
        for det, side in ((-0.07, 0), (0.07, 1)):
            ph = rng.uniform(0, 2 * np.pi)
            ff = f * 2 ** (det / 12)
            s = np.sin(2 * np.pi * ff * tt + ph) + 0.22 * np.sin(4 * np.pi * ff * tt + ph * 1.3)
            (padL if side == 0 else padR)[idx] += 0.05 * w[idx] * s
breath = 0.82 + 0.18 * np.sin(2 * np.pi * t / 9.0)
padL, padR = band(padL * breath, 60, 3200), band(padR * breath, 60, 3200)

# sparse soft plucks: phrase-level, they live in the gaps of the narration
pluck = np.zeros((2, N))
STEP = 60 / 76
nd = int(SR * 1.6)
k = np.arange(nd) / SR
pattern = [2, 4, 3, 1, 4, 2, 3, 0]
energy = 0.35 + 0.65 * (ramp(t, S3, S3 + 2) - ramp(t, S7 - 8, S7 - 4)) + 0.25 * ramp(t, S7, S7 + 2) - 0.35 * ramp(t, S8 + 1, S8 + 9)
for j in range(int(DUR / STEP)):
    t0 = j * STEP
    if t0 < 2.0 or t0 > 176:
        continue
    ci = max(i for i, p in enumerate(PLAN) if p[0] <= t0)
    tones = sorted(CH[PLAN[ci][1]])[1:]
    m = tones[pattern[j % 8] % len(tones)] + 12
    gap = 1 - speech[int(t0 * SR)]
    amp = energy[int(t0 * SR)] * (0.25 + 0.75 * gap) * (1.0 if j % 4 == 0 else 0.62)
    if j % 2 and gap < 0.5:
        continue
    f = hz(m)
    note = (np.sin(2 * np.pi * f * k) + 0.18 * np.sin(2 * np.pi * 4 * f * k) * np.exp(-k * 18)) * np.exp(-k * 3.6) * (1 - np.exp(-k * 400))
    s0, s1 = int(t0 * SR), min(int(t0 * SR) + nd, N)
    pan = 0.5 + 0.35 * np.sin(j * 1.1)
    pluck[0, s0:s1] += 0.055 * amp * (1 - pan) * note[:s1 - s0]
    pluck[1, s0:s1] += 0.055 * amp * pan * note[:s1 - s0]
d = int(SR * STEP * 1.5)
for a, b in ((0, 1), (1, 0)):
    pluck[b, d:] += 0.3 * pluck[a, :-d]

# soft root under the mechanism scenes
bass = np.zeros(N)
for i, (a, name) in enumerate(PLAN):
    b = bounds[i + 1]
    root = CH[name][0]
    while root > 45:
        root -= 12
    w = smooth(np.clip((t - a) / 1.2, 0, 1)) * smooth(np.clip((b + 0.6 - t) / 1.2, 0, 1))
    bass += 0.09 * w * np.sin(2 * np.pi * hz(root) * t)
bass *= np.clip(ramp(t, S2, S2 + 6) - ramp(t, T_CRED, T_CRED + 5), 0, 1)


def reverb(x, secs=3.0, mix=0.3, seed=0):
    r = np.random.default_rng(seed)
    n = int(SR * secs)
    ir = band(r.standard_normal(n) * np.exp(-np.arange(n) / SR * 2.4), None, 5000)
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:len(x)]
    return (1 - mix) * x + mix * y


mus = np.stack([padL + pluck[0] + bass, padR + pluck[1] + bass])
mus = np.stack([reverb(mus[0], seed=1), reverb(mus[1], seed=2)])
# carve: the voice band ducks hardest, the low band only a little
low = np.stack([band(c, None, 900) for c in mus])
high = mus - low
duck_low = 1 - 0.35 * speech
duck_high = 1 - 0.72 * speech
mus = low * duck_low + high * duck_high
mus *= smooth(ramp(t, 0, 2.5)) * (1 - smooth(ramp(t, DUR - 2.8, DUR)))

# ---------------------------------------------------------------- sound effects
v, w, amp = curve('v'), curve('w'), curve('amp')
flow = np.clip(np.abs(v) / 62.8, 0, 1)
rising = np.clip(v / 62.8, 0, 1)
inside = ramp(t, S2 + 0.3, S2 + 1.6)  # cross-section scenes

# ocean: surf bed + a surge each time the water rushes into the chamber
surf = np.stack([noise(40, 600) + 0.22 * noise(600, 2000), noise(40, 650) + 0.22 * noise(650, 2100)])
T_SEA = cue('s1', 'Padahal')
sea_level = (0.10 + 0.16 * smooth(ramp(t, T_SEA - 0.3, T_SEA + 1.1))) * (1 - inside) \
    + inside * (0.12 + 0.15 * np.clip(amp / 60, 0, 1) + 0.22 * rising ** 1.6)
sea_level *= 1 - 0.55 * smooth(ramp(t, S6 + 2.5, S6 + 10))
ocean = surf * sea_level * smooth(ramp(t, 0, 1.5))

# Scene 1 dive: a rising rush that lands on the cut into the cross-section
dive = noise(300, 6000)
D0 = S2 - 1.55
dive_env = smooth(ramp(t, D0, S2 - 0.05)) * (1 - smooth(ramp(t, S2 - 0.05, S2 + 0.35)))
sweep = band(dive, 1200, None) * ramp(t, D0, S2 - 0.05) + band(dive, None, 1200) * (1 - ramp(t, D0, S2 - 0.05))
whoosh = np.stack([sweep, sweep]) * 0.22 * dive_env

# air through the Wells turbine: brighter and louder with airflow, fluttered by the blades
rev = np.cumsum(w * 380 / 360) / SR
flutter = 1 + 0.22 * np.sin(2 * np.pi * 8 * rev)
T_DUCT = cue('s2', 'dihubungkan') - 0.4
air_on = ramp(t, T_DUCT, T_DUCT + 1)
airflow = (noise(350, 1000) * (1 - flow) + noise(800, 2600) * flow) * (0.02 + 0.14 * flow ** 1.3) * flutter * air_on
air = np.stack([airflow * 0.85, airflow * 0.55])

# rotor and generator: a low tone that rises with rotor speed
ph = 2 * np.pi * np.cumsum(55 + 95 * w) / SR
rotor = (np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)) * 0.035 * w * ramp(t, T_DUCT + 0.5, T_DUCT + 2)
rot = np.stack([rotor * 0.9, rotor * 0.7])

# RO high-pressure pump: on in Scene 5 when named, through Scene 6, winds down in Scene 7
T_PUMP = cue('s5', 'pompa')
pump_env = ramp(t, T_PUMP, T_PUMP + 1.15) * (1 - smooth(ramp(t, S8 + 3, S8 + 8)))
pump_ph = 2 * np.pi * np.cumsum(100 * (0.55 + 0.45 * pump_env)) / SR
pump = (0.55 * np.sin(pump_ph) + 0.3 * np.sin(2 * pump_ph) + 0.12 * np.sin(3 * pump_ph) + 0.25 * noise(150, 900)) * 0.016 * pump_env
# permeate trickle while the membrane works
trickle = noise(4500, 9000) * 0.010 * ramp(t, cue('s5', 'disaring'), cue('s5', 'disaring') + 1.3) * (1 - smooth(ramp(t, S8 + 3, S8 + 8)))
plant = np.stack([pump * 0.45 + trickle * 0.4, pump + trickle])

# a few hand-placed hits: the two places, the name, the liters, the credits
hits = np.zeros((2, N))


def tok(at, f=880, gain=0.08, pan=0.5, decay=26):
    n = int(SR * 0.35)
    kk = np.arange(n) / SR
    s = (np.sin(2 * np.pi * f * kk) + 0.4 * np.sin(2 * np.pi * 2.7 * f * kk) * np.exp(-kk * 60)) * np.exp(-kk * decay) * (1 - np.exp(-kk * 2000))
    a = int(at * SR)
    hits[0, a:a + n] += gain * (1 - pan) * s[:N - a]
    hits[1, a:a + n] += gain * pan * s[:N - a]


def bell(at, root=62, gain=0.06):
    for i, m in enumerate((root, root + 7, root + 16)):
        n = int(SR * 3.2)
        kk = np.arange(n) / SR
        s = np.sin(2 * np.pi * hz(m) * kk) * np.exp(-kk * 1.4) * (1 - np.exp(-kk * 300))
        a = int((at + i * 0.045) * SR)
        e = min(N, a + n)
        hits[0, a:e] += gain * s[:e - a]
        hits[1, a:e] += gain * s[:e - a]


tok(max(cue('s1', 'Kelingking'), cue('s1', 'Kelingking') - 0.9 + 1.85), 760, 0.07, 0.6)
tok(cue('s1', 'Kuta'), 700, 0.07, 0.4)
tok(cue('s1', '63'), 520, 0.06, 0.35, 18)
bell(T_TITLE, 62, 0.045)
for i in range(10):
    tok(cue('s5', '10') + i * 0.035, 1500 + 40 * i, 0.018, 0.5 + 0.04 * (i - 5), 40)
bell(T_CRED, 62, 0.05)

sfx = ocean + whoosh + air + rot + plant
# the effects step back under the voice too: the speech band most, the rumble barely
fx_low = np.stack([band(c, None, 900) for c in sfx])
sfx = fx_low * (1 - 0.3 * speech) + (sfx - fx_low) * (1 - 0.75 * speech) + hits

# ---------------------------------------------------------------- write
def write(path, x, peak):
    x = x / (np.max(np.abs(x)) + 1e-12) * peak
    pcm = (np.clip(x.T, -1, 1) * 32767).astype('<i2')
    with wave.open(str(path), 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())
    mp3 = path.with_suffix('.mp3')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(path), '-codec:a', 'libmp3lame', '-b:a', '256k', str(mp3)], check=True)
    path.unlink()
    print(mp3.name, f'{DUR:.0f}s peak {peak}')


write(HERE / 'music.wav', mus, 0.5)
write(HERE / 'sfx.wav', sfx, 0.5)
