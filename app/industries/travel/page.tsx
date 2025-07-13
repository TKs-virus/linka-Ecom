import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Calendar, Camera, ArrowRight, CheckCircle } from "lucide-react"

export default function TravelPage() {
  const features = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Comprehensive flight search and booking system",
    },
    {
      icon: MapPin,
      title: "Hotel Reservations",
      description: "Wide selection of accommodations worldwide",
    },
    {
      icon: Calendar,
      title: "Trip Planning",
      description: "Complete itinerary management tools",
    },
    {
      icon: Camera,
      title: "Experience Booking",
      description: "Tours, activities, and local experiences",
    },
  ]

  const benefits = [
    "Multi-destination trip planning",
    "Real-time availability and pricing",
    "Integrated payment processing",
    "Mobile-friendly booking platform",
    "Customer review and rating system",
    "24/7 customer support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-50">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white">Travel & Tourism</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-600 to-purple-700 bg-clip-text text-transparent">
            Your Gateway to Adventure
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Create an all-in-one travel platform that makes booking flights, hotels, and experiences effortless. From
            planning to booking, we make travel dreams come true.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-bold"
            >
              Start Exploring
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
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Complete Travel Booking Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Inspire and Enable Travel</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-bold">
                Launch Platform
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-sky-100 to-purple-100 rounded-xl flex items-center justify-center">
                <Plane className="h-24 w-24 text-sky-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
