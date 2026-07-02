# Capital Wawan — Website Build Spec

Company profile / family office landing page untuk **Capital Wawan**, dikelola oleh Wawan Januar. Fokus: saham domestik (IDX) & aset kripto. Referensi awal: ronaldcapital.com (jangan ditiru mentah — sudah di-upgrade jadi identitas sendiri).

Dokumen ini adalah spesifikasi lengkap untuk dibangun ulang dari HTML statis (prototipe) menjadi project Astro + Tailwind + GSAP yang production-ready, ringan, dan mudah dikembangkan (nanti akan ditambah integrasi data harga real-time secara bertahap — **belum sekarang**).

---

## 1. Tech Stack

| Layer | Pilihan | Alasan singkat |
|---|---|---|
| Framework | **Astro** | Static-first, 0kb JS default, islands architecture untuk bagian interaktif saja |
| Styling | **Tailwind CSS** | Token-based, cocok untuk desain custom (bukan komponen jadi seperti Bootstrap) |
| Animasi | **GSAP + ScrollTrigger** | Scroll reveal, line-chart draw-on-scroll, hover interactions |
| Font | Google Fonts: `Archivo Expanded` (800), `Inter` (400/500/600), `JetBrains Mono` (400/500/700) |
| Icon/Assets | Logo & foto profil disediakan sebagai file statis di `/public` |
| Deploy target | Vercel atau Cloudflare Pages (belum perlu backend/API) |

Tidak perlu database atau CMS di tahap ini — semua konten hardcoded di komponen Astro (`.astro` files), gampang diedit manual nanti.

---

## 2. Design Tokens

```css
--bg: #0A0A0B;
--surface: #141416;
--surface-2: #1B1B1E;
--line: #2A2A2D;
--red: #E8112D;
--red-dim: #7A0E1C;
--text: #F2F1EE;
--muted: #8C8C90;
--gold: #C9A15A; /* dipakai minim, hanya jika perlu aksen ketiga */
```

Type scale:
- Display / heading → `Archivo Expanded`, weight 800, letter-spacing -0.01em
- Body → `Inter`, 400–600
- Data/mono (angka, ticker, label) → `JetBrains Mono`

Border radius: 18–20px untuk card (bukan 0, bukan full-round — konsisten "glass card" style).

---

## 3. Aset yang disediakan (dari user, JANGAN digenerate ulang)

Taruh di `/public/assets/`:
- `logo-cw.png` — logo Capital Wawan (background transparan, merah #E8112D + hitam)
- `profile-wawan.png` — foto founder Wawan Januar (background putih, akan di-mask via CSS)

**Semua elemen visual lain (gradient, garis blockchain, candlestick chart, watermark logo raksasa) dibuat murni dari CSS/SVG di dalam kode — bukan gambar yang perlu diupload.** Lihat detail per-section di bawah.

---

## 4. Struktur Halaman & Konten

### 4.1 Navbar (fixed, transparent → blur on scroll)
- Logo kiri (logo-cw.png, height ~26px)
- Nav kanan: `THESIS` `PORTFOLIO` `FOUNDER` `GROWTH` (uppercase, mono font, letter-spacing lebar)

### 4.2 Hero
- Eyebrow: "Family Office — Saham & Crypto" (mono, merah, dot indicator merah di depan)
- H1: **"Investasi bukan tempat untuk mencari kekayaan, tapi menggandakan kekayaan."** (kalimat kedua di-highlight merah)
- Sub paragraph: deskripsi singkat Capital Wawan (kendaraan investasi pribadi, saham + kripto, jangka panjang, tanpa modal luar)
- Stat row (3 kolom): `2023 — Tahun Berdiri` / `3 — Current Holding` / `+$$$$$ — Unlimited Money`
- **Background effect**: logo CW versi raksasa (`logo-cw.png`), posisi kanan-tengah (kira-kira 65% dari kiri viewport), di-mask pakai CSS `mask-image` kombinasi linear + radial gradient supaya tepinya blur menyatu ke background, opacity rendah (~0.3) plus glow merah blur di belakangnya. Ini murni CSS, pakai file logo yang sama dengan navbar.

### 4.3 Section "Sejarah" (full-bleed split layout)
- Layout: grid 2 kolom. Kolom kiri = teks (align ke gutter halaman), kolom kanan = visual **full-bleed sampai edge viewport** (bukan dibatasi container).
- Background section: `linear-gradient(115deg, #1c0508 0%, #0A0A0B 55%)`
- Visual kanan dibuat dari SVG inline berisi:
  - Jaringan garis + titik (representasi blockchain node)
  - Candlestick chart kecil (SVG rect/line manual, bukan library chart)
  - Simbol mata uang ($, Rp, S$) sebagai `<text>` transparan tersebar
  - Semua di-mask dengan `linear-gradient` horizontal supaya visual pudar ke arah teks (dari kanan ke kiri)
- Copy: cerita asal-mula Capital Wawan — mulai dari uang jajan SMP/SMA diputar di saham, resmi berdiri 2023, sempat aktif di komunitas Stockwise (Andry Hakim) & Akademi Crypto (Timothy Ronald), filosofi "tidak ada yang instan"

### 4.4 Section "Thesis" (mirror dari Sejarah)
- Sama seperti Sejarah tapi **dibalik**: visual di kiri (full-bleed ke edge kiri viewport), teks di kanan (align ke gutter kanan)
- Background gradient arah berlawanan: `linear-gradient(245deg, ...)`
- Visual SVG serupa (blockchain node + candlestick + simbol `%`, `$`, `Rp`, `S$`) tapi mirror posisi
- Copy: filosofi investasi — kesabaran, data bukan emosi, evaluasi fundamental saham & kripto dengan standar sama ketat

### 4.5 Section "Portfolio"
- Section head: tag "03 — Portfolio", judul "Aset inti yang sedang dikelola"
- 3 card ticker (grid 3 kolom, gap, bukan nempel):
  1. `IDX: PANI` — Pantai Indah Kapuk Dua — Equity
  2. `BTC` — Bitcoin — Digital Asset
  3. `HYPE` — Hyperliquid — Digital Asset
- Tiap card: symbol + badge kategori, nama, deskripsi singkat, mini sparkline SVG (garis zig-zag statis, bukan data real)
- **Style card: glassmorphism ala Apple** —
  ```css
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,0) 40%), rgba(20,20,22,.55);
  border: 1px solid rgba(255,255,255,.08);
  backdrop-filter: blur(20px) saturate(160%);
  box-shadow: 0 20px 50px -18px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.08);
  border-radius: 18px;
  ```
- **Hover interaction**: titik cahaya merah (radial-gradient) yang **mengikuti posisi kursor** di dalam card (butuh JS: track `mousemove`, simpan posisi ke CSS variable `--mx`/`--my`, dipakai di `background-position` pseudo-element). Card juga naik sedikit (`translateY(-4px)`) dan border menyala merah tipis saat hover.

### 4.6 Section "Founder"
- Tag "04 — Founder"
- Foto founder (`profile-wawan.png`) dengan efek:
  - Grayscale + contrast filter
  - **CSS mask-image** (bukan overlay warna): kombinasi `linear-gradient` vertikal + `radial-gradient` supaya foto float dengan tepi memudar natural (vignette), tanpa border/card kotak
  - Glow merah blur di belakang foto
  - Nama "WAWAN JANUAR" overlay di kiri-bawah foto (Archivo Expanded, besar, kata kedua warna merah)
- Teks kanan: nama, role "Founder by Family Office Capital Wawan", 4 paragraf bio (ketertarikan sejak SMP → uang jajan SMP/SMA diputar di saham SMA → fokus kripto saat kuliah → Rp100jt pertama usia 19 → komunitas Stockwise & Akademi Crypto → tetap aktif trading + usaha sampingan)

### 4.7 Section "Growth" (Track Record)
- Tag "05 — Track Record", judul "Progres nilai kekayaan berdasarkan usia"
- **Line chart SVG** (bukan bar), data usia 15–20:
  | Usia | Nilai |
  |---|---|
  | 15 | <Rp10jt |
  | 16 | >Rp15jt |
  | 17 | >Rp50jt |
  | 18 | Rp80jt |
  | 19 | Rp100jt |
  | 20 | >Rp1M |
- Garis merah dengan area gradient fill di bawahnya, animasi `stroke-dashoffset` untuk efek "gambar sendiri" saat elemen masuk viewport (pakai GSAP ScrollTrigger, bukan IntersectionObserver manual)
- Titik-titik data muncul stagger setelah garis selesai
- **Card container: glass effect sama seperti Portfolio** — background hitam pekat + backdrop-filter blur + shadow berlapis (Apple-style)
- Label bawah: grid 6 kolom (usia + nilai), border antar kolom

### 4.8 CTA Penutup
- Headline: "Believe in progress. Nothing in this world is instant." (Inggris, sengaja)
- Sub: penjelasan singkat tidak membuka pendanaan eksternal
- Tombol: "Follow IG →" (link placeholder, isi manual nanti)

### 4.9 Footer
- Logo kecil + copyright + nav links ulang

---

## 5. Animasi & Interaksi (GSAP)

1. **Scroll reveal**: elemen dengan class `.reveal` fade+translateY masuk saat scroll (ganti IntersectionObserver manual → `ScrollTrigger`)
2. **Growth chart draw-on-scroll**: line chart SVG "menggambar diri sendiri" (stroke-dashoffset animate) + area fade-in + titik stagger
3. **Hero logo mask**: statis, tidak perlu animasi scroll, cukup CSS
4. **Portfolio card hover spotlight**: JS mousemove → CSS var → radial-gradient light effect
5. Respect `prefers-reduced-motion` — matikan animasi non-esensial untuk user yang set preferensi ini

---

## 6. Struktur Folder Astro yang Disarankan

```
capital-wawan/
├── public/
│   └── assets/
│       ├── logo-cw.png
│       └── profile-wawan.png
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Sejarah.astro
│   │   ├── Thesis.astro
│   │   ├── Portfolio.astro
│   │   ├── PortfolioCard.astro       (component per-card, reusable)
│   │   ├── Founder.astro
│   │   ├── GrowthChart.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro          (head, fonts, global styles)
│   ├── styles/
│   │   └── global.css                (design tokens sebagai CSS vars + Tailwind import)
│   ├── data/
│   │   └── portfolio.ts              (array data 3 aset — biar gampang nambah/edit tanpa sentuh markup)
│   └── pages/
│       └── index.astro               (assemble semua komponen)
├── tailwind.config.mjs
├── astro.config.mjs
└── package.json
```

`portfolio.ts` contoh:
```ts
export const holdings = [
  { symbol: "IDX: PANI", category: "Equity", name: "Pantai Indah Kapuk Dua", desc: "..." },
  { symbol: "BTC", category: "Digital Asset", name: "Bitcoin", desc: "..." },
  { symbol: "HYPE", category: "Digital Asset", name: "Hyperliquid", desc: "..." },
];
```
Ini memisahkan **data** dari **layout**, jadi nanti kalau mau nambah aset ke-4 atau ganti data ke live API, cukup ubah satu file ini.

---

## 8. Deployment — GitHub Pages

Repo GitHub sudah dibuat dengan nama **`wawanjanuar.github.io`** (skema khusus GitHub: repo dengan nama ini otomatis jadi root domain `https://wawanjanuar.github.io`, tanpa domain berbayar).

**PENTING: Jangan langsung `git init` / `git push` di awal.** Selesaikan dulu semua coding dan review lokal (`npm run dev`, cek semua section, semua animasi, responsive mobile) sampai benar-benar fix. Baru setelah user secara eksplisit bilang siap, lanjut ke setup git & push. Selalu tanya dulu ke user: "Semua sudah oke, mau saya push ke GitHub sekarang?" sebelum menjalankan perintah `git init`, `git remote add`, `git commit`, atau `git push`.

Setup yang dibutuhkan (disiapkan dulu di project, TAPI belum di-push sampai user konfirmasi):

1. Di `astro.config.mjs`, tambahkan:
   ```js
   export default defineConfig({
     site: 'https://wawanjanuar.github.io',
     output: 'static'
   });
   ```

2. Buat GitHub Actions workflow di `.github/workflows/deploy.yml` supaya setiap `git push` ke branch `main` otomatis build & deploy (pakai `withastro/action` official Astro GitHub Action).

3. Di repo GitHub → Settings → Pages → Source: pilih **GitHub Actions** (bukan "Deploy from branch"). Ini juga baru dilakukan setelah push pertama.

4. `.gitignore` harus mengecualikan `node_modules/` dan `dist/` (build output di-generate otomatis oleh Actions, tidak perlu di-commit manual).

Setelah setup ini beres dan user sudah konfirmasi siap push, alur kerja rutin ke depannya cuma:
```bash
git add .
git commit -m "pesan perubahan"
git push
```
Tidak perlu build manual — GitHub Actions yang build & publish otomatis dalam ~1-2 menit.


## 9. Yang BELUM dikerjakan di tahap ini (sengaja disederhanakan dulu)
- Tidak ada CMS/database
- Tidak ada backend/API routes
- Tidak ada form contact yang benar-benar mengirim data (tombol CTA masih placeholder link)

Semua ini bisa ditambahkan bertahap setelah versi statis ini solid.
