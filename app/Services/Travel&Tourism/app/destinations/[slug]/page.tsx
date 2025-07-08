"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Star, Plane, Hotel, Camera, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const destinationData: { [key: string]: any } = {
  "paris-france": {
    name: "Paris, France",
    description: "The City of Light awaits with its iconic landmarks, world-class museums, and romantic atmosphere.",
    image: "/placeholder.svg?height=400&width=800",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées"],
    bestTime: "April to June, September to October",
    currency: "Euro (EUR)",
    language: "French",
    flightPrice: 599,
    hotelPrice: 189,
  },
  "tokyo-japan": {
    name: "Tokyo, Japan",
    description:
      "Experience the perfect blend of traditional culture and cutting-edge technology in Japan's vibrant capital.",
    image: "/placeholder.svg?height=400&width=800",
    highlights: ["Senso-ji Temple", "Tokyo Skytree", "Shibuya Crossing", "Tsukiji Fish Market"],
    bestTime: "March to May, September to November",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    flightPrice: 899,
    hotelPrice: 159,
  },
  "new-york-usa": {
    name: "New York, USA",
    description: "The city that never sleeps offers endless entertainment, world-class dining, and iconic landmarks.",
    image: "/placeholder.svg?height=400&width=800",
    highlights: ["Statue of Liberty", "Central Park", "Times Square", "Brooklyn Bridge"],
    bestTime: "April to June, September to November",
    currency: "US Dollar (USD)",
    language: "English",
    flightPrice: 399,
    hotelPrice: 229,
  },
  "dubai-uae": {
    name: "Dubai, UAE",
    description:
      "A modern metropolis in the desert, known for luxury shopping, ultramodern architecture, and vibrant nightlife.",
    image: "/placeholder.svg?height=400&width=800",
    highlights: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Marina"],
    bestTime: "November to March",
    currency: "UAE Dirham (AED)",
    language: "Arabic, English",
    flightPrice: 799,
    hotelPrice: 299,
  },
}

export default function DestinationPage() {
  const params = useParams()
  const slug = params.slug as string
  const destination = destinationData[slug]

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
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
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-96">
        <Image src={destination.image || "/placeholder.svg"} alt={destination.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl max-w-2xl">{destination.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Top Attractions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {destination.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Travel Info */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Best Time to Visit</span>
                    </div>
                    <p className="text-gray-600">{destination.bestTime}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Currency</span>
                    </div>
                    <p className="text-gray-600">{destination.currency}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Language</span>
                    </div>
                    <p className="text-gray-600">{destination.language}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Booking */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Trip</CardTitle>
                <CardDescription>Start booking your journey to {destination.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Flights</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">from ${destination.flightPrice}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Hotel className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Hotels</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">from ${destination.hotelPrice}</div>
                      <div className="text-sm text-gray-600">per night</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/flights">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Search Flights</Button>
                  </Link>
                  <Link href="/hotels">
                    <Button variant="outline" className="w-full bg-transparent">
                      Find Hotels
                    </Button>
                  </Link>
                  <Link href={`/activities?destination=${encodeURIComponent(destination.name.split(",")[0])}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Browse Activities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle>Current Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">22°C</div>
                  <div className="text-gray-600">Partly Cloudy</div>
                  <div className="text-sm text-gray-500 mt-2">Perfect weather for sightseeing!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
