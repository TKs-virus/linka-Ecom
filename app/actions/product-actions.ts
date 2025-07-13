import { supabase } from "@/lib/supabase/client"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  status?: string
  created_at?: string
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    let query = supabase.from("products").select("*").eq("status", "active")

    if (filters?.search) {
      query = query.or(`name.ilike.*${filters.search}*,description.ilike.*${filters.search}*`)
    }

    if (filters?.category && filters.category !== "all") {
      query = query.eq("category", filters.category)
    }

    if (filters?.minPrice) {
      query = query.gte("price", filters.minPrice)
    }

    if (filters?.maxPrice) {
      query = query.lte("price", filters.maxPrice)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.log("[getProducts] Supabase error → using mock data:", error.message)
      return getMockProducts(filters)
    }

    return data || getMockProducts(filters)
  } catch (err) {
    console.log("[getProducts] Exception → using mock data:", err)
    return getMockProducts(filters)
  }
}

function getMockProducts(filters?: ProductFilters): Product[] {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Fresh Organic Apples",
      description: "Crisp and sweet organic apples from local farms",
      price: 4.99,
      category: "fruits",
      image_url: "/placeholder.svg?height=300&width=300&text=Fresh+Apples",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Artisan Sourdough Bread",
      description: "Freshly baked sourdough bread made with traditional methods",
      price: 6.5,
      category: "bakery",
      image_url: "/placeholder.svg?height=300&width=300&text=Sourdough+Bread",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Local Honey",
      description: "Pure wildflower honey from local beekeepers",
      price: 12.99,
      category: "pantry",
      image_url: "/placeholder.svg?height=300&width=300&text=Local+Honey",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Farm Fresh Eggs",
      description: "Free-range eggs from happy chickens",
      price: 5.99,
      category: "dairy",
      image_url: "/placeholder.svg?height=300&width=300&text=Fresh+Eggs",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Organic Spinach",
      description: "Fresh organic spinach leaves, perfect for salads",
      price: 3.49,
      category: "vegetables",
      image_url: "/placeholder.svg?height=300&width=300&text=Organic+Spinach",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      name: "Craft Coffee Beans",
      description: "Single-origin coffee beans roasted to perfection",
      price: 18.99,
      category: "beverages",
      image_url: "/placeholder.svg?height=300&width=300&text=Coffee+Beans",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      name: "Handmade Pasta",
      description: "Traditional Italian pasta made fresh daily",
      price: 8.99,
      category: "pantry",
      image_url: "/placeholder.svg?height=300&width=300&text=Fresh+Pasta",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      name: "Seasonal Berries",
      description: "Mixed seasonal berries - strawberries, blueberries, raspberries",
      price: 7.99,
      category: "fruits",
      image_url: "/placeholder.svg?height=300&width=300&text=Mixed+Berries",
      status: "active",
      created_at: new Date().toISOString(),
    },
  ]

  let filteredProducts = mockProducts

  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )
  }

  if (filters?.category && filters.category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
  }

  if (filters?.minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!)
  }

  if (filters?.maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!)
  }

  return filteredProducts
}

export async function getProductCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("products").select("category").eq("status", "active")

    if (error) {
      console.log("[getProductCategories] Supabase error → using mock data:", error.message)
      return getMockCategories()
    }

    const categories = [...new Set(data?.map((item) => item.category) || [])]
    return categories.length > 0 ? categories : getMockCategories()
  } catch (err) {
    console.log("[getProductCategories] Exception → using mock data:", err)
    return getMockCategories()
  }
}

function getMockCategories(): string[] {
  return ["fruits", "vegetables", "dairy", "bakery", "pantry", "beverages"]
}
