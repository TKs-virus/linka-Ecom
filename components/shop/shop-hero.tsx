"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingBag, Truck, Shield, Star } from "lucide-react"
import Image from "next/image"

export function ShopHero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Premium Shopping Experience
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Discover Amazing
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Products & Services
                </span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Shop from thousands of quality products across multiple categories. From electronics to fashion, find
                everything you need with fast delivery and excellent customer service.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search products, brands, categories..."
                className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-slate-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                size="lg"
                className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
              >
                Search
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Free Delivery</p>
                  <p className="text-sm text-slate-600">On orders over ZMW 200</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Secure Payment</p>
                  <p className="text-sm text-slate-600">100% protected</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-slate-800">50K+</p>
                <p className="text-sm text-slate-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">10K+</p>
                <p className="text-sm text-slate-600">Products</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <p className="text-2xl font-bold text-slate-800">4.9</p>
                <p className="text-sm text-slate-600">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-3xl transform -rotate-3"></div>
              <div className="relative w-full h-full bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=600&text=Shopping+Experience"
                  alt="Shopping Experience"
                  fill
                  className="object-cover"
                />

                {/* Floating Cards */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">2,847</p>
                      <p className="text-xs text-slate-600">Orders Today</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">4.9/5</p>
                      <p className="text-xs text-slate-600">Customer Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
