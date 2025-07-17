import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Package, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              🚀 Now serving 50+ cities across Zambia
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Local <span className="text-yellow-400">Marketplace</span> Reimagined
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Connect with local businesses, discover amazing products, and support your community. Linka brings the
                best of Zambian commerce to your fingertips.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8" asChild>
                <Link href="/shop">Start Shopping →</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 bg-transparent"
                asChild
              >
                <Link href="/retailers">
                  <Play className="mr-2 h-4 w-4" />
                  Sell on Linka
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-6 w-6 text-white/80" />
                </div>
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-sm text-white/70">Active Users</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Package className="h-6 w-6 text-white/80" />
                </div>
                <div className="text-2xl font-bold">500K+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-white/80" />
                </div>
                <div className="text-2xl font-bold">300%</div>
                <div className="text-sm text-white/70">Growth Rate</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Star className="h-6 w-6 text-white/80" />
                </div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-white/70">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating UI Elements */}
          <div className="relative hidden lg:block">
            {/* Rating Card */}
            <div className="absolute top-10 right-10 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-white fill-current" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">4.9/5 Rating</div>
                  <div className="text-sm text-gray-500">From 500+ reviews</div>
                </div>
              </div>
            </div>

            {/* Growth Card */}
            <div className="absolute bottom-20 right-0 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">300% Growth</div>
                  <div className="text-sm text-gray-500">This quarter</div>
                </div>
              </div>
            </div>

            {/* Placeholder for main visual */}
            <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20"></div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center pt-16 border-t border-white/20">
          <p className="text-white/80 mb-8">Trusted by leading businesses across Zambia</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-medium">Partner 1</div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-medium">Partner 2</div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-medium">Partner 3</div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-medium">Partner 4</div>
          </div>
        </div>
      </div>
    </section>
  )
}
