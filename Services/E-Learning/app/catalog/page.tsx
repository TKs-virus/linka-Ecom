"use client"

import { useState } from "react"
import { FilterSidebar } from "@/components/filter-sidebar"
import { CourseCard } from "@/components/course-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock course data
const allCourses = [
  // Web Development
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
    format: "Self-Paced",
    language: "English",
  },
  {
    id: "2",
    title: "React - The Complete Guide 2024",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    students: 523000,
    duration: "48 hours",
    price: 94.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Web Development",
    format: "Self-Paced",
    language: "English",
  },

  // Mobile Development
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
    format: "Self-Paced",
    language: "English",
  },
  {
    id: "4",
    title: "iOS App Development with Swift",
    instructor: "John Smith",
    rating: 4.4,
    students: 156000,
    duration: "28 hours",
    price: 89.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Mobile Development",
    format: "Instructor-Led",
    language: "English",
  },

  // Data Science
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
    format: "Self-Paced",
    language: "English",
  },
  {
    id: "6",
    title: "Data Analysis with R Programming",
    instructor: "Sarah Johnson",
    rating: 4.3,
    students: 89000,
    duration: "22 hours",
    price: 69.99,
    originalPrice: 129.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Data Science",
    format: "Self-Paced",
    language: "English",
  },

  // Machine Learning
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
    format: "Self-Paced",
    language: "English",
  },

  // Artificial Intelligence
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
    format: "Self-Paced",
    language: "English",
  },

  // Cybersecurity
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
    format: "Self-Paced",
    language: "English",
  },

  // Cloud Computing
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
    format: "Self-Paced",
    language: "English",
  },

  // Digital Marketing
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
    format: "Instructor-Led",
    language: "English",
  },
  {
    id: "12",
    title: "Social Media Marketing Strategy",
    instructor: "Emma Wilson",
    rating: 4.3,
    students: 89000,
    duration: "18 hours",
    price: 59.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Digital Marketing",
    format: "Self-Paced",
    language: "English",
  },

  // Project Management
  {
    id: "13",
    title: "PMP Certification Complete Course",
    instructor: "David Miller",
    rating: 4.6,
    students: 123000,
    duration: "40 hours",
    price: 129.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Project Management",
    format: "Certification",
    language: "English",
  },

  // Graphic Design
  {
    id: "14",
    title: "Graphic Design Masterclass",
    instructor: "Sarah Wilson",
    rating: 4.5,
    students: 89000,
    duration: "18 hours",
    price: 0,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Graphic Design",
    format: "Self-Paced",
    language: "English",
  },
  {
    id: "15",
    title: "Adobe Photoshop Complete Course",
    instructor: "Mark Johnson",
    rating: 4.4,
    students: 167000,
    duration: "25 hours",
    price: 69.99,
    originalPrice: 139.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Graphic Design",
    format: "Self-Paced",
    language: "English",
  },

  // UI/UX Design
  {
    id: "16",
    title: "Complete UI/UX Design Bootcamp",
    instructor: "Jessica Brown",
    rating: 4.6,
    students: 234000,
    duration: "32 hours",
    price: 89.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "UI/UX Design",
    format: "Self-Paced",
    language: "English",
  },

  // Photography
  {
    id: "17",
    title: "Photography Masterclass: Complete Guide",
    instructor: "Alex Turner",
    rating: 4.5,
    students: 145000,
    duration: "22 hours",
    price: 79.99,
    originalPrice: 149.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Photography",
    format: "Self-Paced",
    language: "English",
  },

  // Video Editing
  {
    id: "18",
    title: "Adobe Premiere Pro Complete Course",
    instructor: "Mike Davis",
    rating: 4.4,
    students: 98000,
    duration: "20 hours",
    price: 74.99,
    originalPrice: 149.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Video Editing",
    format: "Self-Paced",
    language: "English",
  },

  // Music Production
  {
    id: "19",
    title: "Music Production in Logic Pro X",
    instructor: "Tom Wilson",
    rating: 4.3,
    students: 67000,
    duration: "28 hours",
    price: 89.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Music Production",
    format: "Self-Paced",
    language: "English",
  },

  // Spanish Language
  {
    id: "20",
    title: "Spanish for Beginners",
    instructor: "Maria Garcia",
    rating: 4.8,
    students: 234000,
    duration: "30 hours",
    price: 49.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Spanish",
    format: "Live Classes",
    language: "Spanish",
  },

  // French Language
  {
    id: "21",
    title: "Complete French Language Course",
    instructor: "Pierre Dubois",
    rating: 4.6,
    students: 156000,
    duration: "35 hours",
    price: 59.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "French",
    format: "Self-Paced",
    language: "French",
  },

  // Psychology
  {
    id: "22",
    title: "Introduction to Psychology",
    instructor: "Dr. Robert Smith",
    rating: 4.6,
    students: 167000,
    duration: "40 hours",
    price: 79.99,
    originalPrice: 149.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Psychology",
    format: "Self-Paced",
    language: "English",
  },

  // Finance & Accounting
  {
    id: "23",
    title: "Complete Accounting Course",
    instructor: "Jennifer Lee",
    rating: 4.5,
    students: 123000,
    duration: "45 hours",
    price: 99.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Finance & Accounting",
    format: "Self-Paced",
    language: "English",
  },

  // Entrepreneurship
  {
    id: "24",
    title: "Start Your Own Business: Complete Guide",
    instructor: "Richard Thompson",
    rating: 4.4,
    students: 89000,
    duration: "25 hours",
    price: 69.99,
    originalPrice: 139.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Entrepreneurship",
    format: "Self-Paced",
    language: "English",
  },

  // Communication Skills
  {
    id: "25",
    title: "Effective Communication Skills",
    instructor: "Lisa Anderson",
    rating: 4.7,
    students: 234000,
    duration: "15 hours",
    price: 39.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Communication Skills",
    format: "Self-Paced",
    language: "English",
  },

  // Public Speaking
  {
    id: "26",
    title: "Master Public Speaking & Presentation",
    instructor: "James Wilson",
    rating: 4.6,
    students: 145000,
    duration: "12 hours",
    price: 49.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Public Speaking",
    format: "Self-Paced",
    language: "English",
  },

  // Mathematics
  {
    id: "27",
    title: "Complete Mathematics Course",
    instructor: "Dr. Michael Chen",
    rating: 4.5,
    students: 98000,
    duration: "50 hours",
    price: 89.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "All Levels",
    category: "Mathematics",
    format: "Self-Paced",
    language: "English",
  },

  // Game Development
  {
    id: "28",
    title: "Unity Game Development Complete Course",
    instructor: "Ben Tristem",
    rating: 4.6,
    students: 234000,
    duration: "55 hours",
    price: 119.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Beginner",
    category: "Game Development",
    format: "Self-Paced",
    language: "English",
  },

  // DevOps
  {
    id: "29",
    title: "Complete DevOps Engineer Course",
    instructor: "Edward Viaene",
    rating: 4.4,
    students: 156000,
    duration: "38 hours",
    price: 109.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "DevOps",
    format: "Self-Paced",
    language: "English",
  },

  // Blockchain
  {
    id: "30",
    title: "Blockchain and Cryptocurrency Complete Course",
    instructor: "Ivan Liljeqvist",
    rating: 4.3,
    students: 89000,
    duration: "24 hours",
    price: 94.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=200&width=300",
    level: "Intermediate",
    category: "Blockchain",
    format: "Self-Paced",
    language: "English",
  },
]

export default function CatalogPage() {
  const [courses, setCourses] = useState(allCourses)
  const [sortBy, setSortBy] = useState("popularity")

  const handleFilterChange = (filters: any) => {
    let filteredCourses = [...allCourses]

    // Apply filters
    if (filters.subjects.length > 0) {
      filteredCourses = filteredCourses.filter((course) => filters.subjects.includes(course.category))
    }

    if (filters.levels.length > 0) {
      filteredCourses = filteredCourses.filter((course) => filters.levels.includes(course.level))
    }

    if (filters.formats.length > 0) {
      filteredCourses = filteredCourses.filter((course) => filters.formats.includes(course.format))
    }

    if (filters.priceRange !== "all") {
      if (filters.priceRange === "free") {
        filteredCourses = filteredCourses.filter((course) => course.price === 0)
      } else if (filters.priceRange === "paid") {
        filteredCourses = filteredCourses.filter((course) => course.price > 0)
      }
    }

    setCourses(filteredCourses)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    const sortedCourses = [...courses]

    switch (value) {
      case "popularity":
        sortedCourses.sort((a, b) => b.students - a.students)
        break
      case "newest":
        // Mock newest sort
        sortedCourses.reverse()
        break
      case "rating":
        sortedCourses.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        sortedCourses.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedCourses.sort((a, b) => b.price - a.price)
        break
    }

    setCourses(sortedCourses)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Course Catalog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">All Courses ({courses.length})</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
