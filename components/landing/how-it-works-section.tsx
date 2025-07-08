import { Card, CardContent } from "@/components/ui/card"
import { Search, ShoppingCart, Truck, Heart } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Discover Local Products",
      description: "Browse products from retailers in your area and find exactly what you're looking for.",
      color: "brand-orange",
    },
    {
      icon: ShoppingCart,
      title: "Shop with Confidence",
      description: "Add items to your cart and checkout securely with multiple payment options.",
      color: "brand-blue",
    },
    {
      icon: Truck,
      title: "Fast Local Delivery",
      description: "Enjoy quick delivery from nearby retailers, often within hours of ordering.",
      color: "brand-orange",
    },
    {
      icon: Heart,
      title: "Support Your Community",
      description: "Every purchase helps support local businesses and strengthens your community.",
      color: "brand-blue",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            How <span className="gradient-text-linka">Linka</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shopping locally has never been easier. Follow these simple steps to discover and support businesses in your
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-brand-orange/30 to-brand-blue/30 transform translate-x-4 -translate-y-1/2 z-0"></div>
                )}

                <Card className="relative z-10 border-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div
                        className={`rounded-full bg-${step.color}/10 p-4 w-fit mx-auto mb-4 group-hover:bg-${step.color}/20 transition-colors duration-200`}
                      >
                        <Icon className={`h-8 w-8 text-${step.color}`} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-brand-orange to-brand-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 rounded-full px-6 py-3">
            <span className="text-sm font-medium text-gray-700">Ready to get started?</span>
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
