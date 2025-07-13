"use server"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  type: "product" | "service"
  image: string
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
  tags: string[]
}

const mockProducts: Product[] = [
  // Electronics
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    description: "Powerful laptop with M3 Pro chip, perfect for professionals and creators",
    price: 2499,
    originalPrice: 2799,
    category: "Electronics",
    type: "product",
    image: "/shop/electronics-laptop.png",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    featured: true,
    tags: ["laptop", "apple", "professional", "m3"],
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design and advanced camera system",
    price: 999,
    category: "Electronics",
    type: "product",
    image: "/shop/electronics-smartphone.png",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    featured: true,
    tags: ["smartphone", "apple", "camera", "5g"],
  },

  // Fashion
  {
    id: "3",
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology",
    price: 150,
    originalPrice: 180,
    category: "Fashion",
    type: "product",
    image: "/shop/fashion-sneakers.png",
    rating: 4.6,
    reviews: 567,
    inStock: true,
    featured: false,
    tags: ["shoes", "nike", "running", "comfort"],
  },
  {
    id: "4",
    name: "Premium Denim Jacket",
    description: "Classic denim jacket made from premium cotton blend",
    price: 89,
    category: "Fashion",
    type: "product",
    image: "/shop/fashion-jacket.png",
    rating: 4.4,
    reviews: 234,
    inStock: true,
    featured: false,
    tags: ["jacket", "denim", "casual", "cotton"],
  },

  // Home & Garden
  {
    id: "5",
    name: "Breville Espresso Machine",
    description: "Professional-grade espresso machine for home baristas",
    price: 699,
    originalPrice: 799,
    category: "Home & Garden",
    type: "product",
    image: "/shop/home-coffee-maker.png",
    rating: 4.9,
    reviews: 445,
    inStock: true,
    featured: true,
    tags: ["coffee", "espresso", "kitchen", "breville"],
  },
  {
    id: "6",
    name: "Monstera Deliciosa Plant",
    description: "Beautiful indoor plant perfect for home decoration",
    price: 45,
    category: "Home & Garden",
    type: "product",
    image: "/shop/home-plant.png",
    rating: 4.5,
    reviews: 178,
    inStock: true,
    featured: false,
    tags: ["plant", "indoor", "decoration", "monstera"],
  },

  // Books & Education
  {
    id: "7",
    name: "JavaScript: The Complete Guide",
    description: "Comprehensive guide to modern JavaScript development",
    price: 49,
    category: "Books",
    type: "product",
    image: "/shop/books-programming.png",
    rating: 4.7,
    reviews: 623,
    inStock: true,
    featured: false,
    tags: ["book", "javascript", "programming", "education"],
  },

  // Sports & Fitness
  {
    id: "8",
    name: "Premium Yoga Mat",
    description: "Non-slip yoga mat made from eco-friendly materials",
    price: 79,
    category: "Sports & Fitness",
    type: "product",
    image: "/shop/sports-yoga-mat.png",
    rating: 4.6,
    reviews: 289,
    inStock: true,
    featured: false,
    tags: ["yoga", "fitness", "mat", "eco-friendly"],
  },

  // Services
  {
    id: "9",
    name: "Web Development Service",
    description: "Custom website development with modern technologies",
    price: 2999,
    category: "Technology",
    type: "service",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    featured: true,
    tags: ["web", "development", "custom", "modern"],
  },
  {
    id: "10",
    name: "Digital Marketing Consultation",
    description: "Expert consultation to boost your online presence",
    price: 299,
    category: "Marketing",
    type: "service",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: false,
    tags: ["marketing", "consultation", "digital", "seo"],
  },
  {
    id: "11",
    name: "Business Strategy Workshop",
    description: "Comprehensive workshop to develop your business strategy",
    price: 599,
    category: "Business",
    type: "service",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    featured: false,
    tags: ["business", "strategy", "workshop", "planning"],
  },
  {
    id: "12",
    name: "Personal Training Sessions",
    description: "One-on-one fitness training with certified trainers",
    price: 120,
    category: "Health & Fitness",
    type: "service",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    featured: true,
    tags: ["fitness", "training", "personal", "health"],
  },
]

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  type?: "product" | "service" | "all"
  featured?: boolean
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  let filteredProducts = [...mockProducts]

  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === filters.category?.toLowerCase(),
    )
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!)
  }

  if (filters.type && filters.type !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.type === filters.type)
  }

  if (filters.featured) {
    filteredProducts = filteredProducts.filter((product) => product.featured)
  }

  return filteredProducts
}

export async function getProduct(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockProducts.find((product) => product.id === id) || null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ featured: true })
}

export async function getCategories(): Promise<string[]> {
  const categories = [...new Set(mockProducts.map((product) => product.category))]
  return categories.sort()
}
