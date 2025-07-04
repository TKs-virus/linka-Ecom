import { CourseCard } from "@/components/course-card"

const trendingCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    students: 842000,
    duration: "65 hours",
    price: 84.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Web Development",
  },
  {
    id: "5",
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 523000,
    duration: "25 hours",
    price: 94.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Data Science",
  },
  {
    id: "7",
    title: "Machine Learning A-Z: Python & R in Data Science",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    students: 678000,
    duration: "44 hours",
    price: 99.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Machine Learning",
  },
  {
    id: "10",
    title: "AWS Certified Solutions Architect",
    instructor: "Stephane Maarek",
    rating: 4.7,
    students: 445000,
    duration: "27 hours",
    price: 94.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Cloud Computing",
  },
]

export function TrendingCourses() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Courses</h2>
          <a href="/catalog" className="text-blue-600 hover:underline">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}
