# Peta animasi aktif: basis lama + dua scene baru

> Catatan: dokumen ini merekam peta animasi versi 180 detik. Versi aktif v4 berdurasi 201,7 detik; urutan dan slot scene ada di README.

Total 180 detik. Enam scene asli tetap menjadi basis; pengulangan dan jeda dipadatkan untuk memberi waktu pada dua tambahan yang diminta pengguna. Geometri chamber, turbin, RO, pipa, inset bilah dan kamera utama dipertahankan. Bukan versi panorama baru yang ditolak.

| Waktu | Isi/gerak | Perubahan materi |
| --- | --- | --- |
| 0–20 | Peta barat ke timur, judul line-draw, kamera menyelam ke titik pantai | Hapus 63 GW; sasaran satu fasilitas; lokasi belum dipilih |
| 20–45 | Konstruksi chamber, turbin, generator, bangunan dan RO bertahap | Pengondisi daya dan simbol pascapengolahan; label/material terang |
| 45–63 | Push-in lama; air naik, udara keluar, rotor searah | Recap berulang dipotong, mekanisme naik dipertahankan |
| 63–85 | Air turun, dua penampang bilah dan gaya; siklus kembali berjalan | Inset mengikuti VO yang dipadatkan; grafik daya relatif, bukan rekaman pengukuran |
| 85–115 | Pull-out, cabang beban, pompa, zoom membran dan kembali ke sistem | Neraca air recovery asumsi 40% tampil pada 111s; produk/brine dan mutu tetap terlihat |
| 115–141 | **Tambahan: alokasi layanan.** Mesin tetap bekerja, alokasi air tumbuh proporsional, berganti ke anggaran energi pada 127,1s | 200 pengunjung, 5 kios, 8 lampu; 5 m³ air; 48 bruto → 43,2 neto; 25 RO + 3,6 fasilitas + 14,6 margin |
| 141–165 | **Tambahan: ombak lemah.** Amplitudo dan rotor melambat, pompa berhenti halus pada 149s, aliran produksi/molekul berhenti; keran tetap mengalir | Tangki 10 m³ terpakai; baterai 8 kWh nominal hanya beban prioritas; kios dilepas; batas gravitasi dan pemantauan |
| 165–180 | Pull-back asli ke satu pilot dan panorama, lalu identitas | Ajakan mengukur/menguji; kredit lengkap sekitar 170,7s sampai fade akhir |

Semua transisi tetap berbasis posisi objek yang sama. Lapisan anotasi RO/layanan/cadangan keluar sebelum cut, sehingga mekanisme berlanjut tanpa ganti slide. Fase ombak, ripple, partikel, rotasi dan aliran kabel memakai waktu yang berlanjut. Keadaan simulasi diteruskan sesuai urutan 2 → 3 → 4 → 5 → 7 → 8 → 6; muka air dan kecepatan rotor sama pada kedua sisi setiap batas scene.

Perbandingan 111.660 nilai yang pernah dicatat berlaku untuk revisi enam scene sebelumnya. Versi aktif ini sengaja mengganti durasi dan menambah keadaan ombak lemah, sehingga tidak mengklaim seluruh lookup table identik dengan film 180s awal. Mekanisme flywheel dan bentuk gelombang lama dipertahankan, sedangkan kesinambungan keadaan diuji langsung pada enam sambungan.

Narasi Scene 2/3 memakai audio asli; enam lainnya memakai Ardi dengan teks yang disesuaikan. Tidak ada klip melewati slotnya. Data: `src/scenario.mjs`; VO: `assets/vo/refined/manifest.json`; kemunculan/urutan/in-frame: `index.motion.json`. Semua animasi deterministik dan mengikuti timeline GSAP, tanpa jam sistem atau random baru.

Preview berupa 13 cuplikan: delapan scene dan lima beat tambahan. Belum ada encoding MP4 baru.
