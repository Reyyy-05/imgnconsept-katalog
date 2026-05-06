"use client"

import { useEffect, useCallback } from "react"
import { useCartStore } from "@/stores/cart-store"
import CartItemRow from "./cart-item"
import CheckoutButton from "./checkout-button"

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.getTotalItems())

  // Close on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart()
    },
    [closeCart]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKeyDown])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-card-border bg-drawer-bg transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-card-border px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl uppercase tracking-wider text-white">
              Keranjang
            </h2>
            {totalItems > 0 && (
              <span className="rounded-full bg-neon/20 px-2.5 py-0.5 text-xs font-semibold text-neon">
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={closeCart}
            className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Tutup keranjang"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length > 0 ? (
            <div className="py-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted/50">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <p className="text-muted">Keranjang kosong</p>
              <button
                onClick={closeCart}
                className="rounded-lg border border-card-border px-4 py-2 text-sm text-secondary transition-colors hover:border-neon hover:text-neon"
              >
                Lanjut Belanja
              </button>
            </div>
          )}
        </div>

        {/* Footer — Checkout */}
        <div className="border-t border-card-border px-6 py-5">
          <CheckoutButton />
        </div>
      </aside>
    </>
  )
}
