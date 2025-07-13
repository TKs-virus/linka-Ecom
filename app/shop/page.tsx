import { getProducts } from "@/app/actions/product-actions"
import { ProductGrid } from "@/components/shop/product-grid"
import { ProductFilters } from "@/components/shop/product-filters"
import { SearchBar } from "@/components/shop/search-bar"
import { ShopHero } from "@/components/shop/shop-hero"
import { CategoryTabs } from "@/components/shop/category-tabs"
import { FeaturedSection } from "@/components/shop/featured-section"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Grid3X3, List } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SearchParams {
  category?: string
  search?: string
  minPrice?: string
  maxPrice?: string
  type?: "product" | "service" | "all"
  view?: "grid" | "list"
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const filters = {
    category: searchParams.category,
    search: searchParams.search,
    minPrice: searchParams.minPrice ? Number.parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice) : undefined,
    type: searchParams.type || "all",
  }

  const products = await getProducts(filters)
  const viewMode = searchParams.view || "grid"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <ShopHero />

      {/* Featured Section */}
      <FeaturedSection />

      {/* Main Shop Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Category Tabs */}
        <div className="mb-8 space-y-6">
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          <CategoryTabs currentType={filters.type} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <ProductFilters />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {filters.type === "product" ? "Products" : filters.type === "service" ? "Services" : "Shop"}
                  </h1>
                  <Badge variant="secondary" className="text-sm">
                    {products.length} {products.length === 1 ? "item" : "items"}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center border rounded-lg p-1 bg-white">
                    <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" className="h-8 w-8 p-0">
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" className="h-8 w-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <SlidersHorizontal className="h-4 w-4" />
                    Sort
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {(filters.category || filters.search || filters.minPrice || filters.maxPrice) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.category && (
                    <Badge variant="secondary" className="gap-1">
                      Category: {filters.category}
                    </Badge>
                  )}
                  {filters.search && (
                    <Badge variant="secondary" className="gap-1">
                      Search: "{filters.search}"
                    </Badge>
                  )}
                  {(filters.minPrice || filters.maxPrice) && (
                    <Badge variant="secondary" className="gap-1">
                      Price: K{filters.minPrice || 0} - K{filters.maxPrice || "∞"}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} viewMode={viewMode} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
