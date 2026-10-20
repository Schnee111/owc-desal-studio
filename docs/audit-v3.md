# Audit dan perubahan v3 — sudut pandang penonton

20 Oktober 2026. Audit seluruh 8 scene terhadap tiga pertanyaan: apakah gambarnya jelas dan mudah dipahami, apakah narasinya jelas, dan apakah transisi serta gerak membantu pemahaman. Geometri mesin, kamera utama, dan palet terang dari arahan sebelumnya dipertahankan.

## Rujukan yang dipakai

| Sumber | Yang diambil |
| --- | --- |
| [motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) | Gerak masuk melambat, keluar mempercepat; hampir tidak ada fade antar-scene; tidak ada frame mati; satu fokus per frame; teks muncul seirama ucapan; akhir tidak ditahan lama |
| [bang-motion](https://github.com/bangtutorial/bang-motion) (`references/explainer.md`, `anti-ppt.md`) | Entitas yang disebut wajib tampil; elemen ditambah per frasa (akresi), bukan diganti; teks setelah zoom-out selesai; ukuran teks minimum; pengulangan untuk skala |
| [anti-slop](https://github.com/miqdadbadjuber/anti-slop) | Tanpa kartu kosong, kapsul, HUD dan label kapital berjarak; angka bersumber atau berlabel asumsi |
| [impeccable](https://github.com/pbakaus/impeccable) | Hierarki tipografi, kontras, ritme spasial |
| Skill HyperFrames (`general-video`, `hyperframes-core`, `-animation`, `-audio`) | Kontrak seek-safe, animation map, carve musik di bawah narasi |
| Spreadsheet review, Kelompok 9 | Rencana improvement 1–3 dan catatan reviewer: kaitkan dengan objek wisata, pemanfaatan spesifik dan terhitung |

## Temuan dan perbaikan

| Scene | Temuan (penonton) | Perbaikan |
| --- | --- | --- |
| 1 | Frame awal berisi kotak kosong; masalah air hanya ada di kartu kecil 20 px dan tidak diucapkan; titik-titik pesisir tanpa arti | Peta menyelam ke Bali (garis pantai Natural Earth 1:10m). Dua penanda bersumber muncul saat disebut. Ombak bergerak saat "ombak tak pernah berhenti". Pertanyaan diketik seirama suara, dijawab judul. Masalah validasi (improvement 1) kini terdengar dan terlihat |
| 2 | Lubang putih di lokasi chamber sebelum dibangun; judul menabrak label | Pantai dimulai sebagai tebing padat lalu "digali" menjadi chamber; judul dipindah dan dipendekkan |
| 3 | Kartu "SKALA FISIK SKENARIO (LKM 3)" tidak pernah dijelaskan narasi | Dihapus dari sini; perhitungan dipindah ke scene energi saat diucapkan. Dimensi "lebar ruang 4 m" tetap di dalam gambar, diperbesar |
| 4 | Grafik "daya berubah" hampir datar, justru menyiratkan daya konstan | Grafik baru ∝ aliran udara³: dua denyut per ombak, mendekati nol di titik balik, dengan garis rata-rata. Panah udara tiap panel muncul pada kata "bawah"/"atas" |
| 5 | Label teks 16 px di dalam bar tidak terbaca; angka umpan/produk/brine abstrak | Neraca menjadi 10 kotak liter: 4 berubah jadi air bersih, 6 jadi air garam pekat, lalu skala harian 12,5 → 5 + 7,5 m³. Istilah "Reverse Osmosis" diganti "osmosis balik" |
| 6 (layanan) | Tiga panel sekaligus; narasi tidak menyebut pembagian air yang ditampilkan; "energi bersih" ambigu (bisa dibaca *clean energy*) | Narasi menyebut tiap pemakaian air; baris menyala saat disebut. Rantai 2 kW × 24 jam = 48 kWh → 43,2 kWh "siap pakai". Kotak latar dihapus, teks langsung di kertas |
| 7 (cadangan) | Badge operator menumpuk label tangki; teks status berganti diam-diam | Badge dihapus; konsekuensi ditambahkan sebagai daftar yang tumbuh mengikuti narasi; pompa berhenti tepat pada "dihentikan" |
| 8 (penutup) | Penampang mengecil sebagai kotak di atas laut; teks muncul di atas mesin; kredit diam 9 detik | Iris menutup ke unit pilot; teks muncul setelah iris selesai; kredit muncul saat nama diucapkan, laut tetap bergerak di bawahnya |
| Semua | Subtitle 26 px; kartu oranye bergeser yang mengukur DOM tiap frame; transisi CSS pada kata (tidak seek-safe); tidak ada musik atau efek suara meski README menyebutnya | Subtitle 34 px, pita kertas, garis bawah per kata via kelas; angka tampil sebagai digit. Musik dan SFX baru, di-duck di bawah narasi |

## Narasi

Narasi lama mengulang "ini skenario desain" di tiga scene dan memakai istilah seperti "umpan" dan "perolehan". Versi v3 memakai kalimat aktif, satu ide per kalimat, dan angka yang bisa dibayangkan ("dari setiap sepuluh liter air laut, empat liter menjadi air bersih"). Batas klaim diucapkan sekali di penutup dan tetap tertulis pada catatan kaki scene layanan/cadangan. Semua klip masih di dalam slot scene masing-masing (diverifikasi ffprobe).

## Audio

`assets/audio/gen_soundscape.py` mensintesis semuanya, tanpa sampel atau layanan luar. Efek suara mengikuti `motion.json` (diekspor dari simulasi yang sama dengan gambar): suara ombak naik saat air masuk chamber, desis udara mengikuti aliran dan berdenyut sesuai 8 bilah, nada rotor naik dengan putaran, pompa RO menyala saat disebut lalu melambat saat ombak melemah. Musik dan efek di-duck di bawah narasi, pita 1–4 kHz paling dalam. Pengukuran mix offline: narasi −17,6 LUFS, mix total −17,8 LUFS, pita suara 13–31 dB di atas latar.

## Verifikasi

- `npm run check`: 0 error. 8 warning ukuran berkas (engine dibundel per scene, sama seperti versi sebelumnya). Runtime, layout, motion (13 aturan) tanpa error; 58/58 uji kontras WCAG AA.
- Animation map: 1.420 tween, tanpa dead zone.
- Snapshot di setiap sambungan scene diperiksa; galeri di [boards/storyboard.html](../boards/storyboard.html).
- Video belum dirender, menunggu persetujuan preview.

## Putaran 3: kepadatan visual (v3.2)

| Scene | Masalah | Perbaikan |
| --- | --- | --- |
| 7 | ±6 zona teks sekaligus, mesin tetap bergerak di belakang angka | Satu subjek menyala per beat: beat air hanya tangki & keran, beat energi hanya turbin, generator & jalur listrik; sisanya diredupkan. Label tangki dan catatan kaki dihapus; asumsi pindah ke baris kecil di dalam kartu |
| 8 | ±8 elemen teks, label tangki mengulang poin daftar | Label tangki, judul "Mode prioritas" dan catatan kaki dihapus; info kios & jadwal RO masuk ke badge dan kartu baterai |
| 2 | 14 label menyala bersamaan | Label OWC meredup saat gedung RO dibahas |
| Semua | Teks 22–23 px sulit dibaca di HP/proyektor | Minimum ±24–25 px |
| Durasi | Judul pembuka, ledger energi dan kartu cadangan hilang terlalu cepat | Tambah waktu baca: total 183,5 dtk |
