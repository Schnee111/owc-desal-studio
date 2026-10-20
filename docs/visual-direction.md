# Arah visual: pesisir dalam cahaya siang

Revisi 20 Oktober 2026 setelah koreksi pengguna. **Menggantikan proposal dark blueprint sepenuhnya.** Grid, panel HUD dan latar gelap tidak menjadi bahasa visual revisi. Ini dokumen arah, belum perubahan komposisi atau frame final.

Design read: film penjelasan rekayasa untuk juri dan masyarakat umum, dengan ilustrasi lingkungan pesisir yang terang dan diagram editorial. **ENERGY 2, RHYTHM 3, MOTION 2.** Untuk video, dials berarti kekuatan fokus, variasi shot dan gerak mekanisme; tidak diterjemahkan menjadi fitur antarmuka aplikasi.

Filter: [antislop core](https://github.com/miqdadbadjuber/anti-slop/blob/439a2ef5b9dd0ebe74e8113ff43f5928d0fe2a6a/skills/antislop/SKILL.md) dan [antislop-ui](https://github.com/miqdadbadjuber/anti-slop/blob/439a2ef5b9dd0ebe74e8113ff43f5928d0fe2a6a/skills/antislop-ui/SKILL.md), mode DURING dipilih pengguna. Referensi memberi arah; skill menyaring keputusan. Lihat [hasil filter](antislop-review.md) dan [referensi bergambar](design-references.md).

## Konsep

Penonton melihat pantai, orang yang memakai fasilitas, air yang dipindahkan, dan mesin yang menjadi bagian lingkungan itu. Mesin memiliki volume dan material. Tanah dibuka sebagai potongan saat penjelasan memerlukannya. Hubungan sebab-akibat menjadi pusat gerak.

Natural berarti bentuk mengikuti benda dan tempat: garis pantai tidak simetris, pasir bertemu beton, tanaman berada di bagian darat, permukaan air berbeda dari tanah, dan bayangan mengikuti satu arah cahaya. Mengganti biru gelap dengan krem sambil mempertahankan semua kotak lama tidak memenuhi arah ini.

## Landasan referensi

| Referensi | Yang diterjemahkan | Batas pengambilan |
| --- | --- | --- |
| [Tom Haugomat, Air France magazine](https://www.behance.net/gallery/31744057/Air-France-magazine) | Ruang langit/pantai, siluet lanskap, kedalaman melalui bidang yang saling menutup, manusia memberi skala | Tidak menyalin adegan, karakter atau warna persis |
| [Pentagram, Water Matters](https://www.pentagram.com/work/water-matters) | Diagram air di bidang terang, anotasi langsung, informasi mengikuti alur | Tidak memindahkan halaman buku padat teks ke video |
| [Studio Birthplace, Coral Catch](https://www.studiobirthplace.com/work/coral-catch) | Kegiatan manusia dan ruang pesisir Indonesia sebagai pusat cerita | Bukan acuan eksposur gelap/senja; footage dan tokohnya tidak menjadi aset film ini |

Referensi memiliki tugas berbeda: ruang dan bentuk, penjelasan teknis, serta konteks manusia. Karya sumber dipakai untuk tinjauan, bukan dipasang pada komposisi final.

## Bahasa gambar

- **Lingkungan:** satu pesisir ilustratif dengan batu, pasir, jalur pengunjung, bangunan layanan, dan vegetasi yang masuk akal. Warna berubah karena material dan pencahayaan.
- **Mesin:** beton berwarna batu, logam abu netral, pipa yang dapat diikuti dan potongan tanah yang memiliki kedalaman. Kontur tipis hanya pada pertemuan bagian penting; tidak ada outline putih menyala pada semua benda.
- **Air:** massa laut berwarna, beberapa garis buih, dan kolom air yang jelas. Partikel bercahaya tidak menggantikan penggambaran aliran.
- **Manusia:** petugas memeriksa panel, pengunjung memakai keran sanitasi, penjaga kios merawat fasilitas. Posisi dan gerak menjelaskan penggunaan. Karakter merupakan ilustrasi skenario, bukan dokumentasi orang nyata.
- **Informasi:** teks berada di ruang langit, bidang pasir atau area penjelasan yang disediakan. Garis penunjuk pendek digunakan bila perlu; tidak ada kapsul pada setiap label.
- **Tekstur:** variasi bidang atau arsiran menjelaskan material/potongan. Grain menyeluruh, kertas kusut dan goresan dekoratif tidak ditambahkan sebagai jalan pintas untuk terlihat alami.

## Palet berbasis material

Usulan token untuk style frame, bukan hasil uji render.

| Peran | Warna | Alasan |
| --- | --- | --- |
| Bidang informasi/pasir terang | `#F2EBDD` | Area baca yang berhubungan dengan daratan |
| Teks/garis struktur | `#253B37` | Tinta gelap yang terbaca tanpa menggelapkan seluruh frame |
| Laut/air baku | `#2C6B73` | Laut menjadi massa visual utama |
| Vegetasi | `#61734A` | Menempatkan fasilitas pada lingkungan darat |
| Energi/pompa aktif | `#B55E3F` | Aksen terakota pada fungsi terpilih |
| Beton/batuan | `#CEC9BC` | Memisahkan struktur dari laut dan vegetasi |

Core berwarna: laut dan vegetasi. Aksen: terakota. Sisanya netral material. Aksen tidak disebar sekaligus pada judul, border, ikon dan latar.

Produk air dan brine dibedakan lewat posisi cabang, label, arah dan pola, tanpa menambah warna neon. Jangan menaruh teks kecil berwarna laut/terakota pada bidang berwarna lain. Pasangan teks akhir wajib diperiksa setelah dirender.

## Tipografi

Usulan **Literata** untuk judul pendek, **Source Sans 3** untuk penjelasan, angka dan label. Literata mendukung nada publikasi sains; Source Sans 3 untuk keterbacaan teknis. Tidak memakai monospace sebagai penanda kecanggihan.

- Judul sentence case sekitar 64–80 px.
- Label teknis 30–34 px, maksimal dua baris.
- Angka/rumus fokus 56–80 px dengan satuan; tidak dibesarkan untuk mengisi ruang.
- Sitasi singkat 24–28 px, daftar panjang di lampiran.
- Dua keluarga, sedikit bobot, file lokal dan pemeriksaan glyph/satuan.

Ini usulan yang diuji melalui style frame sebelum diterapkan ke seluruh film.

## Komposisi dan gerak

Satu fokus dominan per beat. Variasi shot: panorama pesisir; medium shot pengguna/keran; potongan mesin; detail turbin; diagram energi; kembali ke kawasan. Kontinuitas tempat dipertahankan, tetapi delapan scene tidak memakai satu layout yang sama.

- Ombak dan rotor bergerak karena menjelaskan mekanisme. Tanaman tidak harus terus mengayun selama perhitungan.
- Kamera berpindah saat objek penjelasan berganti; tetap pada perbandingan dua fase agar perubahan terbaca.
- Alur energi muncul pada kabel terkait tanpa glow atau jejak partikel.
- Teks mengikuti narasi dengan jeda baca. Tidak ada kewajiban semua elemen fade-up, bounce atau stagger.
- Bayangan menjelaskan cahaya dan pijakan; tidak membuat setiap label mengambang.
- Cahaya siang menjadi dasar. Ombak melemah tidak otomatis membuat seluruh gambar gelap/dramatis.

Pada 1920×1080, judul/angka berada dalam x=192–1728 dan y=108–972. Teks tidak menimpa tekstur air yang menurunkan kontras.

## Penerapan pada scene

| Scene | Arah revisi |
| --- | --- |
| Masalah akses air | Kawasan siang, keran dan pengguna; fakta singkat pada ruang kosong |
| Sasaran layanan | Bentang pesisir yang sama; fasilitas menjelaskan batas layanan |
| Mekanisme | Potongan beton/tanah dengan bidang isi, air berwarna dan kamera tetap |
| Perhitungan | Ukuran menempel pada chamber; rumus di bidang terang tanpa grid |
| RO | Alat berurutan di ruang servis; potongan membran hanya saat diperlukan |
| Pembagian manfaat | Air menuju fasilitas yang terlihat; satu diagram alokasi tanpa kartu statistik |
| Cadangan | Ombak mengecil, petugas menjadwalkan RO, muka tangki berubah; baterai berupa perangkat |
| Penutup | Kawasan siang yang sama, dilanjutkan kredit dan logo UPI di bidang terang |

## Elemen yang disaring

Tidak dipakai: dark tech, grid termasuk grid lokal, koordinat dekoratif, blueprint wallpaper, glow, panel HUD, kapsul label, badge AI, kartu statistik berulang, count-up dekoratif, daun acak, grain menyeluruh.

Panah aliran, ukuran chamber, garis penunjuk dan plot daya tetap memiliki fungsi pendidikan. Tujuannya dicatat; bentuknya tidak mengambil alih cerita.

## Langkah visual berikutnya

Siapkan tiga style frame: kawasan wisata siang, potongan OWC tanpa grid, dan alokasi energi di bidang terang. Ketiganya belum dibuat. Referensi yang tersedia merupakan karya sumber, bukan mockup implementasi. Komposisi aktif masih versi lama.
