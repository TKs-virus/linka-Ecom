"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

const categories = [
  { id: "electronics", name: "Electronics", count: 45 },
  { id: "fashion", name: "Fashion", count: 32 },
  { id: "food", name: "Food & Beverage", count: 28 },
  { id: "home", name: "Home & Garden", count: 19 },
  { id: "books", name: "Books", count: 15 },
  { id: "sports", name: "Sports & Outdoors", count: 12 },
]

const retailers = [
  { id: "tech-store", name: "Tech Electronics", count: 23 },
  { id: "fashion-forward", name: "Fashion Forward", count: 18 },
  { id: "local-roastery", name: "Local Coffee Roastery", count: 12 },
  { id: "artisan-leather", name: "Artisan Leather Co.", count: 8 },
  { id: "downtown-bakery", name: "Downtown Bakery", count: 6 },
]

export function ProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showOnSale, setShowOnSale] = useState(false)
  const [showInStock, setShowInStock] = useState(true)

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleRetailer = (retailerId: string) => {
    setSelectedRetailers((prev) =>
      prev.includes(retailerId) ? prev.filter((id) => id !== retailerId) : [...prev, retailerId],
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedRetailers([])
    setPriceRange([0, 500])
    setShowOnSale(false)
    setShowInStock(true)
  }

  const activeFiltersCount =
    selectedCategories.length + selectedRetailers.length + (showOnSale ? 1 : 0) + (!showInStock ? 1 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                  {category?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(categoryId)} />
                </Badge>
              )
            })}
            {selectedRetailers.map((retailerId) => {
              const retailer = retailers.find((r) => r.id === retailerId)
              return (
                <Badge key={retailerId} variant="secondary" className="flex items-center gap-1">
                  {retailer?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleRetailer(retailerId)} />
                </Badge>
              )
            })}
            {showOnSale && (
              <Badge variant="secondary" className="flex items-center gap-1">
                On Sale
                <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnSale(false)} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Label htmlFor={category.id} className="text-sm font-normal">
                  {category.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Retailers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Retailers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {retailers.map((retailer) => (
            <div key={retailer.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={retailer.id}
                  checked={selectedRetailers.includes(retailer.id)}
                  onCheckedChange={() => toggleRetailer(retailer.id)}
                />
                <Label htmlFor={retailer.id} className="text-sm font-normal">
                  {retailer.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({retailer.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Additional Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" checked={showOnSale} onCheckedChange={setShowOnSale} />
            <Label htmlFor="on-sale" className="text-sm font-normal">
              On Sale
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={showInStock} onCheckedChange={setShowInStock} />
            <Label htmlFor="in-stock" className="text-sm font-normal">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
