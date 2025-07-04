"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VitaminsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [filterBy, setFilterBy] = useState("all")
  const [cartItems, setCartItems] = useState(0)

  const products = [
    {
      id: 1,
      name: "Vitamin D3 1000 IU",
      description: "Daily vitamin D supplement for bone health",
      price: 15.99,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 189,
      inStock: true,
      category: "Vitamins",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Multivitamin Complex",
      description: "Complete daily multivitamin for adults",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      category: "Multivitamins",
      badge: "Sale",
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      description: "High-quality fish oil capsules",
      price: 19.99,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      category: "Supplements",
      badge: null,
    },
    {
      id: 4,
      name: "Vitamin C 1000mg",
      description: "Immune system support",
      price: 12.99,
      originalPrice: 16.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.4,
      reviews: 198,
      inStock: true,
      category: "Vitamins",
      badge: "Sale",
    },
    {
      id: 5,
      name: "Calcium + Magnesium",
      description: "Bone and muscle health support",
      price: 18.99,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      reviews: 145,
      inStock: true,
      category: "Minerals",
      badge: null,
    },
    {
      id: 6,
      name: "Probiotics Complex",
      description: "Digestive health support",
      price: 32.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 87,
      inStock: true,
      category: "Supplements",
      badge: "Premium",
    },
    {
      id: 7,
      name: "Iron Supplement",
      description: "Iron deficiency support",
      price: 14.99,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.2,
      reviews: 112,
      inStock: false,
      category: "Minerals",
      badge: "Out of Stock",
    },
    {
      id: 8,
      name: "B-Complex Vitamins",
      description: "Energy and nervous system support",
      price: 16.99,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 203,
      inStock: true,
      category: "Vitamins",
      badge: null,
    },
  ]

  const categories = ["All", "Vitamins", "Minerals", "Supplements", "Multivitamins", "Herbal"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterBy === "all" || product.category === filterBy
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">Linka</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600">
              Find Doctors
            </Link>
            <Link href="/pharmacy" className="text-blue-600 font-medium">
              Pharmacy
            </Link>
            <Button variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartItems > 0 && <Badge className="ml-2 px-1 min-w-[1.25rem] h-5">{cartItems}</Badge>}
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/pharmacy" className="hover:text-blue-600">
            Pharmacy
          </Link>
          <span>/</span>
          <span className="text-gray-900">Vitamins & Supplements</span>
        </div>

        {/* Back Button */}
        <Link href="/pharmacy" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pharmacy
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vitamins & Supplements</h1>
          <p className="text-gray-600">Support your health with quality vitamins and nutritional supplements</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vitamins and supplements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-2 right-2 ${
                        product.badge === "Out of Stock"
                          ? "bg-red-500"
                          : product.badge === "Best Seller"
                            ? "bg-orange-500"
                            : product.badge === "Sale"
                              ? "bg-green-500"
                              : product.badge === "Premium"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <Link href={`/pharmacy/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">{product.name}</h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <Badge variant={product.inStock ? "secondary" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <Link href={`/pharmacy/product/${product.id}`}>
                  <Button className="w-full" disabled={!product.inStock}>
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
