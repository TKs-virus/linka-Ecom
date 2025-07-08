import { Navigation } from "@/components/navigation"
import { AppFooter } from "@/components/landing/app-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Heart, Globe, Award, TrendingUp, MapPin, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in strengthening local communities by connecting neighbors with local businesses.",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Target,
      title: "Quality & Trust",
      description: "Every retailer is carefully vetted to ensure customers receive the best products and service.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Globe,
      title: "Sustainable Growth",
      description: "Supporting local economies while promoting environmentally conscious shopping habits.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Inclusive Platform",
      description: "Creating opportunities for businesses of all sizes to thrive in the digital marketplace.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description: "Linka was born from a vision to digitize local commerce in Zambia",
    },
    {
      year: "2021",
      title: "First 100 Retailers",
      description: "Reached our first milestone with 100 local businesses on the platform",
    },
    {
      year: "2022",
      title: "Multi-Service Launch",
      description: "Expanded beyond e-commerce to include food delivery, healthcare, and more",
    },
    {
      year: "2023",
      title: "50,000 Customers",
      description: "Celebrated serving 50,000 customers across multiple cities",
    },
    {
      year: "2024",
      title: "Regional Expansion",
      description: "Expanding to neighboring countries and launching new service categories",
    },
  ]

  const stats = [
    { label: "Local Retailers", value: "500+", icon: Users },
    { label: "Happy Customers", value: "50K+", icon: Heart },
    { label: "Cities Served", value: "15", icon: MapPin },
    { label: "Orders Delivered", value: "1M+", icon: TrendingUp },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-blue-600 text-white">About Linka</Badge>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                Connecting Communities Through
                <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Local Commerce
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Linka is more than just a marketplace - we're a platform that empowers local businesses and brings
                communities together. Our mission is to make local shopping convenient, accessible, and rewarding for
                everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white"
                  asChild
                >
                  <Link href="/retailers">
                    Join Our Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Team collaboration"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">500+ Active Retailers</span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Community Choice Award</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a future where local businesses thrive and communities prosper together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower local businesses with digital tools and connect them with their communities, creating a
                  sustainable ecosystem where everyone benefits. We believe that strong local economies are the
                  foundation of prosperous communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading platform for local commerce across Africa, where every community has access to
                  quality products and services from trusted local providers. We envision a world where distance doesn't
                  limit opportunity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${value.bgColor} rounded-full mb-4`}
                    >
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a thriving platform serving thousands of businesses and customers
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-blue-600 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-white border-4 border-orange-500 rounded-full"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a business owner looking to grow or a customer seeking quality local products, we'd love to
            have you as part of the Linka family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/retailers">
                Become a Retailer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              asChild
            >
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  )
}
