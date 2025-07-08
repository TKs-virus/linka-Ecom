"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, Star, Clock, Truck, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "Pizzeria Del Sol",
    cuisine: "Italian",
    type: "Fine Dining",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    priceRange: "$$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian"],
    hasOffers: true,
  },
  {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    type: "Fast Food",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 1.99,
    priceRange: "$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Vegan"],
    hasOffers: false,
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    type: "Fine Dining",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    priceRange: "$$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Vegan", "Halal"],
    hasOffers: true,
  },
  {
    id: 4,
    name: "Burger Junction",
    cuisine: "American",
    type: "Fast Food",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    priceRange: "$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: [],
    hasOffers: true,
  },
  {
    id: 5,
    name: "Sushi Master",
    cuisine: "Sushi",
    type: "Fine Dining",
    rating: 4.6,
    deliveryTime: "35-45 min",
    deliveryFee: 3.99,
    priceRange: "$$$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Gluten-Free"],
    hasOffers: false,
  },
  {
    id: 6,
    name: "Cafe Mocha",
    cuisine: "American",
    type: "Cafes",
    rating: 4.1,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    priceRange: "$$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Vegan"],
    hasOffers: false,
  },
  {
    id: 7,
    name: "Thai Basil",
    cuisine: "Thai",
    type: "Fine Dining",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    priceRange: "$$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    hasOffers: true,
  },
  {
    id: 8,
    name: "Casa Mexico",
    cuisine: "Mexican",
    type: "Fast Food",
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 2.29,
    priceRange: "$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Gluten-Free"],
    hasOffers: true,
  },
  {
    id: 9,
    name: "Bangkok Street",
    cuisine: "Thai",
    type: "Fast Food",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    priceRange: "$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Vegan"],
    hasOffers: false,
  },
  {
    id: 10,
    name: "El Mariachi",
    cuisine: "Mexican",
    type: "Fine Dining",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: 3.49,
    priceRange: "$$",
    image: "/placeholder.svg?height=200&width=300",
    dietary: ["Vegetarian", "Halal"],
    hasOffers: true,
  },
]

export default function RestaurantsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
  const [sortBy, setSortBy] = useState("popularity")

  // Filter states
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [minRating, setMinRating] = useState("")
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("")
  const [showOffers, setShowOffers] = useState(false)

  const location = searchParams.get("location") || "Your Area"
  const initialCuisine = searchParams.get("cuisine")
  const searchQuery = searchParams.get("search")

  useEffect(() => {
    if (initialCuisine) {
      setSelectedCuisines([initialCuisine])
    }
  }, [initialCuisine])

  useEffect(() => {
    let filtered = restaurants

    // Apply filters
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((r) => selectedCuisines.includes(r.cuisine))
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((r) => selectedTypes.includes(r.type))
    }
    if (selectedDietary.length > 0) {
      filtered = filtered.filter((r) => selectedDietary.some((diet) => r.dietary.includes(diet)))
    }
    if (selectedPriceRange) {
      filtered = filtered.filter((r) => r.priceRange === selectedPriceRange)
    }
    if (minRating) {
      const rating = Number.parseFloat(minRating)
      filtered = filtered.filter((r) => r.rating >= rating)
    }
    if (maxDeliveryTime) {
      const maxTime = Number.parseInt(maxDeliveryTime)
      filtered = filtered.filter((r) => {
        const time = Number.parseInt(r.deliveryTime.split("-")[1])
        return time <= maxTime
      })
    }
    if (showOffers) {
      filtered = filtered.filter((r) => r.hasOffers)
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "deliveryTime":
        filtered.sort((a, b) => {
          const aTime = Number.parseInt(a.deliveryTime.split("-")[0])
          const bTime = Number.parseInt(b.deliveryTime.split("-")[0])
          return aTime - bTime
        })
        break
      case "price":
        filtered.sort((a, b) => a.deliveryFee - b.deliveryFee)
        break
      default: // popularity
        break
    }

    setFilteredRestaurants(filtered)
  }, [
    selectedCuisines,
    selectedTypes,
    selectedDietary,
    selectedPriceRange,
    minRating,
    maxDeliveryTime,
    showOffers,
    sortBy,
    searchQuery,
  ])

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    if (checked) {
      setSelectedCuisines([...selectedCuisines, cuisine])
    } else {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      setSelectedDietary([...selectedDietary, dietary])
    } else {
      setSelectedDietary(selectedDietary.filter((d) => d !== dietary))
    }
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-3">Cuisines</h3>
        <div className="space-y-2">
          {["Italian", "Chinese", "Indian", "American", "Sushi", "Mexican", "Thai"].map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={cuisine}
                checked={selectedCuisines.includes(cuisine)}
                onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
              />
              <Label htmlFor={cuisine}>{cuisine}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-3">Restaurant Type</h3>
        <div className="space-y-2">
          {["Fast Food", "Fine Dining", "Cafes", "Bakeries", "Pizza"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-3">Dietary Restrictions</h3>
        <div className="space-y-2">
          {["Vegetarian", "Vegan", "Gluten-Free", "Halal"].map((dietary) => (
            <div key={dietary} className="flex items-center space-x-2">
              <Checkbox
                id={dietary}
                checked={selectedDietary.includes(dietary)}
                onCheckedChange={(checked) => handleDietaryChange(dietary, checked as boolean)}
              />
              <Label htmlFor={dietary}>{dietary}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-3">Price Range</h3>
        <RadioGroup value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="$" id="price1" />
            <Label htmlFor="price1">$ - Budget</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="$$" id="price2" />
            <Label htmlFor="price2">$$ - Moderate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="$$$" id="price3" />
            <Label htmlFor="price3">$$$ - Expensive</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-3">Rating</h3>
        <Select value={minRating} onValueChange={setMinRating}>
          <SelectTrigger>
            <SelectValue placeholder="Minimum rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4.5">4.5 Stars & Up</SelectItem>
            <SelectItem value="4.0">4.0 Stars & Up</SelectItem>
            <SelectItem value="3.5">3.5 Stars & Up</SelectItem>
            <SelectItem value="3.0">3.0 Stars & Up</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-3">Delivery Time</h3>
        <Select value={maxDeliveryTime} onValueChange={setMaxDeliveryTime}>
          <SelectTrigger>
            <SelectValue placeholder="Maximum delivery time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Under 30 mins</SelectItem>
            <SelectItem value="45">Under 45 mins</SelectItem>
            <SelectItem value="60">Under 1 hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="offers" checked={showOffers} onCheckedChange={(checked) => setShowOffers(checked as boolean)} />
          <Label htmlFor="offers">Discounts Available</Label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Linka</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Restaurants in {location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <SlidersHorizontal className="h-5 w-5 text-gray-400" />
            </div>
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Restaurants in {location}</h2>
                <p className="text-gray-600 mt-1">{filteredRestaurants.length} restaurants found</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Restaurant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                >
                  <div className="relative">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {restaurant.hasOffers && (
                      <Badge className="absolute top-2 left-2 bg-red-500">Offers Available</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {restaurant.cuisine} • {restaurant.type}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Truck className="h-4 w-4 mr-1" />
                        <span>${restaurant.deliveryFee} delivery</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{restaurant.priceRange}</span>
                    </div>

                    {restaurant.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {restaurant.dietary.map((diet) => (
                          <Badge key={diet} variant="secondary" className="text-xs">
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCuisines([])
                    setSelectedTypes([])
                    setSelectedDietary([])
                    setSelectedPriceRange("")
                    setMinRating("")
                    setMaxDeliveryTime("")
                    setShowOffers(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
