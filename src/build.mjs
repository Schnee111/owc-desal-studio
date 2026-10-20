// Build the 8 scenes with synchronized GSAP timelines, minimalist sliding-card
// word subtitles, and ducked ambient BGM + SFX tracks.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { recolor } from './style-tokens.mjs';
import { scenes } from './refinement.mjs';
import { scenario, display } from './scenario.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const project = join(here, '..');
const read = name => readFileSync(join(here, name), 'utf8');
const out = join(project, 'compositions/frames');
mkdirSync(out, { recursive: true });

const face = (family, file, weight) =>
  `@font-face{font-family:'${family}';src:url(data:font/ttf;base64,${readFileSync(join(project, 'assets/fonts', file)).toString('base64')}) format('truetype');font-weight:${weight};font-style:normal;font-display:block}`;

const fonts =
  face('Literata', 'literata-0.ttf', 500) +
  face('Source Sans 3', 'source-sans-0.ttf', 400) +
  face('Source Sans 3', 'source-sans-2.ttf', 600) +
  face('Source Sans 3', 'source-sans-3.ttf', 700);

const css = recolor(read('common.css'));
const refine = read('refine.css');
const engine = recolor(read('engine.js'));
const logo = 'data:image/png;base64,' + readFileSync(join(project, 'assets/logo-upi.png')).toString('base64');

// Narration lives in assets/vo/<s.vo>/ (v3 = current script; '' = original Ardi takes).
const voDir = s => join(project, 'assets/vo', s.vo || '');
const voManifest = dir => (existsSync(join(dir, 'manifest.json')) ? JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8')) : {});

function loadSubtitleData(s) {
  const pathToUse = join(voDir(s), `${s.id}.words.json`);
  const parsed = existsSync(pathToUse) ? JSON.parse(readFileSync(pathToUse, 'utf8')) : { text: s.text, words: [] };
  return {
    voOffset: +(s.voStart - s.start).toFixed(3),
    text: parsed.text || s.text,
    words: parsed.words || [],
  };
}

const durByNum = Object.fromEntries(scenes.map((s) => [s.num, s.duration]));
const engineFor = () => engine.replace('/*@DUR*/{}', () => JSON.stringify(durByNum));

for (const s of scenes) {
  const subData = loadSubtitleData(s);
  let html = recolor(read(s.id + '.html'))
    .replace('/*@CSS*/', () => fonts + css.replaceAll('ROOT', '#' + s.id + '-root'))
    .replace('/*@ENGINE*/', () => engineFor())
    .replace(/\{\{SCENE_DUR\}\}/g, () => String(s.duration))
    .replace('/*@SCENEDUR*/', () => String(s.duration))
    .replace('/*@LEGACY*/', () => JSON.stringify(s.legacy || null))
    .replace('/*@MAP*/', () => read('map-data.js'))
    .replace('/*@BALI*/', () => read('bali-data.js'))
    .replace('/*@LOGO*/', () => logo)
    .replace('/*@SUBTITLE*/', () => JSON.stringify(subData));

  html = html
    .replace('/*@DATA*/', () => JSON.stringify(scenario))
    .replace(/\{\{(\w+)\}\}/g, (_, key) => {
      if (!(key in display)) throw Error('Unknown data token ' + key);
      return display[key];
    });

  // Append overrides inside the template, after scene-specific styles.
  html = html.replace('</style>', () => refine.replaceAll('ROOT', '#' + s.id + '-root') + '</style>');
  writeFileSync(join(out, s.file + '.html'), html);
}

const audio = scenes
  .map(s => {
    const duration = voManifest(voDir(s))[s.id]?.duration || s.voDuration;
    if (!duration) return '';
    const srcPath = ['assets/vo', s.vo, `${s.id}.mp3`].filter(Boolean).join('/');
    return `<audio id="vo-${s.id}" src="${srcPath}" data-start="${s.voStart}" data-duration="${duration}" data-volume="1" data-track-index="10" data-label="Narasi ${s.title}"></audio>`;
  })
  .filter(Boolean)
  .join('\n');

// Music bed and effects stem from assets/audio/gen_soundscape.py; both are pre-carved under the narration.
const extraAudio = [
  existsSync(join(project, 'assets/audio/music.mp3'))
    ? `<audio id="music-bed" src="assets/audio/music.mp3" data-start="0" data-duration="180" data-volume="0.24" data-track-index="11" data-label="Musik latar"></audio>`
    : '',
  existsSync(join(project, 'assets/audio/sfx.mp3'))
    ? `<audio id="sfx-track" src="assets/audio/sfx.mp3" data-start="0" data-duration="180" data-volume="0.34" data-track-index="12" data-label="Efek suara: ombak, udara, pompa"></audio>`
    : '',
]
  .filter(Boolean)
  .join('\n');

writeFileSync(
  join(project, 'index.html'),
  `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>OWC-DESAL · Revisi Animasi Presentasi Kelompok 9</title><script src="assets/vendor/gsap.min.js"></script><style>${fonts}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1920px;height:1080px;overflow:hidden;background:#F4EFE4}#root{position:relative;width:100%;height:100%;overflow:hidden;background:#F4EFE4}#root>.clip{position:absolute;inset:0}#fade-out{position:absolute;inset:0;background:#F4EFE4;opacity:0;z-index:50}
</style></head><body><div id="root" data-composition-id="main" data-start="0" data-duration="180" data-width="1920" data-height="1080" data-fps="30">
${scenes.map((s, i) => `<div id="el-${s.id}" class="clip" data-composition-id="${s.id}" data-composition-src="compositions/frames/${s.file}.html" data-start="${s.start}" data-duration="${s.duration}" data-track-index="${i + 1}" data-width="1920" data-height="1080" data-label="${i + 1}. ${s.title}" data-track-kind="graphics"></div>`).join('\n')}
${audio}
${extraAudio}<div id="fade-out"></div></div><script>window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});tl.fromTo('#fade-out',{opacity:0},{opacity:1,duration:1.0,ease:'power1.in'},179);window.__timelines.main=tl;</script></body></html>`
);

console.log(`Built ${scenes.length} scenes (180s).`);
