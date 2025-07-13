import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp, Users } from "lucide-react"

export function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Discover Local Treasures
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Shop Local,
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Live Better
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover amazing products and services from local businesses in your community. Support local, shop smart.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6">
              <Search className="w-5 h-5 mr-2" />
              Start Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
            >
              Browse Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">500+</span>
              </div>
              <p className="text-white/80">Local Businesses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">10K+</span>
              </div>
              <p className="text-white/80">Products & Services</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">4.9★</span>
              </div>
              <p className="text-white/80">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
