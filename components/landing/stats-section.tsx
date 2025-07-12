import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      title: "Total Products",
      value: "1,250+",
      trend: "+12%",
      trendPositive: true,
    },
    {
      title: "Active Retailers",
      value: "75+",
      trend: "+8%",
      trendPositive: true,
    },
    {
      title: "Monthly Orders",
      value: "4,500+",
      trend: "-3%",
      trendPositive: false,
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div
                    className={`flex items-center text-sm ${stat.trendPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.trendPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
