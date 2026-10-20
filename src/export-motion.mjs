// Samples the machine simulation on the root timeline (100 Hz) so the soundscape
// can follow the same water level, airflow and rotor speed the picture shows.
//   node src/export-motion.mjs  ->  assets/audio/motion.json
import { readFileSync, writeFileSync } from 'node:fs';
import { scenes } from './refinement.mjs';

globalThis.window = {};
const durByNum = Object.fromEntries(scenes.map((s) => [s.num, s.duration]));
new Function(readFileSync(new URL('./engine.js', import.meta.url), 'utf8').replace('/*@DUR*/{}', JSON.stringify(durByNum)))();
const { sim, WMAX } = window.OWC;
const num = { s2: 2, s3: 3, s4: 4, s5: 5, s7: 7, s8: 8, s6: 6 };
const RATE = 100, N = 180 * RATE;
const v = new Array(N).fill(0), w = new Array(N).fill(0), amp = new Array(N).fill(0);
for (const s of scenes) {
  const n = num[s.id];
  if (!n) continue;
  const S = sim(n);
  for (let i = Math.round(s.start * RATE); i < Math.round((s.start + s.duration) * RATE) && i < N; i++) {
    const t = i / RATE - s.start, j = Math.min(S.N - 1, Math.round(t * 120));
    v[i] = +S.V[j].toFixed(3);
    w[i] = +(S.W[j] / WMAX).toFixed(4);
    amp[i] = +S.p.A(t).toFixed(2);
  }
}
writeFileSync(new URL('../assets/audio/motion.json', import.meta.url), JSON.stringify({ rate: RATE, v, w, amp, scenes: scenes.map(({ id, start, duration, voStart, vo }) => ({ id, start, duration, voStart, vo })) }));
console.log('motion.json', N, 'samples');
