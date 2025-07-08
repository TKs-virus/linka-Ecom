"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plane, MapPin, Filter, SortAsc } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

const mockFlights = [
  {
    id: 1,
    airline: "Emirates",
    logo: "/placeholder.svg?height=40&width=40",
    departure: { time: "08:30", airport: "JFK", city: "New York" },
    arrival: { time: "22:45", airport: "DXB", city: "Dubai" },
    duration: "14h 15m",
    stops: "Non-stop",
    price: 1299,
    class: "Economy",
  },
  {
    id: 2,
    airline: "Qatar Airways",
    logo: "/placeholder.svg?height=40&width=40",
    departure: { time: "10:15", airport: "JFK", city: "New York" },
    arrival: { time: "06:30+1", airport: "DOH", city: "Doha" },
    duration: "12h 45m",
    stops: "1 Stop",
    price: 1150,
    class: "Economy",
  },
  {
    id: 3,
    airline: "Turkish Airlines",
    logo: "/placeholder.svg?height=40&width=40",
    departure: { time: "23:55", airport: "JFK", city: "New York" },
    arrival: { time: "19:20+1", airport: "IST", city: "Istanbul" },
    duration: "16h 25m",
    stops: "1 Stop",
    price: 950,
    class: "Economy",
  },
  {
    id: 4,
    airline: "Lufthansa",
    logo: "/placeholder.svg?height=40&width=40",
    departure: { time: "18:40", airport: "JFK", city: "New York" },
    arrival: { time: "08:15+1", airport: "FRA", city: "Frankfurt" },
    duration: "7h 35m",
    stops: "Non-stop",
    price: 1450,
    class: "Business",
  },
]

const airlines = ["Emirates", "Qatar Airways", "Turkish Airlines", "Lufthansa", "British Airways"]
const stops = ["Non-stop", "1 Stop", "2+ Stops"]

const destinations = [
  { city: "New York", code: "JFK" },
  { city: "Dubai", code: "DXB" },
  { city: "London", code: "LHR" },
  { city: "Paris", code: "CDG" },
]

export default function FlightSearchResults() {
  const searchParams = useSearchParams()

  // Get search parameters from URL
  const fromCity = searchParams.get("from") || "New York, United States"
  const toCity = searchParams.get("to") || "Dubai, UAE"
  const departureDate = searchParams.get("departure") || "2024-12-15"
  const returnDate = searchParams.get("return") || "2024-12-22"
  const passengers = searchParams.get("passengers") || "1"
  const travelClass = searchParams.get("class") || "economy"

  // Enhanced mock flights with more destinations and classes
  const allFlights = [
    // New York to Dubai flights
    {
      id: 1,
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "08:30", airport: "JFK", city: "New York" },
      arrival: { time: "22:45", airport: "DXB", city: "Dubai" },
      duration: "14h 15m",
      stops: "Non-stop",
      price: 1299,
      class: "Economy",
      route: "JFK-DXB",
    },
    {
      id: 2,
      airline: "Qatar Airways",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "10:15", airport: "JFK", city: "New York" },
      arrival: { time: "06:30+1", airport: "DOH", city: "Doha" },
      duration: "12h 45m",
      stops: "1 Stop",
      price: 1150,
      class: "Economy",
      route: "JFK-DXB",
    },
    {
      id: 3,
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "08:30", airport: "JFK", city: "New York" },
      arrival: { time: "22:45", airport: "DXB", city: "Dubai" },
      duration: "14h 15m",
      stops: "Non-stop",
      price: 3299,
      class: "Business",
      route: "JFK-DXB",
    },
    // New York to London flights
    {
      id: 5,
      airline: "British Airways",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "21:30", airport: "JFK", city: "New York" },
      arrival: { time: "08:45+1", airport: "LHR", city: "London" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 850,
      class: "Economy",
      route: "JFK-LHR",
    },
    {
      id: 6,
      airline: "Virgin Atlantic",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "12:00", airport: "JFK", city: "New York" },
      arrival: { time: "23:15", airport: "LHR", city: "London" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 2100,
      class: "Business",
      route: "JFK-LHR",
    },
    // New York to Paris flights
    {
      id: 7,
      airline: "Air France",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "22:25", airport: "JFK", city: "New York" },
      arrival: { time: "11:40+1", airport: "CDG", city: "Paris" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 920,
      class: "Economy",
      route: "JFK-CDG",
    },
    {
      id: 8,
      airline: "Delta",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "17:45", airport: "JFK", city: "New York" },
      arrival: { time: "07:00+1", airport: "CDG", city: "Paris" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 2450,
      class: "Business",
      route: "JFK-CDG",
    },
    // London to Dubai flights
    {
      id: 9,
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "14:35", airport: "LHR", city: "London" },
      arrival: { time: "23:50", airport: "DXB", city: "Dubai" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 750,
      class: "Economy",
      route: "LHR-DXB",
    },
    {
      id: 10,
      airline: "British Airways",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "21:45", airport: "LHR", city: "London" },
      arrival: { time: "07:00+1", airport: "DXB", city: "Dubai" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 1850,
      class: "Business",
      route: "LHR-DXB",
    },
  ]

  // Filter flights based on search criteria
  const getFilteredFlights = () => {
    const fromCityName = fromCity.split(",")[0].trim()
    const toCityName = toCity.split(",")[0].trim()

    // Create route identifier
    const fromCode = destinations.find((d) => d.city === fromCityName)?.code || "JFK"
    const toCode = destinations.find((d) => d.city === toCityName)?.code || "DXB"
    const routeId = `${fromCode}-${toCode}`

    return allFlights.filter((flight) => {
      const routeMatch = flight.route === routeId
      const classMatch = flight.class.toLowerCase() === travelClass.toLowerCase()
      return routeMatch && classMatch
    })
  }

  const [availableFlights, setAvailableFlights] = useState(() => getFilteredFlights())
  const [priceRange, setPriceRange] = useState([500, 2000])
  const [durationRange, setDurationRange] = useState([5, 20])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedStops, setSelectedStops] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price-low")
  const [filteredFlights, setFilteredFlights] = useState(availableFlights)
  const [showFilters, setShowFilters] = useState(false)

  // Update flights when search criteria changes
  useEffect(() => {
    const flights = getFilteredFlights()
    setAvailableFlights(flights)
    setFilteredFlights(flights)
  }, [fromCity, toCity, travelClass])

  const handleAirlineChange = (airline: string, checked: boolean) => {
    if (checked) {
      setSelectedAirlines([...selectedAirlines, airline])
    } else {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline))
    }
  }

  const handleStopsChange = (stop: string, checked: boolean) => {
    if (checked) {
      setSelectedStops([...selectedStops, stop])
    } else {
      setSelectedStops(selectedStops.filter((s) => s !== stop))
    }
  }

  const applyFilters = () => {
    const filtered = availableFlights.filter((flight) => {
      const priceMatch = flight.price >= priceRange[0] && flight.price <= priceRange[1]
      const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline)
      const stopsMatch = selectedStops.length === 0 || selectedStops.includes(flight.stops)

      return priceMatch && airlineMatch && stopsMatch
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "duration":
        // Simplified sorting by duration
        break
      case "departure":
        // Simplified sorting by departure time
        break
    }

    setFilteredFlights(filtered)
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
                <Plane className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">
                  {fromCity} → {toCity}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span>
                {new Date(departureDate).toLocaleDateString()} - {new Date(returnDate).toLocaleDateString()}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span>
                {passengers} Passenger{passengers !== "1" ? "s" : ""},{" "}
                {travelClass.charAt(0).toUpperCase() + travelClass.slice(1)}
              </span>
              <div className="ml-auto">
                <Badge variant="secondary">{filteredFlights.length} flights found</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000}
                    min={200}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Airlines */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Airlines</Label>
                  <div className="space-y-2">
                    {airlines.map((airline) => (
                      <div key={airline} className="flex items-center space-x-2">
                        <Checkbox
                          id={airline}
                          checked={selectedAirlines.includes(airline)}
                          onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
                        />
                        <Label htmlFor={airline} className="text-sm">
                          {airline}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stops */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Stops</Label>
                  <div className="space-y-2">
                    {stops.map((stop) => (
                      <div key={stop} className="flex items-center space-x-2">
                        <Checkbox
                          id={stop}
                          checked={selectedStops.includes(stop)}
                          onCheckedChange={(checked) => handleStopsChange(stop, checked as boolean)}
                        />
                        <Label htmlFor={stop} className="text-sm">
                          {stop}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Flight Duration</Label>
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    max={24}
                    min={2}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{durationRange[0]}h</span>
                    <span>{durationRange[1]}h</span>
                  </div>
                </div>

                <Button onClick={applyFilters} className="w-full">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="xl:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Flight Results</h2>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration: Shortest</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                    <SelectItem value="arrival">Arrival Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 lg:p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                        {/* Airline Info */}
                        <div className="flex items-center gap-3 lg:col-span-1">
                          <img
                            src={flight.logo || "/placeholder.svg"}
                            alt={flight.airline}
                            className="w-8 h-8 lg:w-10 lg:h-10 rounded"
                          />
                          <div>
                            <div className="font-medium text-sm lg:text-base">{flight.airline}</div>
                            <div className="text-xs lg:text-sm text-gray-600">{flight.class}</div>
                          </div>
                        </div>

                        {/* Flight Details */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <div className="text-base lg:text-lg font-bold">{flight.departure.time}</div>
                              <div className="text-xs lg:text-sm text-gray-600">{flight.departure.airport}</div>
                              <div className="text-xs text-gray-500">{flight.departure.city}</div>
                            </div>
                            <div className="flex-1 px-2 lg:px-4">
                              <div className="text-center">
                                <div className="text-xs lg:text-sm text-gray-600 mb-1">{flight.duration}</div>
                                <div className="border-t border-gray-300 relative">
                                  <Plane className="h-3 w-3 lg:h-4 lg:w-4 absolute -top-1.5 lg:-top-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-400" />
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{flight.stops}</div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-base lg:text-lg font-bold">{flight.arrival.time}</div>
                              <div className="text-xs lg:text-sm text-gray-600">{flight.arrival.airport}</div>
                              <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                            </div>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="text-center lg:col-span-1">
                          <div className="text-xl lg:text-2xl font-bold text-blue-600 mb-2">${flight.price}</div>
                          <Link href="/booking">
                            <Button className="w-full mb-1">Select Flight</Button>
                          </Link>
                          <Link href={`/flights/${flight.id}`}>
                            <Button variant="ghost" size="sm" className="w-full text-xs">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <div className="text-gray-500">
                    <Plane className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">No flights found</h3>
                    <p className="mb-4">
                      {availableFlights.length === 0
                        ? `No flights available from ${fromCity} to ${toCity} in ${travelClass} class.`
                        : "Try adjusting your filters to see more results."}
                    </p>
                    <div className="space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedAirlines([])
                          setSelectedStops([])
                          setPriceRange([500, 2000])
                          applyFilters()
                        }}
                      >
                        Clear Filters
                      </Button>
                      <Link href="/">
                        <Button>New Search</Button>
                      </Link>
                    </div>
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
