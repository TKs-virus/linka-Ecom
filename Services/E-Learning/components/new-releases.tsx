import { CourseCard } from "@/components/course-card"

const newCourses = [
  {
    id: "8",
    title: "ChatGPT & AI for Content Creation",
    instructor: "Phil Ebiner",
    rating: 4.5,
    students: 12000,
    duration: "8 hours",
    price: 49.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Artificial Intelligence",
  },
  {
    id: "3",
    title: "Flutter & Dart - Complete Development Course",
    instructor: "Dr. Angela Yu",
    rating: 4.5,
    students: 234000,
    duration: "32 hours",
    price: 79.99,
    originalPrice: 149.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Mobile Development",
  },
  {
    id: "11",
    title: "Digital Marketing Masterclass 2024",
    instructor: "Phil Ebiner",
    rating: 4.4,
    students: 156000,
    duration: "23 hours",
    price: 74.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Digital Marketing",
  },
  {
    id: "9",
    title: "Complete Ethical Hacking Bootcamp",
    instructor: "Nathan House",
    rating: 4.7,
    students: 234000,
    duration: "35 hours",
    price: 119.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Cybersecurity",
  },
]

export function NewReleases() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">New Releases</h2>
          <a href="/catalog" className="text-blue-600 hover:underline">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}
