-- ============================================================
-- 03: ROW LEVEL SECURITY (RLS)
-- Jalankan setelah 02_indexes.sql
-- ============================================================

-- Aktifkan RLS pada tabel products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Siapapun (termasuk anonymous/anon key) bisa membaca
-- produk yang is_available = true
CREATE POLICY "Public can view available products"
  ON products
  FOR SELECT
  USING (is_available = true);

-- ============================================================
-- CATATAN PENTING:
-- ============================================================
-- 1. TIDAK perlu membuat policy INSERT/UPDATE/DELETE untuk anon.
--    Admin mengelola data melalui Supabase Dashboard yang
--    menggunakan service_role key (bypass RLS otomatis).
--
-- 2. Dengan RLS aktif, anon key HANYA bisa:
--    ✅ SELECT produk yang is_available = true
--    ❌ Tidak bisa INSERT, UPDATE, atau DELETE
--    ❌ Tidak bisa melihat produk yang is_available = false
--
-- 3. Ini melindungi data dari manipulasi melalui browser console
--    atau API call langsung menggunakan anon key.
-- ============================================================
