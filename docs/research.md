# Riset dan audit klaim

Diakses 20 Oktober 2026. Fokus: menguatkan alasan penggunaan, memperbaiki skala matematis, lalu menentukan isi revisi animasi. Penelusuran teknis memakai penelitian, laporan laboratorium, dan lembaga asal. Berita dipakai untuk konteks masalah setempat.

## 1. Kesimpulan untuk keputusan desain

- Masalah air pesisir punya dukungan bukti, tetapi kualitas air, ketersediaan sumber, dan keterjangkauan jaringan adalah masalah berbeda.
- Angka keluaran di spreadsheet belum konsisten dengan LKM tertaut. Sumber perhitungan 12,4 kW belum ditemukan.
- Produksi air dan listrik eksternal harus memakai satu anggaran energi. Tidak bisa masing-masing memakai seluruh keluaran generator.
- Arah paling relevan dengan review: fasilitas air bersih, sanitasi, dan penerangan di satu kawasan wisata pesisir. Hindari menyuplai desa, hotel, tambak, dan cold storage sekaligus.
- Pilihan lokasi belum terbukti layak. Contoh Nusa Penida membantu menjelaskan kebutuhan; tidak membuktikan OWC adalah solusi termurah atau lokasi pemasangannya sudah tepat.

## 2. Audit dokumen project dan sumber kelompok

| Bahan | Temuan | Implikasi |
| --- | --- | --- |
| [Spreadsheet, Kelompok 9 baris 4](https://docs.google.com/spreadsheets/d/1e_GdT_N_LArmkNqb-1D2933VxhMWX2yDiNMkLXJrMcA/edit#range=A4:G4) | Usulan keluaran 12,4 kW dan 85 m³/hari; review meminta pemanfaatan spesifik dan terhitung | Asal angka perlu direkonsiliasi |
| [LKM tertaut dari B4](https://drive.google.com/file/d/1uwzCrDdOjQruKcfByxmDqV_ePn3L9-GH/view) | PDF enam halaman. Halaman fisik 3 memakai ombak 1 m, periode 6 s, chamber 4 m, penangkapan sekitar separuh, keluaran sekitar 2 kW dan 13,7 m³/hari; miniatur 1:20 | Versi ini berbeda dari spreadsheet; belum ada hasil uji pembangkit |
| LKM, halaman fisik 5–6 | Mencatat kebutuhan label angka, penanganan turbin, dan pengatur putaran | Revisi perlu menjelaskan kendali dan operasi, bukan hanya mengganti angka |
| `src/`, `STORYBOARD.md`, enam snapshot | Tidak ditemukan angka 12,4 kW/85 m³ pada source animasi. Scene 5 memuat cold storage; narasi masih menyasar desa secara luas | Perlu merumuskan sasaran dan menambahkan perhitungan |

PDF LKM berhasil diunduh dan diekstrak. Snapshot aktual diperiksa pada t=14, 43, 70, 102, 135, 157 detik; ini inspeksi visual terpilih, bukan audit seluruh frame. Bahan kerja sementara ada di `/tmp/owc-lkm3.pdf` dan `/tmp/owc-current-frames/` dan bisa hilang setelah sesi.

## 3. Register sumber dan apa yang benar-benar didukung

### R1 — Potensi energi laut, Badan Geologi ESDM, 13 Agustus 2025

[Potensi Energi Laut Indonesia](https://geologi.esdm.go.id/media-center/potensi-energi-laut-indonesia).

**Terverifikasi pada artikel resmi:** sekitar 63 GW adalah potensi praktis gabungan arus, gelombang, dan panas laut. Bukan seluruhnya energi gelombang dan bukan kapasitas pembangkit yang sudah tersedia. Artikel juga menyebut tantangan teknologi/pengembangan.

**Keputusan:** hapus headline lama yang menyebut 63 GW sebagai potensi gelombang. Angka nasional tidak perlu menjadi pembuka; bila dipakai di materi pendukung, sebut kategorinya dengan benar.

### R2 — Intrusi Kuta Utara, Manuaba & Sugianto, 2025

[Tingkat Intrusi Air Laut di Wilayah Pesisir Kecamatan Kuta Utara, Badung](https://ejournal.baliprov.go.id/index.php/jbmb/article/view/466), DOI `10.51172/jbmb.v6i2.466`.

**Terverifikasi pada abstrak penerbit:** penelitian terbit 29 Agustus 2025 dan memetakan kondisi 2024, menggunakan geofisika di 15 lintasan dan pengujian 32 sumur. Kerobokan Kelod dilaporkan memiliki TDS 10.000–20.000 mg/L. Penyebaran 35–56 m/tahun adalah prediksi menuju 2029.

**Batas:** jangan menyebut semua air di Bali setara air laut. Nilai TDS tersebut tidak boleh otomatis disamakan dengan salinitas laut terbuka atau dijadikan kualitas intake Nusa Penida. Artikel merekomendasikan pembatasan ekstraksi, penguatan PDAM, dan konservasi; tidak membuktikan desalinasi wajib menjadi pilihan pertama.

### R3 — Akses air di destinasi, detikBali, 12 Mei 2026

[Kelingking dan Broken Beach belum teraliri air bersih](https://www.detik.com/bali/berita/d-8486410/miris-kelingking-dan-broken-beach-di-nusa-penida-belum-teraliri-air-bersih).

**Terverifikasi pada artikel:** jaringan desa sudah ada, tetapi pelayanan khusus ke dua area wisata masih menjadi persoalan. Ada rencana investasi jaringan sekitar Rp700 juta. Ini contoh kesenjangan distribusi, bukan bukti seluruh pulau tidak mempunyai air. Tanggal publikasi di header 12 Mei 2026; salah satu tanggal di kutipan isi tidak konsisten.

**Batas:** kondisi saat pemberitaan, belum terkonfirmasi tetap sama pada Oktober 2026. Biaya jaringan bukan estimasi biaya OWC-DESAL. Jangan menyatakan proyek lebih murah, menggantikan PDAM, atau sudah disepakati di lokasi itu.

### R4 — Daya dukung air Denpasar, Cahyani, Dibia & Trigunasih, 2018

[Halaman artikel Udayana](https://ojs.unud.ac.id/index.php/jat/article/view/38258).

**Status parsial:** indeks pencarian menampilkan abstrak asal yang menyebut penelitian November 2016–April 2017, 100 responden, dan indeks daya dukung 0,9. Halaman/PDF asal gagal diambil langsung berulang kali. Karena itu angka hotel 800 L/kamar/hari dan 200–250 L/kamar/hari dari spreadsheet **belum diverifikasi pada teks lengkap/tabel asal**.

**Keputusan:** tidak menggunakan angka hotel sebagai dasar target revisi. Data lama Denpasar tidak diproyeksikan sebagai kondisi kini di destinasi lain.

### R5 — Kincir tambak, Wafi & Ariadi, 2022

[Estimasi Daya Listrik untuk Produksi Oksigen oleh Kincir Air selama Periode Blind Feeding](https://ejournal.undip.ac.id/index.php/saintek/article/view/35669), DOI `10.14710/ijfst.18.1.19-35`.

**Terverifikasi pada abstrak:** studi lapang periode awal budidaya 30 hari, estimasi 0,97–1,07 kW untuk kincir berkapasitas 2 HP; disebut 15% biaya produksi untuk listrik kincir.

**Batas:** hasil estimasi pada konteks penelitian, bukan spesifikasi universal konsumsi motor 2 HP. `2 HP` tidak langsung identik dengan input listrik 1 kW. Klaim 100 kVA/ha dan 15–25% belum divalidasi pada sumber primer. kVA dan kW memerlukan faktor daya sebelum dibandingkan. Beban motor juga memerlukan pemeriksaan arus awal.

**Keputusan:** tambak menjadi alternatif kajian, bukan pengguna utama film ini. Jika 12 kincir masing-masing memakai 0,97–1,07 kW, jumlahnya 11,64–12,84 kW sebelum penerangan 3–5 kW dan sebelum RO.

### R6 — Prototipe RO kecil, Infield, 2002

[A small-scale seawater reverse-osmosis system with excellent energy efficiency over a wide operating range](https://strathprints.strath.ac.uk/38214/), DOI `10.1016/S0011-9164(02)01141-4`.

**Terverifikasi pada abstrak repositori penulis:** rancangan spesifik dengan pemulihan energi Clark pump melaporkan hingga 460 L/jam dengan listrik kurang dari 1.600 W, sekitar 3,5 kWh/m³; dilaporkan pengujian laboratorium dan pemodelan pada operasi bervariasi.

**Batas:** bukan jaminan semua RO kecil mencapai konsumsi tersebut. Jangan menganggap ERD sudah ada di OWC-DESAL hanya karena hasil studi efisien memakainya. Skenario revisi menggunakan 5 kWh/m³ sebagai asumsi perencanaan, lalu menguji rentang 3,5–6; angka akhir wajib diganti data skid yang dipilih.

### R7 — Integrasi gelombang dan RO, NREL/NLR

[HERO WEC deployment, 2023](https://www.nlr.gov/news/feature/2023/wave-powered-desalination-device-returns-to-the-outer-banks) dan [laporan HERO WEC V1, 2024](https://www.nlr.gov/docs/fy25osti/91741.pdf), NREL/TP-5700-91741.

**Terverifikasi:** platform riset menghasilkan bukti pengembangan/desain dan pengujian sistem gelombang–desalinasi. Penjelasan sistem listriknya memakai elektronika daya dan baterai untuk menghadapi masukan gelombang yang berubah.

**Batas:** HERO bukan OWC dengan turbin Wells, sehingga tidak memvalidasi efisiensi, ukuran chamber, atau keluaran project ini. Gunakan hanya sebagai preseden integrasi dan alasan menggambar pengondisi daya serta buffer.

### R8 — Turbin Wells dan kendali

[Raghunathan, Tan & Ombaka, penelitian eksperimen, 1985](https://www.cambridge.org/core/journals/aeronautical-journal/article/abs/performance-of-the-wells-selfrectifying-air-turbine/E931624E8AD9362A5A144C49616A7075), DOI `10.1017/S0001924000096743`: eksperimen aliran searah dan berosilasi; abstrak terbaca, teks lengkap terbatas.

[Lekube dkk., 2018, Flow Control in Wells Turbines for Harnessing Maximum Wave Power](https://pubmed.ncbi.nlm.nih.gov/29439408/), DOI `10.3390/s18020535`: pemodelan wave-to-wire dan simulasi kendali berbasis sensor tekanan. Artikel lengkap terindeks di [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5855045/); akses ulang halaman sempat mendapat challenge.

**Keputusan desain:** dua arah aliran dapat mempertahankan arah putaran turbin; jangan mengartikannya daya konstan. Bedakan kekurangan aliran/torsi dari stall aerodinamis pada kondisi aliran relatif yang berlebihan. Kendali kecepatan dan aliran perlu ditunjukkan sebagai fungsi, tanpa mengklaim ambang numerik perangkat yang belum dirancang.

### R9 — Persamaan gelombang dan pemilihan lokasi

[NOAA, Ecological Effects of Wave Energy Development in the Pacific Northwest, 2008](https://spo.nmfs.noaa.gov/sites/default/files/tm92.pdf), NOAA Technical Memorandum NMFS-F/SPO-92. PDF diunduh dan persamaan diperiksa pada ekstraksi teks.

**Dukungan:** pendekatan laut dalam `J ≈ 0,49 Hs² Te`, dengan J dalam kW/m. Hs adalah tinggi gelombang signifikan dan Te periode energi. Laporan juga membahas perlunya memperhitungkan dampak fisik/ekologi dan lokasi.

**Batas:** pendekatan laut dalam bukan prediksi otomatis daya OWC di pantai dangkal. Geometri, kedalaman, arah, spektrum, resonansi chamber, dan karakteristik PTO mengubah hasil. Riset lokasi wajib memakai data musiman dan model nearshore/pengujian.

### R10 — Mutu air dan dampak desalinasi

[WHO, Safe drinking-water from desalination, 2011](https://www.who.int/publications/i/item/WHO-HSE-WSH-11.03) membahas pengelolaan risiko dari sumber sampai produk akhir. [Pedoman WHO, bagian penerapan khusus](https://iris.who.int/bitstream/handle/10665/352532/9789240045064-eng.pdf) menjelaskan stabilisasi/remineralisasi dan pengendalian keamanan air.

[UNEP/WHO, Desalination: Resource and Guidance Manual for Environmental Impact Assessments, 2008](https://wedocs.unep.org/items/470a3cca-cb3f-4fe8-87d9-93822fbcf5aa) menekankan penilaian dampak yang spesifik terhadap project dan lokasi.

**Keputusan:** gambar rangkaian pascapengolahan dan pemeriksaan mutu, jangan menjanjikan air minum langsung dari membran. Brine harus menjadi aliran yang terukur dengan desain pembuangan/pemantauan; diffuser saja bukan bukti aman. Tidak ada klaim kepatuhan baku mutu atau izin Indonesia dalam studi konsep ini.

### R11 — Bukti pembanding yang mencegah generalisasi

[Sudipa, Water Carrying Capacity Status towards Water Needs in Klungkung Regency, Bali](https://www.online-journal.unja.ac.id/JIITUJ/article/view/58353).

**Terverifikasi pada abstrak:** penilaian wilayah dapat berbeda antar cakupan dan metode; indeks air permukaan Nusa Penida tahun 2018 dilaporkan 1,06 (surplus), sementara kesimpulan wilayah/periode lain membahas defisit.

**Implikasi:** kebutuhan air di satu titik wisata tidak membuktikan kekurangan sumber air total seluruh pulau. Hindari menyatukan angka ini dengan indeks Denpasar karena lokasi, tahun, dan basis perhitungannya berbeda.

## 4. Klaim yang perlu diganti

| Versi lama / spreadsheet | Perlakuan pada revisi |
| --- | --- |
| Potensi gelombang 63 GW | Hapus dari opening; jika dibahas, beri kategori energi laut gabungan [R1] |
| Ombak selalu ada sehingga listrik terus mengalir | Perlihatkan daya yang naik-turun, jeda dan buffer [R7–R8] |
| 12,4 kW sekaligus 85 m³/hari dan beban desa | Pisahkan daya, energi harian, alokasi RO, beban lain, dan rugi-rugi |
| 85 m³ = 106 kamar | Hanya pembagian volume; belum membuktikan pasokan listrik, jam operasi, atau kapasitas skid |
| 50 KK menyisakan 45 m³ | Membutuhkan asumsi jumlah orang/KK, layanan per orang dan kehilangan air yang belum dinyatakan |
| Air tawar = siap diminum | Nyatakan air bersih dengan pengolahan dan mutu yang harus diuji [R10] |
| Tanpa emisi / tanpa dampak / tanpa lahan darat | Tidak dipakai; struktur pantai, RO, tangki, material dan perawatan tetap ada |
| Brine dibuang terkendali | Tampilkan aliran, kebutuhan desain outfall dan pemantauan [R10] |
| Katup pelepas mengatasi turbin macet saat aliran lemah | Koreksi penyebab: relief untuk tekanan berlebih; kondisi torsi lemah perlu strategi operasi berbeda |
| Skala miniatur 1:20 memvalidasi daya | Skala geometri saja tidak membuktikan keserupaan hidrodinamika dan pneumatik |

## 5. Batas penelitian ini dan pekerjaan lanjutan

Materi cukup untuk merencanakan film konsep yang lebih jujur. Belum cukup untuk mengklaim kelayakan lokasi atau performa alat. Sebelum mengunci angka sebagai spesifikasi: cari versi hitungan terbaru kelompok; ukur/ambil seri gelombang lokasi; tentukan power matrix/PTO; pilih skid dan data SEC, recovery, operasi minimum; hitung head distribusi, beban puncak dan arus awal; validasi kebutuhan pengunjung; periksa tata letak, akses servis dan habitat; bandingkan biaya dengan perluasan PDAM, penghematan air, dan sumber alternatif.

Perbandingan 40 MW dalam RUPTL dengan 63 GW tidak dipakai untuk menyatakan persentase pemanfaatan: target penambahan berbeda dari kapasitas terpasang dan cakupan jenis energi juga perlu disamakan. Dokumen RUPTL primer belum diperiksa dalam penelitian ini.
