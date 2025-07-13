import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, TrendingUp, Users, Zap, ArrowRight, CheckCircle, Star, Shield, Smartphone } from "lucide-react"
import Link from "next/link"

export default function EcommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Complete Store Management",
      description: "Manage inventory, orders, and customer data from one comprehensive dashboard",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Track performance with real-time analytics, sales reports, and customer insights",
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build lasting relationships with integrated CRM tools and personalization",
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Get your store online in minutes with our streamlined deployment process",
    },
  ]

  const benefits = [
    "Multi-channel selling (online, mobile, social media)",
    "Automated inventory management and stock alerts",
    "Integrated payment processing with multiple gateways",
    "SEO-optimized product pages and site structure",
    "Mobile-responsive design for all devices",
    "24/7 customer support and technical assistance",
    "Advanced security features and SSL certificates",
    "Customizable themes and branding options",
  ]

  const stats = [
    { number: "500+", label: "Active Stores", icon: ShoppingCart },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "2.5x", label: "Avg. Sales Increase", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">E-commerce Solutions</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Build Your Dream Online Store</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Launch and scale your e-commerce business with our comprehensive platform. From product management to
            customer analytics, we've got everything you need to succeed online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 shadow-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start Your Store
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              View Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Everything You Need to Sell Online</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our e-commerce platform provides all the tools and features you need to create, manage, and grow your
              online business successfully.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Choose Our E-commerce Platform?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Join thousands of successful online retailers who trust our platform to power their e-commerce
                operations and drive growth.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <Smartphone className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Mobile-First Design</h3>
                </div>
                <p className="mb-6 opacity-90">
                  Over 60% of online shopping happens on mobile devices. Our platform ensures your store looks perfect
                  and performs flawlessly on every screen size.
                </p>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-3 opacity-90">4.9/5 Customer Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Online Store?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of successful merchants who have built thriving businesses with our platform. Start your free
            trial today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 shadow-lg" asChild>
              <Link href="/signup">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Free Trial
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/contact">
                Schedule Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
