"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Zap, TrendingUp, Award } from "lucide-react"
import Image from "next/image"

const featuredDeals = [
  {
    id: "1",
    title: "Flash Sale",
    subtitle: "Up to 70% Off Electronics",
    description: "Limited time offer on premium gadgets and accessories",
    image: "/placeholder.svg?height=300&width=400&text=Electronics+Sale",
    discount: "70%",
    timeLeft: "2h 45m",
    color: "from-red-500 to-pink-600",
    icon: Zap,
  },
  {
    id: "2",
    title: "Trending Now",
    subtitle: "Fashion Week Special",
    description: "Latest trends and styles from top brands",
    image: "/placeholder.svg?height=300&width=400&text=Fashion+Week",
    discount: "50%",
    timeLeft: "5 days",
    color: "from-purple-500 to-indigo-600",
    icon: TrendingUp,
  },
  {
    id: "3",
    title: "Premium Collection",
    subtitle: "Luxury Home Decor",
    description: "Transform your space with premium furniture",
    image: "/placeholder.svg?height=300&width=400&text=Home+Decor",
    discount: "40%",
    timeLeft: "1 week",
    color: "from-emerald-500 to-teal-600",
    icon: Award,
  },
]

const topBrands = [
  { name: "TechPro", logo: "/placeholder.svg?height=60&width=120&text=TechPro", products: 234 },
  { name: "StyleMax", logo: "/placeholder.svg?height=60&width=120&text=StyleMax", products: 189 },
  { name: "HomeComfort", logo: "/placeholder.svg?height=60&width=120&text=HomeComfort", products: 156 },
  { name: "FitLife", logo: "/placeholder.svg?height=60&width=120&text=FitLife", products: 98 },
  { name: "BookWorld", logo: "/placeholder.svg?height=60&width=120&text=BookWorld", products: 267 },
  { name: "AutoParts", logo: "/placeholder.svg?height=60&width=120&text=AutoParts", products: 145 },
]

export function FeaturedSection() {
  return (
    <div className="space-y-12">
      {/* Featured Deals */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Deals</h2>
            <p className="text-slate-600">Don't miss these amazing offers</p>
          </div>
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm">
            View All Deals
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDeals.map((deal) => {
            const Icon = deal.icon
            return (
              <Card
                key={deal.id}
                className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative w-full h-48">
                      <Image
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${deal.color} opacity-80`} />

                      {/* Overlay Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Icon className="w-3 h-3 mr-1" />
                            {deal.title}
                          </Badge>
                          <div className="text-right">
                            <p className="text-2xl font-bold">-{deal.discount}</p>
                            <p className="text-xs opacity-90">OFF</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2">{deal.subtitle}</h3>
                          <p className="text-sm opacity-90 mb-3">{deal.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-white/20 text-white border-white/30">⏰ {deal.timeLeft} left</Badge>
                            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                              Shop Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Top Brands */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Shop by Top Brands</h2>
          <p className="text-slate-600">Discover products from trusted brands</p>
        </div>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {topBrands.map((brand, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-20 h-12 relative">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {brand.name}
                    </p>
                    <p className="text-xs text-slate-600">{brand.products} products</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Reviews */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">What Our Customers Say</h2>
          <p className="text-slate-600">Real reviews from satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              rating: 5,
              review: "Amazing quality products and super fast delivery. The customer service is outstanding!",
              product: "Wireless Headphones",
              avatar: "SJ",
            },
            {
              name: "Michael Chen",
              rating: 5,
              review: "Best shopping experience I've had online. Great prices and authentic products.",
              product: "Smart Watch",
              avatar: "MC",
            },
            {
              name: "Emma Wilson",
              rating: 5,
              review: "Love the variety of products available. Found exactly what I was looking for!",
              product: "Home Decor",
              avatar: "EW",
            },
          ].map((review, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{review.name}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-3 italic">"{review.review}"</p>
                <Badge variant="outline" className="text-slate-600">
                  Purchased: {review.product}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
