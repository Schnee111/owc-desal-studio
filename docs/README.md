# Riset dan implementasi revisi OWC-DESAL

Tanggal: 20 Oktober 2026. Status: pengguna menolak rombakan visual, bukan penambahan materi. Versi aktif kini terdiri dari enam scene basis lama dan dua tambahan untuk alokasi layanan serta operasi saat ombak lemah. Preview seluruh frame tersedia di [galeri](../boards/storyboard.html). Render video menunggu persetujuan pengguna.

Urutan baca:

1. [Riset dan audit klaim](research.md): sumber, koreksi, perbedaan LKM–spreadsheet, dan batas bukti.
2. [Skenario perhitungan](scenario.md): usulan pengguna, neraca energi–air, cadangan, dan sensitivitas.
3. [Rencana improvement](improvement-plan.md): perubahan scene, draft narasi, prioritas, dan pemetaan source.
4. [Arah visual](visual-direction.md): ilustrasi pesisir dalam cahaya siang, menggantikan proposal dark/grid.
5. [Referensi bergambar](design-references.md): karya yang ditinjau dan batas penerapannya.
6. [Filter antislop](antislop-review.md): keputusan DURING dan pemeriksaan dokumen rencana.

[Contact sheet lama](reference/current-contact-sheet.jpg) berisi enam frame dasar diagnosis. [Contact sheet revisi](../boards/frames/contact-sheet.jpg) berisi 13 cuplikan dari delapan scene aktif. [Peta animasi](motion-map.md) dan [cakupan revisi](revision-status.md) menjelaskan apa yang dipertahankan, diubah dan ditambahkan.

[calculate.py](calculate.py) menghitung ulang angka skenario menggunakan pustaka standar Python:

```bash
python docs/calculate.py
```

Keputusan yang direkomendasikan: fokus pada satu fasilitas wisata pesisir dengan target desain 5 m³ air bersih/hari dan beban listrik kecil yang terhitung. Semua angka keluaran merupakan skenario bersyarat, bukan hasil pengujian OWC-DESAL atau kapasitas terverifikasi suatu lokasi.

`BRIEF.md`, `frame.md` dan `STORYBOARD.md` sekarang mendeskripsikan implementasi aktif. Versi sebelumnya diarsipkan sebagai `legacy-*.md`. Dokumen riset dan perencanaan tetap menyimpan alasan dan sumber keputusan.

Proposal delapan scene di `improvement-plan.md` dan panorama baru di `visual-direction.md` adalah catatan arah terdahulu, bukan spesifikasi animasi aktif. Eksperimennya disimpan sebagai `experiments/coastal-redesign-v2.zip`.
