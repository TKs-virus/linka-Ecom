"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Health & Beauty",
  "Food & Beverages",
  "Automotive",
  "Toys & Games",
  "Services",
]

const priceRanges = [
  { label: "Under K50", min: 0, max: 50 },
  { label: "K50 - K100", min: 50, max: 100 },
  { label: "K100 - K250", min: 100, max: 250 },
  { label: "K250 - K500", min: 250, max: 500 },
  { label: "Over K500", min: 500, max: 10000 },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 1000,
  ])

  const currentCategory = searchParams.get("category")
  const currentType = searchParams.get("type") || "all"

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/shop?${params.toString()}`)
  }

  const updatePriceRange = (values: number[]) => {
    setPriceRange(values)
    const params = new URLSearchParams(searchParams.toString())

    if (values[0] > 0) {
      params.set("minPrice", values[0].toString())
    } else {
      params.delete("minPrice")
    }

    if (values[1] < 1000) {
      params.set("maxPrice", values[1].toString())
    } else {
      params.delete("maxPrice")
    }

    router.push(`/shop?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/shop")
  }

  const hasActiveFilters =
    currentCategory ||
    currentType !== "all" ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice") ||
    searchParams.get("search")

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Product Type */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">Product Type</Label>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Items" },
              { value: "product", label: "Products" },
              { value: "service", label: "Services" },
            ].map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={currentType === type.value}
                  onCheckedChange={() => updateFilters("type", type.value)}
                />
                <Label htmlFor={type.value} className="text-sm font-medium cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">Categories</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={currentCategory === category}
                  onCheckedChange={() => updateFilters("category", currentCategory === category ? null : category)}
                />
                <Label htmlFor={category} className="text-sm font-medium cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-gray-900">Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              onValueCommit={updatePriceRange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>K{priceRange[0]}</span>
              <span>K{priceRange[1]}</span>
            </div>
          </div>

          {/* Quick Price Ranges */}
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <Button
                key={range.label}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-8 bg-transparent"
                onClick={() => updatePriceRange([range.min, range.max])}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {currentCategory && (
                <Badge variant="secondary" className="gap-1">
                  {currentCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("category", null)} />
                </Badge>
              )}
              {currentType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {currentType}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("type", "all")} />
                </Badge>
              )}
              {searchParams.get("search") && (
                <Badge variant="secondary" className="gap-1">
                  "{searchParams.get("search")}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("search", null)} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
