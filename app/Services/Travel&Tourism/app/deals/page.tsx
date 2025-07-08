"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plane, Hotel, Car, Package, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const deals = [
  {
    id: 1,
    type: "flight",
    title: "Summer Sale to Europe",
    description: "Up to 40% off flights to major European cities",
    originalPrice: 899,
    salePrice: 539,
    destination: "Paris, France",
    image: "/placeholder.svg?height=200&width=300",
    validUntil: "Dec 31, 2024",
    badge: "Limited Time",
    savings: "Save $360",
  },
  {
    id: 2,
    type: "hotel",
    title: "Luxury Resort Package",
    description: "Book 3 nights, get 1 free at premium resorts",
    originalPrice: 1200,
    salePrice: 900,
    destination: "Maldives",
    image: "/placeholder.svg?height=200&width=300",
    validUntil: "Jan 15, 2025",
    badge: "Popular",
    savings: "Save $300",
  },
  {
    id: 3,
    type: "package",
    title: "Flight + Hotel Combo",
    description: "Complete vacation packages starting from $599",
    originalPrice: 999,
    salePrice: 599,
    destination: "Bali, Indonesia",
    image: "/placeholder.svg?height=200&width=300",
    validUntil: "Dec 25, 2024",
    badge: "Best Value",
    savings: "Save $400",
  },
  {
    id: 4,
    type: "car",
    title: "Car Rental Special",
    description: "Free upgrade to premium vehicles",
    originalPrice: 299,
    salePrice: 199,
    destination: "Los Angeles, USA",
    image: "/placeholder.svg?height=200&width=300",
    validUntil: "Jan 31, 2025",
    badge: "New",
    savings: "Save $100",
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flight":
      return <Plane className="h-5 w-5" />
    case "hotel":
      return <Hotel className="h-5 w-5" />
    case "car":
      return <Car className="h-5 w-5" />
    case "package":
      return <Package className="h-5 w-5" />
    default:
      return <Plane className="h-5 w-5" />
  }
}

export default function DealsPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Special Travel Deals</h1>
          <p className="text-lg text-gray-600">Don't miss out on these amazing limited-time offers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {deal.badge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-blue-600 text-white p-2 rounded-full">{getTypeIcon(deal.type)}</div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{deal.title}</CardTitle>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {deal.savings}
                  </Badge>
                </div>
                <CardDescription>{deal.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {deal.destination}
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${deal.salePrice}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">${deal.originalPrice}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      Valid until {deal.validUntil}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Book This Deal</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
