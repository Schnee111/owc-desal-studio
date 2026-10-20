# OWC-DESAL — design spec

Catatan 20 Oktober 2026: isi di bawah mendeskripsikan versi animasi aktif. Pengguna telah menolak arah dark/grid untuk revisi berikutnya. Arah perencanaan penggantinya ada di [docs/visual-direction.md](docs/visual-direction.md), dengan [referensi desain](docs/design-references.md) dan filter antislop DURING. Komposisi belum diubah.

Sumber: panduan gaya di `Draft Teks Animasi OWC-DESAL.md`. Gaya blueprint teknis, potongan melintang 2D.

## Palette

| Token        | Hex       | Peran                                              |
| ------------ | --------- | -------------------------------------------------- |
| bg           | `#0A0E14` | latar hitam gelap                                  |
| grid         | `#7896B4` | grid tipis abu kebiruan, opasitas rendah (~10%)    |
| line         | `#E8EEF4` | garis struktur dan teks (putih)                    |
| sea          | `#2B78B8` | air laut (biru laut), permukaan `#4E9BDB`          |
| energy       | `#FF9F1C` | aliran listrik, angka kunci (oranye)               |
| energy-hot   | `#FFD23F` | jejak putaran turbin, titik potensi (kuning)       |
| air          | `#9BEAFF` | udara (cyan muda)                                  |
| fresh        | `#5CC8FF` | air tawar (biru jernih)                            |
| brine        | `#8FA89A` | brine / air garam pekat (abu kehijauan)            |

Netral turunan (tint dari bg ke arah biru): permukaan panel/beton/tanah `#0D131B` · `#0E1520` · `#0F151D` · `#0F1621` · `#121A26` · `#18212D`; highlight panah air `#BFE3FF`; inti titik cahaya `#FFF6C9`; pelat logo `#FFFFFF` (logo UPI bertulisan hitam, wajib di atas putih); fade akhir `#000000`.

## Type

- Judul: Montserrat 900 (bundled).
- Label teknis & teks layar: Inter 700 / 400 (bundled), label 20–24px dengan garis penunjuk.
- Metadata kecil: IBM Plex Mono 400/700.

## Motion

- Garis struktur digambar seperti blueprint (stroke draw), isi menyusul.
- Panah aliran = garis putus-putus yang bergerak.
- Turbin Wells selalu berputar searah jarum jam; arah panah udara berbalik antar fase.

## Don'ts

- Bilah turbin tidak boleh digambar miring seperti kipas biasa.
- Tidak ada tulisan "Sumber" untuk angka 63 GW.
- Tidak ada gradien linear layar penuh (banding).
