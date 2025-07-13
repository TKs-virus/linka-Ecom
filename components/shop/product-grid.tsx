"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { getProducts, type Product } from "@/app/actions/product-actions"
import Image from "next/image"

interface ProductGridProps {
  filters?: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    featured?: boolean
  }
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null)

      try {
        const result = await getProducts(filters)

        if (result.success) {
          setProducts(result.data)
        } else {
          setError(result.error || "Failed to load products")
        }
      } catch (err) {
        setError("An unexpected error occurred")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-square">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
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
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to load products</h3>
        <p className="text-slate-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
        <p className="text-slate-600">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200"
        >
          <div className="relative aspect-square overflow-hidden bg-slate-50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {product.featured && (
              <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">Featured</Badge>
            )}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            {product.stock <= 10 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute bottom-3 left-3">
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-white">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2 mt-1">{product.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-600">
                {product.rating} ({product.reviews})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-slate-900">K{product.price.toFixed(2)}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full"
              disabled={product.stock === 0}
              variant={product.stock === 0 ? "secondary" : "default"}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
