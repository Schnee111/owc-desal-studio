# Rencana improvement scene dan isi

Tanggal: 20 Oktober 2026. Status: proposal untuk kelanjutan produksi. Format tetap 1920×1080, durasi target tetap 180 detik. Delapan scene di bawah merupakan restrukturisasi yang diusulkan, belum komposisi yang dibuat.

Pembaruan implementasi: pengguna meminta mempertahankan animasi asli dan tetap menambahkan materi. Proposal awal di bawah disimpan sebagai dasar; susunan aktif delapan scene memakai enam basis lama + dua scene layanan/cadangan. Lihat [cakupan revisi aktual](revision-status.md), [peta gerak](motion-map.md), dan [galeri](../boards/storyboard.html).

Koreksi arah visual pada tanggal yang sama: pengguna menolak dark dan grid. Gunakan [visual-direction.md](visual-direction.md) serta [design-references.md](design-references.md): lingkungan pesisir dalam cahaya siang, bidang material dan diagram editorial. Seluruh shot dalam rencana ini mengikuti arah terang tersebut, termasuk potongan teknis dan penutup.

## 1. Cerita yang dituju

**Pertanyaan film:** dapatkah ombak membantu memasok air bersih dan penerangan untuk satu fasilitas wisata pesisir, dan apa batasnya?

**Jawaban film:** OWC menggerakkan generator pada dua fase aliran. Listrik dikondisikan, dianggarkan untuk RO dan beban fasilitas, lalu cadangan air serta baterai menangani sebagian fluktuasi. Kelayakan tetap bergantung data lokasi dan pengujian.

Urutan: kebutuhan nyata → pengguna → mekanisme → skala daya → pengolahan air → pembagian manfaat → operasi saat pasokan turun → langkah uji. Ini memperbaiki fokus review tanpa mengubah inti OWC + RO.

Dasar sumber: [research.md](research.md). Angka contoh: [scenario.md](scenario.md). Seluruh angka contoh desain diberi status asumsi, bukan fakta lapangan.

## 2. Apa yang dipertahankan, diubah, ditambahkan

| Area lama | Keputusan | Alasan |
| --- | --- | --- |
| Potongan melintang OWC dan RO | Pertahankan geometri dasar, perbaiki diagram | Aset utama sudah menjelaskan alur fisik |
| Dark blueprint, grid termasuk grid lokal, outline neon | Ganti dengan pesisir siang, bidang material, anotasi langsung | Pengguna menolak arah lama; kebutuhan tempat dan proses menentukan visual |
| Ombak, permukaan chamber, panah udara | Pertahankan prinsip dan implementasi deterministik | Hubungan sebab-akibat lebih jelas daripada dekorasi baru |
| Scene naik 30 dtk + turun 30 dtk | Padatkan menjadi satu scene 24 dtk dengan perbandingan dua fase | Menyediakan waktu untuk perhitungan dan penerapan |
| Pembuka peta nasional + count-up 63 GW | Ganti dengan kebutuhan di fasilitas wisata | Koreksi kategori angka dan langsung menunjukkan pengguna |
| Microgrid desa dan cold storage | Ganti dengan delapan lampu jalur, kios, kontrol, pompa lokal | Setiap beban yang menyala harus masuk anggaran |
| Listrik bercabang tanpa besar alokasi | Ganti dengan satu ledger energi berunit kWh/hari | Menghindari penghitungan ganda |
| RO sebagai membran saja | Tambah pretreatment, ERD yang sesuai, pascapengolahan dan pemeriksaan mutu | Menjelaskan rantai proses dan batas air minum |
| Brine sekadar panah buang | Tambah volume contoh dan catatan desain outfall | Konsekuensi proses terlihat |
| Turbin selalu berputar → listrik dianggap konstan | Tambah grafik daya variabel dan pengondisi daya | Putaran searah tidak menjamin pasokan stabil |
| Tidak ada adegan kondisi lemah | Tambah prioritas, tangki dan batas baterai | Menyelesaikan rencana improvement poin 3 |
| Penutup banyak unit sepanjang pantai | Ganti satu pilot dengan layanan terukur | Banyak unit belum dibuktikan layak |
| Logo UPI dan lima anggota | Pertahankan pada kredit | Identitas kelompok tetap lengkap |

## 3. Rencana delapan scene, total 180 detik

Draft narasi di bawah adalah bahan penulisan, belum teks VO final. Uji durasi suara tetap diperlukan. Istilah `hari contoh` dan `asumsi` harus terdengar, bukan hanya menjadi catatan kecil.

### Scene 1 — Kebutuhan di ujung jaringan · 00:00–00:20

**Perubahan:** menggantikan opening 25 detik yang bertumpu pada angka nasional.

**Yang terlihat:** satu gambar kawasan wisata dengan keran sanitasi, kios lokal dan jalur pengunjung. Pembuka 0–5 detik bertumpu pada keran dan pengguna; 5–13 detik memperlihatkan inset peta Bali–Nusa Penida; 13–20 detik menghubungkan laut ke ide OWC-DESAL. Bukti berita ditulis sebagai ringkasan pendek, dengan lokasi dan tanggal publikasi, bukan screenshot headline yang mendominasi.

**Teks utama:** `Wisata ramai. Air bersih harus sampai.`

**Bukti layar:** `Contoh akses: Kelingking / Broken Beach · laporan Mei 2026 [R3]`. Peta tidak menandai koordinat instalasi alat.

**Draft VO:** “Di kawasan wisata pesisir, air bersih dibutuhkan pengunjung, petugas, dan usaha lokal. Pemberitaan Mei 2026 mencatat akses jaringan ke Kelingking dan Broken Beach masih menjadi persoalan. OWC-DESAL mengkaji bantuan pasokan dari energi ombak.”

**Batas:** tidak menyebut seluruh pulau tanpa air, tidak memindahkan data sumur Kuta Utara menjadi fakta Nusa Penida. Foto lokasi jika digunakan harus berizin dan mencantumkan kredit; gambar konsep harus diberi label ilustrasi.

### Scene 2 — Satu fasilitas, sasaran jelas · 00:20–00:40

**Perubahan:** struktur mesin lama mendapat konteks pengguna sejak awal.

**Yang terlihat:** kawasan dari scene 1 berlanjut ke potongan melintang. Garis listrik menuju lampu; garis produk air menuju blok sanitasi. Komponen muncul mengikuti urutan fungsi: chamber → turbin/generator → pengondisi daya → RO/tangki → fasilitas.

**Teks utama:** `Skenario layanan: 200 pengunjung/hari`. Angka lain baru dibuka pada scene berikutnya.

**Draft VO:** “Sasarannya satu fasilitas wisata, dengan skenario dua ratus pengunjung per hari. Sistem melayani sanitasi, kebersihan kios, dan penerangan jalur. Chamber OWC menghubungkan gerak air laut dengan turbin udara dan generator, kemudian memasok unit pengolahan air.”

**Visual baru:** batas lokasi/layanan yang terlihat; penanda `ilustrasi fasilitas · lokasi belum ditetapkan`. Hindari menambahkan hotel, rumah penduduk atau tambak sebagai beban diam-diam.

### Scene 3 — Dua fase, satu arah putaran · 00:40–01:04

**Perubahan:** menggabungkan scene lama 3–4. Sekitar 8 detik naik, 8 detik turun, 8 detik perbandingan dan konsekuensi daya.

**Yang terlihat:** satu chamber besar yang sama pada kamera tetap. Meter muka air bergerak; panah udara berbalik; panah putaran tetap searah. Inset bilah dengan profil simetris hanya muncul ketika relevan. Di akhir, grafik kecil `daya generator terhadap waktu` berdenyut mengikuti fase, bukan berupa garis lurus.

**Teks utama:** `Aliran berbalik. Putaran tetap searah.` lalu `Daya tetap berfluktuasi.`

**Draft VO:** “Saat kolom air naik, udara keluar melewati turbin. Saat air turun, udara masuk kembali. Turbin Wells mempertahankan arah putaran pada dua arah aliran. Namun torsi dan daya berubah sepanjang siklus. Karena itu listrik perlu dikondisikan sebelum dipakai beban.”

**Koreksi ilmiah:** pada titik balik aliran mendekati nol, jangan menggambar energi generator maksimum. Inersia rotor dan penyangga listrik adalah hal berbeda. Relief tekanan tidak disebut sebagai solusi untuk kekurangan energi ombak.

### Scene 4 — Dari ombak ke anggaran energi · 01:04–01:26

**Tambahan utama:** skala matematis yang belum ada di animasi.

**Yang terlihat:** potongan chamber berpindah menjadi gambar ukur dengan dimensi lebar 4 m. Parameter `Hs 1 m`, `Te 6 s` tampil sebagai asumsi ilustratif. Aliran hitungan mengubah `2,94 kW/m` menjadi `≈2 kW` lewat penangkapan/PTO. Setelah itu fokus berpindah ke satu baris utama: `2 kW rata-rata × 24 jam = 48 kWh` → `43,2 kWh setelah allowance 10%`.

**Draft VO:** “Hitungan awal memakai asumsi gelombang signifikan satu meter, periode energi enam detik, dan chamber selebar empat meter. Dengan asumsi konversi, hasil ilustratifnya sekitar dua kilowatt. Jika rata-rata itu bertahan sehari, tersedia empat puluh delapan kilowatt-jam sebelum rugi-rugi.”

**Catatan layar yang wajib:** `Ilustrasi laut dalam; hasil lokasi perlu model dan uji`. Persamaan penuh disimpan dalam lampiran; tiga parameter gelombang hilang sebelum ledger harian muncul. Jangan menampilkan nominal generator sebagai rata-rata yang terukur.

### Scene 5 — Lima meter kubik, dua keluaran air · 01:26–01:52

**Perubahan:** memperjelas rangkaian RO lama dan mengisi angka debit.

**Yang terlihat:** intake bersaringan → pretreatment → pompa tekanan tinggi → membran → pascapengolahan → tangki. Cabang brine kembali lewat ERD yang sesuai lalu outfall; jalur pemulihan energi dibedakan dari kabel listrik agar tidak menyerupai pembangkit kedua. Meter produk berakhir pada target, bukan counter tanpa batas.

**Teks utama bertahap:** `Target desain 5 m³/hari` → `Asumsi 5 kWh/m³ = 25 kWh/hari` → `Recovery 40%: 12,5 m³ masuk → 5 produk + 7,5 brine`.

**Draft VO:** “Pada skenario ini, target air bersih lima meter kubik per hari memakai dua puluh lima kilowatt-jam. Prosesnya mencakup penyaringan awal, pompa, membran, dan pascapengolahan. Dengan asumsi recovery empat puluh persen, sebagian air baku menjadi produk dan sisanya menjadi brine yang memerlukan pengelolaan.”

**Batas:** kualitas produk harus diperiksa. Nama `air bersih` tidak diganti `air minum siap konsumsi`. Perhitungan sederhana belum memasukkan air backwash dan kehilangan jaringan.

### Scene 6 — Ke mana air dan listrik dipakai? · 01:52–02:20

**Tambahan utama:** jawaban langsung atas review pemanfaatan spesifik.

**Yang terlihat:** kembali ke kawasan yang sama. Pemakaian air terisi: pengunjung 4 m³, kios 0,5, petugas 0,25, kebersihan 0,25. Setelah diagram air dibaca, ganti ke ledger listrik: `43,2 tersedia`, `25 RO`, `3,6 fasilitas`, `14,6 margin`. Akhir beat menyorot delapan lampu jalur yang menyala, sesuai daftar beban.

**Draft VO:** “Air tersebut dialokasikan untuk sanitasi pengunjung, kebersihan lima kios, petugas, dan perawatan fasilitas. Delapan lampu jalur beserta beban kecil lainnya memakai tiga koma enam kilowatt-jam per hari. Dalam neraca hari contoh, masih ada margin empat belas koma enam kilowatt-jam untuk ketidakpastian dan pemulihan cadangan.”

**Bahasa visual:** diagram air dan energi tampil bergantian agar unit m³ dan kWh tidak tertukar. Tidak ada cold storage. Margin tidak dianimasikan sebagai listrik bebas untuk seluruh desa.

### Scene 7 — Ketika ombak melemah · 02:20–02:43

**Tambahan utama:** cadangan, kendali dan batas layanan.

**Yang terlihat:** tinggi ombak berkurang, keluaran generator menurun, RO beralih ke standby sesuai prosedur. Tangki tetap memasok fasilitas. Dua visual besar: `10 m³ cadangan air terpakai` dan `8 kWh baterai nominal · lampu + kontrol`. Label kecil menegaskan cadangan awal penuh dan konsumsi contoh. Pada akhir beat tampil jalur outfall dengan titik pantau dan akses servis.

**Draft VO:** “Saat energi ombak turun, produksi RO dijadwalkan ulang. Cadangan air sepuluh meter kubik menutup dua hari kebutuhan contoh jika tangki awal penuh. Baterai disiapkan untuk lampu dan kontrol, bukan menjalankan RO dua hari. Operator tetap memantau mutu air, kondisi alat, dan pembuangan brine.”

**Batas penting:** baterai tidak ditampilkan mengisi sendiri ketika generator berhenti. Air memerlukan gravitasi yang cukup atau anggaran pompa tersendiri. Refill dua hari cadangan tidak digambarkan selesai dalam satu hari. Badai berbeda dari ombak produktif: perlu mode aman, bukan output yang terus meningkat.

### Scene 8 — Pilot yang bisa diuji · 02:43–03:00

**Perubahan:** penutup lama dipersingkat dan dibuat spesifik.

**Yang terlihat:** satu pilot di kawasan yang sama. Sekitar 7 detik untuk target dan tahap selanjutnya, lalu 10 detik kredit dengan nama lengkap lima anggota dan logo UPI. Logo tetap utuh di pelat putih; tidak diberi efek recolor.

**Teks utama:** `Satu fasilitas. Beban terhitung. Kinerja diuji.` Penanda `Konsep · belum diuji lapangan` tetap terbaca.

**Draft VO:** “Berikutnya: ukur ombak, uji alat, validasi layanan. OWC-DESAL, energi dan air bersih pesisir.”

**Hindari:** slogan tanpa emisi absolut, pantai penuh mesin, manfaat nasional yang belum dihitung. Detail referensi dibawa ke deskripsi video/lampiran; film menampilkan sitasi pendek pada beat terkait.

## 4. Pemetaan implementasi nanti

| Source | Perubahan yang disiapkan |
| --- | --- |
| `src/s1.html` | Opening berbasis kebutuhan dan konteks bertanggal; hapus 63 GW sebagai gelombang |
| `src/s2.html` | Sasaran layanan, garis batas fasilitas, pengondisi daya |
| `src/s3.html`, `src/s4.html` | Satukan dua fase ke scene mekanisme; gunakan ulang profil bilah yang sudah ada |
| Scene baru perhitungan | Diagram ukur dan ledger; gunakan parameter dari satu data skenario |
| `src/s5.html` | Proses RO, ERD/pascapengolahan, pemakaian air dan listrik menjadi beat terpisah |
| Scene baru operasi | Mode lemah, tangki, baterai, akses servis dan titik pantau |
| `src/s6.html` | Satu pilot, langkah uji, kredit |
| `src/engine.js` | Pisahkan geometri dari skenario/timeline; generalisasi durasi yang saat ini tetap untuk scene 2–6; tetapkan fase eksplisit agar urutan baru tidak merusak kontinuitas; ubah simbol pengguna |
| `src/common.css` | Hapus grid/glow/HUD; gunakan bidang terang, label langsung, palet material dan tipografi sesuai arah visual |
| `src/build.mjs` | Ganti daftar output menjadi delapan scene; tetap hasilkan `compositions/frames/` dari template |
| `index.html` | Host, offset, durasi dan audio baru; pastikan root `window.__timelines` diinisialisasi dengan aman |
| `assets/vo/` | VO baru per scene, istilah/satuan Indonesia, timing berdasarkan audio aktual |
| `BRIEF.md`, `STORYBOARD.md`, `frame.md` | Tambah versi revisi setelah arah ini dipilih; catat penggantian batas waktu lama |

Perubahan template harus dibangun ulang lewat `node src/build.mjs`; jangan hanya mengedit hasil komposisi karena akan tertimpa. Data label dan ledger nantinya berasal dari satu sumber agar angka animasi, lampiran, dan narasi tetap konsisten.

## 5. Urutan produksi yang direkomendasikan

1. Rekonsiliasi hitungan 12,4 kW dengan kelompok; sementara gunakan 2 kW sebagai asumsi hari contoh, bukan kapasitas alat yang sudah teruji.
2. Kunci target layanan dan batas mutu air. Validasi apakah 5 m³ dihitung sebagai produk onsite atau benar-benar terkirim setelah kehilangan.
3. Buat tiga style frame terlebih dahulu: opening, diagram mekanisme, dan ledger energi. Ini menguji pembaruan visual sebelum mengerjakan seluruh scene.
4. Susun storyboard visual lengkap 8 scene dan VO final yang muat 180 detik. Jika butuh narasi lebih panjang, kurangi materi layar dahulu; perubahan durasi menjadi keputusan eksplisit.
5. Implementasikan data, geometri, pengondisi daya, buffer dan prioritas. Sesuaikan satuan dan batas kontrol dengan skenario.
6. Periksa versi CLI. Project saat riset dipin `0.8.133`; CLI melaporkan rilis `0.8.177`. Riset ini tidak mengubah pin; lakukan pembaruan terverifikasi dalam tahap implementasi sesuai panduan HyperFrames.
7. Bangun ulang dan jalankan `npm run check`. Ambil snapshot tiap scene serta titik awal/tengah/akhir transisi; periksa keterbacaan pada ukuran HP dan kebenaran aliran.
8. Buka Studio dengan `preview --background`, periksa status dan URL. Render sesudah tahap revisi benar-benar diminta; riset ini tidak melakukan render/publish.

## 6. Kriteria hasil revisi

- Penonton dapat menyebut satu pengguna akhir dan layanan yang disuplai.
- Tidak ada double counting listrik, kW/kWh tertukar, atau m³ feed disamakan dengan m³ produk.
- Setiap angka punya sumber atau label asumsi; model tidak menyamar sebagai pengujian fisik.
- Turbin/airflow benar pada dua fase, grafik daya tetap berubah dan tidak menjanjikan listrik konstan.
- Alur RO mencakup pengondisian yang diperlukan; brine dan mutu produk tidak menghilang dari cerita.
- Adegan ombak lemah menyebut batas cadangan; tidak ada janji RO dua hari dari baterai 8 kWh.
- Diagram menunjukkan fungsi, warna memiliki arti, kredit terbaca dan tidak ada elemen penting di luar area aman.
- Total 180 detik, audio terdengar jelas; musik hanya bila menambah fungsi dan tidak menutupi narasi.
