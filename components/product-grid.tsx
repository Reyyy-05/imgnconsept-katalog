"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import CategoryFilter from "./category-filter"

interface ProductGridProps {
  products: Product[]
  categories: string[]
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  return (
    <section id="katalog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="font-display text-4xl uppercase tracking-wider text-white sm:text-5xl">
          Katalog <span className="text-accent">Bodykit</span>
        </h2>
        <p className="mt-3 text-secondary">
          Pilih bodykit impianmu untuk Honda CB kustom
        </p>
        <div className="mx-auto mt-4 h-1 w-16 bg-accent/50" />
      </div>

      {/* Filter */}
      <div className="mb-10 flex justify-center">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p className="text-lg text-muted">
            Belum ada produk untuk kategori ini.
          </p>
        </div>
      )}
    </section>
  )
}
