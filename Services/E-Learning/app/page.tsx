import { Hero } from "@/components/hero"
import { SearchSection } from "@/components/search-section"
import { TrendingCourses } from "@/components/trending-courses"
import { NewReleases } from "@/components/new-releases"
import { PopularSubjects } from "@/components/popular-subjects"
import { Testimonials } from "@/components/testimonials"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SearchSection />
      <TrendingCourses />
      <NewReleases />
      <PopularSubjects />
      <Testimonials />
    </main>
  )
}
