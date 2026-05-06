"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/stores/cart-store"
import { cn } from "@/lib/utils"

export default function CartButton() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((s) => s.getTotalItems())
  const toggleCart = useCartStore((s) => s.toggleCart)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch: server always renders 0,
  // client may have items from localStorage
  const displayCount = mounted ? totalItems : 0

  return (
    <button
      onClick={toggleCart}
      className={cn(
        "relative flex items-center justify-center rounded-lg p-2",
        "transition-all duration-300",
        "hover:bg-white/5",
        displayCount > 0 && "text-neon"
      )}
      aria-label={`Keranjang belanja, ${displayCount} item`}
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>

      {/* Badge */}
      {displayCount > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-neon text-xs font-bold text-black">
          {displayCount > 99 ? "99+" : displayCount}
        </span>
      )}
    </button>
  )
}
