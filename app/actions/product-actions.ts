"use server"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  rating: number
  reviews: number
  featured: boolean
  tags: string[]
}

// Mock product data - replace with actual database calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    stock: 45,
    rating: 4.8,
    reviews: 234,
    featured: true,
    tags: ["wireless", "audio", "premium"],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
    price: 199.99,
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300&text=Watch",
    stock: 32,
    rating: 4.6,
    reviews: 189,
    featured: true,
    tags: ["fitness", "smart", "health"],
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable height.",
    price: 449.99,
    category: "Furniture",
    image: "/placeholder.svg?height=300&width=300&text=Chair",
    stock: 18,
    rating: 4.7,
    reviews: 156,
    featured: false,
    tags: ["office", "ergonomic", "furniture"],
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    description: "85mm f/1.4 portrait lens for professional photography.",
    price: 899.99,
    category: "Photography",
    image: "/placeholder.svg?height=300&width=300&text=Lens",
    stock: 12,
    rating: 4.9,
    reviews: 87,
    featured: true,
    tags: ["photography", "lens", "professional"],
  },
  {
    id: "5",
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans sourced from sustainable farms.",
    price: 24.99,
    category: "Food & Beverage",
    image: "/placeholder.svg?height=300&width=300&text=Coffee",
    stock: 156,
    rating: 4.5,
    reviews: 312,
    featured: false,
    tags: ["organic", "coffee", "premium"],
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300&text=Charger",
    stock: 89,
    rating: 4.3,
    reviews: 203,
    featured: false,
    tags: ["wireless", "charging", "tech"],
  },
]

export async function getProducts(filters?: {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
}) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    let filteredProducts = [...mockProducts]

    if (filters?.category && filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === filters.category?.toLowerCase(),
      )
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!)
    }

    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!)
    }

    if (filters?.featured) {
      filteredProducts = filteredProducts.filter((product) => product.featured)
    }

    return {
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      success: false,
      data: [],
      total: 0,
      error: "Failed to fetch products",
    }
  }
}

export async function getProductById(id: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const product = mockProducts.find((p) => p.id === id)

    if (!product) {
      return {
        success: false,
        data: null,
        error: "Product not found",
      }
    }

    return {
      success: true,
      data: product,
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return {
      success: false,
      data: null,
      error: "Failed to fetch product",
    }
  }
}

export async function getFeaturedProducts() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const featuredProducts = mockProducts.filter((product) => product.featured)

    return {
      success: true,
      data: featuredProducts,
      total: featuredProducts.length,
    }
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return {
      success: false,
      data: [],
      total: 0,
      error: "Failed to fetch featured products",
    }
  }
}

export async function getCategories() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const categories = Array.from(new Set(mockProducts.map((product) => product.category)))

    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return {
      success: false,
      data: [],
      error: "Failed to fetch categories",
    }
  }
}
