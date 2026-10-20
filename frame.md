# Spesifikasi style: penyempurnaan animasi asli

Versi aktif 20 Oktober 2026. Arahan pengguna: perbaiki style, pertahankan animasi sebelumnya. [Galeri](boards/storyboard.html). Tidak mengikuti rombakan panorama delapan scene yang ditolak.

## Design read

Diagram penampang pesisir yang terang dan berkarakter material. Geometri mesin, ukuran objek dan fokus kamera berasal dari animasi asli. Identitas natural datang dari warna laut, pasir, beton dan material bangunan, bukan lanskap atau karakter tambahan yang menggantikan mekanisme.

ENERGY 2 / RHYTHM 3 / MOTION 2. Energi visual berasal dari pergerakan mesin dan aliran. Ritme mengikuti konstruksi, close-up, perbandingan arah udara, proses membran dan panorama. Tidak menambahkan gerak ambience atau pola dekoratif.

| Peran | Warna | Alasan |
| --- | --- | --- |
| Latar | #F4EFE4 | Bidang terang yang menjaga perhatian pada diagram |
| Teks/struktur | #293F3D | Terbaca di atas latar terang tanpa outline putih |
| Laut | #367B86 | Massa air, lebih kuat dari latar dan tanah |
| Udara | #3F6D79 | Panah/partikel pembawa penjelasan mekanisme |
| Listrik | #A64F32 | Satu aksen untuk jalur daya dan arah putar |
| Air produk | #286B75 | Aliran produk, berlabel langsung |
| Brine | #676953 | Aliran kedua dengan fungsi terpisah |
| Tanah | #DED4BD | Penampang pasir/tanah dan pipa bawah permukaan |
| Beton/mesin | #C8C7B9, #E5E2D5 | Material berisi, tidak bergantung pada glow |

Judul Literata 500, bentuk editorial dan tenang; isi/label Source Sans 3 400/600. Font ditanam lokal agar hasil preview stabil. Label 25px pada koordinat asli, membesar bersama close-up; subtitle 34px; isi/data penting 26–84px. Judul utama 150px. Teks kecil dipakai untuk batas asumsi, bukan pesan pokok.

Tanpa grid, glow, halo, bayangan kartu atau kapsul. Garis pemandu menunjukkan objek yang dilabeli. Panah menunjukkan aliran atau gaya, bukan ornamen. Area inset bilah tetap dibedakan untuk membandingkan dua arah aliran, sesuai fungsi animasi awal. Outline mesin tetap dipakai sebagai batas potongan teknis, sekarang gelap dengan bidang material.

Peta tetap memakai data Natural Earth asli. Penanda pesisir adalah ilustrasi geografis, bukan koordinat pemasangan terverifikasi. Ilustrasi dan kamera tidak disalin dari referensi baru; referensi hanya membantu menyaring warna, material dan cara memberi anotasi.

Source style: `src/style-tokens.mjs` dan `src/refine.css`. Geometry/simulation: `src/engine.js`. Choreography: enam template `src/s1.html` sampai `src/s6.html`, ditambah `src/s7.html` untuk layanan dan `src/s8.html` untuk cadangan. Data: `src/scenario.mjs`. Dua scene baru memakai mesin, posisi kamera dan geometri kawasan yang sama. Diagram alokasi menempati area tanah di bawah bangunan; mesin tetap bergerak di atasnya. Tidak memakai slide penuh yang memutus proses. [Peta animasi](docs/motion-map.md), [filter DURING](docs/antislop-review.md).
