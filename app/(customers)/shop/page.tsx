import { getProducts } from "@/app/actions/product-actions"
import { ProductGrid } from "@/components/shop/product-grid"
import { ProductFilters } from "@/components/shop/product-filters"
import { SearchBar } from "@/components/shop/search-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Grid, List, SlidersHorizontal, Package, Wrench } from "lucide-react"

interface SearchParams {
  category?: string
  search?: string
  minPrice?: string
  maxPrice?: string
  type?: string
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const filters = {
    category: searchParams.category,
    search: searchParams.search,
    type: searchParams.type as "product" | "service" | "all",
    minPrice: searchParams.minPrice ? Number.parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice) : undefined,
  }

  const products = await getProducts(filters)
  const productCount = products.filter((p) => p.type === "product").length
  const serviceCount = products.filter((p) => p.type === "service").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Local
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Products & Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with local Zambian businesses and discover quality products and professional services in your area
            </p>
          </div>
          <SearchBar />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Results</p>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Products</p>
                  <p className="text-3xl font-bold">{productCount}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Package className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Services</p>
                  <p className="text-3xl font-bold">{serviceCount}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Wrench className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <ProductFilters />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-8">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {products.length} Result{products.length !== 1 ? "s" : ""} Found
                        </h2>
                        <p className="text-gray-600">
                          {filters.search && `for "${filters.search}"`}
                          {filters.category && ` in ${filters.category}`}
                          {filters.type && filters.type !== "all" && ` • ${filters.type}s only`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* View Toggle */}
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <Button variant="ghost" size="sm" className="bg-white shadow-sm">
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <List className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Sort Dropdown */}
                      <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Sort by Relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest First</option>
                        <option>Highest Rated</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Filters Summary */}
                  {(filters.search || filters.category || filters.type !== "all") && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {filters.search && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Search: {filters.search}
                          </Badge>
                        )}
                        {filters.category && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Category: {filters.category}
                          </Badge>
                        )}
                        {filters.type && filters.type !== "all" && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            Type: {filters.type}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden border-0 shadow-lg">
          <div className="space-y-4 p-6">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
