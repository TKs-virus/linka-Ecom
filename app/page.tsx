import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedProductsSection } from "@/components/landing/featured-products-section"
import { RetailerCtaSection } from "@/components/landing/retailer-cta-section"
import { DeliveryPartnerSection } from "@/components/landing/delivery-partner-section"
import { AppFooter } from "@/components/landing/app-footer"
import { MainNav } from "@/components/landing/main-nav"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

// Error boundary component for database issues
function DatabaseErrorFallback() {
  return (
    <Card className="mx-4 my-8 border-red-200 bg-red-50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Database Connection Issue</h3>
        </div>
        <p className="mt-2 text-sm text-red-600">
          There seems to be an issue with the database connection.
          <Link href="/debug" className="underline ml-1">
            Visit the debug page
          </Link>{" "}
          to diagnose the problem.
        </p>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main>
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<DatabaseErrorFallback />}>
          <HowItWorksSection />
        </Suspense>

        <Suspense fallback={<DatabaseErrorFallback />}>
          <FeaturedProductsSection />
        </Suspense>

        <RetailerCtaSection />
        <DeliveryPartnerSection />
      </main>
      <AppFooter />
    </div>
  )
}
