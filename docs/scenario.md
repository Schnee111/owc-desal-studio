# Skenario matematis untuk revisi

**Status: contoh desain bersyarat.** Jumlah pengguna, konsumsi, efisiensi, kapasitas baterai dan skid di bawah adalah asumsi terbuka, bukan hasil survei atau pengujian OWC-DESAL. Dukungan literatur dan batasnya ada di [research.md](research.md).

## 1. Target layanan yang direkomendasikan

Satu fasilitas wisata pesisir yang dikelola operator lokal/Pokdarwis: toilet dan cuci tangan pengunjung, layanan kebersihan kios, serta lampu jalur dan kontrol fasilitas. Tidak termasuk seluruh hotel/desa, kolam renang, AC, cold storage atau aerator tambak.

Kelingking/Broken Beach dipakai sebagai konteks masalah akses air berdasarkan pemberitaan bertanggal, bukan lokasi instalasi yang sudah ditetapkan. Tata letak dalam film adalah ilustrasi fasilitas pantai yang harus disesuaikan survei, terutama jika air perlu dipompa ke tebing.

| Pengguna/kebutuhan | Asumsi | Volume harian |
| --- | --- | ---: |
| Pengunjung harian | 200 orang × 20 L untuk layanan sanitasi terbatas | 4,00 m³ |
| Kebersihan 5 kios | 5 × 100 L; tidak termasuk kebutuhan minum/produksi makanan | 0,50 m³ |
| Petugas | 5 orang × 50 L | 0,25 m³ |
| Pembersihan fasilitas | Allowance | 0,25 m³ |
| **Total** | Semua faktor pemakaian perlu survei | **5,00 m³/hari** |

Ini bukan standar resmi 20 L/pengunjung. Di narasi sebut **skenario 200 pengunjung**, bukan statistik kunjungan aktual. Target air bersih untuk sanitasi tidak otomatis merupakan air minum; tidak ada adegan meminum langsung dari keran produk.

## 2. Melacak perbedaan angka lama

Pendekatan ilustratif laut dalam [R9]:

```text
J = 0,49 × Hs² × Te                 [kW per meter muka gelombang]
P_elektrik = J × B × C_capture × η_PTO

Hs = 1 m; Te = 6 s; B = 4 m
C_capture = 0,50; η_PTO = 0,35     [dua asumsi yang belum diuji]
J = 2,94 kW/m
P_elektrik = 2,94 × 4 × 0,50 × 0,35 = 2,058 kW
```

Model ini menjelaskan kedekatan angka 2 kW dalam LKM. Definisi periode LKM belum eksplisit; revisi memakai Te agar persamaan jelas. Efisiensi PTO agregat adalah asumsi untuk merekonstruksi hitungan, bukan nilai eksperimen. Pada pantai dangkal perlu persamaan kedalaman hingga/model numerik, bukan langsung memakai persamaan laut dalam.

Dengan asumsi lain tetap, 12,4 kW membutuhkan Hs sekitar 2,45 m. Ini **inferensi matematika**, bukan bukti asal angka spreadsheet. Kondisi satu sea state bukan rata-rata tahunan/hari penuh.

Keluaran 85 m³/hari hampir tepat berasal dari `12,4 × 24 ÷ 3,5 = 85,0`: operasi 24 jam, semua energi ke RO, tanpa rugi atau beban lain. Demikian pula `2 × 24 ÷ 3,5 = 13,7`. Kesamaan ini menunjukkan asumsi yang mungkin digunakan, bukan konfirmasi metode pembuat spreadsheet.

## 3. Neraca energi usulan

Untuk **hari contoh dengan rata-rata generator 2 kW selama 24 jam**, pilih allowance konversi/distribusi 10%:

```text
Energi generator = 2 × 24 = 48 kWh/hari
Energi pada sisi beban = 48 × 0,90 = 43,2 kWh/hari
```

`2 kW rata-rata` bukan nameplate 2 kW. Angka ini adalah syarat skenario, belum terbukti terpenuhi di lokasi. Jika 2 kW ternyata kapasitas nominal, hitung `E = P_nominal × 24 × capacity_factor`, lalu rugi-rugi; jangan langsung menganggap 48 kWh.

| Beban sisi pengguna | Rincian | Energi |
| --- | --- | ---: |
| Produksi air | 5 m³ × SEC asumsi 5 kWh/m³ | 25,00 kWh/hari |
| Lampu jalur | 8 × 20 W × 12 jam | 1,92 kWh/hari |
| Lampu kios | 5 × 10 W × 6 jam | 0,30 kWh/hari |
| Kontrol/sensor | 20 W × 24 jam | 0,48 kWh/hari |
| Pompa distribusi lokal | 250 W × 2 jam | 0,50 kWh/hari |
| Pengisian perangkat | 100 W × 4 jam | 0,40 kWh/hari |
| **Total beban** | RO 25 + beban lain 3,60 | **28,60 kWh/hari** |
| **Margin belum dialokasikan** | 43,20 − 28,60 | **14,60 kWh/hari** |

SEC 5 mencakup intake, pretreatment, RO dengan pemulihan energi yang sesuai, dan pascapengolahan sampai tangki produk onsite. Pompa distribusi ke fasilitas dihitung terpisah. Besar SEC wajib diperiksa kembali pada batas sistem dan datasheet vendor; allowance 10% untuk jalur listrik di luar konsumsi skid, bukan potongan efisiensi pompa kedua kalinya.

Margin bukan keluaran ekspor yang dijanjikan. Margin menampung ketidakpastian, tambahan konsumsi, dan pemulihan buffer. Rugi siklus baterai, efisiensi per komponen, fouling serta energi flushing/CIP harus dirinci pada model waktu operasi berikutnya. Neraca harian ini belum membuktikan kecukupan daya setiap detik.

Contoh skid 0,25 m³/jam memerlukan sekitar 1,25 kW saat aktif dan 20 jam operasi untuk 5 m³. Empat jam sisa bukan jaminan toleransi ombak lemah; perlu jadwal dan kontrol tekanan. Inverter, motor, surge, serta batas turn-down belum dipilih. Baterai 8 kWh di bawah tidak dirancang untuk menjalankan RO dua hari.

## 4. Air baku, brine dan distribusi

Recovery 40% adalah asumsi skid, berbeda dari rejection garam membran:

```text
Q_produk = 5 m³/hari
Q_feed = Q_produk / 0,40 = 12,5 m³/hari
Q_brine = Q_feed − Q_produk = 7,5 m³/hari
```

Ini neraca sederhana tanpa kehilangan pencucian/backwash dan kebocoran. Belum membuktikan salinitas akhir, kualitas produk, ataupun keamanan outfall. Pada desain berikutnya masukkan allowance kehilangan air sebelum mengunci kapasitas 5 m³ terkirim.

Untuk pengangkatan ke tebing, tambahan energi ideal dengan efisiensi pompa η:

```text
E_lift = ρ × g × V × H / (η × 3,6 juta) [kWh]
```

Contoh 5 m³/hari, head 100 m, η=0,60 memerlukan sekitar 2,27 kWh/hari, belum termasuk gesekan dan faktor operasi. Karena itu asumsi pompa lokal 0,50 kWh/hari tidak boleh dipakai sebagai desain Kelingking. Model contoh memakai distribusi jarak pendek dan head rendah.

## 5. Cadangan dan prioritas

- **Tangki:** target cadangan air yang dapat dipakai 10 m³ = dua hari × 5 m³. Volume geometris awal sekitar 12 m³ untuk menyisakan freeboard/dead volume; perlu desain ulang setelah kehilangan air diketahui. Dua hari berlaku saat cadangan awal penuh dan konsumsi sesuai skenario.
- **Baterai:** kandidat 8 kWh nominal, DoD asumsi 80%, inverter 90% → sekitar 5,76 kWh tersalur saat baru/penuh. Untuk lampu jalur + kontrol: 2,40 kWh/hari; kebutuhan dua hari 4,80 kWh. Estimasi mengabaikan penuaan, self-discharge dan idle inverter; bukan jaminan otonomi.
- **Saat ombak lemah:** hentikan/tunda RO dalam batas prosedur skid, jalankan sanitasi dari tangki, kurangi beban nonprioritas dan pertahankan kontrol/lampu prioritas. Pompa distribusi tidak termasuk anggaran baterai kritis; perlu gravitasi yang mencukupi atau tambahan anggaran pompa.
- **Saat pasokan pulih:** isi ulang cadangan sebelum membuka beban tambahan. Refill tangki 10 m³ setelah kosong tidak instan: dengan skid 6 m³/hari maksimum dan permintaan 5 m³/hari, surplus produksi hanya 1 m³/hari, bahkan sebelum downtime/kehilangan. Perlu sekitar 10 hari ideal atau skid/pasokan lebih besar.
- **Di luar cadangan:** sambungan PLN/PDAM bila ada atau suplai darurat, pengurangan layanan dan operator. Film tidak menjanjikan otonomi tanpa batas atau mengklaim fallback pasti tersedia.

## 6. Sensitivitas

Tabel pertama menggunakan SEC 5 dan seluruh beban non-RO 3,6 kWh/hari; hasil adalah batas energi, bukan prediksi produksi. Skid asumsi membatasi keluaran menjadi paling banyak 6 m³/hari.

| Rata-rata listrik generator pada hari contoh | Energi sisi beban | Batas air dari energi | Defisit terhadap 5 m³ |
| --- | ---: | ---: | ---: |
| 2,00 kW | 43,2 kWh | 7,92 m³; dibatasi skid menjadi ≤6 | 0 secara neraca harian |
| 1,00 kW | 21,6 kWh | 3,60 m³ | 1,40 m³ |
| 0,50 kW | 10,8 kWh | 1,44 m³ | 3,56 m³ |
| 0 kW | 0 | 0 | 5,00 m³ dan beban listrik perlu cadangan |

| SEC asumsi | Energi target 5 m³ + beban lain |
| --- | ---: |
| 3,5 kWh/m³ | 21,1 kWh/hari |
| 5,0 kWh/m³ | 28,6 kWh/hari |
| 6,0 kWh/m³ | 33,6 kWh/hari |

Target 85 m³/hari pada SEC 5 dengan beban kecil yang sama dan allowance listrik 10% memerlukan rata-rata generator sekitar 19,84 kW. Tidak termasuk pengisian ulang cadangan, kehilangan air dan peningkatan beban distribusi.

## 7. Angka yang layak tampil dalam video

Tampilkan berurutan: **asumsi rata-rata 2 kW pada hari contoh → 48 kWh → 43,2 kWh di beban → 25 kWh RO + 3,6 kWh fasilitas → target 5 m³/hari**. Lalu cadangan **10 m³ air terpakai** dan **baterai 8 kWh nominal untuk lampu/kontrol**.

Gunakan label tetap `Skenario desain · belum diuji lapangan`. Jangan menampilkan semua angka sekaligus. Rumus lengkap, sensitivitas dan penjelasan efisiensi tersedia pada lampiran, bukan dijadikan dinding teks dalam film.
