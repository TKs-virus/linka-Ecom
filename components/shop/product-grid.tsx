"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  discount?: number
}

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>
                    <p className="text-slate-600 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-slate-600 ml-2">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <Badge variant="outline" className="text-slate-600">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {product.discount && (
                          <span className="text-lg text-slate-500 line-through">ZMW {product.price.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-bold text-slate-800">
                          ZMW{" "}
                          {product.discount
                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                            : product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className={`text-sm ${product.inStock ? "text-emerald-600" : "text-red-600"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(product.id)}
                        className="text-slate-600 hover:text-red-500"
                      >
                        <Heart
                          className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/60">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        disabled={!product.inStock}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 group"
        >
          <CardContent className="p-0">
            <div className="relative">
              <div className="relative w-full h-48">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white">-{product.discount}%</Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-slate-600 hover:text-red-500 hover:bg-white"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">{product.description}</p>
              </div>

              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-slate-600 ml-1">({product.reviews})</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {product.discount && (
                    <span className="text-sm text-slate-500 line-through">ZMW {product.price.toFixed(2)}</span>
                  )}
                  <span className="text-lg font-bold text-slate-800">
                    ZMW{" "}
                    {product.discount
                      ? (product.price * (1 - product.discount / 100)).toFixed(2)
                      : product.price.toFixed(2)}
                  </span>
                </div>
                <p className={`text-xs ${product.inStock ? "text-emerald-600" : "text-red-600"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-white/60">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
