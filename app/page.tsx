import { createSupabaseServerClient } from "@/lib/supabase/server"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"
import CartDrawer from "@/components/cart-drawer"
import Footer from "@/components/footer"

export default async function Home() {
  const supabase = await createSupabaseServerClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Failed to fetch products:", error.message)
  }

  const productList = products ?? []
  const categories = [...new Set(productList.map((p) => p.category))]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid products={productList} categories={categories} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
