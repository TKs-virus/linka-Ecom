"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Star, Clock, Users, CheckCircle, X, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const packageDetails: { [key: string]: any } = {
  "1": {
    id: 1,
    title: "European Grand Tour",
    description: "Visit 5 countries in 14 days with flights, hotels, and guided tours included",
    fullDescription:
      "Embark on the ultimate European adventure visiting the continent's most iconic cities. This comprehensive tour takes you through Paris, Rome, Barcelona, Amsterdam, and London, offering a perfect blend of history, culture, art, and cuisine. Experience the best of Europe with carefully selected accommodations, expert local guides, and seamless transportation between destinations.",
    price: 2499,
    originalPrice: 3299,
    duration: "14 days",
    destinations: ["Paris", "Rome", "Barcelona", "Amsterdam", "London"],
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    rating: 4.8,
    reviews: 324,
    includes: ["Flights", "Hotels", "Tours", "Breakfast"],
    badge: "Best Seller",
    groupSize: "Up to 25",
    difficulty: "Easy",
    itinerary: [
      {
        day: 1,
        city: "Paris",
        title: "Arrival in the City of Light",
        activities: [
          "Arrive at Charles de Gaulle Airport",
          "Private transfer to 4-star hotel in central Paris",
          "Welcome dinner at traditional French bistro",
          "Evening Seine River cruise",
        ],
        accommodation: "4-star hotel in Le Marais district",
        meals: "Dinner",
      },
      {
        day: 2,
        city: "Paris",
        title: "Classic Paris Highlights",
        activities: [
          "Guided tour of the Louvre Museum",
          "Visit to Notre-Dame Cathedral area",
          "Lunch in Latin Quarter",
          "Afternoon at Eiffel Tower with skip-the-line access",
          "Evening free for personal exploration",
        ],
        accommodation: "4-star hotel in Le Marais district",
        meals: "Breakfast, Lunch",
      },
      {
        day: 3,
        city: "Paris",
        title: "Versailles Day Trip",
        activities: [
          "Day trip to Palace of Versailles",
          "Guided tour of palace and gardens",
          "Lunch at palace grounds",
          "Return to Paris",
          "Free evening",
        ],
        accommodation: "4-star hotel in Le Marais district",
        meals: "Breakfast, Lunch",
      },
      {
        day: 4,
        city: "Rome",
        title: "Journey to the Eternal City",
        activities: [
          "Morning flight to Rome",
          "Check-in to boutique hotel near Spanish Steps",
          "Afternoon walking tour of historic center",
          "Visit Trevi Fountain and Pantheon",
          "Welcome dinner with local wine tasting",
        ],
        accommodation: "Boutique hotel near Spanish Steps",
        meals: "Breakfast, Dinner",
      },
      {
        day: 5,
        city: "Rome",
        title: "Ancient Rome Experience",
        activities: [
          "Skip-the-line Colosseum tour",
          "Explore Roman Forum and Palatine Hill",
          "Lunch in Trastevere neighborhood",
          "Afternoon at Vatican Museums and Sistine Chapel",
          "Evening food tour",
        ],
        accommodation: "Boutique hotel near Spanish Steps",
        meals: "Breakfast, Lunch, Dinner",
      },
    ],
    included: [
      "Round-trip international flights",
      "All domestic flights between cities",
      "4-star accommodation throughout",
      "Daily breakfast at hotels",
      "Professional English-speaking guides",
      "All entrance fees to attractions",
      "Private transportation between airports and hotels",
      "Welcome and farewell dinners",
      "24/7 tour support",
    ],
    notIncluded: [
      "International travel insurance",
      "Lunches and dinners not specified",
      "Personal expenses and shopping",
      "Alcoholic beverages (except welcome dinner)",
      "Tips for guides and drivers",
      "Visa fees if required",
      "Optional activities and excursions",
    ],
    highlights: [
      "Visit 5 iconic European capitals",
      "Skip-the-line access to major attractions",
      "Expert local guides in each city",
      "Carefully selected central accommodations",
      "Small group experience (max 25 people)",
      "Seamless transportation throughout",
      "Cultural immersion experiences",
      "24/7 support during travel",
    ],
    bestTime: "April to October",
    physicalRequirement: "Moderate walking required (2-4 miles per day)",
    cancellationPolicy:
      "Free cancellation up to 30 days before departure. 50% refund 15-29 days before. No refund within 14 days.",
  },
  "2": {
    id: 2,
    title: "Tropical Paradise Escape",
    description: "Relax in the Maldives with overwater bungalows and all-inclusive dining",
    fullDescription:
      "Escape to paradise with this luxury Maldives experience featuring overwater bungalows, pristine beaches, and world-class amenities. Enjoy snorkeling in crystal-clear waters, spa treatments, and gourmet dining while surrounded by the natural beauty of the Indian Ocean. This all-inclusive package ensures complete relaxation and unforgettable memories.",
    price: 3999,
    originalPrice: 4999,
    duration: "7 days",
    destinations: ["Maldives"],
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    rating: 4.9,
    reviews: 156,
    includes: ["Flights", "Resort", "All Meals", "Activities"],
    badge: "Luxury",
    groupSize: "Private (2 people)",
    difficulty: "Relaxing",
    itinerary: [
      {
        day: 1,
        city: "Maldives",
        title: "Arrival in Paradise",
        activities: [
          "Arrive at Malé International Airport",
          "Seaplane transfer to resort (45 minutes)",
          "Check-in to overwater bungalow",
          "Welcome cocktail and resort orientation",
          "Sunset dinner at overwater restaurant",
        ],
        accommodation: "Overwater Bungalow with private deck",
        meals: "Dinner",
      },
      {
        day: 2,
        city: "Maldives",
        title: "Ocean Adventures",
        activities: [
          "Morning snorkeling excursion",
          "Dolphin watching cruise",
          "Lunch at beach restaurant",
          "Afternoon spa treatment",
          "Private beach dinner under the stars",
        ],
        accommodation: "Overwater Bungalow with private deck",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        city: "Maldives",
        title: "Island Exploration",
        activities: [
          "Visit to local fishing village",
          "Cultural experience and lunch with locals",
          "Afternoon at leisure",
          "Sunset fishing trip",
          "BBQ dinner on private beach",
        ],
        accommodation: "Overwater Bungalow with private deck",
        meals: "Breakfast, Lunch, Dinner",
      },
    ],
    included: [
      "Round-trip flights to Malé",
      "Seaplane transfers to/from resort",
      "6 nights in overwater bungalow",
      "All meals and beverages (including alcohol)",
      "Daily snorkeling equipment",
      "One spa treatment per person",
      "Sunset dolphin cruise",
      "Cultural island visit",
      "All water sports equipment",
      "24/7 resort concierge service",
    ],
    notIncluded: [
      "International travel insurance",
      "Additional spa treatments",
      "Scuba diving certification courses",
      "Private excursions beyond included activities",
      "Personal shopping and souvenirs",
      "Tips for resort staff",
      "Visa fees if required",
    ],
    highlights: [
      "Luxury overwater bungalow accommodation",
      "All-inclusive dining and beverages",
      "Private deck with direct ocean access",
      "World-class snorkeling and diving",
      "Spa treatments in tropical setting",
      "Cultural experiences with locals",
      "Romantic sunset experiences",
      "Complete relaxation and privacy",
    ],
    bestTime: "November to April (dry season)",
    physicalRequirement: "No physical requirements - pure relaxation",
    cancellationPolicy:
      "Free cancellation up to 45 days before departure. 25% refund 30-44 days before. No refund within 29 days.",
  },
}

export default function PackageDetailPage() {
  const params = useParams()
  const id = params.id as string
  const pkg = packageDetails[id]

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Link href="/packages">
            <Button>Back to Packages</Button>
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
              <Link href="/packages">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Packages
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
              <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90">
                  {pkg.badge}
                </Badge>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
                <Clock className="h-4 w-4 inline mr-1" />
                {pkg.duration}
              </div>
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{pkg.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(pkg.rating)}
                  <span className="font-medium">{pkg.rating}</span>
                  <span className="text-gray-600">({pkg.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {pkg.destinations.join(" → ")}
                </div>
              </div>
              <p className="text-gray-700 text-lg">{pkg.fullDescription}</p>
            </div>

            {/* Package Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Package Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pkg.itinerary.map((day: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-blue-50">
                            Day {day.day}
                          </Badge>
                          <span className="font-medium text-blue-600">{day.city}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{day.title}</h3>
                        <div className="space-y-2">
                          {day.activities.map((activity: string, actIndex: number) => (
                            <div key={actIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{activity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Accommodation: </span>
                            <span className="text-gray-600">{day.accommodation}</span>
                          </div>
                          <div>
                            <span className="font-medium">Meals: </span>
                            <span className="text-gray-600">{day.meals}</span>
                          </div>
                        </div>
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
                    {pkg.included.map((item: string, index: number) => (
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
                    {pkg.notIncluded.map((item: string, index: number) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Best Time to Travel</h4>
                    <p className="text-gray-600">{pkg.bestTime}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Physical Requirements</h4>
                    <p className="text-gray-600">{pkg.physicalRequirement}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cancellation Policy</h4>
                  <p className="text-gray-600">{pkg.cancellationPolicy}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through">${pkg.originalPrice}</span>
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                  <Badge variant="outline" className="text-green-600 border-green-600 mt-2">
                    Save ${pkg.originalPrice - pkg.price}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration
                    </span>
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Group Size
                    </span>
                    <span>{pkg.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Destinations
                    </span>
                    <span>{pkg.destinations.length} cities</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Link href="/booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Book Package - ${pkg.price}
                    </Button>
                  </Link>
                  <Link href={`/quote?package=${pkg.id}&title=${encodeURIComponent(pkg.title)}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Request Custom Quote
                    </Button>
                  </Link>
                  <Link href="/wishlist">
                    <Button variant="outline" className="w-full bg-transparent">
                      Add to Wishlist
                    </Button>
                  </Link>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-green-800">Flexible Booking</div>
                      <div className="text-green-700">Free cancellation available with flexible terms</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Price includes all taxes and fees. Final price may vary based on travel dates and group size.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
