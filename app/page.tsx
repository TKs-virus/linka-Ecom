import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedProductsSection } from "@/components/landing/featured-products-section"
import { RetailerCTASection } from "@/components/landing/retailer-cta-section"
import { DeliveryPartnerSection } from "@/components/landing/delivery-partner-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { StatsSection } from "@/components/landing/stats-section"
import { ServicesOverview } from "@/components/landing/services-overview"
import { AppFooter } from "@/components/landing/app-footer"
import { MainNav } from "@/components/landing/main-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <ServicesOverview />
        <FeaturedProductsSection />
        <RetailerCTASection />
        <DeliveryPartnerSection />
        <TestimonialsSection />
      </main>
      <AppFooter />
    </div>
  )
}
