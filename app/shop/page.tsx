"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/shop/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, Grid, List, Star, Package, Zap } from "lucide-react"
import { getProducts, getCategories, getBrands, type Product, type ProductFilters } from "@/app/actions/product-actions"

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "all",
    type: "all",
    minPrice: undefined,
    maxPrice: undefined,
    featured: false,
    brand: undefined,
  })

  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchInitialData = async () => {
    try {
      const [categoriesResult, brandsResult] = await Promise.all([getCategories(), getBrands()])

      if (categoriesResult.success) {
        setCategories(categoriesResult.data)
      }

      if (brandsResult.success) {
        setBrands(brandsResult.data)
      }
    } catch (err) {
      console.error("Error fetching initial data:", err)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getProducts(filters)

      if (result.success) {
        setProducts(result.data)
      } else {
        setError(result.error || "Failed to load products")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchInput }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      type: "all",
      minPrice: undefined,
      maxPrice: undefined,
      featured: false,
      brand: undefined,
    })
    setSearchInput("")
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "all" && value !== undefined && value !== false,
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            From cutting-edge electronics to premium services, find everything you need in our curated marketplace.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search for products, brands, or categories..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-slate-900 bg-white/95 backdrop-blur border-0 shadow-lg"
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="bg-white text-orange-600 hover:bg-white/90 shadow-lg">
              Search
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Filters */}
                <div>
                  <h4 className="font-medium mb-3">Quick Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters((prev) => ({ ...prev, featured: !prev.featured }))}
                      className={filters.featured ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white" : ""}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Featured
                    </Button>
                    <Button
                      variant={filters.type === "product" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          type: prev.type === "product" ? "all" : "product",
                        }))
                      }
                      className={
                        filters.type === "product" ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white" : ""
                      }
                    >
                      <Package className="w-3 h-3 mr-1" />
                      Products
                    </Button>
                    <Button
                      variant={filters.type === "service" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          type: prev.type === "service" ? "all" : "service",
                        }))
                      }
                      className={
                        filters.type === "service" ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white" : ""
                      }
                    >
                      <Star className="w-3 h-3 mr-1" />
                      Services
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium mb-3">Brand</h4>
                  <Select
                    value={filters.brand || "all"}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, brand: value === "all" ? undefined : value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand.toLowerCase()}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          minPrice: e.target.value ? Number(e.target.value) : undefined,
                        }))
                      }
                      className="text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxPrice: e.target.value ? Number(e.target.value) : undefined,
                        }))
                      }
                      className="text-sm"
                    />
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <>
                    <Separator />
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full hover:bg-orange-50 bg-transparent"
                    >
                      Clear All Filters
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {loading ? "Loading..." : `${products.length} Products Found`}
                </h2>
                {filters.search && <p className="text-slate-600 mt-1">Results for "{filters.search}"</p>}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white" : ""}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={products} loading={loading} viewMode={viewMode} error={error} />
          </main>
        </div>
      </div>
    </div>
  )
}
