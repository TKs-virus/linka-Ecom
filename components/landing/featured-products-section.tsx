import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FeaturedProductsSection() {
  const featuredProducts = [
    {
      id: 1,
      name: "Artisan Coffee Blend",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 127,
      retailer: "Local Roasters Co.",
      location: "Downtown",
      image: "/placeholder.svg?height=300&width=300",
      badge: "Best Seller",
      badgeColor: "brand-orange",
    },
    {
      id: 2,
      name: "Handcrafted Leather Wallet",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.9,
      reviews: 89,
      retailer: "Craftsman's Corner",
      location: "Arts District",
      image: "/placeholder.svg?height=300&width=300",
      badge: "Local Favorite",
      badgeColor: "brand-blue",
    },
    {
      id: 3,
      name: "Organic Honey Set",
      price: 34.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      retailer: "Bee Happy Farm",
      location: "Countryside",
      image: "/placeholder.svg?height=300&width=300",
      badge: "New Arrival",
      badgeColor: "brand-orange",
    },
    {
      id: 4,
      name: "Vintage Style Lamp",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviews: 56,
      retailer: "Retro Home Decor",
      location: "Historic Quarter",
      image: "/placeholder.svg?height=300&width=300",
      badge: "Limited Edition",
      badgeColor: "brand-blue",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Featured <span className="gradient-text-linka">Local Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from local retailers in your area. Each purchase supports your community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group border-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge
                  className={`absolute top-3 left-3 bg-${product.badgeColor} hover:bg-${product.badgeColor} text-white`}
                >
                  {product.badge}
                </Badge>
                <Button
                  size="sm"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-gray-700 hover:text-brand-orange"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {product.location}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3">{product.retailer}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 bg-transparent"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow hover-lift"
            asChild
          >
            <Link href="/shop">Explore All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
