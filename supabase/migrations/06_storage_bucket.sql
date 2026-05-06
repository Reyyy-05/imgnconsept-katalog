-- ============================================================
-- 06: SETUP STORAGE BUCKET
-- Jalankan setelah seed data
-- ============================================================
-- CATATAN:
-- Bucket Storage TIDAK bisa dibuat via SQL biasa.
-- Gunakan salah satu cara berikut:
-- ============================================================

-- CARA 1: Via Supabase Dashboard (RECOMMENDED)
-- 1. Buka Supabase Dashboard → Storage
-- 2. Klik "New Bucket"
-- 3. Nama bucket: products
-- 4. Centang "Public bucket" ✅
-- 5. Klik "Create bucket"
-- 6. Upload gambar produk ke bucket ini

-- CARA 2: Via SQL (insert langsung ke tabel system)
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Siapapun bisa melihat/download file dari bucket products
CREATE POLICY "Public can view product images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'products');

-- ============================================================
-- SETELAH UPLOAD GAMBAR:
-- ============================================================
-- Update kolom image_url di tabel products dengan URL dari Storage.
-- Format URL:
--   https://<project-id>.supabase.co/storage/v1/object/public/products/<nama-file>
--
-- Contoh:
--   UPDATE products
--   SET image_url = 'https://abcdef.supabase.co/storage/v1/object/public/products/cb-fairing-set-v1.webp'
--   WHERE slug = 'cb-fairing-set-v1';
-- ============================================================
