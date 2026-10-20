# OWC-DESAL (Revisi Komprehensif Kelompok 9)

Animasi penjelasan OWC dan desalinasi osmosis balik (RO) untuk satu fasilitas wisata pesisir (**8 scene, 180 detik, 1920×1080, 30 fps**).

## Pembaruan Utama pada Versi Ini

1. **Sinkronisasi Penuh Timeline GSAP & Voice-Over (`s1`–`s8`)**:
   - Memperbaiki keterlambatan 5–9 detik pada Scene 1, Scene 5, Scene 6 (`07-layanan`), dan Scene 8 (`06-kesimpulan`).
   - Memperbaiki *dwell time* 8 label komponen RO di Scene 2 agar seluruhnya terbaca nyaman ($\ge 3{,}4\text{ detik}$).
   - Menambahkan **Konteks Masalah Pesisir & Wisata** di Scene 1 (kasus akses air bersih Kelingking/Broken Beach Mei 2026 & intrusi air asin Kuta Utara TDS 10.000–20.000 mg/L).
   - Menambahkan **Skala Fisik Skenario LKM 3** di Scene 3 ($H_s = 1\text{ m}, T_e = 6\text{ dtk} \approx 2{,}94\text{ kW/m}$, lebar chamber $B = 4\text{ m} \rightarrow \text{daya rata-rata } \approx 2\text{ kW}$).
   - Menambahkan **Bar Proporsi Neraca Air (40% Produk $5\text{ m}^3$ vs 60% Brine $7{,}5\text{ m}^3$ dari $12{,}5\text{ m}^3$ Umpan)** di Scene 5.
   - Menerapkan *progressive disclosure* dan badge **`RO SIAGA · Pompa Dijadwalkan Ulang (0 kW)`** di Scene 7 (`08-cadangan`).
2. **Minimalist Sliding-Card Word Subtitle (`OWC.mountSubtitle`)**:
   - Subtitle minimalis di bagian bawah layar (hanya teks bersih dengan *sliding highlight card* yang bergeser mulus dari kata ke kata mengikuti timestamp VO).
3. **Integrasi ElevenLabs v4 (`River` Indonesian Natural Voice + Emotion Audio Tags)**:
   - Skrip `assets/vo/generate_elevenlabs.mjs` (`npm run vo`) sudah dikonfigurasi dengan suara **River (`SAz9YHcvj6GT2YYXdXww`)**, model **`eleven_v4`**, *emotion/delivery tags* resmi Eleven v4, serta endpoint `/with-timestamps` yang otomatis memperbarui `.words.json` dan membangun ulang subtitle.
4. **Backsound Ambient (Auto-Ducked) & Sound Effects (SFX) Terintegrasi**:
   - `assets/audio/bgm-ambient.mp3` (backsound ambient dengan *sidechain ducking* otomatis saat narator berbicara).
   - `assets/audio/sfx-track.mp3` (efek suara debur ombak pantai, aliran udara/turbin OWC, aliran air membran RO, dan *UI tick* lembut).

## Cara Menjalankan & Merender di Laptop

```bash
# 1. (Opsional tapi direkomendasikan) Generate suara ElevenLabs v4 River + auto-sync subtitle:
npm run vo

# 2. Build ulang & cek komposisi HyperFrames:
npm run build
npm run check

# 3. Preview interaktif di browser atau langsung render ke MP4:
npm run dev
npm run render
```
