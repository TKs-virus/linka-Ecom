import { Navigation } from "@/components/navigation"
import { AppFooter } from "@/components/landing/app-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Store,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  Truck,
  CreditCard,
  Smartphone,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
} from "lucide-react"
import Image from "next/image"

export default function RetailersPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Sales",
      description: "Reach new customers and boost your revenue with our growing customer base",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Expand Customer Reach",
      description: "Connect with customers beyond your physical location and grow your market",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Get detailed analytics about your sales, customers, and market trends",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Accept payments safely with our secure payment processing system",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Truck,
      title: "Delivery Network",
      description: "Leverage our delivery partners to reach customers quickly and efficiently",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Platform",
      description: "Manage your business on-the-go with our mobile-optimized dashboard",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const features = [
    {
      title: "Easy Product Management",
      description: "Add, edit, and manage your products with our intuitive interface",
      icon: Store,
    },
    {
      title: "Order Management",
      description: "Track and manage orders from a centralized dashboard",
      icon: BarChart3,
    },
    {
      title: "Customer Communication",
      description: "Stay connected with your customers through built-in messaging",
      icon: Users,
    },
    {
      title: "Payment Processing",
      description: "Accept multiple payment methods with instant settlements",
      icon: CreditCard,
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small businesses getting started",
      features: ["Up to 50 products", "Basic analytics", "Standard support", "5% transaction fee"],
      popular: false,
    },
    {
      name: "Professional",
      price: "ZMW 299",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "3% transaction fee",
        "Marketing tools",
        "Inventory management",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large businesses with special needs",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated account manager",
        "1% transaction fee",
        "White-label options",
        "API access",
      ],
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Mwanza",
      business: "Sarah's Fashion Boutique",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Linka has transformed my business. I've seen a 300% increase in sales since joining the platform. The support team is incredible!",
    },
    {
      name: "John Phiri",
      business: "Phiri Electronics",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "The analytics dashboard helps me understand my customers better. I can now make data-driven decisions for my business.",
    },
    {
      name: "Grace Banda",
      business: "Banda's Bakery",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Setting up my store was so easy. Within a week, I was receiving orders from customers I never would have reached before.",
    },
  ]

  const stats = [
    { label: "Average Sales Increase", value: "250%", icon: TrendingUp },
    { label: "New Customers Monthly", value: "150+", icon: Users },
    { label: "Average Setup Time", value: "2 Days", icon: Clock },
    { label: "Customer Satisfaction", value: "98%", icon: Star },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-blue-600 text-white">For Retailers</Badge>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                Grow Your Business with
                <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Linka's Platform
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join hundreds of successful retailers who have transformed their businesses with our comprehensive
                e-commerce platform. Reach more customers, increase sales, and grow your brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white"
                >
                  Start Selling Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Retailer dashboard"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Sales up 250%</span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">500+ New Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Results for Our Retailers</h2>
            <p className="text-lg text-gray-600">See how our platform helps businesses grow and succeed</p>
          </div>

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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Why Choose Linka?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to succeed in the digital marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 ${benefit.bgColor} rounded-lg mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Powerful Features for Your Business</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage and grow your online business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Platform features"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business needs. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? "ring-2 ring-orange-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white"
                        : "border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">What Our Retailers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from successful business owners who have grown with Linka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.business}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of successful retailers who have grown their businesses with Linka. Start your journey today
            and see the difference our platform can make.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm opacity-80 mt-4">No credit card required • Setup in minutes • Cancel anytime</p>
        </div>
      </section>

      <AppFooter />
    </div>
  )
}
