---
workflow: general-video
flow: companion
storyboard: yes
message: "Energi ombak menjadi listrik dan air bersih untuk satu fasilitas wisata pesisir"
destination: youtube
aspect: 1920x1080
language: id
audience: juri kompetisi dan masyarakat umum
length: 202s
angle: concept
voice: ElevenLabs eleven_v4 · River
audio: narasi + musik latar + efek suara
---

## Arahan aktif

20 Oktober 2026, v4. Pengguna meminta audit seluruh scene dari sudut pandang penonton dan perbaikan maksimal, lalu melengkapi latar belakang pemanfaatan spesifik sesuai instruksi dosen. Delapan scene, 201,7 detik, tetap memakai mesin, kamera utama dan palet terang. Urutan: masalah & sasaran pemanfaatan 0–42,5, struktur 42,5–66, naik 66–83, surut 83–106,5, RO 106,5–139,5, layanan 139,5–164, cadangan 164–188,2, penutup 188,2–201,7. Rincian audit: [docs/audit-v3.md](docs/audit-v3.md).

Fokus MSTR: energi listrik dan air bersih sama-sama dihitung. Narasi ElevenLabs Eleven v4, voice River, semua scene. Musik latar dan efek suara sintetis, di-duck di bawah narasi. **Jangan encode video sebelum pengguna menyetujui preview.** (Render v4, `renders/OWC-DESAL-v4.mp4`, dibuat atas permintaan pengguna.) Lima identitas anggota dan logo UPI dipertahankan. [Galeri](boards/storyboard.html).

## Perubahan yang diterapkan

- Latar terang, bidang material, teks gelap; grid, glow mesin dan halo peta dihapus.
- Label langsung dan judul tenang menggantikan HUD/kapsul. Font Literata dan Source Sans 3 lokal.
- Peta, konstruksi bertahap, push-in chamber, dua fase udara, inset bilah, close-up membran, pull-back dan penutup tetap memakai animasi asli.
- Klaim lama "63 GW energi gelombang" diganti "potensi energi laut Indonesia ±63 GW, pemanfaatannya belum optimal" (Badan Geologi ESDM). Fokus satu fasilitas wisata. Cabang cold storage diganti kios.
- Scene RO kini menampilkan recovery asumsi 40%: 12,5 m³ umpan → 5 m³ produk + 7,5 m³ brine.
- Scene layanan baru memperlihatkan 200 pengunjung/hari, lima kios, petugas dan kebersihan; alokasi air 4 + 0,5 + 0,25 + 0,25 m³. Beat berikutnya menghitung energi dan alokasi beban.
- Scene cadangan baru memperlihatkan ombak melemah, RO siaga, suplai dari tangki 10 m³, serta baterai 8 kWh nominal untuk lampu/kontrol. Tidak mengklaim baterai menjalankan RO dua hari; distribusi gravitasi bersyarat.
- Grafik daya relatif dan simbol pengondisi listrik ditambahkan pada mekanisme lama. Pascapengolahan, mutu air dan brine tetap dijelaskan.
- Ringkasan akhir menyatakan konsep perlu pengujian. Rata-rata 2 kW selama hari contoh bersifat asumsi, bukan hasil uji.

## Angka skenario

2 kW rata-rata × 24 jam = 48 kWh bruto. Dengan allowance listrik 10%, tersedia 43,2 kWh. Target 5 m³/hari × asumsi 5 kWh/m³ = 25 kWh RO; fasilitas 3,6 kWh; margin 14,6 kWh. Riset dan batas bukti: [docs/research.md](docs/research.md), [docs/scenario.md](docs/scenario.md). Lokasi instalasi belum ditetapkan.

## Produksi

`node src/build.mjs` membangun delapan scene dari enam template asli dan dua tambahan. Data skenario berasal dari `src/scenario.mjs`. `node src/review-board.mjs` memperbarui galeri dan storyboard. `npm run check` wajib setelah perubahan HTML. CLI dipin ke 0.8.179. [Peta animasi](docs/motion-map.md), [cakupan revisi](docs/revision-status.md).

Eksperimen delapan scene disimpan terpisah dalam `experiments/coastal-redesign-v2.zip`, tidak dimuat di film aktif. `docs/legacy-*.md` menyimpan brief dan spesifikasi versi gelap awal. Filter antislop tetap mode DURING yang dipilih pengguna.
