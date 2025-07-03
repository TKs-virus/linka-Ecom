import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"

const dealProducts = [
  {
    id: 9,
    name: "4K Webcam",
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviews: 445,
    image: "/placeholder.svg?height=200&width=200",
    badge: "30% OFF",
    timeLeft: "2 days left",
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
    timeLeft: "5 hours left",
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
    timeLeft: "1 day left",
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
    timeLeft: "3 days left",
  },
]

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Linka
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">
                Cart (3)
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🔥 Hot Deals</h1>
          <p className="text-gray-600 text-lg">Limited time offers you don't want to miss!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                  <div className="relative mb-4 cursor-pointer">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product.badge}</Badge>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {product.timeLeft}
                    </div>
                  </div>
                </Link>

                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-blue-600">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                </div>

                <Link href="/cart">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
