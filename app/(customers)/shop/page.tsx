"use client"

import { useState, useCallback } from "react"
import { ProductGrid } from "@/components/shop/product-grid"
import { ProductFilters } from "@/components/shop/product-filters"
import { SearchBar } from "@/components/shop/search-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Filter, Grid3X3, List, SlidersHorizontal, Star, TrendingUp, Zap } from "lucide-react"

interface Filters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
}

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>({})
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleFiltersChange = useCallback((newFilters: Omit<Filters, "search">) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }, [])

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      search: query || undefined,
    }))
  }, [])

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Description */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Shop
                  </h1>
                  <p className="text-slate-600 font-medium">Discover amazing products from local retailers</p>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <SearchBar onSearch={handleSearch} initialValue={filters.search} />

              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-white/60 rounded-lg p-1 border border-slate-200">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-white/60 border-slate-200 relative"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-blue-600">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-slate-900">Featured</span>
                </div>
                <p className="text-xs text-slate-600">Premium products</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-slate-900">Fast Delivery</span>
                </div>
                <p className="text-xs text-slate-600">Same day shipping</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-900">Best Sellers</span>
                </div>
                <p className="text-xs text-slate-600">Top rated items</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <SlidersHorizontal className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-slate-900">Customizable</span>
                </div>
                <p className="text-xs text-slate-600">Personalized options</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <ProductFilters onFiltersChange={handleFiltersChange} currentFilters={filters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="mb-6">
                <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-900">
                          {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} applied
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({})}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        Clear all
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Products */}
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
