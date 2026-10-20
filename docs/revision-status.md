# Cakupan revisi yang benar-benar diterapkan

Versi aktif 20 Oktober 2026. Ini melengkapi materi hasil riset pada basis animasi asli. Pengguna menolak penggantian seluruh ilustrasi, tetapi tetap meminta scene tambahan.

| Pokok revisi | Implementasi |
| --- | --- |
| Sasaran spesifik dan terukur | Scene 1 dan scene layanan baru: satu fasilitas wisata, 200 pengunjung/hari, 5 kios, petugas, kebersihan dan 8 lampu |
| Klaim 63 GW salah kategori | Dihapus dari judul/angka/narasi pembuka |
| Dua fase OWC | Geometri dan animasi lama tetap; recap dipotong untuk durasi |
| Searah tidak berarti daya konstan | Grafik daya relatif dan narasi pada fase turun; simbol pengondisi daya pada jalur listrik |
| kW berbeda dari kWh | Scene layanan: rata-rata 2 kW × 24 jam = 48 kWh bruto, 43,2 kWh setelah allowance 10% |
| Air dan listrik tidak dihitung ganda | Ledger energi satu sumber data: 25 RO + 3,6 fasilitas + 14,6 margin |
| Rantai RO dan mutu produk | Filter, pompa, membran, simbol pascaolah, tangki; narasi pemeriksaan mutu; tidak menjanjikan siap minum |
| Dua keluaran air | Neraca 12,5 umpan = 5 produk + 7,5 brine; recovery asumsi 40%; jalur outfall tetap terlihat |
| Pemanfaatan air | Scene baru 115–141s: 4 pengunjung + 0,5 kios + 0,25 petugas + 0,25 kebersihan m³/hari |
| Operasi pasokan turun | Scene baru 141–165s: ombak lemah, RO siaga, tangki memasok, baterai beban prioritas, kios dilepas |
| Batas cadangan | 10 m³ air terpakai setara dua hari contoh jika awal penuh; 8 kWh nominal tidak menopang RO dua hari; syarat distribusi gravitasi disebut |
| Tindak lanjut dan identitas | Satu pilot konsep, ukur ombak/uji alat/validasi mutu, lima anggota dan logo UPI |

Hitungan gelombang Hs/Te/lebar, sensitivitas SEC, kapasitas skid, kehilangan jaringan/backwash dan pilihan ERD tetap menjadi lampiran riset di `scenario.md`, `research.md` dan `calculate.py`. Film tidak menyatakan pilihan ERD/skid atau kapasitas lokasi sudah tervalidasi. Dua kilowatt rata-rata sepanjang hari adalah asumsi contoh, bukan rating generator yang diam-diam dianggap produksi aktual.

Galeri: [seluruh frame](../boards/storyboard.html). Skenario dan bar dihitung dari `src/scenario.mjs`. Narasi tidak dipercepat untuk memaksa muat; semua durasi diverifikasi dengan ffprobe. Total delapan scene tetap 180 detik.
