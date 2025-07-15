import { HeroSection } from "@/components/landing/hero-section"
import { MainNav } from "@/components/landing/main-nav"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedProductsSection } from "@/components/landing/featured-products-section"
import { RetailerCtaSection } from "@/components/landing/retailer-cta-section"
import { DeliveryPartnerSection } from "@/components/landing/delivery-partner-section"
import { AppFooter } from "@/components/landing/app-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  BarChart3,
  ArrowRight,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Eye,
  Shield,
  Clock,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />

      <HeroSection />

      {/* Business Dashboard Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Business Intelligence
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Comprehensive analytics, inventory management, and customer insights designed for modern businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <span className="font-bold">LINKA Business Dashboard</span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Mock Dashboard Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-700">REVENUE</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">ZMW 1.1M</p>
                      <p className="text-sm text-emerald-600 font-bold">+28.4% ↗</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <ShoppingCart className="w-6 h-6 text-blue-600" />
                        <span className="text-sm font-bold text-blue-700">ORDERS</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">2,472</p>
                      <p className="text-sm text-blue-600 font-bold">+15.2% ↗</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-xl border border-amber-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Package className="w-6 h-6 text-amber-600" />
                        <span className="text-sm font-bold text-amber-700">PRODUCTS</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">3,847</p>
                      <p className="text-sm text-amber-600 font-bold">+8.7% ↗</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        <span className="text-sm font-bold text-purple-700">CUSTOMERS</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">12,429</p>
                      <p className="text-sm text-purple-600 font-bold">+12.8% ↗</p>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-3">Revenue Analytics</h4>
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-around p-2">
                      <div className="bg-blue-500 w-8 h-12 rounded-t"></div>
                      <div className="bg-blue-500 w-8 h-16 rounded-t"></div>
                      <div className="bg-blue-500 w-8 h-14 rounded-t"></div>
                      <div className="bg-blue-500 w-8 h-20 rounded-t"></div>
                      <div className="bg-blue-500 w-8 h-24 rounded-t"></div>
                      <div className="bg-blue-500 w-8 h-20 rounded-t"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Complete Business Solution</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Everything you need to manage and grow your business, from analytics to customer management.
                </p>
              </div>

              <div className="grid gap-4">
                <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Real-time Analytics</h4>
                        <p className="text-slate-600 text-sm">Live business insights and performance metrics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Growth Tracking</h4>
                        <p className="text-slate-600 text-sm">Monitor trends and identify opportunities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Secure & Reliable</h4>
                        <p className="text-slate-600 text-sm">Enterprise-grade security and uptime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Quick Setup</h4>
                        <p className="text-slate-600 text-sm">Get started in minutes, not hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-xl text-lg py-6"
                >
                  <Link href="/dashboard">
                    <BarChart3 className="w-6 h-6 mr-3" />
                    Explore Dashboard
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Link>
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Full-featured demo • No registration required • Instant access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <FeaturedProductsSection />
      <RetailerCtaSection />
      <DeliveryPartnerSection />
      <AppFooter />
    </div>
  )
}
