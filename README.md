# OWC-DESAL (Kelompok 9 · UPI)

Animasi penjelasan OWC (Kolom Air Berosilasi) dan desalinasi osmosis balik (RO) untuk satu fasilitas wisata pesisir. **8 scene, 183,5 detik, 1920×1080, 30 fps.** Komposisi HyperFrames, CLI dipin ke 0.8.179.

## Isi versi ini (revisi v3, 20 Oktober 2026)

- **Pembuka berbasis masalah air dan energi.** Peta menyelam ke Bali dengan dua penanda bersumber: Kelingking & Broken Beach belum teraliri air bersih (detikBali, 12 Mei 2026) dan sumur pesisir Kuta Utara terintrusi air laut (Manuaba & Sugianto, 2025), lalu potensi energi laut Indonesia ±63 GW yang belum dimanfaatkan (Badan Geologi ESDM). Ditutup pertanyaan "Bisakah ombak menghasilkan listrik, sekaligus air bersih?".
- **Narasi** (`assets/vo/eleven/`): ElevenLabs Eleven v4, voice River, audio tags per kalimat, dilevel ke −17,5 LUFS. Generate ulang: `ELEVENLABS_API_KEY=... node assets/vo/eleven/generate.mjs s1` (key hanya lewat environment). Versi edge-tts sebelumnya tetap di `assets/vo/v3/`.
- **Koreografi mengikuti kata.** `OWC.cues()` membaca timing kata dari `words.json`; label, panel, bar, dan zoom muncul tepat saat istilahnya diucapkan.
- **Subtitle** satu baris 34 px di atas pita kertas, kata yang sedang diucapkan digaris bawah. Angka tampil sebagai digit ("12,5 m³") walau narasi mengucapkannya dengan kata.
- **Audio**: musik latar dan efek suara (ombak, aliran udara turbin, putaran rotor, pompa RO) disintesis dari simulasi mesin yang sama dengan gambar, lalu di-duck di bawah narasi.

## Menjalankan

```bash
node src/build.mjs          # membangun 8 scene + index.html dari src/
npm run check               # lint + runtime + layout + motion + kontras
npx hyperframes preview --background   # Studio
npm run render              # render MP4 (setelah preview disetujui)
```

Membuat ulang aset (opsional):

```bash
node src/export-motion.mjs               # sampel simulasi untuk audio
python assets/audio/gen_soundscape.py    # music.mp3 + sfx.mp3 (butuh numpy, ffmpeg)
python src/gen_bali.py ne_10m_land.geojson   # garis pantai detail Bali (Natural Earth 1:10m)
node src/review-board.mjs                # galeri boards/storyboard.html
```

Sumber yang diedit ada di `src/` (template scene `s1.html`–`s8.html`, `engine.js`, `refine.css`, `scenario.mjs`). `compositions/frames/` dan `index.html` adalah hasil build; jangan diedit langsung.

Dokumen: [audit dan perubahan v3](docs/audit-v3.md), [riset & batas klaim](docs/research.md), [skenario perhitungan](docs/scenario.md), [galeri](boards/storyboard.html).
