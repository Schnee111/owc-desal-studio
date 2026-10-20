"""Put the regenerated Indonesian sentences into Ardi's original clips, sentence by sentence.

Only sentences whose text changed are swapped. Each new sentence starts where the old one
started; cuts fall in the pauses between sentences, so no time-stretch is needed and the
unchanged sentences keep their exact timing. Clip lengths stay identical.
Output: ../s{i}.mp3, ../s{i}.words.json, ../fixed/s{i}.wav  (originals stay in ../orig/)
Run: py -3.12 splice_id.py
"""
import json, os, shutil, subprocess
import numpy as np

SR = 24000
VO = os.path.dirname(os.path.abspath(__file__)) + "/.."
LEAD, TAIL = 0.08, 0.15

def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, "<i2").astype(np.float64) / 32768

def save_wav(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype("<i2").tobytes()
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", path],
                   input=pcm, check=True)

def sentences(W):
    toks = W["text"].split()
    assert len(toks) == len(W["words"])
    out, cur = [], []
    for tok, w in zip(toks, W["words"]):
        cur.append(w)
        if tok.endswith("."):
            out.append(cur)
            cur = []
    return out

def text(s):
    return " ".join(w["w"] for w in s)

def fade(n):
    return 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, n))

os.makedirs(f"{VO}/fixed", exist_ok=True)
for i in range(1, 7):
    if not os.path.exists(f"s{i}.mp3"):
        # unchanged scene: original audio and timings
        shutil.copy(f"{VO}/orig/s{i}.mp3", f"{VO}/s{i}.mp3")
        shutil.copy(f"{VO}/orig/s{i}.words.json", f"{VO}/s{i}.words.json")
        save_wav(f"{VO}/fixed/s{i}.wav", load(f"{VO}/orig/s{i}.mp3"))
        continue
    x, y = load(f"{VO}/orig/s{i}.mp3"), load(f"s{i}.mp3")
    Wo = json.load(open(f"{VO}/orig/s{i}.words.json", encoding="utf-8"))
    Wn = json.load(open(f"s{i}.words.json", encoding="utf-8"))
    so, sn = sentences(Wo), sentences(Wn)
    out, words = x.copy(), []
    f = int(0.01 * SR)
    for k, (a, b) in enumerate(zip(so, sn)):
        if text(a) == text(b):
            words += a
            continue
        o0 = a[0]["t"]
        o_next = so[k + 1][0]["t"] if k + 1 < len(so) else len(x) / SR
        n0 = b[0]["t"]
        n_end = b[-1]["t"] + b[-1]["d"]
        n_next = sn[k + 1][0]["t"] if k + 1 < len(sn) else len(y) / SR
        seg = y[int((n0 - LEAD) * SR): int(min(n_end + TAIL, n_next - LEAD) * SR)].copy()
        r0, r1 = int((o0 - LEAD) * SR), int((o_next - LEAD) * SR)   # old sentence + its pause
        assert len(seg) <= r1 - r0, f"s{i} sentence {k} does not fit"
        seg[:f] *= fade(f)
        seg[-f:] *= fade(f)[::-1]
        out[r0:r1] = 0
        out[r0:r0 + len(seg)] = seg
        words += [{**w, "t": round(w["t"] - n0 + o0, 4)} for w in b]
        print(f"s{i}: '{text(b)[:60]}...' at {o0:.2f}s, room {((r1 - r0) - len(seg)) / SR:.2f}s")
    save_wav(f"{VO}/fixed/s{i}.wav", out)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{VO}/fixed/s{i}.wav", "-c:a", "libmp3lame",
                    "-b:a", "96k", f"{VO}/s{i}.mp3"], check=True)
    json.dump({"text": Wn["text"], "words": words}, open(f"{VO}/s{i}.words.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=0)
print("done")
