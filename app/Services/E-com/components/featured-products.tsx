"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
}

interface FeaturedProductsProps {
  title: string
  subtitle: string
  type: "bestsellers" | "new-arrivals" | "on-sale"
  className?: string
}

const sampleProducts: Record<string, Product[]> = {
  bestsellers: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      rating: 4.5,
      reviews: 1234,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      rating: 4.8,
      reviews: 856,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: 29.99,
      rating: 4.3,
      reviews: 2341,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 49.99,
      rating: 4.6,
      reviews: 987,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  "new-arrivals": [
    {
      id: 5,
      name: "Smart Home Hub",
      price: 129.99,
      rating: 4.4,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
    },
    {
      id: 6,
      name: "Wireless Gaming Mouse",
      price: 89.99,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
    },
    {
      id: 7,
      name: "USB-C Hub",
      price: 39.99,
      rating: 4.2,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
    },
    {
      id: 8,
      name: "Smart Light Bulbs (4-pack)",
      price: 59.99,
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
    },
  ],
  "on-sale": [
    {
      id: 9,
      name: "4K Webcam",
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.3,
      reviews: 445,
      image: "/placeholder.svg?height=200&width=200",
      badge: "30% OFF",
    },
    {
      id: 10,
      name: "Mechanical Keyboard",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 678,
      image: "/placeholder.svg?height=200&width=200",
      badge: "31% OFF",
    },
    {
      id: 11,
      name: "Wireless Earbuds",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.4,
      reviews: 1123,
      image: "/placeholder.svg?height=200&width=200",
      badge: "37% OFF",
    },
    {
      id: 12,
      name: "Phone Stand",
      price: 14.99,
      originalPrice: 24.99,
      rating: 4.1,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=200",
      badge: "40% OFF",
    },
  ],
}

export default function FeaturedProducts({ title, subtitle, type, className = "" }: FeaturedProductsProps) {
  const router = useRouter()
  const [favorites, setFavorites] = useState<number[]>([])
  const products = sampleProducts[type] || []

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (product: Product) => {
    console.log("Added to cart:", product.name)
    // Navigate to cart page after adding
    router.push("/cart")
  }

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{title}</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-3 md:p-4">
                <Link href={`/products/${product.id}`}>
                  <div className="relative mb-3 md:mb-4 cursor-pointer">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 md:p-2"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-3 w-3 md:h-4 md:w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </Link>

                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-xs md:text-sm mb-2 line-clamp-2 cursor-pointer hover:text-blue-600">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-2.5 w-2.5 md:h-3 md:w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span className="font-bold text-sm md:text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs md:text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm py-1.5 md:py-2"
                  size="sm"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/products?category=${type}`}>
            <Button
              variant="outline"
              size="lg"
              className="px-6 md:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 text-blue-700 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
            >
              View All {title}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
