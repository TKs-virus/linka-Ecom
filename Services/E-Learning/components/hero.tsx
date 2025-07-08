import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Learn Without Limits</h1>
            <p className="text-xl mb-8 text-blue-100">
              Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees
              from world-class universities and companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/catalog">Browse Courses</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Featured Course</h3>
                    <p className="text-blue-100">Complete Web Development Bootcamp</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
