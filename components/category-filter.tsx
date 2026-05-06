"use client"

import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* "Semua" pill */}
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
          activeCategory === null
            ? "border-neon bg-neon/10 text-neon shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            : "border-card-border bg-card-bg text-muted hover:border-neon/50 hover:text-secondary"
        )}
      >
        Semua
      </button>

      {/* Category pills */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
            activeCategory === category
              ? "border-neon bg-neon/10 text-neon shadow-[0_0_10px_rgba(57,255,20,0.2)]"
              : "border-card-border bg-card-bg text-muted hover:border-neon/50 hover:text-secondary"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
