import re, asyncio, json, edge_tts
src = open("../../Draft Teks Animasi OWC-DESAL.md", encoding="utf-8").read()
lines = re.findall(r'\*\*Narasi:\*\* "(.+?)"\n', src)
assert len(lines) == 6
async def gen(i, text):
    c = edge_tts.Communicate(text, "id-ID-ArdiNeural", boundary="WordBoundary")
    words = []
    with open(f"assets/vo/s{i}.mp3", "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio": f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"t": ch["offset"]/1e7, "d": ch["duration"]/1e7, "w": ch["text"]})
    json.dump({"text": text, "words": words}, open(f"assets/vo/s{i}.words.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
async def main():
    await asyncio.gather(*(gen(i+1, t) for i, t in enumerate(lines)))
asyncio.run(main())
