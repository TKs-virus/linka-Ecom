"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Plane, Car, Hotel, Package, Activity, TrendingUp, Clock, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

// Mock data for autocomplete
const destinations = [
  { code: "NYC", city: "New York", country: "United States", airport: "JFK", popular: true },
  { code: "LON", city: "London", country: "United Kingdom", airport: "LHR", popular: true },
  { code: "PAR", city: "Paris", country: "France", airport: "CDG", popular: true },
  { code: "TOK", city: "Tokyo", country: "Japan", airport: "NRT", popular: true },
  { code: "DXB", city: "Dubai", country: "UAE", airport: "DXB", popular: true },
  { code: "SIN", city: "Singapore", country: "Singapore", airport: "SIN", popular: true },
  { code: "SYD", city: "Sydney", country: "Australia", airport: "SYD", popular: false },
  { code: "BKK", city: "Bangkok", country: "Thailand", airport: "BKK", popular: false },
  { code: "IST", city: "Istanbul", country: "Turkey", airport: "IST", popular: false },
  { code: "LAX", city: "Los Angeles", country: "United States", airport: "LAX", popular: false },
  { code: "MIA", city: "Miami", country: "United States", airport: "MIA", popular: false },
  { code: "BCN", city: "Barcelona", country: "Spain", airport: "BCN", popular: false },
  { code: "ROM", city: "Rome", country: "Italy", airport: "FCO", popular: false },
  { code: "AMS", city: "Amsterdam", country: "Netherlands", airport: "AMS", popular: false },
  { code: "HKG", city: "Hong Kong", country: "Hong Kong", airport: "HKG", popular: false },
]

// Mock search history
const getSearchHistory = () => {
  if (typeof window !== "undefined") {
    const history = localStorage.getItem("searchHistory")
    return history ? JSON.parse(history) : []
  }
  return []
}

const saveToSearchHistory = (destination: any) => {
  if (typeof window !== "undefined") {
    const history = getSearchHistory()
    const filtered = history.filter((item: any) => item.code !== destination.code)
    const newHistory = [destination, ...filtered].slice(0, 5)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }
}

// Autocomplete Component
function AutocompleteInput({
  placeholder,
  value,
  onChange,
  onSelect,
  type = "flight" | "hotel",
}: {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: (destination: any) => void
  type?: "flight" | "hotel"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [searchHistory, setSearchHistory] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  useEffect(() => {
    if (value.length === 0) {
      // Show popular destinations and search history when empty
      const popular = destinations.filter((d) => d.popular)
      const history = searchHistory.filter((h) => !popular.find((p) => p.code === h.code))
      setFilteredDestinations([...history, ...popular])
    } else {
      // Filter based on input
      const filtered = destinations.filter(
        (dest) =>
          dest.city.toLowerCase().includes(value.toLowerCase()) ||
          dest.country.toLowerCase().includes(value.toLowerCase()) ||
          dest.code.toLowerCase().includes(value.toLowerCase()) ||
          dest.airport.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredDestinations(filtered)
    }
  }, [value, searchHistory])

  const handleSelect = (destination: any) => {
    onChange(`${destination.city}, ${destination.country}`)
    onSelect(destination)
    saveToSearchHistory(destination)
    setSearchHistory(getSearchHistory())
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsOpen(true)
  }

  const handleInputFocus = () => {
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
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          {value.length === 0 && searchHistory.length > 0 && (
            <div className="p-2 border-b">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Clock className="h-3 w-3" />
                Recent Searches
              </div>
              {searchHistory.slice(0, 3).map((dest) => (
                <div
                  key={`history-${dest.code}`}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded"
                  onClick={() => handleSelect(dest)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium">{dest.code}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{dest.city}</div>
                    <div className="text-xs text-gray-500">{dest.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {value.length === 0 && (
            <div className="p-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <TrendingUp className="h-3 w-3" />
                Popular Destinations
              </div>
            </div>
          )}

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
                  {type === "flight" && <div className="text-xs text-gray-400">{dest.airport} Airport</div>}
                </div>
                {dest.popular && (
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <div className="text-sm">No destinations found</div>
              <div className="text-xs">Try searching for a city or country</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()

  // Flight search states
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [selectedFromDest, setSelectedFromDest] = useState<any>(null)
  const [selectedToDest, setSelectedToDest] = useState<any>(null)

  // Hotel search states
  const [hotelDestination, setHotelDestination] = useState("")
  const [selectedHotelDest, setSelectedHotelDest] = useState<any>(null)

  // Car rental states
  const [carLocation, setCarLocation] = useState("")
  const [selectedCarDest, setSelectedCarDest] = useState<any>(null)

  const topDestinations = [
    { name: "Paris, France", image: "/placeholder.svg?height=200&width=300", deals: "120+ deals" },
    { name: "Tokyo, Japan", image: "/placeholder.svg?height=200&width=300", deals: "85+ deals" },
    { name: "New York, USA", image: "/placeholder.svg?height=200&width=300", deals: "200+ deals" },
    { name: "Dubai, UAE", image: "/placeholder.svg?height=200&width=300", deals: "95+ deals" },
  ]

  const travelDeals = [
    { title: "Summer Sale", description: "Up to 40% off flights to Europe", badge: "Limited Time" },
    { title: "Hotel Deals", description: "Book 3 nights, get 1 free", badge: "Popular" },
    { title: "Package Deals", description: "Flight + Hotel from $599", badge: "Best Value" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              <span className="text-xl md:text-2xl font-bold text-gray-900">Linka</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm lg:text-base">
                Flights
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm lg:text-base">
                Hotels
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm lg:text-base">
                Cars
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm lg:text-base">
                Packages
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm lg:text-base">
                Activities
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-gray-600"></div>
                  <div className="w-full h-0.5 bg-gray-600"></div>
                  <div className="w-full h-0.5 bg-gray-600"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">
              Flights
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">
              Hotels
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">
              Cars
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">
              Packages
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">
              Activities
            </Link>
            <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
              Sign In
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">Your Journey Starts Here</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Discover amazing places, book flights, hotels, and create unforgettable memories
          </p>
        </div>

        {/* Search Tabs */}
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4 md:mb-6 h-auto">
              <TabsTrigger
                value="flights"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Plane className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Flights</span>
              </TabsTrigger>
              <TabsTrigger
                value="hotels"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Hotel className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Hotels</span>
              </TabsTrigger>
              <TabsTrigger
                value="cars"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Car className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Cars</span>
              </TabsTrigger>
              <TabsTrigger
                value="packages"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Package className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Packages</span>
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Activity className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Activities</span>
              </TabsTrigger>
            </TabsList>

            {/* Flight Search */}
            <TabsContent value="flights">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From</Label>
                      <AutocompleteInput
                        placeholder="Departure city"
                        value={fromCity}
                        onChange={setFromCity}
                        onSelect={setSelectedFromDest}
                        type="flight"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <AutocompleteInput
                        placeholder="Destination city"
                        value={toCity}
                        onChange={setToCity}
                        onSelect={setSelectedToDest}
                        type="flight"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Departure</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Return</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !returnDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>Passengers</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4+ Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select defaultValue="economy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium">Premium Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          const params = new URLSearchParams({
                            from: fromCity || "New York, United States",
                            to: toCity || "Dubai, UAE",
                            departure: departureDate ? format(departureDate, "yyyy-MM-dd") : "2024-12-15",
                            return: returnDate ? format(returnDate, "yyyy-MM-dd") : "2024-12-22",
                            passengers: "1", // You can get this from the passengers select
                            class: "economy", // You can get this from the class select
                          })
                          window.location.href = `/flights?${params.toString()}`
                        }}
                      >
                        Search Flights
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hotel Search */}
            <TabsContent value="hotels">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <AutocompleteInput
                        placeholder="Where are you going?"
                        value={hotelDestination}
                        onChange={setHotelDestination}
                        onSelect={setSelectedHotelDest}
                        type="hotel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkInDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOutDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>Guests</Label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Rooms</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Room</SelectItem>
                          <SelectItem value="2">2 Rooms</SelectItem>
                          <SelectItem value="3">3 Rooms</SelectItem>
                          <SelectItem value="4">4+ Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          const params = new URLSearchParams({
                            destination: hotelDestination || "Dubai, UAE",
                            checkin: checkInDate ? format(checkInDate, "yyyy-MM-dd") : "2024-12-15",
                            checkout: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "2024-12-22",
                            guests: "2", // You can get this from the guests select
                            rooms: "1", // You can get this from the rooms select
                          })
                          window.location.href = `/hotels?${params.toString()}`
                        }}
                      >
                        Search Hotels
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Car Rental Search */}
            <TabsContent value="cars">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Pick-up Location</Label>
                      <AutocompleteInput
                        placeholder="Pick-up city or airport"
                        value={carLocation}
                        onChange={setCarLocation}
                        onSelect={setSelectedCarDest}
                        type="flight"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pick-up Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Return Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !returnDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Search Cars</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="packages">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Travel Packages</h3>
                    <p className="text-gray-600 mb-4">Discover amazing package deals</p>
                    <Link href="/packages">
                      <Button className="bg-blue-600 hover:bg-blue-700">Explore Packages</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Activities & Tours</h3>
                    <p className="text-gray-600 mb-4">Find exciting activities at your destination</p>
                    <Link
                      href={`/activities${selectedHotelDest ? `?destination=${encodeURIComponent(selectedHotelDest.city)}` : ""}`}
                    >
                      <Button className="bg-blue-600 hover:bg-blue-700">Find Activities</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Travel Deals */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Special Travel Deals</h2>
            <p className="text-gray-600">Don't miss out on these amazing offers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {travelDeals.map((deal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{deal.title}</CardTitle>
                    <Badge variant="secondary">{deal.badge}</Badge>
                  </div>
                  <CardDescription>{deal.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href="/deals">
                    <Button className="w-full">View Deal</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Top Destinations</h2>
            <p className="text-gray-600">Explore the world's most popular travel destinations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topDestinations.map((destination, index) => (
              <Link key={index} href={`/destinations/${destination.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-40 md:h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base md:text-lg mb-1">{destination.name}</h3>
                    <p className="text-gray-600 text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {destination.deals}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-6 w-6" />
                <span className="text-xl font-bold">Linka</span>
              </div>
              <p className="text-gray-400 text-sm">Your trusted travel companion for amazing journeys worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Flights</li>
                <li>Hotels</li>
                <li>Car Rentals</li>
                <li>Travel Packages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Booking Management</li>
                <li>Travel Insurance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Linka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
