export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  image_url: string | null
  category: string
  is_available: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

/** Subset of Product fields used by cart items */
export interface CartProduct {
  id: string
  name: string
  price: number
  image_url: string | null
}
