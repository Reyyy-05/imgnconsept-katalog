# IMGN Concept — Bodykit Motor CB Kustom

<div align="center">

**Website Katalog & Pemesanan via WhatsApp**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

</div>

---

## 📋 Deskripsi

**IMGN Concept** adalah website katalog untuk toko spesialis bodykit motor CB kustom. Website ini berfungsi sebagai landing page sekaligus katalog produk interaktif, dilengkapi fitur keranjang belanja (Add to Cart) di sisi klien dan sistem checkout yang terhubung langsung ke WhatsApp Admin.

### Fitur Utama

- 🏍️ **Landing Page + Katalog** — Tampilan produk bodykit dengan visual bold ala Liberty Walk
- 🛒 **Add to Cart** — State management di browser (Zustand + localStorage persist)
- 📱 **Checkout via WhatsApp** — Pesan terstruktur dikirim otomatis ke WA Admin
- 🔍 **Filter Kategori** — Filter produk berdasarkan kategori (Fairing, Tangki, Body Set, Aksesoris)
- ⚡ **Performa Tinggi** — Server Components, optimasi gambar via `next/image`, minimal client JS
- 🎨 **Dark Mode Agresif** — Tema hitam pekat dengan aksen Neon Green (#39FF14)

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Framework fullstack, SSR, Image Optimization |
| [React 19](https://react.dev) | Server Components, async APIs |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling dengan `@theme inline` |
| [Supabase](https://supabase.com) | Database PostgreSQL + Storage gambar |
| [Zustand](https://zustand-demo.pmnd.rs) | Client-side state management (cart) |
| [Vercel](https://vercel.com) | Hosting & deployment |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (disarankan 20+)
- npm / pnpm / bun
- Akun [Supabase](https://supabase.com) (free tier)
- Akun [Vercel](https://vercel.com) (untuk deployment)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/LBRN_katalog.git
cd LBRN_katalog
npm install
```

### 2. Setup Environment Variables

Salin file environment template:

```bash
cp .env.example .env.local
```

Isi dengan kredensial Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
NEXT_PUBLIC_WA_NUMBER=6288216176460
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Setup Database Supabase

Jalankan SQL berikut di **Supabase Dashboard → SQL Editor**:

```sql
-- Buat tabel products
CREATE TABLE products (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT,
  price        NUMERIC(12, 0) NOT NULL DEFAULT 0,
  image_url    TEXT,
  category     TEXT NOT NULL DEFAULT 'Aksesoris',
  is_available BOOLEAN NOT NULL DEFAULT true,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_available ON products (is_available) WHERE is_available = true;
CREATE INDEX idx_products_sort ON products (sort_order, created_at DESC);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: public bisa baca produk yang tersedia
CREATE POLICY "Public can view available products"
  ON products FOR SELECT
  USING (is_available = true);
```

### 4. Setup Supabase Storage

1. Buka **Supabase Dashboard → Storage**
2. Buat bucket baru bernama `products`
3. Set sebagai **Public bucket**
4. Upload gambar produk (format WebP direkomendasikan)

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Folder

```
LBRN_katalog/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Landing page (Server Component)
│   ├── globals.css         # Design system tokens
│   └── not-found.tsx       # Custom 404
├── components/
│   ├── hero-section.tsx    # Hero banner
│   ├── product-grid.tsx    # Grid katalog produk
│   ├── product-card.tsx    # Card produk individual
│   ├── category-filter.tsx # Filter kategori
│   ├── cart-drawer.tsx     # Drawer keranjang
│   ├── cart-button.tsx     # Tombol cart di navbar
│   ├── checkout-button.tsx # Tombol checkout WhatsApp
│   ├── footer.tsx          # Footer
│   └── navbar.tsx          # Navigasi
├── lib/
│   ├── supabase/server.ts  # Supabase server client
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Konfigurasi
├── stores/
│   └── cart-store.ts       # Zustand cart store
├── types/
│   └── product.ts          # TypeScript types
└── public/
    └── products/           # Gambar fallback
```

---

## 🛒 Flow Pemesanan

```
┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ User memilih    │ ───▶ │ Klik "Tambah ke  │ ───▶ │ Item masuk ke   │
│ produk di       │      │ Keranjang"       │      │ Cart (Zustand +  │
│ katalog         │      │                  │      │ localStorage)    │
└─────────────────┘      └──────────────────┘      └────────┬─────────┘
                                                            │
┌─────────────────┐      ┌──────────────────┐              │
│ WhatsApp Admin  │ ◀─── │ Redirect ke      │ ◀────────────┘
│ menerima pesan  │      │ wa.me dengan     │   User klik
│ pesanan         │      │ pesan terstruktur│   "Pesan Sekarang"
└─────────────────┘      └──────────────────┘
```

Format pesan WhatsApp yang dihasilkan:

```
Halo IMGN Concept! 👋
Saya ingin memesan:

1. CB Fairing Set V2 (x1) — Rp 2.500.000
2. Tangki Custom Flat (x2) — Rp 3.000.000

Total: Rp 5.500.000
Terima kasih! 🏍️
```

---

## 🎨 Design System

| Aspek | Detail |
|---|---|
| **Tema** | Dark mode absolut (`#000000`) |
| **Aksen** | Neon Green `#39FF14` |
| **Font Heading** | Bebas Neue (bold, condensed) |
| **Font Body** | Barlow (clean, industrial) |
| **Efek** | Neon glow hover, subtle grain overlay |
| **Inspirasi** | [Liberty Walk (LBWK)](https://libertywalk.co.jp) |

---

## 📊 Manajemen Produk (Admin)

Semua manajemen data dilakukan melalui **Supabase Dashboard** — tidak ada custom admin panel.

### Menambah Produk Baru

1. Buka **Supabase Dashboard → Table Editor → products**
2. Klik **Insert Row**
3. Isi field:
   - `name`: Nama produk
   - `slug`: URL-friendly name (contoh: `cb-fairing-set-v3`)
   - `description`: Deskripsi produk
   - `price`: Harga dalam Rupiah (tanpa titik/koma, contoh: `2500000`)
   - `category`: Salah satu dari: `Fairing`, `Tangki`, `Body Set`, `Aksesoris` (atau custom)
   - `image_url`: URL gambar dari Supabase Storage
   - `is_available`: `true` untuk tampilkan, `false` untuk sembunyikan
   - `sort_order`: Angka urutan (0 = paling atas)

### Upload Gambar Produk

1. Buka **Supabase Dashboard → Storage → products**
2. Upload file gambar (format WebP, max 500KB direkomendasikan)
3. Klik file yang di-upload → **Copy URL**
4. Paste URL ke field `image_url` produk terkait

### Menyembunyikan Produk

Set `is_available` ke `false` — produk tidak akan tampil di website tetapi data tetap tersimpan.

---

## 🌐 Deployment (Vercel)

### 1. Push ke GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repository GitHub
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WA_NUMBER`
   - `NEXT_PUBLIC_SITE_URL`
4. Klik **Deploy**

### 3. Custom Domain (Opsional)

Setelah deploy berhasil, tambahkan custom domain di **Vercel Dashboard → Settings → Domains**.

---

## 📱 Sosial Media

| Platform | Akun |
|---|---|
| Instagram | [@astagacoki](https://instagram.com/astagacoki) |
| TikTok | [@theunstoppablecoki](https://tiktok.com/@theunstoppablecoki) |

---

## 📄 Dokumen Terkait

| Dokumen | Deskripsi |
|---|---|
| [plan.md](./plan.md) | Implementation plan & arsitektur teknis |
| [roadmap.md](./roadmap.md) | Development roadmap & timeline |

---

## 📝 License

Private project — All rights reserved © IMGN Concept 2026
