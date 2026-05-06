-- ============================================================
-- 01: CREATE TABLE products
-- Jalankan pertama di Supabase SQL Editor
-- ============================================================

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

-- Komentar tabel
COMMENT ON TABLE products IS 'Katalog produk bodykit IMGN Concept';
COMMENT ON COLUMN products.slug IS 'URL-friendly identifier unik (contoh: cb-fairing-set-v1)';
COMMENT ON COLUMN products.price IS 'Harga dalam Rupiah tanpa desimal';
COMMENT ON COLUMN products.is_available IS 'false = produk tersembunyi dari katalog publik';
COMMENT ON COLUMN products.sort_order IS 'Urutan tampil di katalog (0 = paling atas)';
