import Link from "next/link"
import { Code, Briefcase, Palette, Beaker, Globe, User } from "lucide-react"

const subjects = [
  {
    name: "Web Development",
    icon: Code,
    courses: 1250,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Digital Marketing",
    icon: Briefcase,
    courses: 890,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Graphic Design",
    icon: Palette,
    courses: 567,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Data Science",
    icon: Beaker,
    courses: 423,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Spanish",
    icon: Globe,
    courses: 334,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Communication Skills",
    icon: User,
    courses: 678,
    color: "bg-indigo-100 text-indigo-600",
  },
]

export function PopularSubjects() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Subjects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular course categories and find the perfect learning path for your goals
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject) => (
            <Link key={subject.name} href={`/catalog?category=${subject.name.toLowerCase()}`} className="group">
              <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div
                  className={`w-16 h-16 rounded-full ${subject.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <subject.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600">{subject.name}</h3>
                <p className="text-sm text-gray-500">{subject.courses} courses</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
