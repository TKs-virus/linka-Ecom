import Link from "next/link"
import { Play, Clock, Award, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Dr. Angela Yu",
    image: "/placeholder.svg?height=200&width=300",
    progress: 75,
    totalLessons: 45,
    completedLessons: 34,
    lastAccessed: "2 days ago",
    timeRemaining: "12 hours left",
    certificate: false,
  },
  {
    id: "2",
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    image: "/placeholder.svg?height=200&width=300",
    progress: 100,
    totalLessons: 30,
    completedLessons: 30,
    lastAccessed: "1 week ago",
    timeRemaining: "Completed",
    certificate: true,
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass 2024",
    instructor: "Phil Ebiner",
    image: "/placeholder.svg?height=200&width=300",
    progress: 25,
    totalLessons: 28,
    completedLessons: 7,
    lastAccessed: "5 days ago",
    timeRemaining: "18 hours left",
    certificate: false,
  },
]

const notifications = [
  {
    id: 1,
    course: "Complete Web Development Bootcamp 2024",
    message: "New bonus section added: Advanced React Patterns",
    time: "2 hours ago",
    type: "new_content",
  },
  {
    id: 2,
    course: "Python for Data Science",
    message: "Congratulations! You've completed the course",
    time: "1 week ago",
    type: "completion",
  },
  {
    id: 3,
    course: "Digital Marketing Masterclass",
    message: "Assignment due in 3 days: Create a Marketing Campaign",
    time: "1 day ago",
    type: "assignment",
  },
]

const certificates = [
  {
    id: 1,
    course: "Python for Data Science and Machine Learning",
    completedDate: "December 15, 2024",
    certificateId: "CERT-2024-001",
  },
]

export default function MyCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue your learning journey</p>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              <Badge className="ml-2" variant="destructive">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-80 aspect-video md:aspect-auto">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                              <p className="text-gray-600 mb-2">by {course.instructor}</p>
                              <p className="text-sm text-gray-500">Last accessed {course.lastAccessed}</p>
                            </div>
                            {course.certificate && (
                              <Badge className="bg-green-100 text-green-800">
                                <Award className="w-3 h-3 mr-1" />
                                Certified
                              </Badge>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm text-gray-600">
                                {course.completedLessons}/{course.totalLessons} lessons
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-600">{course.progress}% complete</span>
                              <span className="text-sm text-gray-600">{course.timeRemaining}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button asChild className="flex-1">
                            <Link href={`/course/${course.id}/learn`}>
                              <Play className="mr-2 h-4 w-4" />
                              Continue Learning
                            </Link>
                          </Button>
                          {course.progress === 100 && (
                            <Button variant="outline" asChild>
                              <Link href={`/certificate/${course.id}`}>
                                <Award className="mr-2 h-4 w-4" />
                                View Certificate
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {notification.type === "new_content" && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Play className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        {notification.type === "completion" && (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                        {notification.type === "assignment" && (
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <Clock className="h-4 w-4 text-orange-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{notification.course}</h4>
                        <p className="text-sm text-gray-700 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  My Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificates.length > 0 ? (
                  <div className="space-y-4">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold mb-1">{cert.course}</h4>
                          <p className="text-sm text-gray-600">Completed on {cert.completedDate}</p>
                          <p className="text-xs text-gray-500">Certificate ID: {cert.certificateId}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Certificate
                          </Button>
                          <Button variant="outline" size="sm">
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No certificates earned yet</p>
                    <p className="text-sm text-gray-400">Complete courses to earn certificates</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transcripts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Transcripts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">No transcripts available</p>
                  <p className="text-sm text-gray-400">
                    Transcripts will be available for degree and certification programs
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
