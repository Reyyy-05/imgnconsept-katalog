"use client"

import Image from "next/image"
import type { Product } from "@/types/product"
import { useCartStore } from "@/stores/cart-store"
import { formatRupiah, cn, getImageUrl } from "@/lib/utils"
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/constants"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const [isAdded, setIsAdded] = useState(false)

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

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-card-border bg-card-bg",
        "neon-glow-hover opacity-0 animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={getImageUrl(product.image_url, FALLBACK_PRODUCT_IMAGE)}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-neon backdrop-blur-sm">
          {product.category}
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
          <span className="font-body text-lg font-bold text-neon">
            {formatRupiah(product.price)}
          </span>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
              isAdded
                ? "border-neon bg-neon text-black"
                : "border-neon/50 bg-transparent text-neon hover:border-neon hover:bg-neon hover:text-black"
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
  )
}
