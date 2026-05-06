import { SITE_CONFIG } from "@/lib/constants"
import CartButton from "./cart-button"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-display text-2xl uppercase tracking-widest text-neon">
            {SITE_CONFIG.name}
          </span>
        </a>

        {/* Nav Links (desktop) */}
        <div className="hidden items-center gap-8 sm:flex">
          <a
            href="#katalog"
            className="text-sm font-medium text-secondary transition-colors hover:text-neon"
          >
            Katalog
          </a>
          <a
            href="#kontak"
            className="text-sm font-medium text-secondary transition-colors hover:text-neon"
          >
            Kontak
          </a>
        </div>

        {/* Cart */}
        <CartButton />
      </nav>
    </header>
  )
}
