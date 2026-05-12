import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="kontak" className="border-t border-card-border bg-card-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <div>
            <h3 className="font-display text-3xl uppercase tracking-widest text-accent">
              {SITE_CONFIG.name}
            </h3>
            <p className="mt-2 text-sm text-muted">{SITE_CONFIG.tagline}</p>
          </div>

          {/* Red accent bar */}
          <div className="h-1 w-16 bg-accent/30" />

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {/* Instagram */}
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-muted transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="text-sm font-medium">
                {SOCIAL_LINKS.instagram.handle}
              </span>
            </a>

            {/* TikTok */}
            <a
              href={SOCIAL_LINKS.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-muted transition-colors hover:text-accent"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.13v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.4a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.17a8.16 8.16 0 0 0 4.76 1.53V7.25a4.82 4.82 0 0 1-1-.56z" />
              </svg>
              <span className="text-sm font-medium">
                {SOCIAL_LINKS.tiktok.handle}
              </span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/60">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
