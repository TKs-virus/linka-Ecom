import { HeroSection } from "@/components/landing/hero-section"
import { MainNav } from "@/components/landing/main-nav"
import { AppFooter } from "@/components/landing/app-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <HeroSection />
      <AppFooter />
    </div>
  )
}
