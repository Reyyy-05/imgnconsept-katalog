# IMGN Concept — Development Roadmap

> **Proyek**: Website Katalog Bodykit Motor CB Kustom
> **Estimasi Total**: 4–5 Hari Kerja (Solo Developer)
> **Tanggal Mulai**: 6 Mei 2026

---

## Overview

Roadmap ini dibagi menjadi **4 Phase** yang dikerjakan secara sequential. Setiap phase memiliki deliverable yang jelas dan checkpoint verifikasi sebelum lanjut ke phase berikutnya.

```
Phase 1          Phase 2           Phase 3            Phase 4
Foundation  →  Core Features  →  Polish & UX  →  Deploy & QA
[Hari 1]        [Hari 2–3]        [Hari 3–4]        [Hari 4–5]
```

---

## Phase 1: Foundation Setup (Hari 1)

> **Goal**: Semua infrastruktur & konfigurasi siap, bisa fetch data dari Supabase.

### 1.1 Dependencies & Config
- [ ] Install dependencies: `@supabase/ssr`, `zustand`
- [ ] Konfigurasi `next.config.ts` (remote images untuk Supabase Storage)
- [ ] Setup `next/font/google`: Bebas Neue + Barlow
- [ ] Setup `globals.css`: design system tokens (warna, font variables, neon glow)
- [ ] Buat `.env.local` template + `.env.example`
- [ ] Update `.gitignore` (pastikan `.env.local` ter-exclude)

### 1.2 Supabase Setup (Selesai Lebih Awal)
- [x] Buat project di Supabase Dashboard
- [x] Buat tabel `products` sesuai skema di `plan.md`
- [x] Buat indexes (category, available, sort)
- [x] Enable RLS + buat policy "Public can view available products"
- [x] Buat Storage bucket `products` (Public)
- [x] Insert 7 seed data produk (placeholder)
- [x] Upload gambar produk ke Storage (Menunggu upload admin)

### 1.3 Supabase Client
- [x] Buat `lib/supabase/server.ts` (server client factory, async cookies)
- [x] Buat `types/product.ts` (TypeScript interface)
- [x] Buat `lib/constants.ts` (WA number, sosmed links, metadata)
- [x] Buat `lib/utils.ts` (formatRupiah, generateWhatsAppMessage)

### 1.4 Verifikasi Phase 1
- [ ] `npm run dev` berjalan tanpa error
- [ ] Bisa fetch data produk dari Supabase di `page.tsx` (console.log)
- [ ] Font Bebas Neue + Barlow ter-load dengan benar
- [ ] Warna design system muncul sesuai spec

**Checkpoint**: Data mengalir dari Supabase → Server Component ✅

---

## Phase 2: Core Features (Hari 2–3)

> **Goal**: Semua section Landing Page berfungsi, cart operasional, WhatsApp checkout bekerja.

### 2.1 Layout & Navbar
- [ ] Update `app/layout.tsx` (font variables, dark mode, metadata IMGN Concept)
- [ ] Buat `components/navbar.tsx` (logo, navigasi, cart icon)
- [ ] Buat `components/cart-button.tsx` (icon + badge jumlah item, `'use client'`)

### 2.2 Hero Section
- [ ] Buat `components/hero-section.tsx` (Server Component)
- [ ] Full-bleed image container dengan overlay gelap
- [ ] Heading agresif: tipografi Bebas Neue besar
- [ ] Tagline + CTA button ("Lihat Katalog" → scroll ke section katalog)
- [ ] Placeholder hero image (Unsplash motorcycle/cafe racer)

### 2.3 Product Catalog
- [ ] Buat `components/product-grid.tsx` (Server wrapper, receives products as props)
- [ ] Buat `components/product-card.tsx` (`'use client'`, image + info + add-to-cart)
- [ ] Buat `components/category-filter.tsx` (`'use client'`, horizontal pills)
- [ ] Implementasi filter kategori (client-side state, bukan re-fetch)
- [ ] CSS Grid responsive: 1 col mobile → 2 col tablet → 3 col desktop
- [ ] `next/image` dengan `fill` + `sizes` yang akurat

### 2.4 Zustand Cart Store
- [ ] Buat `stores/cart-store.ts` (create store + persist middleware)
- [ ] Methods: addItem, removeItem, updateQuantity, clearCart
- [ ] Computed: getTotalPrice, getTotalItems
- [ ] Test: buka devtools → Application → localStorage → `imgn-cart`

### 2.5 Cart Drawer
- [ ] Buat `components/cart-drawer.tsx` (`'use client'`, slide-in dari kanan)
- [ ] Buat `components/cart-item.tsx` (gambar, nama, harga, qty +/-, hapus)
- [ ] Toggle drawer dari CartButton (state open/close)
- [ ] Overlay backdrop saat drawer terbuka
- [ ] Scroll area untuk daftar item
- [ ] Summary: total harga, total item

### 2.6 WhatsApp Checkout
- [ ] Buat `components/checkout-button.tsx` (`'use client'`)
- [ ] Generate pesan terstruktur dari cart state
- [ ] `window.open(wa.me/...)` saat tombol diklik
- [ ] Konfirmasi setelah redirect (opsi clear cart)
- [ ] Disabled state saat cart kosong

### 2.7 Footer
- [ ] Buat `components/footer.tsx` (Server Component)
- [ ] Logo/nama IMGN Concept
- [ ] Link Instagram (@astagacoki) + TikTok (@theunstoppablecoki)
- [ ] Copyright text
- [ ] Styling konsisten dengan design system

### 2.8 Verifikasi Phase 2
- [ ] Semua section terender dengan benar
- [ ] Add to cart berfungsi (produk masuk ke cart)
- [ ] Quantity bisa di-update dan di-remove
- [ ] Cart persist setelah refresh halaman
- [ ] Filter kategori bekerja
- [ ] WhatsApp link terbuka dengan pesan yang benar
- [ ] Responsive di mobile, tablet, desktop

**Checkpoint**: Semua fitur inti berjalan end-to-end ✅

---

## Phase 3: Polish & UX (Hari 3–4)

> **Goal**: Visual premium, animasi smooth, edge case tertangani, aksesibilitas dasar.

### 3.1 Visual Polish
- [ ] Hover neon glow effect pada ProductCard (box-shadow + border transition)
- [ ] Subtle grain/noise overlay pada background
- [ ] Cart drawer slide-in animation (transform + transition)
- [ ] Staggered fade-in animasi saat product grid muncul
- [ ] Hero section parallax/overlay effect
- [ ] Neon text glow pada heading dan aksen

### 3.2 Micro-Interactions
- [ ] Add-to-cart feedback (brief visual pulse/confirmation)
- [ ] Quantity button hover + active states
- [ ] Cart badge counter animation saat berubah
- [ ] Smooth scroll ke katalog dari CTA hero
- [ ] Loading skeleton untuk product grid (Suspense fallback)

### 3.3 Edge Cases
- [ ] Empty cart state (tampilan "Keranjang kosong" + CTA)
- [ ] Produk tanpa gambar (fallback placeholder image)
- [ ] Error handling fetch Supabase (error boundary / fallback UI)
- [ ] Cart item dengan quantity 0 auto-remove
- [ ] Sangat banyak item di cart (scroll area)

### 3.4 SEO & Metadata
- [ ] `generateMetadata` atau static metadata di layout.tsx
- [ ] Title: "IMGN Concept — Spesialis Bodykit Motor CB Kustom"
- [ ] Meta description yang compelling
- [ ] Open Graph tags (title, description, image)
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
- [ ] Single `<h1>` per halaman

### 3.5 Aksesibilitas Dasar
- [ ] Alt text pada semua images
- [ ] Keyboard navigation pada cart drawer (focus trap)
- [ ] ARIA labels pada interactive elements
- [ ] Sufficient color contrast (neon green on black)
- [ ] Cart drawer: ESC key untuk close

### 3.6 Custom 404
- [ ] Buat `app/not-found.tsx` dengan styling IMGN Concept

### 3.7 Verifikasi Phase 3
- [ ] Animasi smooth di 60fps (no jank)
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] Responsive check: iPhone SE, iPhone 14, iPad, Desktop 1440p
- [ ] Semua edge case tertangani tanpa crash

**Checkpoint**: Production-quality visual & UX ✅

---

## Phase 4: Deployment & QA (Hari 4–5)

> **Goal**: Live di Vercel, semua berfungsi di production.

### 4.1 Pre-Deployment Checklist
- [ ] `npm run build` berhasil tanpa error/warning
- [ ] Semua environment variables tercatat di `.env.example`
- [ ] `README.md` lengkap
- [ ] `.gitignore` benar (exclude `.env.local`, `node_modules`, `.next`)

### 4.2 Vercel Deployment
- [ ] Push ke GitHub repository
- [ ] Connect repo ke Vercel
- [ ] Set environment variables di Vercel Dashboard
- [ ] Deploy + pastikan build berhasil
- [ ] Verifikasi live URL berfungsi

### 4.3 Supabase Production Config
- [ ] Pastikan RLS aktif dan policy benar
- [ ] Pastikan Storage bucket `products` bersifat Public
- [ ] Pastikan `anon` key hanya bisa SELECT produk available
- [ ] Test: coba akses tabel dari browser console (harus ditolak kecuali SELECT)

### 4.4 QA Checklist (Production)
- [ ] Landing page load < 3 detik
- [ ] Gambar produk ter-load dari Supabase Storage
- [ ] Add to cart berfungsi
- [ ] Cart persist setelah refresh
- [ ] Filter kategori bekerja
- [ ] WhatsApp checkout menghasilkan pesan yang benar
- [ ] WhatsApp link terbuka ke nomor yang benar
- [ ] Responsive: test di real device (mobile)
- [ ] No console errors di production

### 4.5 Handover ke Admin
- [ ] Dokumentasi cara mengelola produk via Supabase Dashboard
- [ ] Dokumentasi cara upload gambar ke Storage
- [ ] Dokumentasi format `image_url` (URL lengkap dari Storage)
- [ ] Dokumentasi field `is_available` untuk show/hide produk
- [ ] Dokumentasi field `sort_order` untuk urutan tampil

### 4.6 Verifikasi Phase 4
- [ ] Website live dan accessible via Vercel URL
- [ ] Admin bisa menambah/edit/hapus produk via Supabase Dashboard
- [ ] Perubahan produk di Supabase langsung tercermin di website
- [ ] WhatsApp checkout end-to-end verified

**Checkpoint**: Production deployment complete ✅

---

## Summary Timeline

```
Hari 1  │ Phase 1: Foundation Setup
        │ → Dependencies, Supabase, client factory, design tokens
        │
Hari 2  │ Phase 2: Core Features (Part 1)
        │ → Layout, Navbar, Hero, Product Grid, Category Filter
        │
Hari 3  │ Phase 2: Core Features (Part 2) + Phase 3 Start
        │ → Cart Store, Cart Drawer, WA Checkout, Footer
        │ → Visual polish begins
        │
Hari 4  │ Phase 3: Polish & UX (Complete)
        │ → Animations, edge cases, SEO, accessibility
        │
Hari 5  │ Phase 4: Deployment & QA
        │ → Build, deploy Vercel, production QA, admin handover
```

---

## Risk & Mitigation

| Risk | Impact | Mitigasi |
|---|---|---|
| Supabase free tier rate limit | Medium | Implementasi caching / ISR di Next.js |
| Gambar produk terlalu besar | High (LCP) | Enforce WebP, max 500KB per image, `next/image` optimization |
| Zustand hydration mismatch | Medium | `persist` + `skipHydration` pattern jika perlu |
| WhatsApp link tidak bisa dibuka di desktop | Low | Fallback ke `web.whatsapp.com` |
| Font loading lambat | Medium | `next/font` self-hosting + `display: swap` |
