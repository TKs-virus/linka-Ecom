"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Filter,
  SortAsc,
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Coffee,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"

// Add the same AutocompleteInput component and destinations data from the home page
const destinations = [
  { code: "NYC", city: "New York", country: "United States", airport: "JFK", popular: true },
  { code: "LON", city: "London", country: "United Kingdom", airport: "LHR", popular: true },
  { code: "PAR", city: "Paris", country: "France", airport: "CDG", popular: true },
  { code: "TOK", city: "Tokyo", country: "Japan", airport: "NRT", popular: true },
  { code: "DXB", city: "Dubai", country: "UAE", airport: "DXB", popular: true },
  // ... rest of destinations
]

// Add AutocompleteInput component (same as in home page)
function AutocompleteInput({
  placeholder,
  value,
  onChange,
  onSelect,
  type = "hotel",
}: {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: (destination: any) => void
  type?: "flight" | "hotel"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length === 0) {
      setFilteredDestinations(destinations.filter((d) => d.popular))
    } else {
      const filtered = destinations.filter(
        (dest) =>
          dest.city.toLowerCase().includes(value.toLowerCase()) ||
          dest.country.toLowerCase().includes(value.toLowerCase()) ||
          dest.code.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredDestinations(filtered)
    }
  }, [value])

  const handleSelect = (destination: any) => {
    onChange(`${destination.city}, ${destination.country}`)
    onSelect(destination)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsOpen(true)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest) => (
              <div
                key={dest.code}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelect(dest)}
              >
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{dest.code}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{dest.city}</div>
                  <div className="text-sm text-gray-500">{dest.country}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No destinations found</div>
          )}
        </div>
      )}
    </div>
  )
}

const hotelsByDestination: { [key: string]: any[] } = {
  Dubai: [
    {
      id: 1,
      name: "Grand Luxury Resort",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 1248,
      location: "Downtown Dubai",
      distance: "0.5 km from center",
      price: 299,
      originalPrice: 399,
      amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
      type: "Resort",
      guestRating: 9.2,
    },
    {
      id: 2,
      name: "Business Hotel Central",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 856,
      location: "Business District",
      distance: "1.2 km from center",
      price: 189,
      originalPrice: 229,
      amenities: ["wifi", "gym", "restaurant", "breakfast"],
      type: "Hotel",
      guestRating: 8.7,
    },
    {
      id: 3,
      name: "Desert Oasis Resort",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 432,
      location: "Palm Jumeirah",
      distance: "8.5 km from center",
      price: 450,
      originalPrice: 550,
      amenities: ["wifi", "pool", "gym", "restaurant", "parking", "breakfast"],
      type: "Resort",
      guestRating: 9.5,
    },
  ],
  London: [
    {
      id: 4,
      name: "Royal London Hotel",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 987,
      location: "Covent Garden",
      distance: "0.3 km from center",
      price: 220,
      originalPrice: 280,
      amenities: ["wifi", "gym", "restaurant", "breakfast"],
      type: "Hotel",
      guestRating: 8.9,
    },
    {
      id: 5,
      name: "Thames View Suites",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 654,
      location: "South Bank",
      distance: "1.1 km from center",
      price: 350,
      originalPrice: 420,
      amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
      type: "Hotel",
      guestRating: 9.1,
    },
  ],
  Paris: [
    {
      id: 6,
      name: "Champs-Élysées Palace",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 1123,
      location: "8th Arrondissement",
      distance: "0.8 km from center",
      price: 380,
      originalPrice: 480,
      amenities: ["wifi", "gym", "restaurant", "breakfast"],
      type: "Hotel",
      guestRating: 9.3,
    },
    {
      id: 7,
      name: "Montmartre Boutique",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 567,
      location: "Montmartre",
      distance: "3.2 km from center",
      price: 180,
      originalPrice: 230,
      amenities: ["wifi", "breakfast"],
      type: "Boutique",
      guestRating: 8.6,
    },
  ],
  "New York": [
    {
      id: 8,
      name: "Manhattan Grand Hotel",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 1456,
      location: "Midtown Manhattan",
      distance: "0.2 km from Times Square",
      price: 320,
      originalPrice: 400,
      amenities: ["wifi", "gym", "restaurant", "breakfast"],
      type: "Hotel",
      guestRating: 8.8,
    },
    {
      id: 9,
      name: "Brooklyn Heights Inn",
      image: "/placeholder.svg?height=200&width=300",
      rating: 3,
      reviews: 234,
      location: "Brooklyn Heights",
      distance: "8 km from Manhattan",
      price: 150,
      originalPrice: 190,
      amenities: ["wifi", "breakfast"],
      type: "Inn",
      guestRating: 8.2,
    },
  ],
}

const getHotelsByDestination = (destination: string) => {
  // Extract city name from destination string
  const city = destination.split(",")[0].trim()
  return hotelsByDestination[city] || []
}

const mockHotels = [
  {
    id: 1,
    name: "Grand Luxury Resort",
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
    reviews: 1248,
    location: "Downtown Dubai",
    distance: "0.5 km from center",
    price: 299,
    originalPrice: 399,
    amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
    type: "Resort",
    guestRating: 9.2,
  },
  {
    id: 2,
    name: "Business Hotel Central",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4,
    reviews: 856,
    location: "Business District",
    distance: "1.2 km from center",
    price: 189,
    originalPrice: 229,
    amenities: ["wifi", "gym", "restaurant", "breakfast"],
    type: "Hotel",
    guestRating: 8.7,
  },
  {
    id: 3,
    name: "Boutique Suites",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4,
    reviews: 432,
    location: "Old Town",
    distance: "2.1 km from center",
    price: 159,
    originalPrice: 199,
    amenities: ["wifi", "breakfast", "parking"],
    type: "Apartment",
    guestRating: 8.9,
  },
  {
    id: 4,
    name: "Budget Inn Express",
    image: "/placeholder.svg?height=200&width=300",
    rating: 3,
    reviews: 234,
    location: "Airport Area",
    distance: "15 km from center",
    price: 79,
    originalPrice: 99,
    amenities: ["wifi", "parking"],
    type: "Hotel",
    guestRating: 7.8,
  },
]

const amenityIcons = {
  wifi: Wifi,
  pool: Waves,
  gym: Dumbbell,
  restaurant: Utensils,
  parking: Car,
  breakfast: Coffee,
}

const amenityLabels = {
  wifi: "Free Wi-Fi",
  pool: "Swimming Pool",
  gym: "Fitness Center",
  restaurant: "Restaurant",
  parking: "Free Parking",
  breakfast: "Breakfast Included",
}

const propertyTypes = ["Hotel", "Resort", "Apartment", "Hostel", "Villa"]
const starRatings = [3, 4, 5]
const guestRatings = ["Excellent (9+)", "Very Good (8+)", "Good (7+)"]

export default function HotelSearchResults() {
  const searchParams = useSearchParams()
  const initialDestination = searchParams.get("destination") || "Dubai, UAE"

  const [showFilters, setShowFilters] = useState(false)
  const [destinationSearch, setDestinationSearch] = useState(initialDestination)
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  // Initialize hotels based on destination
  const [availableHotels, setAvailableHotels] = useState(() => {
    return getHotelsByDestination(initialDestination)
  })

  const [priceRange, setPriceRange] = useState([50, 500])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("price-low")
  const [filteredHotels, setFilteredHotels] = useState(availableHotels)
  const [showMap, setShowMap] = useState(false)

  // Update hotels when destination changes
  useEffect(() => {
    const hotels = getHotelsByDestination(destinationSearch)
    setAvailableHotels(hotels)
    setFilteredHotels(hotels)
  }, [destinationSearch])

  const handleSearch = () => {
    const hotels = getHotelsByDestination(destinationSearch)
    setAvailableHotels(hotels)
    setFilteredHotels(hotels)
    setSearchPerformed(true)
    applyFilters()
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const handleStarChange = (stars: number, checked: boolean) => {
    if (checked) {
      setSelectedStars([...selectedStars, stars])
    } else {
      setSelectedStars(selectedStars.filter((s) => s !== stars))
    }
  }

  const applyFilters = () => {
    const filtered = availableHotels.filter((hotel) => {
      const priceMatch = hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(hotel.type)
      const starMatch = selectedStars.length === 0 || selectedStars.includes(hotel.rating)
      const amenityMatch =
        selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))

      return priceMatch && typeMatch && starMatch && amenityMatch
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.guestRating - a.guestRating)
        break
      case "popularity":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredHotels(filtered)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
            <Button variant={showMap ? "default" : "outline"} onClick={() => setShowMap(!showMap)}>
              {showMap ? "Hide Map" : "Show Map"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Destination</Label>
                <AutocompleteInput
                  placeholder="Where are you going?"
                  value={destinationSearch}
                  onChange={setDestinationSearch}
                  onSelect={setSelectedDestination}
                  type="hotel"
                />
              </div>
              <div className="space-y-2">
                <Label>Check-in</Label>
                <Input type="date" defaultValue="2024-12-15" />
              </div>
              <div className="space-y-2">
                <Label>Check-out</Label>
                <Input type="date" defaultValue="2024-12-22" />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                  Search Hotels
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{destinationSearch}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span>Dec 15 - Dec 22, 2024</span>
              <Separator orientation="vertical" className="h-4" />
              <span>2 Guests, 1 Room</span>
              <div className="ml-auto">
                <Badge variant="secondary">{filteredHotels.length} hotels found</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update the main grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
          {/* Filters Sidebar */}
          <div className="xl:col-span-1">
            <div className="xl:hidden mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            <Card className={cn("xl:sticky xl:top-24", showFilters ? "block" : "hidden xl:block")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price per night</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={20}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Star Rating</Label>
                  <div className="space-y-2">
                    {starRatings.map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stars-${stars}`}
                          checked={selectedStars.includes(stars)}
                          onCheckedChange={(checked) => handleStarChange(stars, checked as boolean)}
                        />
                        <Label htmlFor={`stars-${stars}`} className="flex items-center gap-1">
                          {renderStars(stars)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Property Type</Label>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                        />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Amenities</Label>
                  <div className="space-y-2">
                    {Object.entries(amenityLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={selectedAmenities.includes(key)}
                          onCheckedChange={(checked) => handleAmenityChange(key, checked as boolean)}
                        />
                        <Label htmlFor={key} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={applyFilters} className="w-full">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Map View */}
            {showMap && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Map View</p>
                      <p className="text-sm">Hotel locations would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sort Options */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Hotel Results</h2>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Guest Rating</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="distance">Distance from Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Hotel Cards */}
            <div className="space-y-4">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* Hotel Image */}
                        <div className="relative h-48 lg:h-full">
                          <Image
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            fill
                            className="object-cover lg:rounded-l-lg"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Hotel Details */}
                        <div className="lg:col-span-2 p-4 lg:p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                            <div className="lg:col-span-2">
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-2">
                                <div className="mb-2 lg:mb-0">
                                  <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                                  <div className="flex items-center gap-1 mb-1">
                                    {renderStars(hotel.rating)}
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      {hotel.type}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1 mb-1">
                                  <MapPin className="h-3 w-3" />
                                  {hotel.location} • {hotel.distance}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {hotel.amenities.slice(0, 4).map((amenity) => {
                                  const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                                  return IconComponent ? (
                                    <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600">
                                      <IconComponent className="h-3 w-3" />
                                      <span className="hidden sm:inline">
                                        {amenityLabels[amenity as keyof typeof amenityLabels]}
                                      </span>
                                    </div>
                                  ) : null
                                })}
                                {hotel.amenities.length > 4 && (
                                  <span className="text-xs text-blue-600">+{hotel.amenities.length - 4} more</span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  {hotel.guestRating}/10
                                </Badge>
                                <span className="text-gray-600 hidden sm:inline">
                                  Excellent • {hotel.reviews} reviews
                                </span>
                                <span className="text-gray-600 sm:hidden">{hotel.reviews} reviews</span>
                              </div>
                            </div>

                            {/* Price and Action */}
                            <div className="flex flex-row lg:flex-col justify-between lg:justify-between items-center lg:items-end">
                              <div className="text-left lg:text-right mb-2 lg:mb-4">
                                {hotel.originalPrice > hotel.price && (
                                  <div className="text-sm text-gray-500 line-through">${hotel.originalPrice}</div>
                                )}
                                <div className="text-xl lg:text-2xl font-bold text-blue-600">${hotel.price}</div>
                                <div className="text-sm text-gray-600">per night</div>
                              </div>

                              <div className="space-y-2 w-32 lg:w-full">
                                <Link href="/booking" className="block">
                                  <Button className="w-full text-sm">View Deal</Button>
                                </Link>
                                <Button variant="outline" size="sm" className="w-full bg-transparent text-xs">
                                  Select Room
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <div className="text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
                    <p className="mb-4">
                      {availableHotels.length === 0
                        ? `We don't have hotels available in ${destinationSearch} yet.`
                        : "Try adjusting your filters to see more results."}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAmenities([])
                        setSelectedTypes([])
                        setSelectedStars([])
                        setPriceRange([50, 500])
                        applyFilters()
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
