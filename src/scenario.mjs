// Conditional design scenario, never measured performance. Keep display values,
// graphics and narration calculations tied to the research ledger.
export const scenario = {
  hs: 1,
  te: 6,
  width: 4,
  flux: 2.94,
  meanKw: 2,
  hours: 24,
  delivery: 0.9,
  water: 5,
  sec: 5,
  other: 3.6,
  visitors: 200,
  kiosks: 5,
  lamps: 8,
  reserve: 10,
  battery: 8,
  recovery: 0.4,
};
scenario.gross = scenario.meanKw * scenario.hours;
scenario.net = +(scenario.gross * scenario.delivery).toFixed(1);
scenario.ro = scenario.water * scenario.sec;
scenario.margin = +(scenario.net - scenario.ro - scenario.other).toFixed(1);
scenario.feed = +(scenario.water / scenario.recovery).toFixed(1);
scenario.brine = +(scenario.feed - scenario.water).toFixed(1);
scenario.waterRows = [
  [4, 'Sanitasi pengunjung (200 org)'],
  [0.5, 'Kebersihan 5 kios'],
  [0.25, 'Kebutuhan 5 petugas'],
  [0.25, 'Perawatan fasilitas'],
];
scenario.energyRows = [
  [scenario.ro, 'Pompa & unit RO (5 m³)'],
  [scenario.other, 'Fasilitas (8 lampu, kios, kontrol)'],
  [scenario.margin, 'Margin & buffer cadangan'],
];
export const display = Object.fromEntries(
  Object.entries(scenario)
    .filter(([, v]) => typeof v === 'number')
    .map(([k, v]) => [k, new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(v)])
);
