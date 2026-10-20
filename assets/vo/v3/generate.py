"""Generate the v3 narration (edge-tts, id-ID-ArdiNeural) with word timings.

Reads script.json, writes <id>.mp3 and <id>.words.json next to this file and a
manifest.json with measured durations. Each words.json carries display tokens:
spoken number phrases ("lima meter kubik") are merged into one readable token
("5 m³") that keeps the timing of the whole phrase, so subtitles show digits
while the voice says words. Run with a Python that has edge-tts installed:

    python assets/vo/v3/generate.py
"""
import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts

HERE = Path(__file__).resolve().parent
VOICE = 'id-ID-ArdiNeural'


def norm(s):
    return re.sub(r'[^0-9a-zà-ÿ]', '', s.lower())


def align(text, bounds):
    """Attach the punctuated text tokens to edge-tts word boundaries."""
    tokens = text.split()
    out, i = [], 0
    for b in bounds:
        target = norm(b['w'])
        acc, j = '', i
        while j < len(tokens) and norm(acc) != target:
            acc = (acc + ' ' + tokens[j]).strip()
            j += 1
            if len(norm(acc)) > len(target) and not norm(acc).startswith(target):
                break
        if norm(acc) != target:
            raise RuntimeError(f'cannot align boundary {b["w"]!r} at token {tokens[i:i + 3]}')
        out.append({'t': round(b['t'], 4), 'd': round(b['d'], 4), 'w': acc})
        i = j
    return out


def merge(words, display):
    """Collapse spoken phrases into display tokens, keeping phrase timing."""
    for spoken, shown in sorted(display, key=lambda p: -len(p[0].split())):
        parts = spoken.split()
        k = 0
        while k <= len(words) - len(parts):
            if [w['w'] for w in words[k:k + len(parts)]] == parts:
                first, last = words[k], words[k + len(parts) - 1]
                words[k:k + len(parts)] = [{'t': first['t'], 'd': round(last['t'] + last['d'] - first['t'], 4), 'w': shown}]
            k += 1
    return words


async def generate(line):
    audio = HERE / f'{line["id"]}.mp3'
    for attempt in range(3):
        bounds = []
        try:
            with audio.open('wb') as stream:
                comm = edge_tts.Communicate(line['text'], VOICE, rate=line.get('rate', '+0%'), boundary='WordBoundary')
                async for chunk in comm.stream():
                    if chunk['type'] == 'audio':
                        stream.write(chunk['data'])
                    elif chunk['type'] == 'WordBoundary':
                        bounds.append({'t': chunk['offset'] / 1e7, 'd': chunk['duration'] / 1e7, 'w': chunk['text']})
            break
        except Exception:
            if attempt == 2:
                raise
            await asyncio.sleep(2)
    duration = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(audio)]))
    words = merge(align(line['text'], bounds), line.get('display', []))
    shown = ' '.join(w['w'] for w in words)
    (HERE / f'{line["id"]}.words.json').write_text(json.dumps({'text': shown, 'spoken': line['text'], 'words': words}, ensure_ascii=False, indent=1))
    status = 'OK' if duration <= line['window'] else f'OVER window {line["window"]}s'
    print(f'{line["id"]}: {duration:.2f}s {status}', flush=True)
    return line['id'], {'duration': round(duration, 3), 'voice': VOICE, 'rate': line.get('rate', '+0%'), 'text': line['text']}


async def main():
    manifest = {}
    for line in json.loads((HERE / 'script.json').read_text()):
        key, result = await generate(line)
        manifest[key] = result
    (HERE / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False))


if __name__ == '__main__':
    asyncio.run(main())
