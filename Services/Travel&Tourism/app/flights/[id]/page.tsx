"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Plane,
  MapPin,
  Clock,
  Users,
  Wifi,
  Utensils,
  Monitor,
  CheckCircle,
  X,
  Calendar,
  Shield,
  Star,
} from "lucide-react"
import Link from "next/link"

const flightDetails: { [key: string]: any } = {
  "1": {
    id: 1,
    airline: "Emirates",
    logo: "/placeholder.svg?height=60&width=60",
    flightNumber: "EK 201",
    aircraft: "Airbus A380-800",
    departure: {
      time: "08:30",
      airport: "JFK",
      city: "New York",
      date: "Dec 15, 2024",
      terminal: "Terminal 4",
      gate: "A12",
    },
    arrival: {
      time: "22:45",
      airport: "DXB",
      city: "Dubai",
      date: "Dec 15, 2024",
      terminal: "Terminal 3",
      gate: "B7",
    },
    duration: "14h 15m",
    stops: "Non-stop",
    price: 1299,
    class: "Economy",
    baggage: {
      carry: "1 x 7kg carry-on bag",
      checked: "2 x 23kg checked bags included",
    },
    amenities: ["wifi", "entertainment", "meals", "power"],
    seatMap: true,
    refundable: false,
    changeable: true,
    changeFeee: 150,
    rating: 4.6,
    reviews: 2847,
    description:
      "Experience world-class service on Emirates' flagship A380 aircraft with spacious seating, award-winning entertainment, and gourmet dining.",
  },
  "2": {
    id: 2,
    airline: "Qatar Airways",
    logo: "/placeholder.svg?height=60&width=60",
    flightNumber: "QR 701",
    aircraft: "Boeing 777-300ER",
    departure: {
      time: "10:15",
      airport: "JFK",
      city: "New York",
      date: "Dec 15, 2024",
      terminal: "Terminal 8",
      gate: "C15",
    },
    arrival: {
      time: "06:30+1",
      airport: "DOH",
      city: "Doha",
      date: "Dec 16, 2024",
      terminal: "Terminal 1",
      gate: "D22",
    },
    duration: "12h 45m",
    stops: "1 Stop in Doha",
    price: 1150,
    class: "Economy",
    baggage: {
      carry: "1 x 7kg carry-on bag",
      checked: "2 x 23kg checked bags included",
    },
    amenities: ["wifi", "entertainment", "meals", "power"],
    seatMap: true,
    refundable: false,
    changeable: true,
    changeFeee: 125,
    rating: 4.7,
    reviews: 1923,
    description:
      "Enjoy Qatar Airways' renowned hospitality and comfort on this modern Boeing 777 with excellent connectivity and dining options.",
  },
  "3": {
    id: 3,
    airline: "Turkish Airlines",
    logo: "/placeholder.svg?height=60&width=60",
    flightNumber: "TK 003",
    aircraft: "Boeing 787-9",
    departure: {
      time: "23:55",
      airport: "JFK",
      city: "New York",
      date: "Dec 15, 2024",
      terminal: "Terminal 1",
      gate: "A8",
    },
    arrival: {
      time: "19:20+1",
      airport: "IST",
      city: "Istanbul",
      date: "Dec 16, 2024",
      terminal: "Terminal 1",
      gate: "F12",
    },
    duration: "16h 25m",
    stops: "1 Stop in Istanbul",
    price: 950,
    class: "Economy",
    baggage: {
      carry: "1 x 8kg carry-on bag",
      checked: "1 x 23kg checked bag included",
    },
    amenities: ["wifi", "entertainment", "meals"],
    seatMap: true,
    refundable: false,
    changeable: true,
    changeFeee: 100,
    rating: 4.4,
    reviews: 1456,
    description:
      "Fly with Turkish Airlines on their modern Dreamliner featuring comfortable seating and excellent in-flight service with a convenient stopover in Istanbul.",
  },
  "4": {
    id: 4,
    airline: "Lufthansa",
    logo: "/placeholder.svg?height=60&width=60",
    flightNumber: "LH 441",
    aircraft: "Airbus A340-600",
    departure: {
      time: "18:40",
      airport: "JFK",
      city: "New York",
      date: "Dec 15, 2024",
      terminal: "Terminal 1",
      gate: "B5",
    },
    arrival: {
      time: "08:15+1",
      airport: "FRA",
      city: "Frankfurt",
      date: "Dec 16, 2024",
      terminal: "Terminal 1",
      gate: "A15",
    },
    duration: "7h 35m",
    stops: "Non-stop",
    price: 1450,
    class: "Business",
    baggage: {
      carry: "2 x 8kg carry-on bags",
      checked: "2 x 32kg checked bags included",
    },
    amenities: ["wifi", "entertainment", "meals", "power", "lounge"],
    seatMap: true,
    refundable: true,
    changeable: true,
    changeFeee: 0,
    rating: 4.5,
    reviews: 987,
    description:
      "Experience premium comfort in Lufthansa Business Class with lie-flat seats, gourmet dining, and access to exclusive lounges.",
  },
}

const amenityIcons = {
  wifi: Wifi,
  entertainment: Monitor,
  meals: Utensils,
  power: CheckCircle,
  lounge: Star,
}

const amenityLabels = {
  wifi: "Wi-Fi Available",
  entertainment: "In-flight Entertainment",
  meals: "Complimentary Meals",
  power: "Power Outlets",
  lounge: "Lounge Access",
}

export default function FlightDetailPage() {
  const params = useParams()
  const id = params.id as string
  const flight = flightDetails[id]

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Flight not found</h1>
          <Link href="/flights">
            <Button>Back to Flight Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/flights">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search Results
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={flight.logo || "/placeholder.svg"} alt={flight.airline} className="w-12 h-12 rounded" />
                    <div>
                      <CardTitle className="text-xl">{flight.airline}</CardTitle>
                      <div className="text-sm text-gray-600">
                        {flight.flightNumber} • {flight.aircraft}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    {flight.class}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(flight.rating)}
                  <span className="font-medium">{flight.rating}</span>
                  <span className="text-gray-600">({flight.reviews} reviews)</span>
                </div>
                <p className="text-gray-700">{flight.description}</p>
              </CardContent>
            </Card>

            {/* Flight Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Flight Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Departure */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-600">Departure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold">{flight.departure.time}</div>
                        <div className="text-gray-600">{flight.departure.date}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {flight.departure.city} ({flight.departure.airport})
                        </div>
                        <div className="text-sm text-gray-600">{flight.departure.terminal}</div>
                        <div className="text-sm text-gray-600">Gate: {flight.departure.gate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="border-t border-gray-300 w-16"></div>
                      <div className="text-center">
                        <Plane className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-sm">{flight.duration}</div>
                        <div className="text-xs">{flight.stops}</div>
                      </div>
                      <div className="border-t border-gray-300 w-16"></div>
                    </div>
                  </div>

                  {/* Arrival */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-red-600">Arrival</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold">{flight.arrival.time}</div>
                        <div className="text-gray-600">{flight.arrival.date}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {flight.arrival.city} ({flight.arrival.airport})
                        </div>
                        <div className="text-sm text-gray-600">{flight.arrival.terminal}</div>
                        <div className="text-sm text-gray-600">Gate: {flight.arrival.gate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>In-flight Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {flight.amenities.map((amenity: string) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                    return IconComponent ? (
                      <div key={amenity} className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <span className="text-sm">{amenityLabels[amenity as keyof typeof amenityLabels]}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Baggage Information */}
            <Card>
              <CardHeader>
                <CardTitle>Baggage Allowance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Carry-on Baggage</div>
                      <div className="text-sm text-gray-600">{flight.baggage.carry}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Checked Baggage</div>
                      <div className="text-sm text-gray-600">{flight.baggage.checked}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fare Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Fare Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    {flight.refundable ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">{flight.refundable ? "Refundable" : "Non-refundable"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {flight.changeable ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">
                      {flight.changeable
                        ? `Changes allowed (${flight.changeFeee > 0 ? `$${flight.changeFeee} fee` : "Free"})`
                        : "No changes allowed"}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800 mb-1">Important</div>
                    <div className="text-yellow-700">
                      Please arrive at the airport at least 3 hours before international departures. Valid passport
                      required for international travel.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Flight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">${flight.price}</div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration
                    </span>
                    <span>{flight.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Stops
                    </span>
                    <span>{flight.stops}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Class
                    </span>
                    <span>{flight.class}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Link href="/booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Select Flight - ${flight.price}
                    </Button>
                  </Link>
                  {flight.seatMap && (
                    <Link href={`/flights/${flight.id}/seats`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Seat Map
                      </Button>
                    </Link>
                  )}
                  <Link href="/wishlist">
                    <Button variant="outline" className="w-full bg-transparent">
                      Add to Wishlist
                    </Button>
                  </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">Price Lock</div>
                      <div className="text-blue-700">Hold this price for 24 hours for just $25</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Price includes all taxes and fees. Final price confirmed at booking.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
