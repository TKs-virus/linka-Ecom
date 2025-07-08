import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, Utensils, GraduationCap, Stethoscope, Plane, Package, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ServicesOverview() {
  const services = [
    {
      title: "E-Commerce",
      description: "Shop from local retailers and discover unique products in your neighborhood",
      icon: Store,
      image: "/placeholder.svg?height=200&width=300",
      href: "/services/e-commerce",
      badge: "Most Popular",
      badgeColor: "bg-orange-500",
      stats: "500+ Stores",
    },
    {
      title: "Food Delivery",
      description: "Order fresh meals from local restaurants with fast delivery",
      icon: Utensils,
      image: "/placeholder.svg?height=200&width=300",
      href: "/services/food-delivery",
      badge: "Fast Delivery",
      badgeColor: "bg-red-500",
      stats: "30 min avg",
    },
    {
      title: "E-Learning",
      description: "Learn new skills from local instructors and online courses",
      icon: GraduationCap,
      image: "/placeholder.svg?height=200&width=300",
      href: "/services/e-learning",
      badge: "New",
      badgeColor: "bg-green-500",
      stats: "1000+ Courses",
    },
    {
      title: "Healthcare",
      description: "Book appointments and order medicines from trusted providers",
      icon: Stethoscope,
      image: "/placeholder.svg?height=200&width=300",
      href: "/services/healthcare",
      badge: "Trusted",
      badgeColor: "bg-blue-500",
      stats: "50+ Clinics",
    },
    {
      title: "Travel & Tourism",
      description: "Discover local attractions and book amazing travel experiences",
      icon: Plane,
      image: "/placeholder.svg?height=200&width=300",
      href: "/services/travel",
      badge: "Adventure",
      badgeColor: "bg-purple-500",
      stats: "200+ Tours",
    },
    {
      title: "Wholesale",
      description: "Bulk purchasing solutions for businesses and organizations",
      icon: Package,
      image: "/placeholder.svg?height=200&width=300",
      href: "/services/wholesale",
      badge: "B2B",
      badgeColor: "bg-indigo-500",
      stats: "Bulk Orders",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            All Your Local Needs in{" "}
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From shopping to dining, learning to healthcare - discover everything your community has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white"
              >
                <div className="relative">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 left-3 ${service.badgeColor} text-white`}>{service.badge}</Badge>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {service.stats}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white"
                  >
                    <Link href={service.href}>
                      Explore {service.title}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-200 bg-transparent"
            asChild
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
