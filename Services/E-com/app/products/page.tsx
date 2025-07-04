import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, ShoppingCart, Filter } from "lucide-react"

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    rating: 4.5,
    reviews: 1234,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    rating: 4.8,
    reviews: 856,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Portable Phone Charger",
    price: 29.99,
    rating: 4.3,
    reviews: 2341,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 49.99,
    rating: 4.6,
    reviews: 987,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Smart Home Hub",
    price: 129.99,
    rating: 4.4,
    reviews: 234,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    badge: "New",
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    price: 89.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    badge: "New",
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-100 border-b border-blue-200 shadow-lg">
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
              <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">
                Cart (3)
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span>All Products</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-gray-600">Discover our complete collection</p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
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
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product.badge}</Badge>
                    )}
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
                  <span className="font-bold text-lg">${product.price}</span>
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
