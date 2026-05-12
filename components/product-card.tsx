"use client"

import Image from "next/image"
import type { Product } from "@/types/product"
import { useCartStore } from "@/stores/cart-store"
import { formatRupiah, cn, getImageUrl } from "@/lib/utils"
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/constants"
import { useState, useCallback, useEffect } from "react"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const [isAdded, setIsAdded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    })
    setIsAdded(true)
    openCart()
    setTimeout(() => setIsAdded(false), 1200)
  }

  const imageUrl = getImageUrl(product.image_url, FALLBACK_PRODUCT_IMAGE)

  // Close lightbox on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
    },
    []
  )

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen, handleKeyDown])

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border border-card-border bg-card-bg",
          "accent-glow-hover opacity-0 animate-fade-in-up"
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image Container — object-contain so full image is visible */}
        <div
          className="relative aspect-[4/3] overflow-hidden bg-black/40 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category badge */}
          <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm">
            {product.category}
          </span>
          {/* Zoom hint */}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            Perbesar
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-xl uppercase tracking-wide text-white">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm leading-relaxed text-muted line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            {/* Price */}
            <span className="font-body text-lg font-bold text-accent">
              {formatRupiah(product.price)}
            </span>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                isAdded
                  ? "border-accent bg-accent text-white"
                  : "border-accent/50 bg-transparent text-accent hover:border-accent hover:bg-accent hover:text-white"
              )}
            >
              {isAdded ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Ditambahkan
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Keranjang
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <button
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false) }}
            aria-label="Tutup gambar"
          >
            ✕
          </button>
          <img
            src={imageUrl}
            alt={product.name}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="lightbox-product-name">{product.name}</span>
        </div>
      )}
    </>
  )
}
