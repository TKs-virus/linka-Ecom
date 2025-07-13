"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye, MapPin, Users } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/app/actions/product-actions"

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse different categories.</p>
          <Button variant="outline" className="bg-white">
            Browse All Categories
          </Button>
        </div>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-80 h-64 md:h-auto flex-shrink-0">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white font-semibold px-3 py-1">
                      -{product.discount}% OFF
                    </Badge>
                  )}
                  <Badge
                    className={`absolute top-4 right-4 font-medium ${
                      product.type === "service" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                    }`}
                  >
                    {product.type === "service" ? "Service" : "Product"}
                  </Badge>
                </div>

                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(product.id)}
                      className="text-gray-400 hover:text-red-500 ml-4"
                    >
                      <Heart
                        className={`w-6 h-6 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {product.retailer && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{product.retailer}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        {product.discount && (
                          <span className="text-lg text-gray-500 line-through">ZMW {product.price.toFixed(2)}</span>
                        )}
                        <span className="text-3xl font-bold text-gray-900">
                          ZMW{" "}
                          {product.discount
                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                            : product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                        {product.inStock ? "Available" : "Out of Stock"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="lg" className="bg-white hover:bg-gray-50">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="lg"
                        disabled={!product.inStock}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.type === "service" ? "Book Now" : "Add to Cart"}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white"
        >
          <CardContent className="p-0">
            <div className="relative">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold px-3 py-1 shadow-lg">
                    -{product.discount}% OFF
                  </Badge>
                )}
                <Badge
                  className={`absolute top-3 right-3 font-medium shadow-lg ${
                    product.type === "service" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {product.type === "service" ? "Service" : "Product"}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white shadow-lg"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">({product.reviews})</span>
                </div>

                {product.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{product.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.discount && (
                      <span className="text-sm text-gray-500 line-through">ZMW {product.price.toFixed(2)}</span>
                    )}
                    <span className="text-2xl font-bold text-gray-900">
                      ZMW{" "}
                      {product.discount
                        ? (product.price * (1 - product.discount / 100)).toFixed(2)
                        : product.price.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.inStock ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                    }`}
                  >
                    {product.inStock ? "Available" : "Out of Stock"}
                  </p>
                </div>

                {product.retailer && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{product.retailer}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-white hover:bg-gray-50">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  {product.type === "service" ? "Book" : "Add"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
