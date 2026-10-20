# Filter antislop pada rencana visual

20 Oktober 2026. Mode **DURING**, dipilih pengguna. Bagian awal mencatat filter perencanaan; pemeriksaan implementasi aktif ada di bagian akhir.

Skill yang dibaca: [core](https://github.com/miqdadbadjuber/anti-slop/blob/439a2ef5b9dd0ebe74e8113ff43f5928d0fe2a6a/skills/antislop/SKILL.md) dan [UI](https://github.com/miqdadbadjuber/anti-slop/blob/439a2ef5b9dd0ebe74e8113ff43f5928d0fe2a6a/skills/antislop-ui/SKILL.md), revisi `439a2ef5b9dd0ebe74e8113ff43f5928d0fe2a6a`. Digunakan untuk permintaan ini tanpa memasang plugin atau mengubah `AGENTS.md`.

## Temuan dan keputusan

| Unsur lama/proposal sebelumnya | Aturan | Keputusan rencana baru |
| --- | --- | --- |
| Dark sebagai penanda teknis | R-21, R-31 | Ganti lingkungan siang; alasan datang dari tempat dan layanan |
| Grid lokal masih ditawarkan | R-07 | Hapus seluruh grid; ukuran hanya menempel pada komponen yang diukur |
| Outline putih/glow pada mesin | R-01, R-13 | Bidang material dan volume; aliran lewat jalur/arah |
| Label kapsul dan bingkai berulang | R-09, R-11 | Label langsung; panel hanya untuk perbesaran fungsional |
| Tipografi sebagai kostum teknis | R-06 | Pilih judul editorial dan label yang terbaca dengan alasan tertulis |
| Layout header/diagram/pill seragam | R-05, C-3 | Panorama, medium shot, potongan dan diagram mengikuti isi |
| Count-up angka nasional | R-17, C-5 | Hapus; salah kategori dan menutupi kebutuhan pengguna |
| Statistik menjadi dekorasi | R-14, R-31 | Satu diagram pembagian energi, berunit dan berlabel asumsi |
| Partikel/gerak ambience tanpa fungsi | R-19 | Gerak menjelaskan mekanisme, keadaan atau fokus |
| Natural hanya krem kosong/daun/grain | R-20, R-22 | Bangun identitas dari bentang pesisir, material dan kegiatan |
| Referensi dijiplak sebagai template | R-30 | Catat fungsi berbeda tiap sumber; rancang fasilitas sendiri |

Dark dan grid ditolak secara eksplisit pengguna pada project ini. Ini bukan klaim bahwa semua desain gelap atau semua grid selalu buruk.

## Adaptasi ke medium video

Navbar, tombol, keyboard dan toggle tema tidak ditambahkan sebagai fitur film. Keterbacaan HP diperiksa melalui ukuran pemutaran; layout video tidak berubah per perangkat.

Ombak dan rotor boleh bergerak terus saat menjelaskan mekanisme. Ini gerak berfungsi pendidikan, bukan loop ambience. Semua animasi tetap mengikuti kontrak deterministik HyperFrames.

Angka contoh berasal dari asumsi yang ditandai dan bisa dihitung ulang. Perlakuan visual tidak boleh menaikkan target menjadi klaim performa lapangan.

## Alasan keputusan utama

- Lingkungan siang menempatkan layanan pada kehidupan pesisir.
- Warna laut menjelaskan medium utama penggerak alat.
- Terakota menandai fungsi listrik terpilih, tanpa menyebar sebagai dekorasi.
- Bentuk organik mengikuti tanah dan air; perangkat mengikuti konstruksi.
- Tipografi mendukung pembacaan penjelasan publik dan unit teknis.
- Variasi shot mengikuti pergantian objek penjelasan.
- Tekstur terbatas membantu membaca material, tanpa grain kosmetik.

## Delivery Gate dokumen rencana

Gate hanya menilai dokumen dan seleksi referensi. Tidak menyatakan frame baru telah lolos render, kontras atau motion check.

- **Hard Gate: PASS pada scope dokumen.** Angka berstatus skenario, referensi berkredit, tanpa testimonial/identitas rekaan atau klaim performa baru. Tautan file lokal dan gambar diperiksa. Pengujian kontrol aplikasi tidak berlaku pada Markdown.
- **Purpose Gate: PASS pada scope rencana.** Dark/grid, HUD dan glow dihapus dari usulan; alasan warna, tipografi, anotasi dan gerak tertulis. Panah mempertahankan fungsi aliran.
- **Liveliness: PASS pada scope rencana.** ENERGY 2 / RHYTHM 3 / MOTION 2 dinyatakan; motif tempat, fokus per beat, variasi shot dan aksen fungsi dijabarkan. Belum ada klaim hasil render mencapai arah itu.
- **Craftsmanship: PASS pada scope dokumentasi.** Referensi dilihat langsung, fungsi tiga sumber dibedakan, batas penerapan dicatat, proposal gelap diganti. Gate implementasi diulang pada style frame dan film yang benar-benar dirender.

## Gate historis: revisi konservatif enam scene

Pengguna menolak eksperimen panorama delapan scene karena animasi aslinya lebih baik. Implementasi aktif kembali memakai enam scene, geometri mesin, simulasi, kamera dan urutan animasi asli. Eksperimen tersimpan dalam `experiments/coastal-redesign-v2.zip`.

Design read: diagram penampang pesisir terang, dengan identitas material laut, pasir dan beton. ENERGY 2 / RHYTHM 3 / MOTION 2. Gerak mesin dan aliran menjadi penggerak ritme, bukan animasi presentasi. Alasan pilihan palette, font, anotasi dan inset tertulis di [frame.md](../frame.md).

- **Hard Gate: PASS untuk preview.** Sepuluh gambar asli komposisi tampil lengkap pada galeri 390×844 tanpa overflow; 13 tautan/anchor diperiksa. Semua 44 pemeriksaan kontras lulus. Angka energi dan air ditandai skenario bersyarat, bukan hasil uji. Identitas anggota dan logo berasal dari project asli. Kontrol film berupa link preview, bukan tombol rekaan. Teks antarmuka tidak menambahkan em dash. Fitur web lain tidak berlaku pada medium video.
- **Purpose Gate: PASS.** Grid, halo, glow generator/rotor, trail dekoratif, border label dan bingkai header dihapus. Material memakai bidang isi dan outline gelap; panah serta partikel hanya menerangkan aliran/gaya. Dua area inset dipertahankan untuk membandingkan arah udara, sesuai fungsi animasi awal. Lihat alasan dalam [spesifikasi style](../frame.md).
- **Liveliness: PASS.** Dials dinyatakan sebelum refinement dalam spesifikasi. Peta → konstruksi → push-in → fase udara/inset → zoom RO → pull-back/kredit mengikuti ritme asli. Enam array simulasi pada scene 2–6 dibandingkan dengan versi Git awal: 111.660 nilai identik. Aksen terakota dipakai untuk listrik/arah putar. Enam aturan kemunculan/urutan/in-frame lulus pada 300 sampel motion check.
- **Craftsmanship: PASS untuk preview.** Build selesai; runtime dan layout tanpa error; seluruh scene, pembuka 14s/22s dan close-up diperiksa sebagai snapshot aktual. Galeri diperiksa pada viewport HP dan tautannya diverifikasi HTTP 200. Narasi Scene 2/3 tetap asli, empat klip koreksi memakai suara yang sama dan tidak melampaui slot. Belum ada klaim kualitas MP4 karena encoding memang menunggu persetujuan.

Verifikasi CLI 0.8.177: `npm run check`, report `.hyperframes/artifacts/checks/08be7344-1b8b-4f90-b6eb-50dafec18fae.json`. Hasil: 0 error; 5 warning ukuran berkas HTML karena engine bersama ditanam ke masing-masing subkomposisi. Warning ditinjau, bukan kegagalan visual. Enam info layout terjadi pada dissolve penutup dan tepi ikon ombak bawaan; bukan overlap yang menetap. Pin CLI diperbarui dari 0.8.133 ke 0.8.177 dan telah diverifikasi pada komposisi ini.

[Galeri](../boards/storyboard.html), [semua cuplikan](../boards/frames/contact-sheet.jpg), [peta gerak](motion-map.md). Tidak ada render MP4 baru.

## Delivery gate aktif: dua scene tambahan

Gate enam scene di atas merekam iterasi sebelumnya. Pengguna kemudian menegaskan bahwa materi hasil riset tetap perlu ditambahkan. Versi aktif adalah delapan scene berbasis mesin dan animasi lama, total 180 detik. [Cakupan yang diterapkan](revision-status.md).

- **Hard Gate: PASS.** Galeri 13 cuplikan aktual dimuat pada viewport HP 390×844 tanpa gambar gagal atau overflow; tautan gambar/contact sheet diperiksa HTTP 200 dan navigasi Tab memiliki focus-visible. Angka berstatus skenario. Check global meluluskan 33/33 uji kontras, lalu pemeriksaan khusus scene baru meluluskan 44/44, termasuk adegan cadangan.
- **Purpose Gate: PASS.** Tidak mengembalikan grid, glow atau kapsul. Dua scene baru menggunakan geometri mesin, aliran dan wilayah gambar yang sama. Bar menyatakan bagian air/energi dengan satuan; baterai, meter dan penurunan ombak menjelaskan batas operasi. Pengondisi daya dan grafik relatif menerangkan perbedaan putaran searah dengan keluaran konstan. Alasan material/font tetap pada `frame.md`.
- **Liveliness: PASS.** ENERGY 2 / RHYTHM 3 / MOTION 2 tetap berlaku. Peta, konstruksi, push-in, bilah, zoom RO dan pull-back lama dipertahankan; recap/jeda dipadatkan. Scene layanan berganti dari alokasi air ke energi; scene cadangan mengubah keadaan mesin, bukan ganti slide. Muka air dan kecepatan rotor identik pada kedua sisi keenam sambungan keadaan, rotor tidak membalik arah. Sebelas aturan motion lulus pada 300 sampel.
- **Craftsmanship: PASS untuk preview.** Build delapan scene selesai; check runtime/layout/motion tanpa error. Semua scene dan lima beat tambahan diambil dari root aktif dan diperiksa. Snapshot 155s memperlihatkan molekul/produksi RO berhenti sementara keran tetap mengalir. Neraca air dan energi dihitung ulang seimbang; delapan audio berada dalam slot masing-masing. Belum ada render video atau klaim kualitas MP4.

Check global: `.hyperframes/artifacts/checks/a942a889-574b-4c17-97a2-0e9a40e78438.json`. Check khusus 115–165s: `.hyperframes/artifacts/checks/a755842c-c687-41ec-ac4e-4a990403fba9.json`. Tujuh warning lint hanya ukuran berkas hasil bundling shared engine; ditinjau dan tidak menyebabkan kegagalan visual/runtime. Tidak ada warning runtime, layout, motion atau kontras.
