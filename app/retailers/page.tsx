import { Navigation } from "@/components/navigation"
import { AppFooter } from "@/components/landing/app-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Store,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Smartphone,
  CreditCard,
  Headphones,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
} from "lucide-react"

export default function RetailersPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Sales",
      description: "Reach more customers and boost your revenue with our comprehensive platform.",
    },
    {
      icon: Users,
      title: "Expand Customer Base",
      description: "Connect with thousands of potential customers in your area and beyond.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Get detailed analytics to understand your customers and optimize your business.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Platform",
      description: "Manage your business on-the-go with our mobile-optimized dashboard.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Accept payments safely with our integrated payment processing system.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated retailer support team.",
    },
  ]

  const features = [
    {
      title: "Easy Setup",
      description: "Get your store online in minutes with our simple onboarding process.",
      icon: CheckCircle,
    },
    {
      title: "Inventory Management",
      description: "Track and manage your products with our intuitive inventory system.",
      icon: CheckCircle,
    },
    {
      title: "Order Processing",
      description: "Streamline order fulfillment with automated workflows and notifications.",
      icon: CheckCircle,
    },
    {
      title: "Customer Communication",
      description: "Stay connected with customers through integrated messaging and notifications.",
      icon: CheckCircle,
    },
    {
      title: "Marketing Tools",
      description: "Promote your products with built-in marketing and promotional features.",
      icon: CheckCircle,
    },
    {
      title: "Multi-Channel Sales",
      description: "Sell across multiple channels and manage everything from one dashboard.",
      icon: CheckCircle,
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 50 products",
        "Basic analytics",
        "Email support",
        "Mobile app access",
        "Standard payment processing",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$29/month",
      description: "Ideal for growing businesses with more needs",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Marketing tools",
        "Inventory management",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large businesses with specific requirements",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
        "White-label options",
        "24/7 phone support",
      ],
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Johnson's Bakery",
      content: "Linka helped us reach customers we never could before. Our online sales have tripled since joining!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      business: "Tech Repair Pro",
      content: "The platform is so easy to use, and the support team is incredibly helpful. Highly recommend!",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      business: "Artisan Crafts",
      content: "Finally, a platform that understands small businesses. The tools are perfect for our needs.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  For Retailers
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Grow Your Business with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                    {" "}
                    Linka
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join thousands of successful retailers who have expanded their reach, increased sales, and built
                  stronger customer relationships through our comprehensive e-commerce platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/retailers/signup">Start Selling Today</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center">
                  <Store className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-600">Active Retailers</div>
                </Card>
                <Card className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">150%</div>
                  <div className="text-sm text-gray-600">Avg. Sales Increase</div>
                </Card>
                <Card className="p-6 text-center">
                  <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">500K+</div>
                  <div className="text-sm text-gray-600">Monthly Customers</div>
                </Card>
                <Card className="p-6 text-center">
                  <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime Guarantee</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Linka?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide everything you need to succeed online, from powerful tools to dedicated support.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <Icon className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Your Success</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform includes everything you need to manage and grow your online business effectively.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg">
                    <Icon className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the plan that fits your business needs. No hidden fees, no long-term contracts.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-blue-600 shadow-lg" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/retailers/signup">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Retailers Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what successful retailers have to say about Linka.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.business}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Selling?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of successful retailers who have transformed their business with Linka. Get started today
              and see the difference our platform can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/retailers/signup">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">
                  <Headphones className="mr-2 h-5 w-5" />
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
