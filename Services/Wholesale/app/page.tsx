import { ArrowRight, Building2, Calculator, Clock, Package, Shield, Star, Truck, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function WholesalePage() {
  const benefits = [
    {
      icon: Calculator,
      title: "Bulk Discounts",
      description: "Save up to 40% with volume pricing tiers",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account manager for your business",
    },
    {
      icon: Package,
      title: "Streamlined Ordering",
      description: "Simplified bulk ordering process for businesses",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Priority shipping on wholesale orders",
    },
  ]

  const categories = [
    {
      name: "Electronics",
      image: "/placeholder.svg?height=200&width=300",
      productCount: "2,500+ products",
      minOrder: "MOQ: 50 units",
    },
    {
      name: "Apparel",
      image: "/placeholder.svg?height=200&width=300",
      productCount: "1,800+ products",
      minOrder: "MOQ: 100 units",
    },
    {
      name: "Industrial Supplies",
      image: "/placeholder.svg?height=200&width=300",
      productCount: "3,200+ products",
      minOrder: "MOQ: 25 units",
    },
    {
      name: "Food & Beverage",
      image: "/placeholder.svg?height=200&width=300",
      productCount: "900+ products",
      minOrder: "MOQ: 200 units",
    },
  ]

  const orderSteps = [
    {
      step: "1",
      title: "Apply for Account",
      description: "Submit your business information for verification",
    },
    {
      step: "2",
      title: "Browse Products",
      description: "Access wholesale pricing and minimum order quantities",
    },
    {
      step: "3",
      title: "Place Order",
      description: "Add to cart or request custom quotes for large orders",
    },
    {
      step: "4",
      title: "Fast Fulfillment",
      description: "Receive your bulk orders with priority shipping",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-primary">
                Linka
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/wholesale" className="text-sm font-medium text-primary">
                  Wholesale
                </Link>
                <Link
                  href="/wholesale/products"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Browse Products
                </Link>
                <Link
                  href="/wholesale/account"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  My Account
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Wholesale Solutions for Your Business</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access exclusive wholesale pricing, bulk discounts, and dedicated support. Streamline your business
              procurement with Linka's comprehensive wholesale platform.
            </p>

            {/* Search Bar */}
            <form
              action="/wholesale/products"
              method="GET"
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
            >
              <div className="flex-1">
                <Input name="search" placeholder="Search wholesale products..." className="h-12 text-lg" />
              </div>
              <Button size="lg" className="h-12 px-8" type="submit">
                Browse Wholesale Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                Trusted by 10,000+ businesses
              </span>
              <span className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-green-500" />
                Verified suppliers
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-blue-500" />
                Fast 2-5 day shipping
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Linka Wholesale?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything your business needs to succeed with competitive pricing, reliable service, and
              comprehensive support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Wholesale Categories</h2>
            <p className="text-lg text-muted-foreground">
              Explore our most requested product categories with competitive wholesale pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link href={`/wholesale/products?category=${category.name.toLowerCase()}`}>
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{category.productCount}</span>
                      <span>{category.minOrder}</span>
                    </div>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link href="/wholesale/products">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Order Wholesale</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with wholesale ordering is simple. Follow these steps to begin saving on bulk purchases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {orderSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-muted/50 rounded-lg">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Minimum Order Quantities</h4>
                <p className="text-sm text-muted-foreground">
                  MOQs vary by product category, typically starting from 25-200 units
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Payment Terms</h4>
                <p className="text-sm text-muted-foreground">
                  Net 30 terms available for approved accounts, or pay by credit card
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Setup</h4>
                <p className="text-sm text-muted-foreground">
                  Business verification required, typically approved within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving with Wholesale?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already saving with Linka's wholesale platform. Apply for your wholesale
              account today and start accessing exclusive pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/wholesale/apply">
                  <Building2 className="mr-2 h-5 w-5" />
                  Apply for Wholesale Account
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/wholesale/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-75">
              <span>✓ No setup fees</span>
              <span>✓ Dedicated account manager</span>
              <span>✓ Volume discounts up to 40%</span>
              <span>✓ Priority customer support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Linka Wholesale</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your trusted partner for bulk procurement and wholesale solutions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  Contact Sales
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Wholesale</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/wholesale/products" className="text-muted-foreground hover:text-primary">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/apply" className="text-muted-foreground hover:text-primary">
                    Apply for Account
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/pricing" className="text-muted-foreground hover:text-primary">
                    Pricing Tiers
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/shipping" className="text-muted-foreground hover:text-primary">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/wholesale/help" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/contact" className="text-muted-foreground hover:text-primary">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/terms" className="text-muted-foreground hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/wholesale/login" className="text-muted-foreground hover:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/register" className="text-muted-foreground hover:text-primary">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/account" className="text-muted-foreground hover:text-primary">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale/orders" className="text-muted-foreground hover:text-primary">
                    Order History
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Linka. All rights reserved. | Wholesale Division</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
