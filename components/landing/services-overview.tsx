import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, GraduationCap, Utensils, Heart, Plane, Package, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function ServicesOverview() {
  const services = [
    {
      icon: ShoppingBag,
      title: "E-Commerce",
      description: "Complete online shopping platform with inventory management and secure payments",
      features: ["Product Catalog", "Payment Gateway", "Order Tracking"],
      color: "brand-orange",
      url: "http://localhost:3001",
      badge: "Popular",
    },
    {
      icon: GraduationCap,
      title: "E-Learning",
      description: "Interactive learning platform with courses, assessments, and progress tracking",
      features: ["Course Management", "Video Streaming", "Certificates"],
      color: "brand-blue",
      url: "http://localhost:3002",
      badge: "New",
    },
    {
      icon: Utensils,
      title: "Food Delivery",
      description: "Restaurant ordering and delivery system with real-time tracking",
      features: ["Menu Management", "Live Tracking", "Reviews"],
      color: "brand-orange",
      url: "http://localhost:3005",
      badge: "Trending",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical services platform with appointment booking and telemedicine",
      features: ["Appointments", "Prescriptions", "Consultations"],
      color: "brand-blue",
      url: "http://localhost:3007",
      badge: "Essential",
    },
    {
      icon: Plane,
      title: "Travel & Tourism",
      description: "Complete travel booking platform with flights, hotels, and activities",
      features: ["Flight Booking", "Hotel Reservations", "Tour Packages"],
      color: "brand-orange",
      url: "http://localhost:3012",
      badge: "Featured",
    },
    {
      icon: Package,
      title: "Wholesale",
      description: "B2B marketplace for bulk orders and wholesale transactions",
      features: ["Bulk Orders", "Price Tiers", "Supplier Network"],
      color: "brand-blue",
      url: "http://localhost:3014",
      badge: "Business",
    },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue/5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-brand-orange" />
            <span className="text-sm font-medium text-gray-700">Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Industry-Specific <span className="gradient-text-linka">Platforms</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our specialized platforms designed for different industries. Each solution is tailored to meet
            specific business needs with advanced features and seamless user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-gray-200/50 hover:border-brand-orange/30 transition-all duration-500 hover-lift bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`rounded-xl bg-${service.color}/10 p-3 group-hover:bg-${service.color}/20 transition-colors duration-300`}
                    >
                      <Icon className={`h-6 w-6 text-${service.color}`} />
                    </div>
                    <Badge
                      variant="secondary"
                      className={`bg-${service.color}/10 text-${service.color} hover:bg-${service.color}/20 border-0`}
                    >
                      {service.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-orange transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}`}></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full border-${service.color}/30 text-${service.color} hover:bg-${service.color}/10 bg-transparent group-hover:border-${service.color}/50 transition-all duration-200`}
                    asChild
                  >
                    <Link href={service.url} target="_blank" rel="noopener noreferrer">
                      Explore Platform
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </CardContent>

                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${service.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                ></div>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow hover-lift"
            asChild
          >
            <Link href="/industries">
              View All Industries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
