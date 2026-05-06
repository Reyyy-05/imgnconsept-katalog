// ─── Site Configuration ────────────────────────────────────────
export const SITE_CONFIG = {
  name: "IMGN Concept",
  tagline: "Spesialis Bodykit Motor CB Kustom",
  description:
    "IMGN Concept — Toko spesialis bodykit motor CB kustom. Fairing, tangki, body set, dan aksesoris berkualitas tinggi untuk Honda CB.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const

// ─── WhatsApp ──────────────────────────────────────────────────
export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6288216176460"

// ─── Social Media ──────────────────────────────────────────────
export const SOCIAL_LINKS = {
  instagram: {
    url: "https://instagram.com/astagacoki",
    handle: "@astagacoki",
  },
  tiktok: {
    url: "https://tiktok.com/@theunstoppablecoki",
    handle: "@theunstoppablecoki",
  },
} as const

// ─── Product Categories (for seed reference) ──────────────────
export const DEFAULT_CATEGORIES = [
  "Fairing",
  "Tangki",
  "Body Set",
  "Aksesoris",
] as const

// ─── Placeholder Hero Image ───────────────────────────────────
export const HERO_IMAGE =
  "https://picsum.photos/id/671/1920/1080"

// ─── Fallback Product Image ───────────────────────────────────
export const FALLBACK_PRODUCT_IMAGE = "/products/placeholder.svg"
