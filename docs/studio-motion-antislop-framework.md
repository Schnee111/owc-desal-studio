# Hybrid Studio Motion & Anti-Slop Framework (`OWC-DESAL`)

Dokumen ini merangkum hasil riset mendalam lintas repositori dan literatur *design engineering* untuk meningkatkan kualitas visual dan animasi **OWC-DESAL (Kelompok 9 · UPI)** dari sekadar revisi fungsional menjadi animasi edukasi berstandar studio (*Maxxed / Studio-Grade Motion*).

## 1. Sintesis Riset: 5 Kerangka Kerja Utama

| Kerangka / Sumber | Fokus Utama | Prinsip Kunci yang Diadopsi ke `OWC-DESAL` |
| :--- | :--- | :--- |
| **[Tejashmakwana/motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing)** | Pengukuran empiris 53 momen motion pro (4.288 gerakan, 12 kurva ease terukur) & eliminasi *AI video slop* | • **Posture (Landing vs. Leaving):** Elemen masuk mengalami deselerasi tajam (`softLand` / `power3.out`), elemen keluar mengalami akselerasi (`accelExit` / `power2.in`).<br>• **Transform > Opacity (`3.392 : 584`):** Elemen hadir melalui gerak spasial (`translate3d`, `scale`, `stroke-dashoffset`), bukan sekadar *fade* opasitas datar.<br>• **Overshoot Terkendali (<9%):** Hanya dipakai pada titik fokus mekanis/aksen (`back.out(1.18)`), bukan pantulan kartun berlebihan.<br>• **No Dead Frames (Gate G2):** Hidrodinamika ombak berlapis, partikel udara venturi, dan aliran pipa aktif di setiap frame. |
| **[miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop)** | 38 aturan pencegah *AI visual/copy slop* pada antarmuka & komposisi | • **Lingkungan Pesisir Siang (`#F4EFE4`):** Menolak klise *dark mode* neon/HUD sci-fi untuk topik rekayasa pesisir publik.<br>• **Zero Decorative Grid / Glow:** Tanpa grid latar kosmetik atau *glow* neon; warna menyatakan fungsi material (`#286B75` air bersih, `#A64F32` energi listrik, `#676953` brine).<br>• **Kejujuran Data (Hard Gate):** Semua angka (2 kW, 43,2 kWh, 5 m³/hari) berlabel skenario desain bersyarat dengan satuan eksplisit. |
| **[Leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill)** ([tasteskill.dev](https://www.tasteskill.dev/)) | *The Anti-Slop Frontend Framework* untuk hierarki tipografi, tekstur material, dan ritme spasial | • **Pasangan Tipografi Editorial + Teknis:** `Literata` (serif editorial untuk judul/angka utama) + `Source Sans 3` (`tabular-nums` untuk metrik rekayasa dan label).<br>• **Materialitas Permukaan:** Kartu informasi menggunakan lapisan kertas hangat (`#F4EFE4` / `#EFE8D8`) dengan *border* batu pasir (`#C8C7B9`) dan bayangan lembut berlapis. |
| **[Vanszs/Anti-AI-UI](https://github.com/Vanszs/Anti-AI-UI)** | 5 Poros Anti-Slop (*Color, Type, Layout, Copy, Motion*) & *Anti-Monotony Rules* | • **Satu Elemen Dominan per Beat (Gate G4):** Kamera atau opasitas terfokus mengarahkan mata penonton ke satu mekanisme utama per adegan.<br>• **Variasi Anatomi Shot:** Peta kepulauan (`s1`) → Potongan konstruksi (`s2`) → Push-in ruang OWC (`s3`) → Inset aerodinamika NACA-0015 (`s4`) → Zoom membran RO (`s5`) → Ledger layanan (`s7`) → Mode siaga baterai (`s8`) → Panorama pantai (`s6`). |
| **[Emil Kowalski (`animations.dev`)](https://emilkowal.ski/ui/good-vs-great-animations)** & **[Great Animations](https://emilkowal.ski/ui/great-animations)** | *Origin-aware animations*, kurva *custom cubic-bezier*, dan *spring physics* | • **Origin-Aware Transforms:** Setiap kartu dan *badge* muncul dari arah jangkar fisiknya (`transform-origin` selaras dengan garis penunjuk / komponen mesin).<br>• **Critically-Damped Spring Subtitle:** Kartu *sliding word subtitle* bergerak antar-kata menggunakan solver pegas deterministik dengan sedikit *velocity stretch* (`scaleX`) dan *active word micro-lift*. |

## 2. Audit & Upgrade Teknis pada Codebase `OWC-DESAL`

### A. Mesin Simulasi & Fisika Gerak (`src/engine.js`)
1. **Pustaka 12 Studio Eases & Deterministic Spring (`OWC.ease` & `OWC.spring`):**
   - Menambahkan fungsi kurva terukur yang *seek-safe* (murni fungsi waktu `t` untuk kompatibilitas penuh dengan *frame-by-frame capture* HyperFrames): `softLand`, `snapSettle`, `accelExit`, `silkInOut`, dan solver pegas teredam kritis `spring(u, stiffness, damping)`.
2. **Hidrodinamika Laut Berlapis & Efek Venturi Udara:**
   - Menambahkan kontur kedalaman bawah permukaan (`seaSub`) di bawah permukaan gelombang utama (`seaTop`) serta di dalam ruang OWC (`innerSub`) untuk memberikan dimensi kedalaman air pesisir tanpa *glow* kosmetik.
   - Partikel kolom udara (`chamberP`) kini merespons gradien kecepatan udara (`sAbs`) dengan pusaran konvergensi menuju leher *duct* turbin Wells (`x = 690`) dan modulasi ukuran mikro saat fase kompresi/dekompresi.
3. **Upgrade *Sliding-Card Word Subtitle* (`mountSubtitle`):**
   - Transisi kartu oranye-terakota (`#E59A6E`) antar-kata kini menggunakan kurva pegas teredam kritis (`OWC.spring`) dengan efek *velocity squash-and-stretch* halus (`scaleX` proporsional terhadap jarak lompatan kata) serta *micro-lift* (`-1.5px`) pada kata yang sedang diucapkan.
   - Masuk dan keluarnya baris kalimat (*chunk*) menggunakan kombinasi `translate3d(0, y, 0)` + `opacity` (deselerasi saat masuk, akselerasi saat keluar).

### B. Koreografi Antar-Scene & Tipografi (`src/refine.css` & `src/s1.html`–`s8.html`)
1. **Transform-Driven Entrances & Exits:**
   - Mengganti kemunculan kartu dan bagian *ledger* yang sebelumnya hanya mengandalkan `opacity` menjadi gerakan berarah (*origin-aware*) dengan `y`/`x`/`scale` dan `power3.out`, serta penutupan adegan dengan `power2.in` + pergeseran halus agar memenuhi prinsip *Posture* dari `motionmaxxing`.
2. **Ketelitian Tipografi & Kontras (WCAG AAA/AA):**
   - Seluruh angka metrik teknis menggunakan `font-variant-numeric: tabular-nums` agar tidak bergeser saat dibaca.
   - Hierarki kartu diperjelas dengan *elevation* lembut dan aksen garis tepi semantik (`#286B75` untuk air, `#A64F32` untuk daya listrik, `#676953` untuk brine).
