"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, CalendarIcon, Clock, Video, Phone, MessageCircle, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { format } from "date-fns"

export default function BookAppointmentPage() {
  const params = useParams()
  const doctorId = params.id

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [consultationType, setConsultationType] = useState("")
  const [patientType, setPatientType] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock doctor data
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practice",
    image: "/placeholder.svg?height=100&width=100",
    fee: 75,
    consultationTypes: ["Video", "Phone", "Chat"],
  }

  const availableSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
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

  const handleBooking = () => {
    // Booking logic here
    console.log("Booking appointment...")
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/doctors/${doctorId}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctor Profile
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
                <CardDescription>Schedule your consultation with {doctor.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Appointment for</Label>
                      <RadioGroup value={patientType} onValueChange={setPatientType} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="self" id="self" />
                          <Label htmlFor="self">Myself</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="family" id="family" />
                          <Label htmlFor="family">Family Member</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email address" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="Enter age" />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Consultation Type</h3>
                  <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                    {doctor.consultationTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="flex items-center space-x-2 cursor-pointer">
                          {getConsultationIcon(type)}
                          <span>{type} Consultation</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="text-sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reason for Visit */}
                <div>
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please describe your symptoms or reason for consultation..."
                    className="mt-2"
                  />
                </div>

                {/* Medical History */}
                <div>
                  <Label htmlFor="medical-history">Current Medications & Medical History (Optional)</Label>
                  <Textarea
                    id="medical-history"
                    placeholder="List any current medications, allergies, or relevant medical history..."
                    className="mt-2"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that this consultation is not for emergency situations.
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Doctor Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                  </div>
                </div>

                {consultationType && (
                  <div className="flex items-center space-x-2 mb-2">
                    {getConsultationIcon(consultationType)}
                    <span className="text-sm">{consultationType} Consultation</span>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{selectedTime}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>${doctor.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>$6.40</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(doctor.fee + 5 + 6.4).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Button */}
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !consultationType || !agreedToTerms}
              className="w-full"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Confirm & Pay
            </Button>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-600">
              <p>🔒 Your payment is secure and encrypted</p>
              <p>You can cancel up to 2 hours before your appointment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
