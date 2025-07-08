import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedProductsSection } from "@/components/landing/featured-products-section"
import { RetailerCtaSection } from "@/components/landing/retailer-cta-section"
import { DeliveryPartnerSection } from "@/components/landing/delivery-partner-section"
import { AppFooter } from "@/components/landing/app-footer"
import { Navigation } from "@/components/navigation"
import { StatsSection } from "@/components/landing/stats-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { ServicesOverview } from "@/components/landing/services-overview"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ServicesOverview />
        <HowItWorksSection />
        <FeaturedProductsSection />
        <TestimonialsSection />
        <DeliveryPartnerSection />
        <RetailerCtaSection />
      </main>
      <AppFooter />
    </div>
  )
}
