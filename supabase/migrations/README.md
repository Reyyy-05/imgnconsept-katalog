# Supabase SQL Migrations

Folder ini berisi file SQL yang harus dijalankan **berurutan** di **Supabase Dashboard → SQL Editor**.

## Urutan Eksekusi

| # | File | Fungsi |
|---|---|---|
| 1 | `01_create_table.sql` | Membuat tabel `products` dengan semua kolom |
| 2 | `02_indexes.sql` | Menambahkan index untuk performa query |
| 3 | `03_rls_policies.sql` | Mengaktifkan Row Level Security + policy |
| 4 | `04_trigger_updated_at.sql` | Auto-update `updated_at` saat edit data |
| 5 | `05_seed_data.sql` | Insert 7 produk placeholder |
| 6 | `06_storage_bucket.sql` | Setup bucket Storage untuk gambar produk |

## Cara Pakai

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Klik **New Query**
3. Copy-paste isi file `01_create_table.sql` → klik **Run**
4. Ulangi untuk file `02` sampai `06` **secara berurutan**

> ⚠️ **File `06_storage_bucket.sql`**: Untuk membuat bucket, disarankan menggunakan **Dashboard → Storage → New Bucket** (lebih reliable). SQL-nya tersedia sebagai alternatif.

## Setelah Semua Selesai

1. **Upload gambar** ke bucket `products` di Storage
2. **Update `image_url`** setiap produk di Table Editor dengan URL gambar dari Storage
3. **Salin** `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari **Settings → API** ke file `.env.local`

## Verifikasi

Jalankan query ini di SQL Editor untuk memastikan semuanya benar:

```sql
-- Cek data produk
SELECT id, name, slug, category, price, is_available
FROM products
ORDER BY sort_order ASC;

-- Cek RLS aktif
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'products';

-- Cek policies
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'products';
```
