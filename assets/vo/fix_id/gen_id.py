"""Regenerate the scenes whose English terms become Indonesian, all in Ardi's voice.
Run: py -3.12 gen_id.py  ->  s{i}.mp3 + s{i}.words.json in this folder
"""
import asyncio, json, edge_tts

SWAP = [
    ("berdiri chamber Oscillating Water Column", "berdiri ruang Kolom Air Berosilasi"),
    ("ke turbin Wells dan generator", "ke turbin udara dan generator"),
    ("desalinasi reverse osmosis", "desalinasi osmosis balik"),
    ("ke dalam chamber", "ke dalam ruang"),
    ("melewati turbin Wells", "melewati turbin"),
    ("keluar dari chamber", "keluar dari ruang"),
    ("Tapi turbin Wells tetap", "Tapi turbin tetap"),
    ("ke microgrid untuk", "ke jaringan listrik mikro untuk"),
    ("di unit Reverse Osmosis", "di unit osmosis balik"),
]

def indo(text):
    for a, b in SWAP:
        text = text.replace(a, b)
    return text

async def gen(i):
    text = indo(json.load(open(f"../orig/s{i}.words.json", encoding="utf-8"))["text"])
    words, audio = [], bytearray()
    async for ch in edge_tts.Communicate(text, "id-ID-ArdiNeural", boundary="WordBoundary").stream():
        if ch["type"] == "audio":
            audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            words.append({"t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7, "w": ch["text"]})
    open(f"s{i}.mp3", "wb").write(audio)
    json.dump({"text": text, "words": words}, open(f"s{i}.words.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)

async def main():
    await asyncio.gather(*(gen(i) for i in (2, 3, 4, 5)))

asyncio.run(main())
