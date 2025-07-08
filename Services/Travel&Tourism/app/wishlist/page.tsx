"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Trash2, Share2, Calendar, MapPin, Star, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface WishlistItem {
  id: string
  type: "package" | "activity"
  title: string
  description: string
  price: number
  originalPrice?: number
  image: string
  location: string
  rating: number
  reviews: number
  duration?: string
  destinations?: string[]
  category?: string
  addedDate: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  // Mock wishlist data - in a real app, this would come from your backend/localStorage
  useEffect(() => {
    const mockWishlist: WishlistItem[] = [
      {
        id: "package-1",
        type: "package",
        title: "European Grand Tour",
        description: "Visit 5 countries in 14 days with flights, hotels, and guided tours included",
        price: 2499,
        originalPrice: 3299,
        image: "/placeholder.svg?height=200&width=300",
        location: "Europe",
        rating: 4.8,
        reviews: 324,
        duration: "14 days",
        destinations: ["Paris", "Rome", "Barcelona", "Amsterdam", "London"],
        addedDate: "2024-01-15",
      },
      {
        id: "activity-3",
        type: "activity",
        title: "Desert Safari Adventure",
        description: "Dune bashing, camel riding, and traditional dinner",
        price: 129,
        image: "/placeholder.svg?height=200&width=300",
        location: "Dubai, UAE",
        rating: 4.7,
        reviews: 2341,
        duration: "6 hours",
        category: "Adventure",
        addedDate: "2024-01-10",
      },
      {
        id: "package-2",
        type: "package",
        title: "Tropical Paradise Escape",
        description: "Relax in the Maldives with overwater bungalows and all-inclusive dining",
        price: 3999,
        originalPrice: 4999,
        image: "/placeholder.svg?height=200&width=300",
        location: "Maldives",
        rating: 4.9,
        reviews: 156,
        duration: "7 days",
        destinations: ["Maldives"],
        addedDate: "2024-01-08",
      },
    ]

    // Simulate loading
    setTimeout(() => {
      setWishlistItems(mockWishlist)
      setLoading(false)
    }, 1000)
  }, [])

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const shareItem = (item: WishlistItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.origin + `/${item.type}s/${item.id.split("-")[1]}`,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Check out this ${item.type}: ${item.title} - ${window.location.origin}/${item.type}s/${item.id.split("-")[1]}`,
      )
      alert("Link copied to clipboard!")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                  <Heart className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-bold">Linka</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your wishlist...</p>
          </div>
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
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-lg text-gray-600">
            {wishlistItems.length > 0
              ? `You have ${wishlistItems.length} saved ${wishlistItems.length === 1 ? "item" : "items"}`
              : "Save your favorite packages and activities for later"}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our packages and activities to save your favorites for later planning.
            </p>
            <div className="space-x-4">
              <Link href="/packages">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse Packages</Button>
              </Link>
              <Link href="/activities">
                <Button variant="outline" className="bg-transparent">
                  Browse Activities
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 capitalize">
                      {item.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/80 hover:bg-white p-2"
                      onClick={() => shareItem(item)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/80 hover:bg-white p-2 text-red-600 hover:text-red-700"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {item.duration}
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.description}</CardDescription>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                      <span className="text-gray-600">({item.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{item.destinations ? item.destinations.join(" → ") : item.location}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">${item.originalPrice}</span>
                      )}
                      <div className="text-sm text-gray-600">
                        {item.type === "package" ? "per person" : "per person"}
                      </div>
                    </div>
                    {item.originalPrice && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Save ${item.originalPrice - item.price}
                      </Badge>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Added {new Date(item.addedDate).toLocaleDateString()}
                  </div>

                  <div className="space-y-2">
                    <Link href={`/${item.type}s/${item.id.split("-")[1]}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        {item.type === "package" ? "View Package" : "View Activity"}
                      </Button>
                    </Link>
                    <Link href="/booking">
                      <Button variant="outline" className="w-full bg-transparent">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Ready to Book?</CardTitle>
                <CardDescription>
                  Contact our travel specialists to help plan your perfect trip from your wishlist items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/quote">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Custom Quote</Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    Call Travel Specialist
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Our experts can help combine multiple items into one amazing trip
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
