import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Store, Package } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Store,
      value: "500+",
      label: "Local Retailers",
      description: "Trusted partners",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      description: "And growing daily",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Package,
      value: "100K+",
      label: "Orders Delivered",
      description: "This month alone",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Satisfaction Rate",
      description: "Customer approved",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by the Community</h2>
          <p className="mt-4 text-lg text-gray-600">Join thousands of customers supporting local businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-lg font-medium text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
