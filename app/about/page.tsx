import { Navigation } from "@/components/navigation"
import { AppFooter } from "@/components/landing/app-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShoppingBag, Users, Globe, Award, Heart, Target, Lightbulb, Handshake } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in supporting local businesses and fostering community connections.",
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "We maintain high standards for all products and services on our platform.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve our platform to meet changing customer needs.",
    },
    {
      icon: Handshake,
      title: "Trust & Transparency",
      description: "We build lasting relationships through honest and transparent practices.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Local Retailers" },
    { number: "500,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Served" },
    { number: "1M+", label: "Orders Delivered" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              About Linka
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connecting Communities Through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                {" "}
                Commerce
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Linka is more than just a marketplace. We're a platform that bridges the gap between local retailers and
              customers, fostering economic growth and community connections across multiple industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/retailers">Join as Retailer</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  To empower local businesses by providing them with the tools and platform they need to reach more
                  customers, while offering consumers convenient access to quality products and services from trusted
                  local retailers.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that strong local economies create thriving communities. By connecting retailers with
                  customers in meaningful ways, we're helping to build a more sustainable and connected future.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center">
                  <ShoppingBag className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Industry</h3>
                  <p className="text-sm text-gray-600">Supporting diverse business sectors</p>
                </Card>
                <Card className="p-6 text-center">
                  <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Community Focus</h3>
                  <p className="text-sm text-gray-600">Building local connections</p>
                </Card>
                <Card className="p-6 text-center">
                  <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Wide Reach</h3>
                  <p className="text-sm text-gray-600">Expanding across regions</p>
                </Card>
                <Card className="p-6 text-center">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Trusted by thousands</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do and shape how we serve our community of retailers and
                customers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                Linka was born from a simple observation: local businesses needed better ways to connect with their
                communities, and customers wanted more convenient access to quality local products and services.
              </p>
              <p className="mb-6">
                Founded in 2023, we started with a vision to create a comprehensive platform that could serve multiple
                industries while maintaining the personal touch that makes local commerce special. From e-commerce and
                food delivery to healthcare and education, we've built a ecosystem that supports diverse business needs.
              </p>
              <p>
                Today, Linka serves thousands of retailers and hundreds of thousands of customers across multiple
                cities, but our mission remains the same: to strengthen local economies and build stronger communities
                through commerce.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a retailer looking to grow your business or a customer seeking quality local products,
              Linka is here to connect you with your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/retailers">Become a Retailer</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
