import Image from "next/image"
import { HERO_IMAGE } from "@/lib/constants"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Custom CB motorcycle bodykit showcase"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Decorative line */}
        <div className="mx-auto mb-6 h-px w-20 bg-neon opacity-60" />

        {/* Heading */}
        <h1 className="font-display text-6xl uppercase leading-none tracking-wider text-white sm:text-8xl lg:text-9xl">
          <span className="block">Bold Builds.</span>
          <span className="block text-neon neon-text">Raw Power.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-lg text-secondary sm:text-xl">
          Spesialis bodykit motor CB kustom. Dirancang agresif, dibangun presisi.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#katalog"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-neon bg-neon/10 px-8 py-4 font-body text-sm font-semibold uppercase tracking-widest text-neon transition-all duration-300 hover:bg-neon hover:text-black hover:shadow-[var(--neon-glow)]"
          >
            Lihat Katalog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-1"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Decorative line */}
        <div className="mx-auto mt-10 h-px w-20 bg-neon opacity-60" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
          <div className="h-8 w-px animate-pulse bg-neon/50" />
        </div>
      </div>
    </section>
  )
}
