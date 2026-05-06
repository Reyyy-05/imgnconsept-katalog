# IMGN Concept — Implementation Plan

> **Proyek**: Website Katalog & Pemesanan Bodykit Motor CB Kustom
> **Entitas Bisnis**: IMGN Concept
> **Tanggal**: 6 Mei 2026
> **Status**: Draft — Menunggu Approval

---

## 1. Ringkasan Proyek

IMGN Concept adalah toko spesialis bodykit motor CB kustom. Website ini berfungsi sebagai:

- **Landing Page** sekaligus **Katalog Utama** produk bodykit
- Fitur **Add to Cart** di sisi klien (client-side state management via Zustand)
- **Checkout via WhatsApp** — mengonversi isi keranjang menjadi pesan terstruktur lalu redirect ke WA Admin

Website ini BUKAN e-commerce tradisional. Tidak ada payment gateway, tidak ada user authentication, dan tidak ada custom admin dashboard. Semua manajemen data dilakukan langsung melalui **Supabase Dashboard**.

---

## 2. Tech Stack

| Layer | Teknologi | Versi | Alasan |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 | SSR/SSG, Image Optimization, RSC |
| Runtime | React | 19.2.4 | Server Components, async APIs |
| Styling | Tailwind CSS | v4 | `@theme inline`, zero-config PostCSS |
| Database | Supabase (PostgreSQL) | Latest | Free tier, real-time, Storage, Dashboard UI |
| State Mgmt | Zustand | Latest | Lightweight, cart-only state |
| Supabase Client | `@supabase/ssr` | Latest | Cookie-aware, async `cookies()` untuk Next.js 16 |
| Deployment | Vercel | Free tier | Native Next.js support |
| Font | `next/font/google` | Built-in | Zero-CLS, self-hosted |

---

## 3. Arsitektur & Design Decisions

### 3.1 Server Components First

```
┌─────────────────────────────────────────────────┐
│              app/page.tsx (Server)               │
│                                                  │
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │ HeroSection │  │ ProductGrid (Server)     │   │
│  │ (Server)    │  │  ┌───────────────────┐   │   │
│  └─────────────┘  │  │ ProductCard       │   │   │
│                   │  │ ('use client')    │   │   │
│                   │  │ → Add to Cart btn │   │   │
│                   │  └───────────────────┘   │   │
│                   └─────────────────────────┘   │
│  ┌─────────────────┐  ┌────────────────────┐    │
│  │ CartDrawer      │  │ Footer (Server)    │    │
│  │ ('use client')  │  └────────────────────┘    │
│  │ → Zustand state │                             │
│  └─────────────────┘                             │
└─────────────────────────────────────────────────┘
```

**Prinsip:**
- Data produk di-fetch di **Server Component** (`page.tsx`) — zero client-side waterfall, SEO-friendly
- `'use client'` hanya pada komponen interaktif: `ProductCard`, `CartDrawer`, `CategoryFilter`
- Zustand **hanya** mengelola state keranjang — bukan data produk
- Data produk diteruskan ke client component sebagai props (serializable plain objects)

### 3.2 Supabase SSR Client

Menggunakan `@supabase/ssr` dengan async `cookies()` untuk kompatibilitas Next.js 16:

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies() // async di Next.js 16!
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### 3.3 Zustand Cart Store

- **Persist middleware** → `localStorage` (key: `imgn-cart`)
- Methods: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`, `getTotalPrice()`, `getTotalItems()`
- Setiap item: `id`, `name`, `price`, `image_url`, `quantity`
- State bertahan saat user refresh halaman

### 3.4 WhatsApp Checkout Flow

```
User klik "Pesan Sekarang"
  → Generate pesan terstruktur (daftar item, qty, harga, total)
  → encodeURIComponent(message)
  → window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`)
  → Tampilkan konfirmasi + opsi clear cart
```

Format pesan yang dihasilkan:
```
Halo IMGN Concept! 👋
Saya ingin memesan:

1. CB Fairing Set V2 (x1) — Rp 2.500.000
2. Tangki Custom Flat (x2) — Rp 3.000.000

Total: Rp 5.500.000
Terima kasih! 🏍️
```

---

## 4. Database Schema

### 4.1 Tabel `products`

```sql
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
```

**Catatan Skema:**
- `NUMERIC(12, 0)`: Harga Rupiah tanpa desimal (presisi Rp 999.999.999.999)
- Partial index `idx_products_available` hanya index produk aktif — lebih efisien
- `slug` UNIQUE untuk identifikasi URL-friendly tanpa expose UUID
- `moddatetime` trigger untuk auto-update `updated_at`

### 4.2 Row Level Security (RLS)

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available products"
  ON products FOR SELECT
  USING (is_available = true);
```

Admin bypass RLS via Supabase Dashboard (service_role key).

### 4.3 Seed Data (7 Produk Placeholder)

| name | slug | category | price (Rp) |
|---|---|---|---|
| CB Fairing Set V1 | cb-fairing-set-v1 | Fairing | 2.500.000 |
| CB Fairing Set V2 | cb-fairing-set-v2 | Fairing | 3.000.000 |
| Tangki Custom Flat | tangki-custom-flat | Tangki | 1.500.000 |
| Tangki Custom Teardrop | tangki-custom-teardrop | Tangki | 1.800.000 |
| Full Body Set Aggressive | full-body-set-aggressive | Body Set | 5.500.000 |
| Fender Eliminator Kit | fender-eliminator-kit | Aksesoris | 450.000 |
| Engine Guard Custom | engine-guard-custom | Aksesoris | 750.000 |

> Nama dan harga adalah **placeholder**. Admin akan mengganti via Supabase Dashboard.

---

## 5. Image Optimization Strategy

### 5.1 Supabase Storage
- Bucket: `products` (Public)
- Format rekomendasi: WebP
- Naming convention: `{slug}.webp`

### 5.2 next.config.ts — Remote Images

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/storage/v1/object/public/**',
    }],
  },
};
```

### 5.3 Component Best Practices

| Konteks | Props | Alasan |
|---|---|---|
| Hero image | `priority`, `sizes="100vw"` | LCP optimal, preloaded |
| Product card | `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` | Ukuran tepat per breakpoint |
| Semua | `fill` + parent `relative` | Aspect ratio konsisten |
| Non-hero | Default lazy loading | Bandwidth efisien |

---

## 6. Design System — Gaya LBWK (Liberty Walk)

### 6.1 Prinsip Visual

| Aspek | Implementasi |
|---|---|
| **Tema** | Dark mode absolut — `#000000`, bukan abu-abu gelap |
| **Aksen** | Neon Green `#39FF14` sebagai highlight utama |
| **Tipografi** | Bebas Neue (headings) + Barlow (body) via `next/font/google` |
| **Efek** | Neon glow hover, text-shadow, subtle grain overlay |
| **Layout** | Full-bleed hero, grid katalog, card dengan border neon subtle |
| **Animasi** | Staggered reveal scroll, hover scale + glow pada cards |

### 6.2 CSS Variables (Tailwind v4 `@theme inline`)

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --neon-green: #39FF14;
  --neon-green-dim: #2bcc10;
  --neon-glow: 0 0 10px #39FF14, 0 0 40px rgba(57, 255, 20, 0.3);
  --card-bg: #0a0a0a;
  --card-border: #1a1a1a;
  --text-muted: #888888;
}
```

### 6.3 Font Setup

```typescript
// app/layout.tsx
import { Bebas_Neue, Barlow } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400', subsets: ['latin'],
  variable: '--font-bebas-neue', display: 'swap',
})

const barlow = Barlow({
  weight: ['400', '500', '600', '700'], subsets: ['latin'],
  variable: '--font-barlow', display: 'swap',
})
```

---

## 7. Folder Structure

```
LBRN_katalog/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, CartDrawer)
│   ├── page.tsx            # Landing page (Server: fetch products)
│   ├── globals.css         # Design system tokens + global styles
│   └── not-found.tsx       # Custom 404
├── components/
│   ├── hero-section.tsx    # Hero banner (Server)
│   ├── product-grid.tsx    # Product listing wrapper (Server)
│   ├── product-card.tsx    # Card + add-to-cart ('use client')
│   ├── category-filter.tsx # Filter pills ('use client')
│   ├── cart-drawer.tsx     # Side drawer cart ('use client')
│   ├── cart-item.tsx       # Item di cart ('use client')
│   ├── cart-button.tsx     # Floating/navbar cart icon ('use client')
│   ├── checkout-button.tsx # Tombol WA checkout ('use client')
│   ├── footer.tsx          # Footer sosmed (Server)
│   └── navbar.tsx          # Navbar (Server + client cart icon)
├── lib/
│   ├── supabase/server.ts  # Supabase server client factory
│   ├── utils.ts            # Formatters (harga, WA message generator)
│   └── constants.ts        # WA number, sosmed links, site config
├── stores/
│   └── cart-store.ts       # Zustand cart store with persist
├── types/
│   └── product.ts          # TypeScript Product interface
└── public/
    └── products/           # Local product images (fallback)
```

---

## 8. Section Breakdown

| Section | Type | Fitur Utama |
|---|---|---|
| **Navbar** | Server + Client partial | Logo IMGN, Cart icon dengan badge jumlah item |
| **Hero** | Server | Full-bleed image, heading agresif, CTA scroll ke katalog |
| **CategoryFilter** | Client | Horizontal pills, filter product grid client-side |
| **ProductGrid** | Server wrapper | CSS Grid: 1→2→3 kolom (responsive) |
| **ProductCard** | Client | Image, nama, harga, tombol tambah, hover neon glow |
| **CartDrawer** | Client | Drawer kanan, daftar item, qty control, total, checkout btn |
| **Footer** | Server | Logo, tagline, IG + TikTok links, copyright |

---

## 9. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_WA_NUMBER=6288216176460
NEXT_PUBLIC_SITE_URL=https://imgnconcept.vercel.app
```

> ⚠️ JANGAN simpan `SUPABASE_SERVICE_ROLE_KEY` di environment frontend.

---

## 10. Performance Targets

| Metric | Target | Strategi |
|---|---|---|
| **LCP** | < 2.5s | Hero `priority`, font `display: swap` |
| **FID/INP** | < 100ms | Minimal client JS, Zustand ~1KB |
| **CLS** | < 0.1 | `next/image` dimensi eksplisit |
| **Bundle Size** | < 80KB first load | RSC, tree-shaking |
| **Lighthouse** | > 90 | SSR, semantic HTML, image optimization |

---

## 11. Out of Scope

- ❌ User authentication / registrasi
- ❌ Custom admin dashboard di Next.js
- ❌ Payment gateway
- ❌ Order tracking system
- ❌ Multi-bahasa (i18n)
- ❌ Full-text search (cukup filter kategori)
- ❌ Product detail page (single-page catalog saja)
- ❌ Wishlist / favorit
