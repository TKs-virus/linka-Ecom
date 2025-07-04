"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Star, Clock, Users, Camera, Utensils } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const activitiesByDestination: { [key: string]: any[] } = {
  "New York": [
    {
      id: 1,
      title: "Statue of Liberty & Ellis Island Tour",
      description: "Visit iconic landmarks with ferry rides and guided tours",
      price: 89,
      duration: "4 hours",
      rating: 4.8,
      reviews: 1234,
      image: "/placeholder.svg?height=200&width=300",
      category: "Sightseeing",
      groupSize: "Up to 20",
    },
    {
      id: 2,
      title: "Broadway Show Experience",
      description: "Premium seats to top-rated Broadway productions",
      price: 159,
      duration: "3 hours",
      rating: 4.9,
      reviews: 856,
      image: "/placeholder.svg?height=200&width=300",
      category: "Entertainment",
      groupSize: "Any size",
    },
  ],
  Dubai: [
    {
      id: 3,
      title: "Desert Safari Adventure",
      description: "Dune bashing, camel riding, and traditional dinner",
      price: 129,
      duration: "6 hours",
      rating: 4.7,
      reviews: 2341,
      image: "/placeholder.svg?height=200&width=300",
      category: "Adventure",
      groupSize: "Up to 15",
    },
    {
      id: 4,
      title: "Burj Khalifa Sky Deck",
      description: "Visit the world's tallest building with fast-track access",
      price: 79,
      duration: "2 hours",
      rating: 4.6,
      reviews: 1876,
      image: "/placeholder.svg?height=200&width=300",
      category: "Sightseeing",
      groupSize: "Any size",
    },
  ],
  Paris: [
    {
      id: 5,
      title: "Louvre Museum Private Tour",
      description: "Skip-the-line access with expert art historian guide",
      price: 199,
      duration: "3 hours",
      rating: 4.9,
      reviews: 987,
      image: "/placeholder.svg?height=200&width=300",
      category: "Culture",
      groupSize: "Up to 8",
    },
    {
      id: 6,
      title: "Seine River Dinner Cruise",
      description: "Romantic dinner cruise with panoramic city views",
      price: 149,
      duration: "2.5 hours",
      rating: 4.8,
      reviews: 1543,
      image: "/placeholder.svg?height=200&width=300",
      category: "Dining",
      groupSize: "Any size",
    },
  ],
}

const defaultActivities = [
  {
    id: 7,
    title: "City Walking Tour",
    description: "Explore the city's highlights with a local guide",
    price: 45,
    duration: "3 hours",
    rating: 4.5,
    reviews: 567,
    image: "/placeholder.svg?height=200&width=300",
    category: "Sightseeing",
    groupSize: "Up to 25",
  },
  {
    id: 8,
    title: "Food & Culture Experience",
    description: "Taste local cuisine and learn about traditions",
    price: 89,
    duration: "4 hours",
    rating: 4.7,
    reviews: 432,
    image: "/placeholder.svg?height=200&width=300",
    category: "Food & Drink",
    groupSize: "Up to 12",
  },
]

export default function ActivitiesPage() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || ""

  const activities =
    destination && activitiesByDestination[destination] ? activitiesByDestination[destination] : defaultActivities

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sightseeing":
        return <Camera className="h-4 w-4" />
      case "Food & Drink":
      case "Dining":
        return <Utensils className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
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

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Activities & Tours {destination && `in ${destination}`}
          </h1>
          <p className="text-lg text-gray-600">
            {destination
              ? `Discover the best experiences ${destination} has to offer`
              : "Find exciting activities and tours for your next adventure"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
                    {getCategoryIcon(activity.category)}
                    {activity.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {activity.duration}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{activity.title}</CardTitle>
                <CardDescription className="text-sm">{activity.description}</CardDescription>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    {renderStars(activity.rating)}
                    <span className="text-gray-600">({activity.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="h-3 w-3" />
                    {activity.groupSize}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${activity.price}</span>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Activity</Button>
                  </Link>
                  <Link href={`/activities/${activity.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {destination && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Looking for activities in other destinations?</p>
            <Link href="/activities">
              <Button variant="outline" className="bg-transparent">
                Browse All Activities
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
