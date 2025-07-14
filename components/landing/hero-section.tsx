import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-16 pb-20">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Connect Local
            <span className="text-orange-500"> Businesses</span>
            <br />
            with Customers
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Linka bridges the gap between local retailers and customers through our comprehensive platform offering
            e-commerce, delivery, and business management solutions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/dashboard">
                <Play className="mr-2 h-5 w-5" />
                Guest Login
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              Free to start
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              No setup fees
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              24/7 support
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[800px] w-[800px] rounded-full bg-gradient-to-br from-orange-100 to-blue-100 opacity-20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
