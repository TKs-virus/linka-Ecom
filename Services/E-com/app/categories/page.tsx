import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const categories = [
  { id: 1, name: "Electronics", image: "/placeholder.svg?height=200&width=200", productCount: 1234 },
  { id: 2, name: "Fashion", image: "/placeholder.svg?height=200&width=200", productCount: 2567 },
  { id: 3, name: "Home & Garden", image: "/placeholder.svg?height=200&width=200", productCount: 890 },
  { id: 4, name: "Sports & Outdoors", image: "/placeholder.svg?height=200&width=200", productCount: 456 },
  { id: 5, name: "Books", image: "/placeholder.svg?height=200&width=200", productCount: 3421 },
  { id: 6, name: "Toys & Games", image: "/placeholder.svg?height=200&width=200", productCount: 678 },
  { id: 7, name: "Beauty & Health", image: "/placeholder.svg?height=200&width=200", productCount: 1123 },
  { id: 8, name: "Automotive", image: "/placeholder.svg?height=200&width=200", productCount: 234 },
]

export default function CategoriesPage() {
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
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-gray-600 text-lg">Explore our wide range of product categories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.productCount} products</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
