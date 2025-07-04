"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Star, Clock, Users, Globe, Award, Play, Heart, ShoppingCart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp 2024",
  instructor: "Dr. Angela Yu",
  instructorBio:
    "Dr. Angela Yu is a developer with a passion for teaching. She's the lead instructor at the London App Brewery, London's leading Programming Bootcamp. She's invited by companies like Twitter, Facebook and Google to teach their employees.",
  rating: 4.7,
  reviewCount: 284567,
  students: 842000,
  duration: "65 hours",
  price: 84.99,
  originalPrice: 199.99,
  image: "/placeholder.svg?height=400&width=600",
  level: "All Levels",
  category: "Web Development",
  language: "English",
  lastUpdated: "December 2024",
  description:
    "Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the HIGHEST RATED courses in the history of Udemy!",
  learningOutcomes: [
    "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
    "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
    "After the course you will be able to build ANY website you want.",
    "Build fully-fledged websites and web apps for your startup or business.",
    "Work as a freelance web developer.",
    "Master frontend development with React",
    "Master backend development with Node",
  ],
  prerequisites: [
    "No programming experience needed - I'll teach you everything you need to know",
    "A computer with access to the internet",
    "No paid software required - I'll teach you how to use VS Code (free)",
    "I'll walk you through, step-by-step how to get all the software installed and set up",
  ],
  curriculum: [
    {
      section: "Front-End Web Development",
      lectures: 12,
      duration: "2hr 30min",
      lessons: [
        "What is Web Development?",
        "How Does the Internet Work?",
        "HTML Basics",
        "CSS Fundamentals",
        "JavaScript Introduction",
      ],
    },
    {
      section: "Introduction to Javascript ES6",
      lectures: 15,
      duration: "3hr 45min",
      lessons: [
        "Variables and Data Types",
        "Functions and Scope",
        "Arrays and Objects",
        "DOM Manipulation",
        "Event Handling",
      ],
    },
    {
      section: "The Document Object Model (DOM)",
      lectures: 8,
      duration: "2hr 15min",
      lessons: ["What is the DOM?", "Selecting Elements", "Modifying Elements", "Event Listeners"],
    },
  ],
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, isInCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleEnrollNow = () => {
    if (courseData.price === 0) {
      // Free course - enroll directly
      alert("Enrolled successfully! Redirecting to course player...")
    } else {
      // Paid course - add to cart and go to checkout
      const cartItem = {
        id: courseData.id,
        title: courseData.title,
        instructor: courseData.instructor,
        price: courseData.price,
        originalPrice: courseData.originalPrice,
        image: courseData.image,
        category: courseData.category,
      }
      addToCart(cartItem)
      router.push("/checkout")
    }
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: courseData.id,
      title: courseData.title,
      instructor: courseData.instructor,
      price: courseData.price,
      originalPrice: courseData.originalPrice,
      image: courseData.image,
      category: courseData.category,
    }
    addToCart(cartItem)
  }

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const courseInCart = isInCart(courseData.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-gray-300 hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-500" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/catalog" className="text-gray-300 hover:text-white">
                  Courses
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-500" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">{courseData.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Badge className="mb-2">{courseData.category}</Badge>
                <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{courseData.description}</p>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{courseData.rating}</span>
                  <span className="text-gray-300">({courseData.reviewCount.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span>Created by {courseData.instructor}</span>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{courseData.language}</span>
                </div>
                <span>Last updated {courseData.lastUpdated}</span>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
                  <img
                    src={courseData.image || "/placeholder.svg"}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold">
                        {courseData.price === 0 ? "Free" : `$${courseData.price}`}
                      </span>
                      {courseData.originalPrice && (
                        <span className="text-gray-500 line-through text-lg">${courseData.originalPrice}</span>
                      )}
                    </div>
                    {courseData.originalPrice && (
                      <Badge variant="destructive">
                        {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button onClick={handleEnrollNow} className="w-full" size="lg">
                      {courseData.price === 0 ? "Enroll Now" : "Enroll Now"}
                    </Button>
                    {courseData.price > 0 && (
                      <Button
                        onClick={handleAddToCart}
                        variant="outline"
                        className="w-full bg-transparent"
                        size="lg"
                        disabled={courseInCart}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {courseInCart ? "Added to Cart" : "Add to Cart"}
                      </Button>
                    )}
                    <Button onClick={handleAddToWishlist} variant="ghost" className="w-full" size="lg">
                      <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{courseData.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Access on mobile and TV</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {courseData.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {courseData.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <p className="text-sm text-gray-600">
                      {courseData.curriculum.length} sections •{" "}
                      {courseData.curriculum.reduce((acc, section) => acc + section.lectures, 0)} lectures •{" "}
                      {courseData.duration} total length
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courseData.curriculum.map((section, index) => (
                        <Collapsible key={index} defaultOpen={index === 0}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                            <div className="flex items-center gap-3">
                              <ChevronDown className="h-4 w-4" />
                              <span className="font-semibold">{section.section}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {section.lectures} lectures • {section.duration}
                            </span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2 ml-4">
                            <div className="space-y-2">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                  <Play className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{lesson}</span>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt={courseData.instructor}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{courseData.instructor}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{courseData.rating} Instructor Rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{courseData.students.toLocaleString()} Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{courseData.instructorBio}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <img
                              src={`/placeholder.svg?height=40&width=40`}
                              alt="Student"
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">John Doe</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">2 weeks ago</span>
                              </div>
                              <p className="text-gray-700">
                                Excellent course! The instructor explains everything clearly and the projects are very
                                practical. I learned so much and feel confident about web development now.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
