"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Search, Filter, Star, Video, Phone, MessageCircle, CalendarIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

export default function FindDoctorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedGender, setSelectedGender] = useState("Any Gender")
  const [selectedLanguage, setSelectedLanguage] = useState("Any Language")
  const [appointmentType, setAppointmentType] = useState("Any Type")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedInsurance, setSelectedInsurance] = useState("No Insurance Filter")
  const [showFilters, setShowFilters] = useState(false)

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practice",
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg?height=100&width=100",
      experience: "15 years",
      fee: 75,
      nextAvailable: "Today 2:00 PM",
      languages: ["English", "Spanish"],
      gender: "Female",
      consultationTypes: ["Video", "Phone", "Chat"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg?height=100&width=100",
      experience: "12 years",
      fee: 120,
      nextAvailable: "Tomorrow 10:00 AM",
      languages: ["English", "Mandarin"],
      gender: "Male",
      consultationTypes: ["Video", "Phone"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=100&width=100",
      experience: "10 years",
      fee: 90,
      nextAvailable: "Today 4:30 PM",
      languages: ["English", "Spanish"],
      gender: "Female",
      consultationTypes: ["Video", "Phone", "Chat"],
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Mental Health",
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg?height=100&width=100",
      experience: "18 years",
      fee: 150,
      nextAvailable: "Next Week",
      languages: ["English"],
      gender: "Male",
      consultationTypes: ["Video", "Phone"],
    },
    {
      id: 5,
      name: "Dr. Priya Patel",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 94,
      image: "/placeholder.svg?height=100&width=100",
      experience: "14 years",
      fee: 200,
      nextAvailable: "Tomorrow 3:00 PM",
      languages: ["English", "Hindi"],
      gender: "Female",
      consultationTypes: ["Video", "Phone"],
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Diabetes",
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg?height=100&width=100",
      experience: "11 years",
      fee: 110,
      nextAvailable: "Today 6:00 PM",
      languages: ["English", "Korean"],
      gender: "Male",
      consultationTypes: ["Video", "Chat"],
    },
  ]

  const specialties = [
    "General Practice",
    "Dermatology",
    "Pediatrics",
    "Mental Health",
    "Diabetes",
    "Cardiology",
    "Orthopedics",
    "Gynecology",
  ]

  const languages = ["English", "Spanish", "Mandarin", "Hindi", "Korean", "French"]
  const insuranceProviders = ["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealth", "Kaiser Permanente", "Humana"]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
    const matchesGender = selectedGender === "Any Gender" || doctor.gender === selectedGender
    const matchesLanguage = selectedLanguage === "Any Language" || doctor.languages.includes(selectedLanguage)
    const matchesAppointmentType = appointmentType === "Any Type" || doctor.consultationTypes.includes(appointmentType)

    return matchesSearch && matchesSpecialty && matchesGender && matchesLanguage && matchesAppointmentType
  })

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find a Doctor</h1>
          <p className="text-gray-600">Book an appointment with certified healthcare professionals</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by doctor name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-4 border-t">
              <div>
                <Label className="text-sm font-medium mb-2 block">Specialty</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Specialties">All Specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Gender</Label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any Gender">Any Gender</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any Language">Any Language</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Consultation Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any Type">Any Type</SelectItem>
                    <SelectItem value="Video">Video Call</SelectItem>
                    <SelectItem value="Phone">Phone Call</SelectItem>
                    <SelectItem value="Chat">Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Availability</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Insurance</Label>
                <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No Insurance Filter">No Insurance Filter</SelectItem>
                    {insuranceProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <Link href={`/doctors/${doctor.id}`}>
                          <h3 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">{doctor.name}</h3>
                        </Link>
                        <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                        <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
                      </div>

                      <div className="text-right mt-2 md:mt-0">
                        <div className="flex items-center justify-end space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">${doctor.fee}</p>
                        <p className="text-sm text-gray-600">consultation fee</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.consultationTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="flex items-center space-x-1">
                          {getConsultationIcon(type)}
                          <span>{type}</span>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-600 mb-1">Languages: {doctor.languages.join(", ")}</p>
                        <p className="text-sm font-medium text-green-600">Next available: {doctor.nextAvailable}</p>
                      </div>

                      <div className="flex space-x-3">
                        <Link href={`/doctors/${doctor.id}`}>
                          <Button variant="outline">View Profile</Button>
                        </Link>
                        <Link href={`/doctors/${doctor.id}/book`}>
                          <Button>Book Appointment</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
