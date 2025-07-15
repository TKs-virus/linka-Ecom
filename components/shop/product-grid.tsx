"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ShoppingCart, Heart, Eye, Zap } from "lucide-react"
import type { Product } from "@/app/actions/product-actions"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  viewMode?: "grid" | "list"
  error?: string | null
}

export function ProductGrid({ products, loading = false, viewMode = "grid", error }: ProductGridProps) {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("$", "K")
  }

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-square">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-6 w-20" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Eye className="w-10 h-10 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3">Unable to load products</h3>
        <p className="text-slate-600 mb-6 max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="hover:bg-orange-50">
          Try Again
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3">No products found</h3>
        <p className="text-slate-600 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your search or filter options.
        </p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-64 h-64 flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white shadow-lg">
                    {calculateDiscount(product.originalPrice, product.price)}% OFF
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-lg">
                    <Zap className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      {product.brand && (
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 hover:text-orange-600 transition-colors">
                      <Link href={`/shop/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{product.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(product.id)}
                    className="text-slate-400 hover:text-red-500 ml-4"
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
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-slate-900">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                    {!product.inStock && (
                      <Badge variant="destructive" className="ml-2">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/shop/product/${product.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      disabled={!product.inStock}
                      className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur hover:scale-[1.02]"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {product.originalPrice && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white shadow-lg z-10">
                {calculateDiscount(product.originalPrice, product.price)}% OFF
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-lg z-10">
                <Zap className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => toggleFavorite(product.id)}
                  className="bg-white/95 hover:bg-white shadow-lg backdrop-blur"
                >
                  <Heart
                    className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  asChild
                  className="bg-white/95 hover:bg-white shadow-lg backdrop-blur"
                >
                  <Link href={`/shop/product/${product.id}`}>
                    <Eye className="w-4 h-4 text-slate-600" />
                  </Link>
                </Button>
              </div>
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <Badge variant="destructive" className="text-white text-sm">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              {product.brand && (
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
              <Link href={`/shop/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 ml-2">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
