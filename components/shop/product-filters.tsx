"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"
import { getCategories } from "@/app/actions/product-actions"

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    featured?: boolean
  }) => void
  currentFilters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    featured?: boolean
  }
}

export function ProductFilters({ onFiltersChange, currentFilters }: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState<string>(currentFilters.category || "all")
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(currentFilters.featured || false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await getCategories()
        if (result.success) {
          setCategories(result.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (currentFilters.minPrice !== undefined || currentFilters.maxPrice !== undefined) {
      setPriceRange([currentFilters.minPrice || 0, currentFilters.maxPrice || 1000])
    }
  }, [currentFilters.minPrice, currentFilters.maxPrice])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onFiltersChange({
      ...currentFilters,
      category: category === "all" ? undefined : category,
    })
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    onFiltersChange({
      ...currentFilters,
      minPrice: value[0],
      maxPrice: value[1],
    })
  }

  const handleFeaturedChange = (checked: boolean) => {
    setFeaturedOnly(checked)
    onFiltersChange({
      ...currentFilters,
      featured: checked || undefined,
    })
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setPriceRange([0, 1000])
    setFeaturedOnly(false)
    onFiltersChange({})
  }

  const hasActiveFilters = selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 1000 || featuredOnly

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-600 hover:text-slate-900">
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-900">Category</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="category-all"
                checked={selectedCategory === "all"}
                onCheckedChange={() => handleCategoryChange("all")}
              />
              <Label htmlFor="category-all" className="text-sm font-medium cursor-pointer">
                All Categories
              </Label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategory === category}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-medium cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-slate-900">Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>K{priceRange[0]}</span>
            <span>K{priceRange[1]}</span>
          </div>
        </div>

        <Separator />

        {/* Featured Products */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-900">Special</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="featured-only" checked={featuredOnly} onCheckedChange={handleFeaturedChange} />
            <Label htmlFor="featured-only" className="text-sm font-medium cursor-pointer">
              Featured Products Only
            </Label>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-900">Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedCategory}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => handleCategoryChange("all")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <Badge variant="secondary" className="text-xs">
                    K{priceRange[0]} - K{priceRange[1]}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => handlePriceChange([0, 1000])}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
                {featuredOnly && (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => handleFeaturedChange(false)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
