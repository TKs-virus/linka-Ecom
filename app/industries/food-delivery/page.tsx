import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Clock, Star, ArrowRight, CheckCircle } from "lucide-react"

export default function FoodDeliveryPage() {
  const features = [
    {
      icon: MapPin,
      title: "Location Tracking",
      description: "Real-time GPS tracking for deliveries",
    },
    {
      icon: Clock,
      title: "Order Management",
      description: "Efficient order processing and timing",
    },
    {
      icon: Truck,
      title: "Delivery Network",
      description: "Comprehensive delivery partner management",
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Customer feedback and quality control",
    },
  ]

  const benefits = [
    "Multi-restaurant marketplace",
    "Real-time order tracking",
    "Integrated payment processing",
    "Driver management system",
    "Customer loyalty programs",
    "Analytics and reporting dashboard",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-600 text-white">Food Delivery Platform</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-700 bg-clip-text text-transparent">
            Connect Restaurants & Customers
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Build a comprehensive food delivery platform that connects restaurants with hungry customers. From ordering
            to delivery, we handle every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold"
            >
              Launch Platform
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">End-to-End Delivery Solution</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Scale Your Food Delivery Business</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center">
                <Truck className="h-24 w-24 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
