import type { Product } from "@/app/actions/product-actions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <Badge className="absolute top-2 left-2" variant="destructive">
                Sale
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">ZMW {product.price.toFixed(2)}</span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ZMW {product.compare_at_price.toFixed(2)}
                  </span>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2 w-full">
              <Button asChild className="flex-1">
                <Link href={`/shop/products/${product.id}`}>View Details</Link>
              </Button>
              <Button size="icon" variant="outline">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
