import type { Product } from "@/app/actions/product-actions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, MapPin, Truck, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
        <Button variant="outline">Clear Filters</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-1">
              {product.compare_at_price && product.compare_at_price > product.price && (
                <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs">
                  {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% OFF
                </Badge>
              )}
              {product.stock_quantity && product.stock_quantity < 10 && (
                <Badge variant="outline" className="bg-white/90 text-orange-600 border-orange-600 text-xs">
                  Only {product.stock_quantity} left
                </Badge>
              )}
            </div>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Retailer Info */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{product.retailer_name || "Local Store"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600">4.8</span>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

              {/* Category */}
              <Badge variant="outline" className="text-xs w-fit">
                {product.category}
              </Badge>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">ZMW {product.price.toFixed(2)}</span>
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ZMW {product.compare_at_price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <Truck className="h-3 w-3" />
                  <span>2-4hrs</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2 w-full">
              <Button asChild className="flex-1 bg-transparent" variant="outline">
                <Link href={`/shop/products/${product.id}`}>View Details</Link>
              </Button>
              <Button
                size="icon"
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
