import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, TrendingUp, Users, Package, BarChart3, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "E-commerce Solutions | Linka",
  description:
    "Comprehensive e-commerce platform solutions for modern businesses. Build, manage, and scale your online store with Linka.",
}

export default function EcommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Online Store Builder",
      description: "Create beautiful, responsive online stores with our drag-and-drop builder.",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track stock levels, manage variants, and automate reordering processes.",
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Comprehensive analytics and reporting to track your business performance.",
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build customer relationships with CRM tools and personalized experiences.",
    },
    {
      icon: BarChart3,
      title: "Marketing Tools",
      description: "Email campaigns, SEO optimization, and social media integration.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Lightning-fast loading times and optimized checkout processes.",
    },
  ]

  const benefits = [
    "Mobile-responsive design",
    "Secure payment processing",
    "Multi-currency support",
    "SEO optimization",
    "Third-party integrations",
    "24/7 customer support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            E-commerce Solutions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Dream
            <span className="text-blue-600"> Online Store</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Launch and scale your e-commerce business with our comprehensive platform. From product management to
            customer analytics, we've got everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our e-commerce platform provides all the tools and features you need to build, manage, and grow your
              online business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our E-commerce Platform?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Built for modern businesses, our platform combines powerful features with ease of use to help you
                succeed in the competitive e-commerce landscape.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=E-commerce+Dashboard"
                alt="E-commerce Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Launch Your Online Store?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful businesses using our e-commerce platform. Start your free trial today and see
            the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
