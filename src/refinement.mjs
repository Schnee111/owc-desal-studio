// Scene order, root-timeline slots and narration source. Text comes from the
// words.json of each scene's VO directory so subtitles, cues and audio agree.
// `legacy` records the narration a scene's choreography was first timed to, so
// OWC.warp can carry those hand-placed beats onto the current voice.
import { readFileSync } from 'node:fs';
const words = (dir, id) => JSON.parse(readFileSync(new URL(`../assets/vo/${dir ? dir + '/' : ''}${id}.words.json`, import.meta.url), 'utf8'));

const scene = (o) => ({ ...o, text: words(o.vo, o.id).text });
const VO = 'eleven';

export const scenes = [
  scene({ id: 's1', num: 1, file: '01-judul', title: 'Masalah, potensi, dan sasaran pemanfaatan', start: 0, duration: 42.5, voStart: 0.5, still: 10.5, vo: VO }),
  scene({ id: 's2', num: 2, file: '02-struktur', title: 'Sistem terbentuk bertahap', start: 42.5, duration: 23.5, voStart: 43.1, still: 65.0, vo: VO,
    legacy: { words: words('', 's2').words, offset: 0.6, duration: 25 } }),
  scene({ id: 's3', num: 3, file: '03-fase-naik', title: 'Kolom air naik, listrik dihasilkan', start: 66.0, duration: 17, voStart: 67.2, still: 79.0, vo: VO,
    legacy: { words: words('', 's3').words, offset: 1.5, duration: 18 } }),
  scene({ id: 's4', num: 4, file: '04-fase-turun', title: 'Udara berbalik, rotor tetap searah', start: 83.0, duration: 23.5, voStart: 83.6, still: 101.0, vo: VO }),
  scene({ id: 's5', num: 5, file: '05-dual-output', title: 'RO dan dua keluaran air', start: 106.5, duration: 33, voStart: 107.0, still: 127.0, vo: VO }),
  scene({ id: 's7', num: 7, file: '07-layanan', title: 'Alokasi air dan anggaran energi', start: 139.5, duration: 24.5, voStart: 140.1, still: 162.0, vo: VO }),
  scene({ id: 's8', num: 8, file: '08-cadangan', title: 'Ketika ombak melemah', start: 164.0, duration: 24.2, voStart: 164.5, still: 186.0, vo: VO }),
  scene({ id: 's6', num: 6, file: '06-kesimpulan', title: 'Konsep menuju pengujian', start: 188.2, duration: 13.5, voStart: 188.5, still: 199.5, vo: VO }),
];

export const total = +(scenes.at(-1).start + scenes.at(-1).duration).toFixed(3);
