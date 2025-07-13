import type { Product } from "@/app/actions/product-actions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, MapPin, Truck, Eye, Clock, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No items found</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          We couldn't find any products or services matching your criteria. Try adjusting your filters or search terms.
        </p>
        <Button variant="outline" size="lg" className="rounded-full bg-transparent">
          Clear All Filters
        </Button>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-48 md:h-32">
                <Image
                  src={product.images?.[0] ?? "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {product.retailer_name}
                      </span>
                      {product.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {product.rating} ({product.reviews_count})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">K{product.price.toFixed(2)}</div>
                    {product.compare_at_price && (
                      <div className="text-sm text-gray-500 line-through">K{product.compare_at_price.toFixed(2)}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge variant={product.type === "service" ? "secondary" : "default"}>{product.type}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.type === "service" ? "Book Now" : "Add to Cart"}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images?.[0] ?? "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Overlay Actions */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge
                variant={product.type === "service" ? "secondary" : "default"}
                className="bg-white/90 text-gray-900 shadow-sm"
              >
                {product.type === "service" ? (
                  <>
                    <Award className="w-3 h-3 mr-1" />
                    Service
                  </>
                ) : (
                  "Product"
                )}
              </Badge>

              {product.compare_at_price && product.compare_at_price > product.price && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm">
                  {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% OFF
                </Badge>
              )}

              {product.stock_quantity && product.stock_quantity < 10 && product.type === "product" && (
                <Badge variant="outline" className="bg-white/90 text-orange-600 border-orange-600 shadow-sm">
                  Only {product.stock_quantity} left
                </Badge>
              )}
            </div>

            {/* Quick Action Button */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.type === "service" ? "Book Service" : "Quick Add"}
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Retailer Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{product.retailer_name || "Local Store"}</span>
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-700">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews_count})</span>
                  </div>
                )}
              </div>

              {/* Product Name */}
              <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">{product.description}</p>

              {/* Category and Duration */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-medium">
                  {product.category}
                </Badge>
                {product.duration && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{product.duration}</span>
                  </div>
                )}
              </div>

              {/* Price and Delivery */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">K{product.price.toFixed(2)}</span>
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="text-sm text-gray-500 line-through">K{product.compare_at_price.toFixed(2)}</span>
                  )}
                </div>

                {product.type === "product" && (
                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <Truck className="h-3 w-3" />
                    <span className="font-medium">2-4hrs</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <div className="flex gap-3 w-full">
              <Button asChild variant="outline" className="flex-1 rounded-full bg-transparent">
                <Link href={`/shop/${product.type}s/${product.id}`}>View Details</Link>
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full px-6">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.type === "service" ? "Book" : "Buy"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
