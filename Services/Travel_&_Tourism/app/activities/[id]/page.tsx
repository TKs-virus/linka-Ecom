"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Star, Clock, Users, Camera, Utensils, CheckCircle, X, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const activityDetails: { [key: string]: any } = {
  "1": {
    id: 1,
    title: "Statue of Liberty & Ellis Island Tour",
    description:
      "Visit iconic landmarks with ferry rides and guided tours including audio commentary and museum access",
    fullDescription:
      "Experience the symbols of freedom and immigration that define New York City. This comprehensive tour includes round-trip ferry transportation to both Liberty Island and Ellis Island, where you'll explore the Statue of Liberty Museum and the Ellis Island National Museum of Immigration. Learn about the millions of immigrants who passed through Ellis Island and the history behind Lady Liberty herself.",
    price: 89,
    duration: "4 hours",
    rating: 4.8,
    reviews: 1234,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    category: "Sightseeing",
    groupSize: "Up to 20",
    location: "New York, USA",
    meetingPoint: "Battery Park, New York, NY 10004",
    languages: ["English", "Spanish", "French"],
    included: [
      "Round-trip ferry transportation",
      "Audio guide in multiple languages",
      "Access to Statue of Liberty Museum",
      "Access to Ellis Island Museum",
      "Professional tour guide",
      "All entrance fees",
    ],
    notIncluded: ["Food and beverages", "Hotel pickup and drop-off", "Gratuities", "Personal expenses"],
    highlights: [
      "Skip-the-line ferry access",
      "Close-up views of the Statue of Liberty",
      "Explore Ellis Island Immigration Museum",
      "Learn about NYC's immigration history",
      "Professional guided commentary",
      "Perfect photo opportunities",
    ],
    itinerary: [
      { time: "9:00 AM", activity: "Meet at Battery Park ticket office" },
      { time: "9:30 AM", activity: "Board ferry to Liberty Island" },
      { time: "10:00 AM", activity: "Explore Statue of Liberty and Museum" },
      { time: "11:30 AM", activity: "Ferry to Ellis Island" },
      { time: "12:00 PM", activity: "Tour Ellis Island Immigration Museum" },
      { time: "1:00 PM", activity: "Return ferry to Manhattan" },
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before the experience starts",
    requirements: "Valid photo ID required for all participants",
  },
  "3": {
    id: 3,
    title: "Desert Safari Adventure",
    description: "Dune bashing, camel riding, and traditional dinner with entertainment",
    fullDescription:
      "Experience the magic of the Arabian desert with this thrilling safari adventure. Start with heart-pumping dune bashing in a 4WD vehicle, followed by traditional activities like camel riding and sandboarding. End your day at a Bedouin-style camp with a delicious BBQ dinner, henna painting, and live entertainment including belly dancing and Tanoura shows under the stars.",
    price: 129,
    duration: "6 hours",
    rating: 4.7,
    reviews: 2341,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    category: "Adventure",
    groupSize: "Up to 15",
    location: "Dubai, UAE",
    meetingPoint: "Hotel pickup available (Dubai city center)",
    languages: ["English", "Arabic", "Hindi"],
    included: [
      "Hotel pickup and drop-off",
      "Dune bashing in 4WD vehicle",
      "Camel riding experience",
      "Sandboarding",
      "BBQ dinner with unlimited soft drinks",
      "Live entertainment shows",
      "Henna painting",
      "Traditional Arabic coffee and dates",
    ],
    notIncluded: [
      "Alcoholic beverages",
      "Quad biking (available for extra cost)",
      "Professional photography",
      "Personal expenses",
      "Gratuities",
    ],
    highlights: [
      "Thrilling dune bashing adventure",
      "Authentic Bedouin camp experience",
      "Traditional camel riding",
      "Spectacular desert sunset views",
      "Live cultural entertainment",
      "Delicious Arabian BBQ dinner",
    ],
    itinerary: [
      { time: "3:00 PM", activity: "Hotel pickup in Dubai" },
      { time: "4:00 PM", activity: "Arrive at desert and start dune bashing" },
      { time: "5:30 PM", activity: "Camel riding and sandboarding" },
      { time: "6:30 PM", activity: "Sunset photography and refreshments" },
      { time: "7:30 PM", activity: "Arrive at Bedouin camp" },
      { time: "8:00 PM", activity: "BBQ dinner and live entertainment" },
      { time: "9:30 PM", activity: "Return to Dubai hotels" },
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before the experience starts",
    requirements: "Not recommended for pregnant women or people with back problems",
  },
}

export default function ActivityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const activity = activityDetails[id]

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
          <Link href="/activities">
            <Button>Back to Activities</Button>
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
              <Link href="/activities">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Activities
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
                  {getCategoryIcon(activity.category)}
                  {activity.category}
                </Badge>
              </div>
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(activity.rating)}
                  <span className="font-medium">{activity.rating}</span>
                  <span className="text-gray-600">({activity.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {activity.location}
                </div>
              </div>
              <p className="text-gray-700 text-lg">{activity.fullDescription}</p>
            </div>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Experience Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activity.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.itinerary.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Included/Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activity.included.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">What's Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activity.notIncluded.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Meeting Point</h4>
                  <p className="text-gray-600">{activity.meetingPoint}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Languages Available</h4>
                  <div className="flex gap-2">
                    {activity.languages.map((lang: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cancellation Policy</h4>
                  <p className="text-gray-600">{activity.cancellationPolicy}</p>
                </div>
                {activity.requirements && (
                  <div>
                    <h4 className="font-medium mb-2">Requirements</h4>
                    <p className="text-gray-600">{activity.requirements}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">${activity.price}</span>
                  <span className="text-gray-600">per person</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration
                    </span>
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Group Size
                    </span>
                    <span>{activity.groupSize}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Link href="/booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Book Now - ${activity.price}
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add to Wishlist
                  </Button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-green-800">Free Cancellation</div>
                      <div className="text-green-700">Cancel up to 24 hours before for a full refund</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
