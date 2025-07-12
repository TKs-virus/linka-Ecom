import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedProductsSection } from "@/components/landing/featured-products-section"
import { DeliveryPartnerSection } from "@/components/landing/delivery-partner-section"
import { RetailerCtaSection } from "@/components/landing/retailer-cta-section"
import { AppFooter } from "@/components/landing/app-footer"
import { MainNav } from "@/components/landing/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ShoppingBag,
  Store,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  BarChart3,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <MainNav />

      {/* Hero Section with Demo Access */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 px-4 py-2 text-sm font-semibold">
            🚀 New: Advanced Analytics Dashboard
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Linka
            </span>
            <br />
            <span className="text-slate-800">Business Platform</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Comprehensive business management solution with advanced analytics, inventory management, and customer
            insights.
          </p>

          {/* Demo Access Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">Retailer Dashboard</CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                  Complete business analytics and management tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-700 font-medium">Revenue Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-700 font-medium">Inventory Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-purple-600" />
                    <span className="text-slate-700 font-medium">Order Tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="text-slate-700 font-medium">Customer Insights</span>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg"
                >
                  <Link href="/dashboard">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo Dashboard
                  </Link>
                </Button>
                <p className="text-xs text-slate-500 text-center">No login required • Full access to all features</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">Customer Portal</CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                  Shopping experience and order management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-700 font-medium">Product Catalog</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-700 font-medium">Shopping Cart</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-slate-700 font-medium">User Profile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    <span className="text-slate-700 font-medium">Order History</span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold bg-transparent"
                >
                  <Link href="/shop">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>
                <p className="text-xs text-slate-500 text-center">Explore our product catalog and features</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-xl px-8 py-4 text-lg"
            >
              <Link href="/dashboard">
                <BarChart3 className="w-5 h-5 mr-3" />
                Access Retailer Dashboard
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-8 py-4 text-lg bg-white/80 backdrop-blur-sm"
            >
              <Link href="/login">
                <Users className="w-5 h-5 mr-3" />
                Login / Register
              </Link>
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-6 max-w-2xl mx-auto">
            Experience our full-featured business management platform. The demo dashboard includes real-time analytics,
            inventory management, order processing, and customer insights.
          </p>
        </div>
      </section>

      <HowItWorksSection />
      <FeaturedProductsSection />
      <DeliveryPartnerSection />
      <RetailerCtaSection />
      <AppFooter />
    </div>
  )
}
