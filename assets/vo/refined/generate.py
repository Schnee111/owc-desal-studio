"""Generate revised Ardi narration without modifying legacy voice files."""
import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

HERE = Path(__file__).resolve().parent

async def generate(line):
    audio = HERE / f'{line["id"]}.mp3'
    old_words=HERE/f'{line["id"]}.words.json'
    if audio.exists() and old_words.exists() and json.loads(old_words.read_text()).get('text')==line['text']:
        duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(audio)]))
        if duration<=line['window']:
            print(line['id'],round(duration,2),'seconds (reused)',flush=True)
            return line['id'],{'duration':duration,'voice':'id-ID-ArdiNeural','text':line['text']}
    for attempt in range(3):
        words = []
        try:
            with audio.open('wb') as stream:
                async for chunk in edge_tts.Communicate(line['text'], 'id-ID-ArdiNeural', rate='+0%', boundary='WordBoundary').stream():
                    if chunk['type'] == 'audio': stream.write(chunk['data'])
                    elif chunk['type'] == 'WordBoundary': words.append({'t': chunk['offset']/1e7, 'd': chunk['duration']/1e7, 'w': chunk['text']})
            break
        except Exception:
            if attempt == 2: raise
            await asyncio.sleep(2)
    duration = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(audio)]))
    if duration > line['window']: raise RuntimeError(f'{line["id"]}: {duration:.2f}s exceeds {line["window"]}s window')
    (HERE/f'{line["id"]}.words.json').write_text(json.dumps({'text':line['text'],'words':words},ensure_ascii=False))
    print(line['id'],round(duration,2),'seconds',flush=True)
    return line['id'], {'duration':duration,'voice':'id-ID-ArdiNeural','text':line['text']}

async def main():
    manifest={}
    for line in json.loads((HERE/'script.json').read_text()):
        key,result=await generate(line);manifest[key]=result
    (HERE/'manifest.json').write_text(json.dumps(manifest,indent=2))

if __name__ == '__main__': asyncio.run(main())
