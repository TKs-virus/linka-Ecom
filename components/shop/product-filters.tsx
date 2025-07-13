"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, Star, MapPin, Package, Wrench, Filter, RotateCcw } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getProductCategories } from "@/app/actions/product-actions"

const categoryIcons: Record<string, string> = {
  groceries: "🛒",
  fashion: "👗",
  furniture: "🪑",
  "home-services": "🏠",
  technology: "💻",
  "health-fitness": "💪",
  "food-beverage": "🍽️",
  "business-services": "💼",
}

const categoryLabels: Record<string, string> = {
  groceries: "Groceries & Food",
  fashion: "Fashion & Clothing",
  furniture: "Furniture & Home",
  "home-services": "Home Services",
  technology: "Technology & Electronics",
  "health-fitness": "Health & Fitness",
  "food-beverage": "Food & Beverage",
  "business-services": "Business Services",
}

const retailers = [
  { id: "lusaka-fresh", name: "Lusaka Fresh Market", count: 23, rating: 4.8, location: "Lusaka" },
  { id: "kabwe-textiles", name: "Kabwe Textiles", count: 18, rating: 4.6, location: "Kabwe" },
  { id: "ndola-bee", name: "Ndola Bee Farm", count: 12, rating: 4.9, location: "Ndola" },
  { id: "cleanpro", name: "CleanPro Zambia", count: 8, rating: 4.7, location: "Lusaka" },
  { id: "techfix", name: "TechFix Zambia", count: 15, rating: 4.8, location: "Kitwe" },
]

const ratings = [
  { value: 4, label: "4+ Stars", count: 156 },
  { value: 3, label: "3+ Stars", count: 89 },
  { value: 2, label: "2+ Stars", count: 34 },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showOnSale, setShowOnSale] = useState(false)
  const [showInStock, setShowInStock] = useState(true)
  const [showFastDelivery, setShowFastDelivery] = useState(false)

  useEffect(() => {
    // Load categories
    getProductCategories().then(setCategories)

    // Initialize filters from URL params
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }

    const typeParam = searchParams.get("type")
    if (typeParam) {
      setSelectedType(typeParam)
    }

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice || maxPrice) {
      setPriceRange([minPrice ? Number.parseFloat(minPrice) : 0, maxPrice ? Number.parseFloat(maxPrice) : 10000])
    }
  }, [searchParams])

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)
    setSelectedCategories(newCategories)
  }

  const toggleRetailer = (retailerId: string) => {
    setSelectedRetailers((prev) =>
      prev.includes(retailerId) ? prev.filter((id) => id !== retailerId) : [...prev, retailerId],
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Clear existing filter params
    params.delete("category")
    params.delete("type")
    params.delete("minPrice")
    params.delete("maxPrice")

    // Add new filter params
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    }

    if (selectedType !== "all") {
      params.set("type", selectedType)
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    }

    if (priceRange[1] < 10000) {
      params.set("maxPrice", priceRange[1].toString())
    }

    router.push(`/shop?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedType("all")
    setSelectedRetailers([])
    setPriceRange([0, 10000])
    setSelectedRating(null)
    setShowOnSale(false)
    setShowInStock(true)
    setShowFastDelivery(false)

    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("type")
    params.delete("minPrice")
    params.delete("maxPrice")

    router.push(`/shop?${params.toString()}`)
  }

  const activeFiltersCount =
    selectedCategories.length +
    (selectedType !== "all" ? 1 : 0) +
    selectedRetailers.length +
    (selectedRating ? 1 : 0) +
    (showOnSale ? 1 : 0) +
    (showFastDelivery ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Filter className="w-5 h-5 text-blue-600" />
            Filters & Search
          </CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {activeFiltersCount} active filter{activeFiltersCount !== 1 ? "s" : ""}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="border-orange-200 bg-orange-50 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="flex items-center gap-1 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <span>{categoryIcons[categoryId]}</span>
                  {categoryLabels[categoryId] || categoryId}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => handleCategoryChange(categoryId, false)}
                  />
                </Badge>
              ))}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-white shadow-sm">
                  {selectedType === "product" ? <Package className="w-3 h-3" /> : <Wrench className="w-3 h-3" />}
                  {selectedType === "product" ? "Products" : "Services"}
                  <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => setSelectedType("all")} />
                </Badge>
              )}
              {selectedRetailers.map((retailerId) => {
                const retailer = retailers.find((r) => r.id === retailerId)
                return (
                  <Badge key={retailerId} variant="secondary" className="flex items-center gap-1 bg-white shadow-sm">
                    <MapPin className="w-3 h-3" />
                    {retailer?.name}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => toggleRetailer(retailerId)}
                    />
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Type Filter */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" />
            Product Type
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RadioGroup value={selectedType} onValueChange={setSelectedType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="font-medium cursor-pointer">
                All Items
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="product" id="product" />
              <Label htmlFor="product" className="font-medium cursor-pointer flex items-center gap-2">
                <Package className="w-4 h-4" />
                Products Only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="service" id="service" />
              <Label htmlFor="service" className="font-medium cursor-pointer flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Services Only
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span className="text-green-600">💰</span>
            Price Range (ZMW)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={10000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-gray-800">
              ZMW {priceRange[0].toLocaleString()}
            </div>
            <span className="text-gray-400 font-medium">to</span>
            <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-gray-800">
              ZMW {priceRange[1].toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span>📂</span>
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-medium cursor-pointer group-hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">{categoryIcons[category]}</span>
                  {categoryLabels[category] || category}
                </Label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Customer Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {ratings.map((rating) => (
            <div
              key={rating.value}
              className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={selectedRating === rating.value}
                  onCheckedChange={() => setSelectedRating(selectedRating === rating.value ? null : rating.value)}
                />
                <Label
                  htmlFor={`rating-${rating.value}`}
                  className="text-sm font-medium cursor-pointer group-hover:text-blue-600 transition-colors flex items-center gap-2"
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
              <Badge variant="outline" className="text-xs font-medium">
                {rating.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Local Retailers */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            Local Retailers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {retailers.map((retailer) => (
            <div
              key={retailer.id}
              className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={retailer.id}
                  checked={selectedRetailers.includes(retailer.id)}
                  onCheckedChange={() => toggleRetailer(retailer.id)}
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor={retailer.id}
                    className="text-sm font-medium cursor-pointer group-hover:text-blue-600 transition-colors"
                  >
                    {retailer.name}
                  </Label>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {retailer.rating}
                    </div>
                    <span>•</span>
                    <span>{retailer.location}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                {retailer.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Special Offers */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span>🏷️</span>
            Special Offers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Checkbox id="on-sale" checked={showOnSale} onCheckedChange={setShowOnSale} />
            <Label htmlFor="on-sale" className="text-sm font-medium cursor-pointer flex items-center gap-2">
              <span>🏷️</span>
              On Sale
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Checkbox id="in-stock" checked={showInStock} onCheckedChange={setShowInStock} />
            <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer flex items-center gap-2">
              <span>✅</span>
              Available Only
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Checkbox id="fast-delivery" checked={showFastDelivery} onCheckedChange={setShowFastDelivery} />
            <Label htmlFor="fast-delivery" className="text-sm font-medium cursor-pointer flex items-center gap-2">
              <span>⚡</span>
              Fast Service
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <div className="space-y-3">
        <Button
          onClick={applyFilters}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-6 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Filter className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl py-6 font-semibold text-base"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
}
