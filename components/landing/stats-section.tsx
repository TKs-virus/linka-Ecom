import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Store, Package } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Customers",
      description: "Growing community of local shoppers",
      color: "brand-orange",
      trend: "+12%",
    },
    {
      icon: Store,
      value: "2,500+",
      label: "Local Retailers",
      description: "Trusted businesses in your area",
      color: "brand-blue",
      trend: "+8%",
    },
    {
      icon: Package,
      value: "100K+",
      label: "Products Available",
      description: "Diverse range of local products",
      color: "brand-orange",
      trend: "+25%",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Customer Satisfaction",
      description: "Based on verified reviews",
      color: "brand-blue",
      trend: "+2%",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trusted by <span className="gradient-text-linka">Thousands</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our growing community of local businesses and customers making a difference in their neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover-lift transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`rounded-full bg-${stat.color}/10 p-3 group-hover:bg-${stat.color}/20 transition-colors duration-200`}
                    >
                      <Icon className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                    <div
                      className={`text-xs font-medium text-${stat.color} bg-${stat.color}/10 px-2 py-1 rounded-full`}
                    >
                      {stat.trend}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className={`text-3xl font-bold gradient-text-linka`}>{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-900">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </div>
                </CardContent>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${stat.color}/20 to-${stat.color}/40`}
                ></div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
