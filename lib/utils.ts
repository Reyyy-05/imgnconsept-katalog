import { WA_NUMBER, SITE_CONFIG } from "./constants"

// ─── Currency Formatter ────────────────────────────────────────

/**
 * Format a number as Indonesian Rupiah.
 * Example: 2500000 → "Rp 2.500.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── WhatsApp Message Generator ────────────────────────────────

interface OrderItem {
  name: string
  quantity: number
  price: number
}

/**
 * Generate a structured WhatsApp order message from cart items.
 * Returns the full wa.me URL ready to open.
 */
export function generateWhatsAppURL(items: OrderItem[]): string {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} (x${item.quantity}) — ${formatRupiah(item.price * item.quantity)}`
    )
    .join("\n")

  const message = `Halo ${SITE_CONFIG.name}! 👋
Saya ingin memesan:

${itemLines}

Total: ${formatRupiah(totalPrice)}
Terima kasih! 🏍️`

  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`
}

// ─── Slug Generator ────────────────────────────────────────────

/**
 * Convert a product name to a URL-friendly slug.
 * Example: "CB Fairing Set V2" → "cb-fairing-set-v2"
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ─── CSS Class Helper ──────────────────────────────────────────

/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to clsx/cn for this project.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

// ─── Image URL Helper ──────────────────────────────────────────

/**
 * Sanitize product image URL.
 * If it's absolute (http/https), return as is.
 * If it starts with "/", return as is.
 * If it's just a filename, prepend "/products/".
 */
export function getImageUrl(url: string | null | undefined, fallback: string): string {
  if (!url) return fallback

  // Strip accidental https:// or http:// prefix if the user added it to a local filename
  // Example: "https://product1.jpeg" -> "product1.jpeg"
  const cleanUrl = url.replace(/^https?:\/\/(?=product\d+\.jpe?g)/i, "")

  if (cleanUrl.startsWith("http")) return cleanUrl
  if (cleanUrl.startsWith("/")) return cleanUrl
  return `/products/${cleanUrl}`
}
