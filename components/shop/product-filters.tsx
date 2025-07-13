"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { X, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getProductCategories } from "@/app/actions/product-actions"

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
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
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

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice || maxPrice) {
      setPriceRange([minPrice ? Number.parseFloat(minPrice) : 0, maxPrice ? Number.parseFloat(maxPrice) : 100])
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
    params.delete("minPrice")
    params.delete("maxPrice")

    // Add new filter params
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    }

    if (priceRange[1] < 100) {
      params.set("maxPrice", priceRange[1].toString())
    }

    router.push(`/shop?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedRetailers([])
    setPriceRange([0, 100])
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
    (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0)

  return (
    <Card className="space-y-6">
      {/* Header */}
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-orange-800">Filters</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="border-orange-200 bg-orange-50 p-4">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c === categoryId)
                return (
                  <div
                    key={categoryId}
                    className="flex items-center gap-1 bg-white text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {category}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                  </div>
                )
              })}
              {selectedRetailers.map((retailerId) => {
                const retailer = retailers.find((r) => r.id === retailerId)
                return (
                  <div
                    key={retailerId}
                    className="flex items-center gap-1 bg-white text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {retailer?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleRetailer(retailerId)} />
                  </div>
                )
              })}
              {showOnSale && (
                <div className="flex items-center gap-1 bg-white text-sm font-medium px-3 py-1 rounded-full">
                  On Sale
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnSale(false)} />
                </div>
              )}
              {showFastDelivery && (
                <div className="flex items-center gap-1 bg-white text-sm font-medium px-3 py-1 rounded-full">
                  Fast Delivery
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setShowFastDelivery(false)} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <Label className="text-base font-medium">Categories</Label>
          <div className="mt-3 space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={category} className="text-sm font-normal capitalize cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-base font-medium">Price Range</Label>
          <div className="mt-3">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Retailers */}
        <div>
          <Label className="text-base font-medium">Local Stores</Label>
          <div className="mt-3 space-y-3">
            {retailers.map((retailer) => (
              <div key={retailer.id} className="flex items-center space-x-2">
                <Checkbox
                  id={retailer.id}
                  checked={selectedRetailers.includes(retailer.id)}
                  onCheckedChange={(checked) => toggleRetailer(retailer.id)}
                />
                <div className="flex flex-col">
                  <Label htmlFor={retailer.id} className="text-sm font-normal capitalize cursor-pointer">
                    {retailer.name}
                  </Label>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {retailer.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <Label className="text-base font-medium">Customer Rating</Label>
          <div className="mt-3 space-y-3">
            {ratings.map((rating) => (
              <div key={rating.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={selectedRating === rating.value}
                  onCheckedChange={() => setSelectedRating(selectedRating === rating.value ? null : rating.value)}
                />
                <Label htmlFor={`rating-${rating.value}`} className="text-sm font-normal capitalize cursor-pointer">
                  {rating.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Additional Filters */}
        <div>
          <Label className="text-base font-medium">Special Offers</Label>
          <div className="mt-3 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" checked={showOnSale} onCheckedChange={setShowOnSale} />
              <Label htmlFor="on-sale" className="text-sm font-normal capitalize cursor-pointer">
                On Sale
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" checked={showInStock} onCheckedChange={setShowInStock} />
              <Label htmlFor="in-stock" className="text-sm font-normal capitalize cursor-pointer">
                In Stock Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="fast-delivery" checked={showFastDelivery} onCheckedChange={setShowFastDelivery} />
              <Label htmlFor="fast-delivery" className="text-sm font-normal capitalize cursor-pointer">
                Fast Delivery
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={applyFilters}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-6"
          >
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
