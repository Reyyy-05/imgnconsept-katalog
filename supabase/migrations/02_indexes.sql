-- ============================================================
-- 02: INDEXES
-- Jalankan setelah 01_create_table.sql
-- ============================================================

-- Index untuk filter berdasarkan kategori
CREATE INDEX idx_products_category
  ON products (category);

-- Partial index: hanya index produk yang tersedia (lebih efisien)
CREATE INDEX idx_products_available
  ON products (is_available)
  WHERE is_available = true;

-- Index untuk pengurutan tampilan katalog
CREATE INDEX idx_products_sort
  ON products (sort_order ASC, created_at DESC);
