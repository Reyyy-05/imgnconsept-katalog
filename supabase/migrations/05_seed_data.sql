-- ============================================================
-- 05: SEED DATA (7 Produk Placeholder)
-- Jalankan setelah semua migration di atas selesai
-- ============================================================
-- CATATAN:
-- - Harga, nama, dan deskripsi adalah PLACEHOLDER
-- - Ganti image_url setelah upload gambar ke Supabase Storage
-- - Format image_url dari Storage:
--   https://<project-id>.supabase.co/storage/v1/object/public/products/<nama-file>.webp
-- ============================================================

INSERT INTO products (name, slug, description, price, image_url, category, is_available, sort_order) VALUES

(
  'CB Fairing Set V1',
  'cb-fairing-set-v1',
  'Set fairing lengkap untuk Honda CB dengan desain racing agresif. Material ABS premium, finishing cat berkualitas tinggi.',
  2500000,
  NULL,
  'Fairing',
  true,
  0
),

(
  'CB Fairing Set V2',
  'cb-fairing-set-v2',
  'Evolusi desain fairing V2 dengan garis aerodinamis dan air intake fungsional. Lebih ringan, lebih agresif.',
  3000000,
  NULL,
  'Fairing',
  true,
  1
),

(
  'Tangki Custom Flat',
  'tangki-custom-flat',
  'Tangki flat tracker style untuk tampilan minimalis dan bersih. Kapasitas 12 liter, dilengkapi petcock dan cap custom.',
  1500000,
  NULL,
  'Tangki',
  true,
  2
),

(
  'Tangki Custom Teardrop',
  'tangki-custom-teardrop',
  'Tangki teardrop classic untuk nuansa cafe racer otentik. Kapasitas 14 liter, knee grip panel terintegrasi.',
  1800000,
  NULL,
  'Tangki',
  true,
  3
),

(
  'Full Body Set Aggressive',
  'full-body-set-aggressive',
  'Paket body set lengkap: fairing, tangki, side cover, tail section. Transformasi total Honda CB kamu menjadi street fighter.',
  5500000,
  NULL,
  'Body Set',
  true,
  4
),

(
  'Fender Eliminator Kit',
  'fender-eliminator-kit',
  'Kit penghilang fender belakang untuk tampilan clean dan sporty. Termasuk bracket lampu dan dudukan plat nomor.',
  450000,
  NULL,
  'Aksesoris',
  true,
  5
),

(
  'Engine Guard Custom',
  'engine-guard-custom',
  'Pelindung mesin custom dari besi pipa tebal. Desain industrial, melindungi mesin dari benturan dan jatuh.',
  750000,
  NULL,
  'Aksesoris',
  true,
  6
);

-- ============================================================
-- VERIFIKASI: Jalankan query ini untuk memastikan data masuk
-- ============================================================
-- SELECT id, name, slug, category, price, is_available
-- FROM products
-- ORDER BY sort_order ASC;
-- ============================================================
