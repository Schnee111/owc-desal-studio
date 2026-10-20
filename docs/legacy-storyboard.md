---
format: 1920x1080
duration: 180s
message: "OWC-DESAL mengubah ombak di depan kampung pesisir menjadi listrik sekaligus air tawar"
arc: Potensi → Struktur → Fase naik → Fase turun → Dual output → Kesimpulan
audience: juri kompetisi dan masyarakat umum
mode: autonomous
---

## Frame 1 — Judul dan potensi

- scene: Grid blueprint, peta Indonesia digambar line-draw, titik kuning pesisir Samudra Hindia, 63 GW menghitung naik, judul line-draw
- duration: 25s
- transition_in: cut
- status: animated
- src: compositions/frames/01-judul.html
- rules: svg-path-draw, counting-dynamic-scale, sine-wave-loop, viewport-change
- voiceover: "Indonesia punya garis pantai yang sangat panjang dan ombak yang datang tanpa henti. Potensi energi gelombang lautnya diperkirakan mencapai 63 gigawatt. Di saat yang sama, banyak desa pesisir dan pulau kecil masih kesulitan mendapat listrik dan air bersih. Bagaimana jika satu alat bisa menjawab keduanya?"

Peta dari data Natural Earth 1:50m. Akhir scene: kamera zoom ke titik pesisir selatan Jawa (match ke Scene 2).

## Frame 2 — Struktur sistem

- scene: Titik pantai mekar jadi garis muka air, lalu potongan melintang OWC + gedung RO digambar kiri ke kanan, label dengan garis penunjuk
- duration: 30s
- transition_in: cut
- status: animated
- src: compositions/frames/02-struktur.html
- rules: svg-path-draw, svg-icon-enrichment
- voiceover: "Inilah OWC-DESAL. Di sisi laut berdiri chamber Oscillating Water Column. Bagian bawahnya terbuka ke laut sehingga terisi kolom air, dan di atasnya terperangkap kolom udara. Udara ini dihubungkan ke turbin Wells dan generator. Di sebelahnya, gedung desalinasi reverse osmosis siap mengubah air laut menjadi air tawar."

## Frame 3 — Fase ombak naik

- scene: Kamera mendekat ke OWC; puncak ombak masuk, kolom air naik, partikel udara merapat lalu keluar lewat turbin, turbin berputar searah jarum jam, listrik oranye mengalir
- duration: 30s
- transition_in: cut
- status: animated
- src: compositions/frames/03-fase-naik.html
- rules: viewport-change, svg-icon-enrichment, sine-wave-loop
- voiceover: "Saat ombak datang, air masuk ke dalam chamber dan permukaan kolom air naik. Seperti piston, air ini menekan udara di atasnya. Udara bertekanan tinggi menyembur keluar melewati turbin Wells, memutar generator, dan listrik pun dihasilkan."

## Frame 4 — Fase ombak turun

- scene: Kolom air turun, udara tersedot masuk (panah cyan ke bawah), turbin tetap searah; inset penampang bilah simetris dengan gaya dorong selalu searah putaran
- duration: 30s
- transition_in: cut
- status: animated
- src: compositions/frames/04-fase-turun.html
- rules: viewport-change, svg-icon-enrichment, svg-path-draw
- voiceover: "Saat ombak surut, air keluar dari chamber dan kolom air turun. Kini udara justru tersedot masuk, berlawanan arah. Tapi turbin Wells tetap berputar ke arah yang sama. Rahasianya ada pada bilah simetris yang dipasang tegak lurus aliran, sehingga dari arah mana pun udara datang, gaya dorongnya selalu memutar turbin searah. Listrik terus mengalir di setiap ayunan ombak."

## Frame 5 — Dual output

- scene: Listrik bercabang ke microgrid desa dan pompa tekanan tinggi RO; air laut → filter → pompa → membran; air tawar ke tangki dan keran umum, brine dibuang terkendali
- duration: 35s
- transition_in: cut
- status: animated
- src: compositions/frames/05-dual-output.html
- rules: viewport-change, svg-icon-enrichment, svg-path-draw
- voiceover: "Listrik dari ombak dibagi ke dua tujuan. Sebagian mengalir ke microgrid untuk menerangi rumah dan menggerakkan usaha warga. Sebagian lagi menghidupkan pompa tekanan tinggi di unit Reverse Osmosis. Air laut didorong melewati membran halus. Molekul air lolos, garam tertahan. Hasilnya air tawar untuk desa pesisir, dari energi yang sepenuhnya terbarukan."

## Frame 6 — Kesimpulan

- scene: Sistem bekerja utuh, kamera mundur ke garis pantai dengan beberapa unit dan lampu desa, tiga ikon ringkasan, judul akhir + KELOMPOK 9 + logo UPI, fade ke hitam
- duration: 30s
- transition_in: cut
- status: animated
- src: compositions/frames/06-kesimpulan.html
- rules: viewport-change, svg-path-draw, spring-pop-entrance
- voiceover: "Bagi masyarakat pesisir, ombak adalah tetangga yang datang setiap hari. Dengan OWC-DESAL, ombak di depan kampung mereka sendiri diubah menjadi listrik untuk rumah nelayan, sekolah, dan usaha warga, sekaligus air tawar untuk kebutuhan sehari-hari. Tanpa bahan bakar, tanpa emisi, dan tanpa menunggu kiriman dari kota. OWC-DESAL, energi dan air bersih dari laut, untuk masyarakat pesisir Indonesia."

## Usulan revisi — 20 Oktober 2026

Status: riset dan perencanaan, belum diterapkan pada enam frame di atas. Bagian lama merekam versi animasi aktif, termasuk klaim yang perlu dikoreksi.

Proposal [docs/improvement-plan.md](docs/improvement-plan.md) mempertahankan 180 detik dan mengusulkan delapan scene: masalah akses air → sasaran satu fasilitas wisata → dua fase OWC → hitungan energi → proses/neraca air RO → alokasi layanan → cadangan saat ombak lemah → pilot dan kredit.

Lihat [riset](docs/research.md), [skenario asumsi](docs/scenario.md), dan [arah visual](docs/visual-direction.md). Belum ada spesifikasi performa lapangan yang tervalidasi; angka 12,4 kW/85 m³/hari di spreadsheet berbeda dari LKM tertaut yang memakai sekitar 2 kW/13,7 m³/hari.

Koreksi visual berikutnya pada 20 Oktober 2026: pengguna menolak dark dan grid, termasuk usulan grid lokal. Rencana revisi sekarang memakai lingkungan pesisir dalam cahaya siang, bidang material dan diagram editorial. Referensi ada di [docs/design-references.md](docs/design-references.md), filter antislop DURING di [docs/antislop-review.md](docs/antislop-review.md). Deskripsi enam frame di atas tetap catatan versi aktif, bukan arah untuk implementasi baru.
