"use client"

import Image from "next/image"
import type { CartItem } from "@/stores/cart-store"
import { useCartStore } from "@/stores/cart-store"
import { formatRupiah, getImageUrl } from "@/lib/utils"
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/constants"

interface CartItemRowProps {
  item: CartItem
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex gap-4 border-b border-card-border py-4">
      {/* Thumbnail */}
      <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-lg bg-black/40">
        <Image
          src={getImageUrl(item.image_url, FALLBACK_PRODUCT_IMAGE)}
          alt={item.name}
          fill
          sizes="80px"
          className="object-contain p-1"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1">
        <h4 className="font-display text-sm uppercase tracking-wide text-white">
          {item.name}
        </h4>
        <span className="text-sm font-semibold text-accent">
          {formatRupiah(item.price)}
        </span>

        {/* Quantity Controls */}
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="flex size-7 items-center justify-center rounded border border-card-border text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Kurangi jumlah"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="flex size-7 items-center justify-center rounded border border-card-border text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Tambah jumlah"
          >
            +
          </button>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id)}
            className="ml-auto text-sm text-muted transition-colors hover:text-red-500"
            aria-label="Hapus item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
