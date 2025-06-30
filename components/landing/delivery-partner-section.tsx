import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Clock, Shield, Award } from "lucide-react"
import Link from "next/link"

export function DeliveryPartnerSection() {
  const features = [
    {
      icon: Clock,
      title: "Same-Day Delivery",
      description: "Get your orders delivered within hours from local retailers",
      color: "brand-orange",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your packages are handled with care and tracked every step",
      color: "brand-blue",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all deliveries",
      color: "brand-orange",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Fast & Reliable <span className="gradient-text-linka">Local Delivery</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Experience the convenience of local shopping with our network of trusted delivery partners. Get your
              favorite products delivered quickly and safely to your doorstep.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`rounded-full bg-${feature.color}/10 p-3 flex-shrink-0`}>
                      <Icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow hover-lift"
                asChild
              >
                <Link href="/delivery">Learn More</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 bg-transparent"
                asChild
              >
                <Link href="/delivery/partner">Become a Partner</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-gradient-to-br from-brand-orange/5 to-brand-blue/5 border-brand-orange/20 brand-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="rounded-full bg-gradient-to-r from-brand-orange to-brand-blue p-4 w-fit mx-auto mb-4">
                    <Truck className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Delivery Stats</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-linka mb-1">2.5hrs</div>
                    <div className="text-sm text-gray-600">Average Delivery Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-linka mb-1">99.8%</div>
                    <div className="text-sm text-gray-600">On-Time Delivery Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-linka mb-1">15K+</div>
                    <div className="text-sm text-gray-600">Monthly Deliveries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-linka mb-1">4.9★</div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-orange/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-blue/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
