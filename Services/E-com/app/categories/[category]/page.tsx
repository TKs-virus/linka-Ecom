import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"
import { Star, ShoppingCart, ChevronDown, Filter, Grid, List, Menu } from "lucide-react"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

// Mock data - in real app, this would come from API
const categoryData: Record<string, any> = {
  electronics: {
    name: "Electronics",
    description: "Discover the latest in technology and electronics",
    subcategories: ["Smartphones", "Laptops", "Televisions", "Cameras", "Audio", "Gaming"],
    brands: ["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Canon", "Nikon"],
    products: [
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        originalPrice: 1099.99,
        rating: 4.8,
        reviews: 2341,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Apple",
        category: "Smartphones",
        inStock: true,
      },
      {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 899.99,
        rating: 4.6,
        reviews: 1876,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Samsung",
        category: "Smartphones",
        inStock: true,
      },
      {
        id: 3,
        name: 'MacBook Pro 14"',
        price: 1999.99,
        rating: 4.9,
        reviews: 987,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Apple",
        category: "Laptops",
        inStock: true,
      },
      {
        id: 4,
        name: "Dell XPS 13",
        price: 1299.99,
        rating: 4.5,
        reviews: 654,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Dell",
        category: "Laptops",
        inStock: false,
      },
      {
        id: 5,
        name: 'Sony 65" 4K TV',
        price: 1499.99,
        originalPrice: 1799.99,
        rating: 4.7,
        reviews: 432,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Sony",
        category: "Televisions",
        inStock: true,
      },
      {
        id: 6,
        name: "Canon EOS R5",
        price: 3899.99,
        rating: 4.8,
        reviews: 234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Canon",
        category: "Cameras",
        inStock: true,
      },
    ],
  },
  fashion: {
    name: "Fashion",
    description: "Trendy clothing and accessories for every style",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Bags", "Jewelry"],
    brands: ["Nike", "Adidas", "Zara", "H&M", "Gucci", "Prada"],
    products: [
      {
        id: 7,
        name: "Nike Air Max 270",
        price: 149.99,
        rating: 4.5,
        reviews: 1234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Nike",
        category: "Shoes",
        inStock: true,
      },
      {
        id: 8,
        name: "Adidas Ultraboost 22",
        price: 179.99,
        rating: 4.6,
        reviews: 876,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Adidas",
        category: "Shoes",
        inStock: true,
      },
      {
        id: 9,
        name: "Designer Handbag",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.3,
        reviews: 543,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Gucci",
        category: "Bags",
        inStock: true,
      },
      {
        id: 10,
        name: "Men's Casual Shirt",
        price: 49.99,
        rating: 4.2,
        reviews: 321,
        image: "/placeholder.svg?height=200&width=200",
        brand: "H&M",
        category: "Men's Clothing",
        inStock: true,
      },
    ],
  },
  "home-and-garden": {
    name: "Home & Garden",
    description: "Everything you need for your home and garden",
    subcategories: ["Furniture", "Decor", "Kitchen", "Garden Tools", "Lighting", "Storage"],
    brands: ["IKEA", "Wayfair", "Home Depot", "Lowe's"],
    products: [
      {
        id: 11,
        name: "Modern Sofa Set",
        price: 899.99,
        rating: 4.3,
        reviews: 234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "IKEA",
        category: "Furniture",
        inStock: true,
      },
      {
        id: 12,
        name: "Garden Tool Set",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.5,
        reviews: 456,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Home Depot",
        category: "Garden Tools",
        inStock: true,
      },
    ],
  },
  "sports-and-outdoors": {
    name: "Sports & Outdoors",
    description: "Gear up for your next adventure",
    subcategories: ["Fitness Equipment", "Outdoor Gear", "Sports Apparel", "Camping", "Water Sports", "Team Sports"],
    brands: ["Nike", "Adidas", "Under Armour", "Patagonia", "The North Face", "Coleman"],
    products: [
      {
        id: 13,
        name: "Yoga Mat Premium",
        price: 39.99,
        rating: 4.6,
        reviews: 789,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Nike",
        category: "Fitness Equipment",
        inStock: true,
      },
      {
        id: 14,
        name: "Camping Tent 4-Person",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.4,
        reviews: 345,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Coleman",
        category: "Camping",
        inStock: true,
      },
      {
        id: 15,
        name: "Running Shoes",
        price: 129.99,
        rating: 4.7,
        reviews: 1234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Adidas",
        category: "Sports Apparel",
        inStock: true,
      },
    ],
  },
  books: {
    name: "Books",
    description: "Discover your next great read",
    subcategories: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Mystery",
      "Romance",
      "Biography",
      "Children's Books",
      "Textbooks",
    ],
    brands: ["Penguin", "Random House", "HarperCollins", "Simon & Schuster", "Macmillan", "Scholastic"],
    products: [
      {
        id: 16,
        name: "The Great Gatsby",
        price: 12.99,
        rating: 4.5,
        reviews: 2341,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Penguin",
        category: "Fiction",
        inStock: true,
      },
      {
        id: 17,
        name: "Atomic Habits",
        price: 16.99,
        originalPrice: 19.99,
        rating: 4.8,
        reviews: 5432,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Random House",
        category: "Non-Fiction",
        inStock: true,
      },
      {
        id: 18,
        name: "Dune",
        price: 14.99,
        rating: 4.6,
        reviews: 3456,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Penguin",
        category: "Science Fiction",
        inStock: true,
      },
      {
        id: 19,
        name: "The Girl with the Dragon Tattoo",
        price: 13.99,
        rating: 4.3,
        reviews: 1876,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Random House",
        category: "Mystery",
        inStock: false,
      },
      {
        id: 20,
        name: "Harry Potter Complete Set",
        price: 89.99,
        originalPrice: 109.99,
        rating: 4.9,
        reviews: 8765,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Scholastic",
        category: "Children's Books",
        inStock: true,
      },
    ],
  },
  "toys-and-games": {
    name: "Toys & Games",
    description: "Fun and entertainment for all ages",
    subcategories: [
      "Action Figures",
      "Board Games",
      "Puzzles",
      "Educational Toys",
      "Video Games",
      "Outdoor Toys",
      "Baby Toys",
    ],
    brands: ["LEGO", "Mattel", "Hasbro", "Fisher-Price", "Nintendo", "PlayStation", "Xbox"],
    products: [
      {
        id: 21,
        name: "LEGO Creator Expert Set",
        price: 199.99,
        rating: 4.8,
        reviews: 1234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "LEGO",
        category: "Educational Toys",
        inStock: true,
      },
      {
        id: 22,
        name: "Monopoly Classic",
        price: 24.99,
        originalPrice: 29.99,
        rating: 4.5,
        reviews: 2345,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Hasbro",
        category: "Board Games",
        inStock: true,
      },
      {
        id: 23,
        name: "Nintendo Switch Console",
        price: 299.99,
        rating: 4.7,
        reviews: 5678,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Nintendo",
        category: "Video Games",
        inStock: true,
      },
      {
        id: 24,
        name: "Barbie Dreamhouse",
        price: 149.99,
        originalPrice: 179.99,
        rating: 4.4,
        reviews: 987,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Mattel",
        category: "Action Figures",
        inStock: false,
      },
      {
        id: 25,
        name: "1000 Piece Puzzle",
        price: 19.99,
        rating: 4.2,
        reviews: 456,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Hasbro",
        category: "Puzzles",
        inStock: true,
      },
    ],
  },
  "beauty-and-health": {
    name: "Beauty & Health",
    description: "Look and feel your best",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Health Supplements", "Personal Care", "Wellness"],
    brands: ["L'Oréal", "Maybelline", "Clinique", "Estée Lauder", "Neutrogena", "Olay", "CeraVe"],
    products: [
      {
        id: 26,
        name: "Anti-Aging Serum",
        price: 49.99,
        originalPrice: 59.99,
        rating: 4.6,
        reviews: 1876,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Olay",
        category: "Skincare",
        inStock: true,
      },
      {
        id: 27,
        name: "Foundation Makeup",
        price: 34.99,
        rating: 4.3,
        reviews: 2341,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Maybelline",
        category: "Makeup",
        inStock: true,
      },
      {
        id: 28,
        name: "Shampoo & Conditioner Set",
        price: 24.99,
        rating: 4.5,
        reviews: 1234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "L'Oréal",
        category: "Hair Care",
        inStock: true,
      },
      {
        id: 29,
        name: "Vitamin C Supplements",
        price: 19.99,
        originalPrice: 24.99,
        rating: 4.4,
        reviews: 876,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Neutrogena",
        category: "Health Supplements",
        inStock: true,
      },
      {
        id: 30,
        name: "Luxury Perfume",
        price: 89.99,
        rating: 4.7,
        reviews: 543,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Estée Lauder",
        category: "Fragrances",
        inStock: false,
      },
    ],
  },
  automotive: {
    name: "Automotive",
    description: "Everything for your vehicle",
    subcategories: ["Car Parts", "Tools", "Accessories", "Tires", "Oil & Fluids", "Electronics", "Maintenance"],
    brands: ["Bosch", "Michelin", "Castrol", "Mobil 1", "AutoZone", "Advance Auto Parts", "NAPA"],
    products: [
      {
        id: 31,
        name: "Car Battery 12V",
        price: 129.99,
        originalPrice: 149.99,
        rating: 4.5,
        reviews: 789,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Bosch",
        category: "Car Parts",
        inStock: true,
      },
      {
        id: 32,
        name: "All-Season Tires Set",
        price: 399.99,
        rating: 4.6,
        reviews: 1234,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Michelin",
        category: "Tires",
        inStock: true,
      },
      {
        id: 33,
        name: "Motor Oil 5W-30",
        price: 24.99,
        rating: 4.7,
        reviews: 2341,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Mobil 1",
        category: "Oil & Fluids",
        inStock: true,
      },
      {
        id: 34,
        name: "Car Dash Cam",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.3,
        reviews: 567,
        image: "/placeholder.svg?height=200&width=200",
        brand: "Bosch",
        category: "Electronics",
        inStock: true,
      },
      {
        id: 35,
        name: "Tool Set 150-Piece",
        price: 149.99,
        rating: 4.4,
        reviews: 432,
        image: "/placeholder.svg?height=200&width=200",
        brand: "AutoZone",
        category: "Tools",
        inStock: false,
      },
    ],
  },
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryInfo = categoryData[category] || categoryData.electronics

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Linka
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">
                Cart (3)
              </Link>
            </nav>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary">
            Categories
          </Link>
          <span>/</span>
          <span className="font-medium">{categoryInfo.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{categoryInfo.name}</h1>
          <p className="text-sm md:text-base text-gray-600">{categoryInfo.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2 mb-4 bg-transparent">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base md:text-lg font-semibold">Filters</h2>
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
              </div>

              {/* Categories */}
              <Collapsible defaultOpen className="mb-4 md:mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium text-sm md:text-base">
                  Categories
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {categoryInfo.subcategories.map((subcat: string) => (
                    <div key={subcat} className="flex items-center space-x-2">
                      <Checkbox id={subcat} />
                      <label htmlFor={subcat} className="text-xs md:text-sm cursor-pointer">
                        {subcat}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Brands */}
              <Collapsible defaultOpen className="mb-4 md:mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium text-sm md:text-base">
                  Brand
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {categoryInfo.brands.map((brand: string) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} />
                      <label htmlFor={brand} className="text-xs md:text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Price Range */}
              <Collapsible defaultOpen className="mb-4 md:mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium text-sm md:text-base">
                  Price Range
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="space-y-4">
                    <Slider defaultValue={[0, 2000]} max={5000} step={50} className="w-full" />
                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
                      <span>$0</span>
                      <span>$5000</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Customer Rating */}
              <Collapsible defaultOpen className="mb-4 md:mb-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium text-sm md:text-base">
                  Customer Rating
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-xs md:text-sm cursor-pointer flex items-center"
                      >
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-1">& Up</span>
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Availability */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium text-sm md:text-base">
                  Availability
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" />
                    <label htmlFor="in-stock" className="text-xs md:text-sm cursor-pointer">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="on-sale" />
                    <label htmlFor="on-sale" className="text-xs md:text-sm cursor-pointer">
                      On Sale
                    </label>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3 sm:gap-0">
              <div className="flex items-center space-x-4">
                <span className="text-xs md:text-sm text-gray-600">Showing {categoryInfo.products.length} results</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-full sm:w-40 md:w-48 text-xs md:text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Grid className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <List className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categoryInfo.products.map((product: any) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-3 md:p-4">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative mb-3 md:mb-4 cursor-pointer">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg"
                        />
                        {product.originalPrice && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-xs">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="text-white font-semibold text-xs md:text-sm">Out of Stock</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-xs md:text-sm mb-2 line-clamp-2 cursor-pointer hover:text-blue-600">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-[10px] md:text-xs text-gray-500 mb-2">{product.brand}</p>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-2.5 w-2.5 md:h-3 md:w-3 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <span className="font-bold text-sm md:text-lg">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs md:text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link href="/cart">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm py-1.5 md:py-2"
                        size="sm"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-1 md:space-x-2 mt-6 md:mt-8">
              <Button variant="outline" disabled size="sm" className="text-xs md:text-sm px-2 md:px-3 bg-transparent">
                Previous
              </Button>
              <Button variant="outline" className="bg-primary text-white text-xs md:text-sm px-2 md:px-3" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-3 bg-transparent">
                2
              </Button>
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-3 bg-transparent">
                3
              </Button>
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-3 bg-transparent">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
