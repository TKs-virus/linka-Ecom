import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react"

interface ProductDetailProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = await params

  // Mock product data - in real app, fetch from API
  const product = {
    id: Number.parseInt(id),
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 1234,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    description: "Premium wireless headphones with active noise cancellation and superior sound quality.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge technology",
      "Premium comfort design",
      "Bluetooth 5.0 connectivity",
    ],
    inStock: true,
    category: "Electronics",
  }

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
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 2}`}
                  width={150}
                  height={150}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                <Badge className="bg-green-500">20% OFF</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" className="px-3">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border-x">1</span>
                <Button variant="ghost" size="sm" className="px-3">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-600">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div className="flex space-x-4">
              <Link href="/cart" className="flex-1">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 text-blue-700 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
                  size="lg"
                >
                  Buy Now
                </Button>
              </Link>
            </div>

            <Button variant="ghost" className="w-full">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
