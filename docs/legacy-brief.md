---
workflow: general-video
flow: automation
storyboard: no
message: "OWC-DESAL mengubah ombak di depan kampung pesisir menjadi listrik sekaligus air tawar"
destination: youtube
aspect: 1920x1080
language: id
audience: juri kompetisi dan masyarakat umum
length: 180s
angle: concept
voice: id-ID-ArdiNeural
---

## Intent

Animasi 2D cross-section 3 menit, 6 scene, judul "OWC-DESAL: Solusi Energi & Air Bersih Pesisir
Indonesia". Naskah lengkap ada di `../../Draft Teks Animasi OWC-DESAL.md`: narasi dan teks layar dipakai
apa adanya, batas scene persis sesuai tabel (0:25 / 0:55 / 1:25 / 1:55 / 2:30 / 3:00).
User awalnya memilih review bertahap, lalu menulis: "Langsung saja kerjakan full video lengkap beserta
narasinya tidak perlu tunggu approval saya" → tanpa jeda checkpoint, render langsung disetujui.

## Assets

- assets/logo-upi.png — logo Universitas Pendidikan Indonesia (PNG transparan, teks hitam); tampil di layar penutup Scene 6 di atas pelat putih membulat, warna logo tidak diubah.

## Customizations

- Narasi: edge-tts, suara id-ID-ArdiNeural (dipilih user).
- Peta Scene 1: garis pantai asli dari data publik Natural Earth, digambar line-draw blueprint, titik kuning di pesisir Samudra Hindia (selatan Jawa, Bali, NTB, NTT, barat Sumatra).
- Penutup: "OWC-DESAL · KELOMPOK 9 · Universitas Pendidikan Indonesia" + daftar anggota:
  - 2308224 - Datuk Daneswara Raditya Samsura
  - 2311399 - Faisal Nur Qolbi
  - 2305771 - Muhammad Daffa Maarif
  - 2304137 - Muhammad Bintang Eighista Dwiputra
  - 2308817 - Hafidz Tantowi
- Kartu judul akhir + tim muncul bersama kalimat narasi terakhir dan bertahan sampai fade di 3:00.

## Notes

- Hindari semua layanan yang butuh login atau API key (tidak ada HeyGen, tidak ada katalog musik). Audio = narasi saja.
- Jangan tampilkan tulisan "Sumber" untuk angka 63 GW.
- Gaya: latar #0A0E14 + grid tipis abu kebiruan; biru laut = air, putih = struktur/teks, kuning/oranye = energi, cyan muda = udara, biru jernih = air tawar, abu kehijauan = brine. Font Inter. Line-draw blueprint, panah putus-putus bergerak.
- Akurasi: bilah turbin Wells simetris (bukan kipas miring), turbin berputar searah di Scene 3 dan 4; panah udara berbalik (naik = keluar, turun = masuk). RO: intake → filter → pompa tekanan tinggi → membran → tangki air tawar, plus brine sebagai keluaran kedua.
- Teks opsional "daya X kW ≈ Y m³/hari" tidak dipakai.
