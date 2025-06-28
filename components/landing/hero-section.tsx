import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Store, ShoppingCart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-muted/30 via-transparent to-transparent py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Connect. Trade. Thrive.</span>
          <span className="block text-primary">Welcome to Linka.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
          Your seamless e-commerce bridge in Zambia, linking customers, retailers, and delivery services for a brighter
          local economy.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/shop">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/login?type=retailer">
              {" "}
              {/* Assuming a query param to direct retailer signup */}
              <Store className="mr-2 h-5 w-5" />
              Become a Seller
            </Link>
          </Button>
        </div>
      </div>
      {/* Optional: Placeholder for a background image or subtle pattern */}
      {/* <img src="/placeholder.svg?width=1200&height=400" alt="Abstract background" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10" /> */}
    </section>
  )
}
