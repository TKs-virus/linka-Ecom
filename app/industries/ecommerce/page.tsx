import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, TrendingUp, Users, Zap, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function EcommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Complete Store Management",
      description: "Manage inventory, orders, and customer data from one dashboard",
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Track performance with real-time analytics and insights",
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build relationships with integrated CRM tools",
    },
    {
      icon: Zap,
      title: "Fast Deployment",
      description: "Get your store online in minutes, not weeks",
    },
  ]

  const benefits = [
    "Multi-channel selling (online, mobile, social)",
    "Automated inventory management",
    "Integrated payment processing",
    "SEO-optimized product pages",
    "Mobile-responsive design",
    "24/7 customer support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white">E-commerce Solutions</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-blue-700 bg-clip-text text-transparent">
            Build Your Online Store
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Create a powerful e-commerce platform that drives sales and grows your business. From product management to
            customer analytics, we've got everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/shop">View Demo Store</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Everything You Need to Succeed Online</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Why Choose Linka for E-commerce?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-24 w-24 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
