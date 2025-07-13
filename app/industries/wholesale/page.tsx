import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, Users, Shield, ArrowRight, CheckCircle } from "lucide-react"

export default function WholesalePage() {
  const features = [
    {
      icon: Package,
      title: "Bulk Order Management",
      description: "Efficient handling of large-scale orders",
    },
    {
      icon: TrendingUp,
      title: "Price Management",
      description: "Dynamic pricing and volume discounts",
    },
    {
      icon: Users,
      title: "B2B Marketplace",
      description: "Connect suppliers with retailers",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Protected payment and order processing",
    },
  ]

  const benefits = [
    "Multi-tier pricing structure",
    "Inventory management system",
    "Supplier relationship management",
    "Automated order processing",
    "Credit and payment terms",
    "Detailed analytics and reporting",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-gray-600 text-white">Wholesale Platform</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-gray-700 bg-clip-text text-transparent">
            B2B Wholesale Marketplace
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Build a powerful wholesale platform that connects suppliers with retailers. Streamline bulk orders, manage
            inventory, and grow your B2B business efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-gray-600 hover:from-indigo-600 hover:to-gray-700 text-white font-bold"
            >
              Start Selling
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
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Complete B2B Commerce Solution</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Scale Your Wholesale Business</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-to-r from-indigo-500 to-gray-600 hover:from-indigo-600 hover:to-gray-700 text-white font-bold">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-gray-100 rounded-xl flex items-center justify-center">
                <Package className="h-24 w-24 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
