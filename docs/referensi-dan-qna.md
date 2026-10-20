# OWC-DESAL — Referensi, data, dan bahan tanya jawab

Pegangan presentasi Kelompok 9 (MSTR). Semua angka keluaran adalah **skenario desain bersyarat, belum hasil uji lapangan**. Rincian lengkap: [research.md](research.md), [scenario.md](scenario.md), [calculate.py](calculate.py).

## 1. Sumber yang dipakai di video

| # | Sumber | Data yang dipakai | Batas pemakaian |
| --- | --- | --- | --- |
| R1 | Badan Geologi ESDM, *Potensi Energi Laut Indonesia* (13 Agu 2025) — https://geologi.esdm.go.id/media-center/potensi-energi-laut-indonesia | Potensi praktis energi laut ±63 GW, belum dimanfaatkan optimal, teknologi masih tahap riset | 63 GW = gabungan **arus, gelombang, dan panas laut**, bukan gelombang saja, dan bukan kapasitas terpasang |
| R2 | Manuaba & Sugianto (2025), *Tingkat Intrusi Air Laut di Wilayah Pesisir Kecamatan Kuta Utara, Badung*, DOI 10.51172/jbmb.v6i2.466 — https://ejournal.baliprov.go.id/index.php/jbmb/article/view/466 | Kondisi 2024: 15 lintasan geofisika, 32 sumur; TDS Kerobokan Kelod 10.000–20.000 mg/L; prediksi sebaran 35–56 m/tahun s.d. 2029 | Tidak berarti seluruh air Bali seasin air laut (air laut ±35.000 mg/L) |
| R3 | detikBali (12 Mei 2026), *Miris, Kelingking dan Broken Beach di Nusa Penida Belum Teraliri Air Bersih* — https://www.detik.com/bali/berita/d-8486410 | Dua destinasi belum terlayani jaringan air bersih; rencana investasi jaringan ±Rp700 juta | Contoh kesenjangan distribusi, bukan bukti seluruh pulau kekurangan air; lokasi pemasangan belum ditetapkan |
| R5 | Wafi & Ariadi (2022), DOI 10.14710/ijfst.18.1.19-35 | Kincir tambak 2 HP ±0,97–1,07 kW | Tidak dipakai di video (hanya pembanding usulan awal) |
| R6 | Infield (2002), *A small-scale seawater RO system…*, DOI 10.1016/S0011-9164(02)01141-4 | RO kecil dengan pemulihan energi ±3,5 kWh/m³ | Video memakai asumsi lebih konservatif 5 kWh/m³ |
| R7 | NREL, HERO WEC (2023; laporan NREL/TP-5700-91741, 2024) | Preseden desalinasi bertenaga gelombang; memakai elektronika daya dan baterai | Bukan OWC/turbin Wells, tidak memvalidasi angka kita |
| R8 | Raghunathan dkk. (1985), DOI 10.1017/S0001924000096743; Lekube dkk. (2018), *Sensors*, DOI 10.3390/s18020535 | Turbin Wells berputar searah pada aliran dua arah; kendali aliran/kecepatan | Putaran searah ≠ daya konstan |
| R9 | NOAA Tech. Memo NMFS-F/SPO-92 (2008) — https://spo.nmfs.noaa.gov/sites/default/files/tm92.pdf | Rumus fluks energi gelombang laut dalam J ≈ 0,49·Hs²·Te | Pendekatan laut dalam; pantai dangkal perlu model/data lokasi |
| R10 | WHO, *Safe drinking-water from desalination* (2011); UNEP/WHO, *Desalination EIA manual* (2008) | Pascapengolahan, pemeriksaan mutu, pengelolaan brine | Video tidak mengklaim air siap minum atau lolos baku mutu |
| R11 | Sudipa, *Water Carrying Capacity… Klungkung* — https://www.online-journal.unja.ac.id/JIITUJ/article/view/58353 | Indeks air permukaan Nusa Penida 2018 = 1,06 (surplus) | Alasan kenapa kita menyebut masalah **distribusi** di titik wisata, bukan "pulau kehabisan air" |
| — | Spreadsheet review MSTR, baris Kelompok 9 | Rencana improvement 1–3 dan catatan reviewer | — |

## 2. Rantai angka (yang ditampilkan di video)

### Energi (Matematika + Sains)

```
Fluks energi gelombang (laut dalam):  J = 0,49 × Hs² × Te
  Hs = 1 m, Te = 6 s              →  J = 0,49 × 1² × 6 = 2,94 kW per meter muka gelombang
Daya ombak yang mengenai chamber:     2,94 × 4 m (lebar)  = 11,76 kW
Daya listrik:                         11,76 × 0,50 (tangkap) × 0,35 (PTO turbin+generator) ≈ 2,06 ≈ 2 kW rata-rata
Energi harian:                        2 kW × 24 jam = 48 kWh
Setelah rugi listrik 10%:             48 × 0,9 = 43,2 kWh siap pakai
```

Pembagian 43,2 kWh/hari:

| Pemakaian | Rincian | kWh/hari |
| --- | --- | ---: |
| Mengolah air (RO) | 5 m³ × 5 kWh/m³ | 25,0 |
| Lampu jalur | 8 × 20 W × 12 jam | 1,92 |
| Lampu kios | 5 × 10 W × 6 jam | 0,30 |
| Kontrol/sensor | 20 W × 24 jam | 0,48 |
| Pompa distribusi | 250 W × 2 jam | 0,50 |
| Pengisian perangkat | 100 W × 4 jam | 0,40 |
| **Subtotal fasilitas** | | **3,6** |
| **Cadangan (margin)** | 43,2 − 25 − 3,6 | **14,6** |

### Air (Sains + Rekayasa)

```
Recovery RO (asumsi):   40%  →  dari 10 liter air laut: 4 liter air bersih + 6 liter air garam pekat
Target produk:          5 m³/hari
Air laut masuk:         5 / 0,40 = 12,5 m³/hari
Air garam pekat:        12,5 − 5 = 7,5 m³/hari
```

| Pemakaian air | Asumsi | m³/hari |
| --- | --- | ---: |
| Sanitasi pengunjung | 200 orang × 20 L | 4,00 |
| Kebersihan kios | 5 × 100 L | 0,50 |
| Petugas | 5 × 50 L | 0,25 |
| Perawatan fasilitas | allowance | 0,25 |
| **Total** | | **5,00** |

### Cadangan (Teknologi + Rekayasa)

- **Tangki 10 m³** (volume terpakai) = 2 hari × 5 m³, bila tangki penuh dan beda tinggi cukup untuk gravitasi.
- **Baterai 8 kWh nominal**: DoD 80% × inverter 90% ≈ 5,76 kWh tersalur. Lampu jalur + kontrol = 2,4 kWh/hari → ±2 hari. **Tidak** untuk menjalankan pompa RO (RO butuh 25 kWh/hari).
- **Saat ombak melemah**: RO dihentikan sementara, keran dari tangki, kios dilepas, lampu & kontrol tetap menyala, operator memantau mutu air, alat, dan pembuangan brine.

## 3. Prinsip kerja singkat

1. **OWC (Kolom Air Berosilasi).** Ruang beton terbuka ke laut di bawah. Ombak naik → muka air dalam ruang naik seperti piston → udara di atasnya tertekan dan keluar lewat saluran. Ombak surut → udara tersedot masuk.
2. **Turbin Wells.** Bilahnya simetris (profil NACA 0015, sudut serang 0°). Dari arah mana pun udara datang, gaya angkat pada bilah punya komponen dorong ke arah yang sama, jadi rotor berputar searah tanpa katup penyearah.
3. **Daya tidak konstan.** Daya pneumatik ∝ (laju aliran)³, jadi daya berdenyut dua kali per siklus ombak dan mendekati nol saat aliran berbalik. Karena itu ada **pengondisi daya** (penyearah/inverter) yang menstabilkan tegangan, dan baterai sebagai penyangga.
4. **Osmosis balik (RO).** Pompa tekanan tinggi mendorong air laut melewati membran semipermeabel melawan tekanan osmotik (±27 bar untuk air laut; operasi tipikal 55–70 bar). Molekul air lolos, garam tertahan. Produk diolah lagi (remineralisasi/disinfeksi) dan diperiksa mutunya.

## 4. Pertanyaan yang mungkin muncul

**Mana latar belakang pemanfaatan produknya?**
Di scene 1 (±17–36 dtk): satu fasilitas wisata pantai dengan 200 pengunjung per hari, toilet & bilas, 5 kios, dan 8 lampu jalur. Fasilitas ini butuh air bersih dan listrik, termasuk malam hari untuk lampu jalur. Masalah nyatanya bersumber: Kelingking & Broken Beach belum teraliri air bersih (detikBali, Mei 2026) dan air tanah pesisir Kuta Utara terintrusi air laut (Manuaba & Sugianto, 2025).

**Kenapa energi ombak, bukan panel surya?**
Ombak tidak bergantung pada siang hari, sedangkan lampu jalur dibutuhkan di malam hari. Sumber energinya juga berada di titik yang sama dengan bahan baku air, yaitu laut, jadi tidak perlu mengangkut air baku. Kami tidak mengklaim ombak lebih murah atau selalu lebih baik daripada surya; kombinasi keduanya bisa menjadi kajian lanjutan.

**Kenapa angkanya 2 kW, padahal di usulan awal 12,4 kW dan 85 m³/hari?**
12,4 kW tidak bisa ditelusuri sumbernya. Daya ombak yang mengenai chamber 4 m memang ±11,8 kW, tetapi itu daya **ombak**, belum listrik. Setelah efisiensi tangkap (0,5) dan PTO (0,35), hasilnya ±2 kW listrik. Angka 85 m³ cocok dengan 12,4 kW × 24 ÷ 3,5, artinya seluruh energi dianggap untuk RO tanpa rugi dan tanpa beban lain. Kami memisahkan listrik untuk fasilitas dan untuk air, supaya tidak dihitung dua kali.

**Kenapa memakai 63 GW kalau itu bukan potensi gelombang saja?**
Kami menyebutnya "potensi energi laut", sesuai kategori di sumber ESDM. Angka itu hanya menunjukkan bahwa energi laut besar tetapi belum dimanfaatkan. Itu tidak dipakai untuk menghitung keluaran alat kami.

**Seberapa besar tekanan udara di ruang OWC?**
Kecil, hanya orde beberapa kPa (sepersekian atmosfer), tetapi debit udaranya besar. Karena itu narasi menyebut "udara yang tertekan", bukan "bertekanan tinggi". Tekanan tinggi (±55–70 bar) hanya ada di pompa RO, bukan di ruang OWC.

**Apa itu efisiensi tangkap 0,5 dan turbin-generator 0,35?**
Efisiensi tangkap adalah porsi energi ombak yang berhasil diubah ruang OWC menjadi aliran udara. Efisiensi turbin-generator adalah porsi aliran udara yang menjadi listrik. Keduanya asumsi desain untuk merekonstruksi angka 2 kW di LKM, belum hasil uji.

**Turbin berputar searah, berarti listriknya stabil?**
Tidak. Arah putarnya tetap, tetapi besar dayanya naik turun mengikuti ombak (lihat grafik di scene 4). Karena itu ada pengondisi daya, baterai, dan tangki sebagai penyangga.

**Apakah airnya bisa langsung diminum?**
Video menyebut "air bersih", bukan air minum. Produk RO masih perlu pascapengolahan dan uji mutu. Target di video adalah untuk sanitasi, kebersihan, dan kebutuhan fasilitas.

**Brine dibuang ke mana, apa tidak merusak laut?**
Brine 7,5 m³/hari perlu outfall dengan diffuser, titik pantau, dan kajian dampak lokasi (rujukan UNEP/WHO). Kami tidak mengklaim pembuangannya sudah aman. Itu bagian dari tahap validasi.

**Kenapa 20 L per pengunjung?**
Itu asumsi untuk toilet dan cuci tangan terbatas di fasilitas wisata siang hari, bukan standar resmi, dan perlu disurvei di lokasi.

**Bagaimana kalau ombak kecil berhari-hari?**
Tangki 10 m³ mencukupi ±2 hari sanitasi. Baterai hanya untuk lampu dan kontrol. Setelah itu dibutuhkan cadangan dari luar (PDAM/PLN bila ada) atau pengurangan layanan. Sensitivitas: pada rata-rata 1 kW, energi hanya cukup untuk ±3,6 m³ air/hari.

**Kenapa Nusa Penida/Bali?**
Itu contoh masalah nyata yang bersumber (distribusi air ke destinasi wisata, intrusi air laut). Lokasi pemasangan belum ditetapkan dan butuh data ombak musiman.

**Apa langkah berikutnya?**
1) Ukur ombak: Hs dan Te musiman di lokasi. 2) Uji prototipe: ruang OWC, turbin Wells, pengondisi daya, unit RO. 3) Validasi layanan: mutu air, distribusi, dan pembuangan brine.

**Bagian mana dari MSTR?**
- **Matematika:** rumus fluks gelombang, neraca energi kW → kWh, neraca massa air (recovery 40%), sensitivitas.
- **Sains:** fisika gelombang, tekanan udara di kolom, gaya angkat aerodinamis bilah simetris, osmosis.
- **Teknologi:** turbin Wells, generator, pengondisi daya, membran RO, baterai.
- **Rekayasa:** desain chamber, anggaran energi, prioritas beban, cadangan tangki/baterai, mode saat ombak lemah.

## 5. Asumsi yang perlu diakui jujur

Hs 1 m dan Te 6 s (contoh, bukan data lokasi) · efisiensi tangkap 0,5 dan PTO 0,35 · rata-rata 2 kW bertahan 24 jam · rugi listrik 10% · konsumsi RO 5 kWh/m³ · recovery 40% · 20 L/pengunjung · rumus laut dalam untuk pantai. Semuanya bisa dihitung ulang dengan `python docs/calculate.py`.

## 6. Produksi video (bila ditanya)

Animasi HyperFrames (HTML + GSAP, deterministik). Narasi ElevenLabs Eleven v4, voice River. Musik dan efek suara disintesis sendiri dari simulasi mesin. Peta Natural Earth 1:10m (domain publik). Logo UPI dari aset kelompok.
