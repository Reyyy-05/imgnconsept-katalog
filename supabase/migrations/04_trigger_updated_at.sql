-- ============================================================
-- 04: AUTO-UPDATE TRIGGER untuk updated_at
-- Jalankan setelah 03_rls_policies.sql
-- ============================================================

-- Aktifkan extension moddatetime (bawaan Supabase)
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

-- Trigger: auto-update kolom updated_at setiap kali row di-update
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION extensions.moddatetime(updated_at);

-- ============================================================
-- CATATAN:
-- Extension moddatetime sudah tersedia di Supabase secara default.
-- Trigger ini memastikan kolom updated_at selalu ter-update
-- secara otomatis saat admin mengedit produk via Dashboard.
-- ============================================================
