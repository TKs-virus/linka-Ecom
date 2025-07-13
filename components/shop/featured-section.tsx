import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp, Clock, Award } from "lucide-react"
import Image from "next/image"

export function FeaturedSection() {
  const featuredItems = [
    {
      id: 1,
      title: "Premium Electronics",
      description: "Latest tech gadgets from local stores",
      image: "/placeholder.svg?height=200&width=300",
      badge: "Trending",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Professional Services",
      description: "Expert services for your business needs",
      image: "/placeholder.svg?height=200&width=300",
      badge: "Popular",
      icon: Award,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Quick Delivery",
      description: "Same-day delivery available",
      image: "/placeholder.svg?height=200&width=300",
      badge: "Fast",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
            <Star className="w-4 h-4 mr-2" />
            Featured Collections
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover What's Popular</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of trending products and top-rated services from local businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`relative h-48 bg-gradient-to-br ${item.color}`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">
                      <Icon className="w-3 h-3 mr-1" />
                      {item.badge}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Explore Now
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
