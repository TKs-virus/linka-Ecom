"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plane, MapPin, Star, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const packages = [
  {
    id: 1,
    title: "European Grand Tour",
    description: "Visit 5 countries in 14 days with flights, hotels, and guided tours included",
    price: 2499,
    originalPrice: 3299,
    duration: "14 days",
    destinations: ["Paris", "Rome", "Barcelona", "Amsterdam", "London"],
    image: "/placeholder.svg?height=250&width=400",
    rating: 4.8,
    reviews: 324,
    includes: ["Flights", "Hotels", "Tours", "Breakfast"],
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Tropical Paradise Escape",
    description: "Relax in the Maldives with overwater bungalows and all-inclusive dining",
    price: 3999,
    originalPrice: 4999,
    duration: "7 days",
    destinations: ["Maldives"],
    image: "/placeholder.svg?height=250&width=400",
    rating: 4.9,
    reviews: 156,
    includes: ["Flights", "Resort", "All Meals", "Activities"],
    badge: "Luxury",
  },
  {
    id: 3,
    title: "Asian Adventure",
    description: "Explore the best of Thailand, Vietnam, and Cambodia with cultural experiences",
    price: 1899,
    originalPrice: 2499,
    duration: "12 days",
    destinations: ["Bangkok", "Ho Chi Minh", "Siem Reap"],
    image: "/placeholder.svg?height=250&width=400",
    rating: 4.7,
    reviews: 289,
    includes: ["Flights", "Hotels", "Tours", "Some Meals"],
    badge: "Adventure",
  },
  {
    id: 4,
    title: "American Road Trip",
    description: "Drive through iconic US destinations with car rental and hotel bookings",
    price: 1599,
    originalPrice: 2099,
    duration: "10 days",
    destinations: ["Las Vegas", "Grand Canyon", "Los Angeles", "San Francisco"],
    image: "/placeholder.svg?height=250&width=400",
    rating: 4.6,
    reviews: 198,
    includes: ["Car Rental", "Hotels", "Insurance", "GPS"],
    badge: "Road Trip",
  },
  {
    id: 5,
    title: "Safari & Beach Combo",
    description: "Experience African wildlife and relax on pristine beaches in Kenya",
    price: 3299,
    originalPrice: 4199,
    duration: "9 days",
    destinations: ["Nairobi", "Masai Mara", "Diani Beach"],
    image: "/placeholder.svg?height=250&width=400",
    rating: 4.8,
    reviews: 142,
    includes: ["Flights", "Safari Lodge", "Beach Resort", "Game Drives"],
    badge: "Wildlife",
  },
  {
    id: 6,
    title: "Northern Lights Adventure",
    description: "Chase the Aurora Borealis in Iceland with unique accommodations",
    price: 2799,
    originalPrice: 3499,
    duration: "6 days",
    destinations: ["Reykjavik", "Blue Lagoon", "Northern Iceland"],
    image: "/placeholder.svg?height=250&width=400",
    rating: 4.7,
    reviews: 203,
    includes: ["Flights", "Hotels", "Northern Lights Tour", "Blue Lagoon"],
    badge: "Unique",
  },
]

export default function PackagesPage() {
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
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
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
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Travel Packages</h1>
          <p className="text-lg text-gray-600">
            Discover amazing all-inclusive travel packages designed for unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {pkg.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {pkg.duration}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{pkg.title}</CardTitle>
                <CardDescription className="text-sm">{pkg.description}</CardDescription>

                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    {renderStars(pkg.rating)}
                    <span className="text-gray-600">({pkg.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{pkg.destinations.join(" → ")}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.includes.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">${pkg.originalPrice}</span>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Save ${pkg.originalPrice - pkg.price}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Package</Button>
                  </Link>
                  <Link href={`/packages/${pkg.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Itinerary
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
