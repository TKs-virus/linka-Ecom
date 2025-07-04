import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">What do you want to learn?</h2>
          <p className="text-gray-600 mb-8">Search our extensive catalog of courses, topics, and expert instructors</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search for anything..." className="pl-10 h-12 text-lg" />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
