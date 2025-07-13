"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import type { Product } from "@/app/actions/product-actions"

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sale</Badge>}
                {product.featured && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(product.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">K{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        K{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/shop/product/${product.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white shadow-lg">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-lg">
                Featured
              </Badge>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => toggleFavorite(product.id)}
                  className="bg-white/90 hover:bg-white shadow-lg"
                >
                  <Heart
                    className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
                <Button variant="secondary" size="icon" asChild className="bg-white/90 hover:bg-white shadow-lg">
                  <Link href={`/shop/product/${product.id}`}>
                    <Eye className="w-4 h-4 text-gray-600" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-2">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">K{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">K{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {!product.inStock && (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
