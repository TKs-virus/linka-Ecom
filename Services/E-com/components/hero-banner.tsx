import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
      <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
          <div className="text-white space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Summer Sale
              <span className="block text-yellow-300">Up to 70% Off</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md mx-auto lg:mx-0">
              Discover amazing deals on your favorite products. Limited time offer on selected items.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 md:px-8 py-2 md:py-3 text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-0"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/deals">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white/80 text-white hover:bg-white/20 hover:text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg transition-all duration-300 bg-white/10 backdrop-blur-sm shadow-lg"
                >
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Summer Sale Products"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
