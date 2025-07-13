import { supabase } from "@/lib/supabase/client"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: "product" | "service"
  image_url?: string
  status?: string
  created_at?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  discount?: number
  retailer?: string
  location?: string
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  type?: "product" | "service" | "all"
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

    if (filters?.type && filters.type !== "all") {
      query = query.eq("type", filters.type)
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
    // Products
    {
      id: "1",
      name: "Fresh Organic Vegetables Bundle",
      description:
        "Premium organic vegetables sourced from local Zambian farms. Includes tomatoes, onions, cabbage, and leafy greens.",
      price: 85.0,
      category: "groceries",
      type: "product",
      image_url: "/placeholder.svg?height=400&width=400&text=Fresh+Vegetables",
      status: "active",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      retailer: "Lusaka Fresh Market",
      location: "Lusaka",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Artisan Chitenge Fabric",
      description:
        "Beautiful traditional Zambian chitenge fabric, perfect for clothing and home decor. 100% cotton, vibrant colors.",
      price: 120.0,
      category: "fashion",
      type: "product",
      image_url: "/placeholder.svg?height=400&width=400&text=Chitenge+Fabric",
      status: "active",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      discount: 15,
      retailer: "Kabwe Textiles",
      location: "Kabwe",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Zambian Honey - Pure Wildflower",
      description:
        "Raw, unprocessed honey from the Copperbelt region. Rich in natural enzymes and perfect for health-conscious consumers.",
      price: 65.0,
      category: "groceries",
      type: "product",
      image_url: "/placeholder.svg?height=400&width=400&text=Zambian+Honey",
      status: "active",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      retailer: "Ndola Bee Farm",
      location: "Ndola",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Handcrafted Wooden Furniture",
      description:
        "Beautiful mahogany dining table set, handcrafted by skilled Zambian artisans. Seats 6 people comfortably.",
      price: 2850.0,
      category: "furniture",
      type: "product",
      image_url: "/placeholder.svg?height=400&width=400&text=Wooden+Furniture",
      status: "active",
      rating: 4.6,
      reviews: 34,
      inStock: true,
      retailer: "Livingstone Crafts",
      location: "Livingstone",
      created_at: new Date().toISOString(),
    },

    // Services
    {
      id: "5",
      name: "Professional House Cleaning",
      description:
        "Comprehensive house cleaning service including deep cleaning, window washing, and sanitization. Eco-friendly products used.",
      price: 150.0,
      category: "home-services",
      type: "service",
      image_url: "/placeholder.svg?height=400&width=400&text=House+Cleaning",
      status: "active",
      rating: 4.9,
      reviews: 203,
      inStock: true,
      retailer: "CleanPro Zambia",
      location: "Lusaka",
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      name: "Mobile Phone Repair Service",
      description:
        "Expert mobile phone repair service. Screen replacement, battery change, software issues. Same-day service available.",
      price: 75.0,
      category: "technology",
      type: "service",
      image_url: "/placeholder.svg?height=400&width=400&text=Phone+Repair",
      status: "active",
      rating: 4.8,
      reviews: 167,
      inStock: true,
      retailer: "TechFix Zambia",
      location: "Kitwe",
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      name: "Personal Fitness Training",
      description:
        "One-on-one personal training sessions with certified fitness instructors. Customized workout plans and nutrition guidance.",
      price: 200.0,
      category: "health-fitness",
      type: "service",
      image_url: "/placeholder.svg?height=400&width=400&text=Fitness+Training",
      status: "active",
      rating: 4.7,
      reviews: 92,
      inStock: true,
      retailer: "FitLife Zambia",
      location: "Lusaka",
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      name: "Traditional Zambian Cuisine Catering",
      description:
        "Authentic Zambian cuisine catering for events. Specializing in nshima, grilled tilapia, and traditional vegetables.",
      price: 450.0,
      category: "food-beverage",
      type: "service",
      image_url: "/placeholder.svg?height=400&width=400&text=Zambian+Cuisine",
      status: "active",
      rating: 4.9,
      reviews: 78,
      inStock: true,
      discount: 10,
      retailer: "Taste of Zambia Catering",
      location: "Lusaka",
      created_at: new Date().toISOString(),
    },
    {
      id: "9",
      name: "Solar Panel Installation",
      description:
        "Professional solar panel installation service. Complete setup including panels, inverters, and battery systems for homes and businesses.",
      price: 8500.0,
      category: "home-services",
      type: "service",
      image_url: "/placeholder.svg?height=400&width=400&text=Solar+Installation",
      status: "active",
      rating: 4.8,
      reviews: 45,
      inStock: true,
      retailer: "SolarTech Zambia",
      location: "Lusaka",
      created_at: new Date().toISOString(),
    },
    {
      id: "10",
      name: "Copper Jewelry Collection",
      description:
        "Exquisite copper jewelry handcrafted by local artisans. Includes necklaces, bracelets, and earrings with traditional Zambian designs.",
      price: 180.0,
      category: "fashion",
      type: "product",
      image_url: "/placeholder.svg?height=400&width=400&text=Copper+Jewelry",
      status: "active",
      rating: 4.6,
      reviews: 67,
      inStock: true,
      retailer: "Copperbelt Crafts",
      location: "Kitwe",
      created_at: new Date().toISOString(),
    },
    {
      id: "11",
      name: "Digital Marketing Consultation",
      description:
        "Professional digital marketing consultation for small businesses. Includes social media strategy, SEO optimization, and online advertising guidance.",
      price: 350.0,
      category: "business-services",
      type: "service",
      image_url: "/placeholder.svg?height=400&width=400&text=Digital+Marketing",
      status: "active",
      rating: 4.9,
      reviews: 112,
      inStock: true,
      retailer: "ZamMarketing Pro",
      location: "Lusaka",
      created_at: new Date().toISOString(),
    },
    {
      id: "12",
      name: "Premium Zambian Coffee Beans",
      description:
        "Single-origin Arabica coffee beans from the Northern Province. Medium roast with notes of chocolate and citrus.",
      price: 95.0,
      category: "groceries",
      type: "product",
      image_url: "/placeholder.svg?height=400&width=400&text=Coffee+Beans",
      status: "active",
      rating: 4.8,
      reviews: 134,
      inStock: true,
      discount: 20,
      retailer: "Zambian Coffee Co.",
      location: "Kasama",
      created_at: new Date().toISOString(),
    },
  ]

  let filteredProducts = mockProducts

  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm),
    )
  }

  if (filters?.category && filters.category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
  }

  if (filters?.type && filters.type !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.type === filters.type)
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
  return [
    "groceries",
    "fashion",
    "furniture",
    "home-services",
    "technology",
    "health-fitness",
    "food-beverage",
    "business-services",
  ]
}
