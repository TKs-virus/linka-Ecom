"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Star, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocation } from "@/components/location-provider"
import Image from "next/image"

const cuisines = [
  { name: "Italian", icon: "🍝" },
  { name: "Chinese", icon: "🥢" },
  { name: "Indian", icon: "🍛" },
  { name: "American", icon: "🍔" },
  { name: "Sushi", icon: "🍣" },
  { name: "Pizza", icon: "🍕" },
  { name: "Mexican", icon: "🌮" },
  { name: "Thai", icon: "🍜" },
]

const featuredRestaurants = [
  {
    id: 1,
    name: "Pizzeria Del Sol",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 1.99,
    image: "/placeholder.svg?height=200&width=300",
    badge: "New",
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Fast Delivery",
  },
  {
    id: 4,
    name: "Burger Junction",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    image: "/placeholder.svg?height=200&width=300",
    badge: "Discount",
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { location, setLocation } = useLocation()
  const router = useRouter()

  const handleLocationSearch = () => {
    if (location.trim()) {
      router.push(`/restaurants?location=${encodeURIComponent(location)}`)
    }
  }

  const handleCuisineClick = (cuisine: string) => {
    router.push(`/restaurants?cuisine=${encodeURIComponent(cuisine)}`)
  }

  const handleRestaurantClick = (restaurantId: number) => {
    router.push(`/restaurant/${restaurantId}`)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Linka</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Hungry? We've got you covered!</h2>
          <p className="text-xl mb-8">Discover restaurants and order food from your favorite places</p>

          {/* Location Input */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter your delivery address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                  onKeyPress={(e) => handleKeyPress(e, handleLocationSearch)}
                />
              </div>
              <Button
                onClick={handleLocationSearch}
                className="ml-2 h-12 px-6 bg-white text-orange-600 hover:bg-gray-100"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for restaurants or dishes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                  onKeyPress={(e) => handleKeyPress(e, handleSearch)}
                />
              </div>
              <Button onClick={handleSearch} className="ml-2 h-12 px-6 bg-white text-orange-600 hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mx-4 mt-8 rounded">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-yellow-800 font-semibold">🎉 Special Offer: Get 20% off on your first order!</p>
            <p className="text-yellow-700 text-sm">Use code: WELCOME20</p>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Order Now</Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Cuisines */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Cuisines</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {cuisines.map((cuisine) => (
              <Card
                key={cuisine.name}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCuisineClick(cuisine.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{cuisine.icon}</div>
                  <p className="font-medium text-sm">{cuisine.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Restaurants Near You */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Restaurants Near You</h3>
            <Button variant="outline" onClick={() => router.push("/restaurants")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-500">{restaurant.badge}</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Truck className="h-4 w-4 mr-1" />
                      <span>${restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Choices */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Choices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.slice(0, 4).map((restaurant) => (
              <Card
                key={`popular-${restaurant.id}`}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* New on Platform */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">New on Linka</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.slice(1, 3).map((restaurant) => (
              <Card
                key={`new-${restaurant.id}`}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Linka</h3>
            <p className="text-gray-300">Your favorite food, delivered fast</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
