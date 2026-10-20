// Narration with ElevenLabs Eleven v4, voice "River", via /with-timestamps.
// Reads script.json (audio tags in [brackets]), writes <id>.mp3, <id>.words.json
// (levelled to -17.5 LUFS; the raw take stays in raw/), word timings built from the character alignment, tags removed, spoken number
// phrases merged into display tokens) and manifest.json.
//
//   ELEVENLABS_API_KEY=... node assets/vo/eleven/generate.mjs [s1 s4 ...] [--force]
//
// Existing clips are skipped unless --force or named explicitly, so a rerun does
// not spend character quota. The key is only read from the environment.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';

const here = new URL('.', import.meta.url);
const VOICE = 'SAz9YHcvj6GT2YYXdXww'; // River
const MODEL = 'eleven_v4';
const SETTINGS = { stability: 0.4, similarity_boost: 0.8, use_speaker_boost: true };
const key = process.env.ELEVENLABS_API_KEY;
if (!key) throw Error('Set ELEVENLABS_API_KEY');

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));
const script = JSON.parse(readFileSync(new URL('script.json', here), 'utf8'));
const manifestUrl = new URL('manifest.json', here);
const manifest = existsSync(manifestUrl) ? JSON.parse(readFileSync(manifestUrl, 'utf8')) : {};

// characters -> words, skipping [audio tags]
function words(al) {
  const out = [];
  let cur = null, inTag = false;
  al.characters.forEach((ch, i) => {
    if (ch === '[') inTag = true;
    if (inTag) { if (ch === ']') inTag = false; return; }
    if (/\s/.test(ch)) { if (cur) out.push(cur); cur = null; return; }
    const a = al.character_start_times_seconds[i], b = al.character_end_times_seconds[i];
    if (!cur) cur = { t: a, e: b, w: ch };
    else { cur.e = b; cur.w += ch; }
  });
  if (cur) out.push(cur);
  return out.map((w) => ({ t: +w.t.toFixed(4), d: +(w.e - w.t).toFixed(4), w: w.w }));
}

function merge(ws, display) {
  for (const [spoken, shown] of [...display].sort((a, b) => b[0].split(' ').length - a[0].split(' ').length)) {
    const parts = spoken.split(' ');
    for (let k = 0; k <= ws.length - parts.length; k++) {
      if (parts.every((p, j) => ws[k + j].w === p)) {
        const first = ws[k], last = ws[k + parts.length - 1];
        ws.splice(k, parts.length, { t: first.t, d: +(last.t + last.d - first.t).toFixed(4), w: shown });
      }
    }
  }
  return ws;
}

for (const line of script) {
  const mp3 = new URL(`${line.id}.mp3`, here);
  if (only.length && !only.includes(line.id)) continue;
  if (existsSync(mp3) && !force && !only.length) { console.log(line.id, 'exists, skipped'); continue; }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ text: line.text, model_id: MODEL, language_code: 'id', voice_settings: SETTINGS, seed: 9 }),
  });
  if (!res.ok) throw Error(`${line.id}: ${res.status} ${await res.text()}`);
  const j = await res.json();
  // keep the untouched take in raw/, publish a copy levelled to -17.5 LUFS
  const raw = new URL(`raw/${line.id}.mp3`, here);
  writeFileSync(raw, Buffer.from(j.audio_base64, 'base64'));
  const meter = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', raw.pathname, '-af', 'ebur128', '-f', 'null', '-']).stderr.toString();
  const lufs = +[...meter.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)[1]; // ebur128 reports on stderr; last line is the summary
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw.pathname, '-af', `volume=${(-17.5 - lufs).toFixed(2)}dB,alimiter=limit=0.95:level=false`, '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '192k', mp3.pathname]);
  const ws = merge(words(j.alignment), line.display || []);
  const text = ws.map((w) => w.w).join(' ');
  writeFileSync(new URL(`${line.id}.words.json`, here), JSON.stringify({ text, spoken: line.text, words: ws }, null, 1));
  const duration = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', mp3.pathname]).toString();
  manifest[line.id] = { duration: +duration.toFixed(3), voice: `River (${VOICE})`, model: MODEL, text: line.text };
  writeFileSync(manifestUrl, JSON.stringify(manifest, null, 2));
  console.log(line.id, duration.toFixed(2) + 's', `last word ends ${(ws.at(-1).t + ws.at(-1).d).toFixed(2)}s`);
}
