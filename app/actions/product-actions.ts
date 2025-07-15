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
  brand?: string
  specifications?: Record<string, string>
}

const mockProducts: Product[] = [
  // Electronics
  {
    id: "1",
    name: "MacBook Pro 16-inch M3",
    description:
      "Powerful laptop with M3 Pro chip, 18GB unified memory, and 512GB SSD. Perfect for professionals and creators who demand the best performance.",
    price: 2499,
    originalPrice: 2799,
    category: "Electronics",
    type: "product",
    image: "/shop/electronics-laptop.png",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    featured: true,
    brand: "Apple",
    tags: ["laptop", "apple", "professional", "m3", "macbook"],
    specifications: {
      Processor: "Apple M3 Pro chip",
      Memory: "18GB unified memory",
      Storage: "512GB SSD",
      Display: "16-inch Liquid Retina XDR",
      Battery: "Up to 22 hours",
    },
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    description:
      "Latest iPhone with titanium design, advanced camera system with 5x telephoto zoom, and A17 Pro chip for unprecedented performance.",
    price: 1199,
    category: "Electronics",
    type: "product",
    image: "/shop/electronics-smartphone.png",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    featured: true,
    brand: "Apple",
    tags: ["smartphone", "apple", "camera", "5g", "titanium"],
    specifications: {
      Chip: "A17 Pro",
      Display: "6.7-inch Super Retina XDR",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      Storage: "256GB",
      Material: "Titanium",
    },
  },

  // Fashion
  {
    id: "3",
    name: "Nike Air Max 270 React",
    description:
      "Revolutionary running shoes combining Air Max 270 and React foam technologies for ultimate comfort and style during your workouts.",
    price: 150,
    originalPrice: 180,
    category: "Fashion",
    type: "product",
    image: "/shop/fashion-sneakers.png",
    rating: 4.6,
    reviews: 567,
    inStock: true,
    featured: false,
    brand: "Nike",
    tags: ["shoes", "nike", "running", "comfort", "air max"],
    specifications: {
      Technology: "Air Max 270 + React Foam",
      Upper: "Mesh and synthetic materials",
      Sole: "Rubber outsole",
      Fit: "True to size",
      Use: "Running, Training, Casual",
    },
  },
  {
    id: "4",
    name: "Premium Denim Jacket",
    description:
      "Classic denim jacket crafted from premium 100% cotton denim with vintage wash finish. Perfect for layering and timeless style.",
    price: 89,
    category: "Fashion",
    type: "product",
    image: "/shop/fashion-jacket.png",
    rating: 4.4,
    reviews: 234,
    inStock: true,
    featured: false,
    brand: "Levi's",
    tags: ["jacket", "denim", "casual", "cotton", "vintage"],
    specifications: {
      Material: "100% Cotton Denim",
      Wash: "Vintage Blue",
      Fit: "Regular Fit",
      Care: "Machine wash cold",
      Origin: "Made in USA",
    },
  },

  // Home & Garden
  {
    id: "5",
    name: "Breville Barista Express",
    description:
      "Professional-grade espresso machine with built-in grinder, precise temperature control, and steam wand for café-quality coffee at home.",
    price: 699,
    originalPrice: 799,
    category: "Home & Garden",
    type: "product",
    image: "/shop/home-coffee-maker.png",
    rating: 4.9,
    reviews: 445,
    inStock: true,
    featured: true,
    brand: "Breville",
    tags: ["coffee", "espresso", "kitchen", "breville", "barista"],
    specifications: {
      Grinder: "Stainless steel conical burr",
      Pressure: "15 bar Italian pump",
      "Water Tank": "2L removable",
      "Steam Wand": "360° swivel action",
      Warranty: "2 years",
    },
  },
  {
    id: "6",
    name: "Monstera Deliciosa Plant",
    description:
      "Beautiful large indoor plant with distinctive split leaves. Perfect for adding natural beauty to your home or office space.",
    price: 45,
    category: "Home & Garden",
    type: "product",
    image: "/shop/home-plant.png",
    rating: 4.5,
    reviews: 178,
    inStock: true,
    featured: false,
    brand: "Green Paradise",
    tags: ["plant", "indoor", "decoration", "monstera", "tropical"],
    specifications: {
      Size: "2-3 feet tall",
      Pot: "6-inch ceramic pot included",
      Light: "Bright, indirect light",
      Water: "Weekly watering",
      "Care Level": "Easy",
    },
  },

  // Books & Education
  {
    id: "7",
    name: "JavaScript: The Complete Guide 2024",
    description:
      "Comprehensive guide to modern JavaScript development covering ES6+, Node.js, React, and advanced programming concepts with practical examples.",
    price: 49,
    category: "Books",
    type: "product",
    image: "/shop/books-programming.png",
    rating: 4.7,
    reviews: 623,
    inStock: true,
    featured: false,
    brand: "Tech Publications",
    tags: ["book", "javascript", "programming", "education", "web development"],
    specifications: {
      Pages: "850 pages",
      Edition: "2024 Edition",
      Format: "Paperback + Digital",
      Level: "Beginner to Advanced",
      Includes: "Online code examples",
    },
  },

  // Sports & Fitness
  {
    id: "8",
    name: "Premium Yoga Mat Pro",
    description:
      "Professional-grade yoga mat made from eco-friendly TPE material with superior grip and cushioning for all yoga practices.",
    price: 79,
    category: "Sports & Fitness",
    type: "product",
    image: "/shop/sports-yoga-mat.png",
    rating: 4.6,
    reviews: 289,
    inStock: true,
    featured: false,
    brand: "YogaLife",
    tags: ["yoga", "fitness", "mat", "eco-friendly", "exercise"],
    specifications: {
      Material: "Eco-friendly TPE",
      Thickness: "6mm",
      Size: '72" x 24"',
      Weight: "2.5 lbs",
      Features: "Non-slip, sweat-resistant",
    },
  },

  // Services
  {
    id: "9",
    name: "Custom Web Development",
    description:
      "Professional website development service using modern technologies like React, Next.js, and Node.js. Includes responsive design and SEO optimization.",
    price: 2999,
    category: "Technology Services",
    type: "service",
    image: "/placeholder.svg?height=400&width=400&text=Web+Development",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    featured: true,
    brand: "Linka Digital",
    tags: ["web", "development", "custom", "modern", "react"],
    specifications: {
      Timeline: "4-6 weeks",
      Technologies: "React, Next.js, Node.js",
      Includes: "Responsive design, SEO, hosting setup",
      Support: "3 months free support",
      Revisions: "Unlimited during development",
    },
  },
  {
    id: "10",
    name: "Digital Marketing Consultation",
    description:
      "Expert consultation to boost your online presence with SEO, social media strategy, and conversion optimization techniques.",
    price: 299,
    category: "Marketing Services",
    type: "service",
    image: "/placeholder.svg?height=400&width=400&text=Digital+Marketing",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: false,
    brand: "Linka Marketing",
    tags: ["marketing", "consultation", "digital", "seo", "strategy"],
    specifications: {
      Duration: "2 hours",
      Deliverables: "Custom strategy document",
      "Follow-up": "30-day email support",
      Expertise: "SEO, Social Media, PPC",
      Format: "Video call + written report",
    },
  },
  {
    id: "11",
    name: "Business Strategy Workshop",
    description:
      "Comprehensive workshop to develop your business strategy, identify growth opportunities, and create actionable plans for success.",
    price: 599,
    category: "Business Services",
    type: "service",
    image: "/placeholder.svg?height=400&width=400&text=Business+Strategy",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    featured: false,
    brand: "Linka Consulting",
    tags: ["business", "strategy", "workshop", "planning", "growth"],
    specifications: {
      Duration: "Full day (8 hours)",
      Participants: "Up to 10 people",
      Materials: "Workbooks and templates included",
      "Follow-up": "60-day implementation support",
      Location: "On-site or virtual",
    },
  },
  {
    id: "12",
    name: "Personal Training Sessions",
    description:
      "One-on-one fitness training with certified trainers. Customized workout plans and nutrition guidance for optimal results.",
    price: 120,
    category: "Health & Fitness Services",
    type: "service",
    image: "/placeholder.svg?height=400&width=400&text=Personal+Training",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    featured: true,
    brand: "FitLife Training",
    tags: ["fitness", "training", "personal", "health", "nutrition"],
    specifications: {
      "Session Length": "60 minutes",
      Trainer: "Certified personal trainer",
      Includes: "Custom workout plan, nutrition guide",
      Location: "Gym or home visits available",
      "Package Options": "Single session or monthly packages",
    },
  },
]

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  type?: "product" | "service" | "all"
  featured?: boolean
  brand?: string
}

export async function getProducts(filters: ProductFilters = {}): Promise<{
  success: boolean
  data: Product[]
  total: number
  error?: string
}> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    let filteredProducts = [...mockProducts]

    // Apply filters
    if (filters.category && filters.category !== "all") {
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
          product.brand?.toLowerCase().includes(searchTerm) ||
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

    if (filters.brand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand?.toLowerCase() === filters.brand?.toLowerCase(),
      )
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

export async function getProductById(id: string): Promise<{
  success: boolean
  data: Product | null
  error?: string
}> {
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

export async function getFeaturedProducts(): Promise<{
  success: boolean
  data: Product[]
  total: number
  error?: string
}> {
  return getProducts({ featured: true })
}

export async function getCategories(): Promise<{
  success: boolean
  data: string[]
  error?: string
}> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const categories = Array.from(new Set(mockProducts.map((product) => product.category)))

    return {
      success: true,
      data: categories.sort(),
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

export async function getBrands(): Promise<{
  success: boolean
  data: string[]
  error?: string
}> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const brands = Array.from(new Set(mockProducts.map((product) => product.brand).filter(Boolean))) as string[]

    return {
      success: true,
      data: brands.sort(),
    }
  } catch (error) {
    console.error("Error fetching brands:", error)
    return {
      success: false,
      data: [],
      error: "Failed to fetch brands",
    }
  }
}
