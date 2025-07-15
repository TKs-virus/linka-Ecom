import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Users, Truck } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-orange/5 via-white to-brand-blue/5 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand-orange/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-blue/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-gray-600 ring-1 ring-brand-orange/20 hover:ring-brand-orange/30 bg-brand-orange/5 transition-all duration-200">
              Connecting local businesses with customers.{" "}
              <Link
                href="/about"
                className="font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Learn more <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Local <span className="gradient-text-linka">E-commerce</span> Platform
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from local retailers in your area. Support your community while enjoying fast
            delivery and personalized service.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow hover-lift"
              asChild
            >
              <Link href="/shop">
                Start Shopping
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 hover:border-brand-blue/50 transition-all duration-200 bg-transparent"
              asChild
            >
              <Link href="/retailers">
                Become a Retailer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center group">
              <div className="rounded-full bg-brand-orange/10 p-4 mb-4 group-hover:bg-brand-orange/20 transition-colors duration-200 brand-shadow">
                <ShoppingBag className="h-6 w-6 text-brand-orange" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Local Products</h3>
              <p className="text-sm text-gray-600 text-center">
                Discover unique items from businesses in your community
              </p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="rounded-full bg-brand-blue/10 p-4 mb-4 group-hover:bg-brand-blue/20 transition-colors duration-200 brand-shadow-blue">
                <Truck className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-gray-600 text-center">Quick local delivery from nearby retailers</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="rounded-full bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 p-4 mb-4 group-hover:from-brand-orange/20 group-hover:to-brand-blue/20 transition-all duration-200 brand-shadow">
                <Users className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Community Support</h3>
              <p className="text-sm text-gray-600 text-center">
                Support local businesses and strengthen your community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
