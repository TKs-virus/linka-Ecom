"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Award, Users, Video, Phone, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id

  // Mock doctor data - in real app, fetch based on ID
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practice",
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=200&width=200",
    experience: "15 years",
    fee: 75,
    qualifications: [
      "MD from Harvard Medical School",
      "Board Certified in Family Medicine",
      "Fellowship in Preventive Medicine",
    ],
    languages: ["English", "Spanish"],
    gender: "Female",
    location: "New York, NY",
    consultationTypes: ["Video", "Phone", "Chat"],
    bio: "Dr. Sarah Johnson is a board-certified family medicine physician with over 15 years of experience providing comprehensive healthcare to patients of all ages. She specializes in preventive care, chronic disease management, and women's health. Dr. Johnson is passionate about building long-term relationships with her patients and helping them achieve their health goals through personalized care plans.",
    education: [
      "MD - Harvard Medical School (2008)",
      "Residency - Massachusetts General Hospital (2011)",
      "Fellowship - Preventive Medicine, Johns Hopkins (2012)",
    ],
    specializations: [
      "Preventive Care",
      "Chronic Disease Management",
      "Women's Health",
      "Diabetes Management",
      "Hypertension",
      "Annual Physical Exams",
    ],
    availableSlots: [
      { date: "Today", time: "2:00 PM", available: true },
      { date: "Today", time: "3:30 PM", available: true },
      { date: "Today", time: "5:00 PM", available: false },
      { date: "Tomorrow", time: "9:00 AM", available: true },
      { date: "Tomorrow", time: "10:30 AM", available: true },
      { date: "Tomorrow", time: "2:00 PM", available: true },
    ],
  }

  const patientReviews = [
    {
      id: 1,
      name: "Jennifer M.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Dr. Johnson was incredibly thorough and took the time to answer all my questions. The video consultation was smooth and professional.",
    },
    {
      id: 2,
      name: "Michael R.",
      rating: 5,
      date: "1 month ago",
      comment: "Excellent doctor! Very knowledgeable and caring. She helped me manage my diabetes much better.",
    },
    {
      id: 3,
      name: "Lisa K.",
      rating: 4,
      date: "2 months ago",
      comment: "Great experience overall. Dr. Johnson is very professional and the online platform is easy to use.",
    },
  ]

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="w-4 h-4" />
      case "Phone":
        return <Phone className="w-4 h-4" />
      case "Chat":
        return <MessageCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">Linka</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/doctors" className="text-blue-600 font-medium">
              Find Doctors
            </Link>
            <Link href="/pharmacy" className="text-gray-600 hover:text-blue-600">
              Pharmacy
            </Link>
            <Button variant="outline">Sign In</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/doctors" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search Results
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                      <p className="text-xl text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                      <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{doctor.experience} experience</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-lg">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-500">({doctor.reviews} patient reviews)</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.consultationTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="flex items-center space-x-1">
                            {getConsultationIcon(type)}
                            <span>{type} Consultation</span>
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>Languages:</strong> {doctor.languages.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Education & Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>{edu}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Patient Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {patientReviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      {review.id !== patientReviews.length && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Consultation Fee */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <p className="text-3xl font-bold text-green-600">${doctor.fee}</p>
                  <p className="text-gray-600">Consultation Fee</p>
                </div>
                <Link href={`/doctors/${doctorId}/book`}>
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Available Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Available Slots</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctor.availableSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{slot.date}</p>
                        <p className="text-sm text-gray-600">{slot.time}</p>
                      </div>
                      <Button variant={slot.available ? "outline" : "secondary"} size="sm" disabled={!slot.available}>
                        {slot.available ? "Select" : "Booked"}
                      </Button>
                    </div>
                  ))}
                </div>
                <Link href={`/doctors/${doctorId}/book`}>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Slots
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Star className="w-4 h-4 mr-2" />
                  Save to Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
