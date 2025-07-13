"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, MapPin, Clock, Award } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { id: "Electronics", name: "Electronics", count: 45 },
  { id: "Fashion", name: "Fashion", count: 32 },
  { id: "Home Services", name: "Home Services", count: 28 },
  { id: "Health & Fitness", name: "Health & Fitness", count: 19 },
  { id: "Design", name: "Design", count: 15 },
  { id: "Food & Beverage", name: "Food & Beverage", count: 12 },
]

const retailers = [
  { id: "tech-store", name: "Tech Electronics", count: 23, rating: 4.8 },
  { id: "fashion-forward", name: "Fashion Forward", count: 18, rating: 4.6 },
  { id: "digital-studio", name: "Digital Creative Studio", count: 12, rating: 4.9 },
  { id: "cleanpro", name: "CleanPro Services", count: 8, rating: 4.7 },
  { id: "fitlife", name: "FitLife Gym", count: 6, rating: 4.8 },
]

const ratings = [
  { value: 4, label: "4+ Stars", count: 156 },
  { value: 3, label: "3+ Stars", count: 89 },
  { value: 2, label: "2+ Stars", count: 34 },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : [],
  )
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showOnSale, setShowOnSale] = useState(false)
  const [showInStock, setShowInStock] = useState(true)
  const [showFastDelivery, setShowFastDelivery] = useState(false)

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Update categories
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0]) // For simplicity, use first category
    } else {
      params.delete("category")
    }

    // Update price range
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    else params.delete("minPrice")

    if (priceRange[1] < 1000) params.set("maxPrice", priceRange[1].toString())
    else params.delete("maxPrice")

    router.push(`/shop?${params.toString()}`)
  }

  const toggleCategory = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(newCategories)
  }

  const toggleRetailer = (retailerId: string) => {
    setSelectedRetailers((prev) =>
      prev.includes(retailerId) ? prev.filter((id) => id !== retailerId) : [...prev, retailerId],
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedRetailers([])
    setPriceRange([0, 1000])
    setSelectedRating(null)
    setShowOnSale(false)
    setShowInStock(true)
    setShowFastDelivery(false)

    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("minPrice")
    params.delete("maxPrice")
    router.push(`/shop?${params.toString()}`)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedRetailers.length +
    (selectedRating ? 1 : 0) +
    (showOnSale ? 1 : 0) +
    (showFastDelivery ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
            Clear All
            <Badge variant="destructive" className="ml-2">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-800">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="flex items-center gap-1 bg-white">
                    {category?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(categoryId)} />
                  </Badge>
                )
              })}
              {selectedRetailers.map((retailerId) => {
                const retailer = retailers.find((r) => r.id === retailerId)
                return (
                  <Badge key={retailerId} variant="secondary" className="flex items-center gap-1 bg-white">
                    {retailer?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleRetailer(retailerId)} />
                  </Badge>
                )
              })}
              {showOnSale && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-white">
                  On Sale
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnSale(false)} />
                </Badge>
              )}
              {showFastDelivery && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-white">
                  Fast Delivery
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowFastDelivery(false)} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span>💰</span>
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            step={10}
            className="w-full"
            onValueCommit={updateFilters}
          />
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="bg-gray-100 px-3 py-1 rounded-full">K{priceRange[0]}</span>
            <span className="text-gray-400">to</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">K{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span>📂</span>
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => {
                    toggleCategory(category.id)
                    setTimeout(updateFilters, 100)
                  }}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer group-hover:text-blue-600 transition-colors"
                >
                  {category.name}
                </Label>
              </div>
              <Badge variant="outline" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Customer Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={selectedRating === rating.value}
                  onCheckedChange={() => setSelectedRating(selectedRating === rating.value ? null : rating.value)}
                />
                <Label
                  htmlFor={`rating-${rating.value}`}
                  className="text-sm font-normal cursor-pointer group-hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {rating.label}
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < rating.value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </Label>
              </div>
              <Badge variant="outline" className="text-xs">
                {rating.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Retailers */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Local Stores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {retailers.map((retailer) => (
            <div key={retailer.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={retailer.id}
                  checked={selectedRetailers.includes(retailer.id)}
                  onCheckedChange={() => toggleRetailer(retailer.id)}
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor={retailer.id}
                    className="text-sm font-normal cursor-pointer group-hover:text-blue-600 transition-colors"
                  >
                    {retailer.name}
                  </Label>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {retailer.rating}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {retailer.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Filters */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-4 h-4" />
            Special Offers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox id="on-sale" checked={showOnSale} onCheckedChange={setShowOnSale} />
            <Label htmlFor="on-sale" className="text-sm font-normal cursor-pointer flex items-center gap-2">
              <span>🏷️</span>
              On Sale
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox id="in-stock" checked={showInStock} onCheckedChange={setShowInStock} />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer flex items-center gap-2">
              <span>✅</span>
              In Stock Only
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox id="fast-delivery" checked={showFastDelivery} onCheckedChange={setShowFastDelivery} />
            <Label htmlFor="fast-delivery" className="text-sm font-normal cursor-pointer flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Fast Delivery
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button
        onClick={updateFilters}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-6"
        size="lg"
      >
        Apply Filters
      </Button>
    </div>
  )
}
