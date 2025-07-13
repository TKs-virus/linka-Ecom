import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, BarChart3, ArrowRight, CheckCircle } from "lucide-react"

export default function ElearningPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Create, organize, and deliver engaging online courses",
    },
    {
      icon: Users,
      title: "Student Portal",
      description: "Comprehensive learning management for students",
    },
    {
      icon: Award,
      title: "Certification System",
      description: "Issue certificates and track student progress",
    },
    {
      icon: BarChart3,
      title: "Learning Analytics",
      description: "Monitor engagement and learning outcomes",
    },
  ]

  const benefits = [
    "Interactive video lessons and quizzes",
    "Progress tracking and analytics",
    "Mobile-friendly learning platform",
    "Automated grading and feedback",
    "Discussion forums and collaboration",
    "Integration with payment systems",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">E-Learning Platform</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
            Transform Education Online
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Build a comprehensive e-learning platform that engages students and delivers results. From course creation
            to student management, everything you need is here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
            >
              Start Teaching
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo Course
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Complete Learning Management System</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Empower Learning with Technology</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold">
                Launch Your Platform
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
