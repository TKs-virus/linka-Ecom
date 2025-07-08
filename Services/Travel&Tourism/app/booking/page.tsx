"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plane, Hotel, CreditCard, Shield, Clock, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BookingConfirmation() {
  const [step, setStep] = useState(1)
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    passport: "",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [specialRequests, setSpecialRequests] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const bookingDetails = {
    flight: {
      airline: "Emirates",
      departure: { time: "08:30", airport: "JFK", city: "New York", date: "Dec 15, 2024" },
      arrival: { time: "22:45", airport: "DXB", city: "Dubai", date: "Dec 15, 2024" },
      duration: "14h 15m",
      class: "Economy",
      price: 1299,
    },
    hotel: {
      name: "Grand Luxury Resort",
      image: "/placeholder.svg?height=100&width=150",
      rating: 5,
      location: "Downtown Dubai",
      checkIn: "Dec 15, 2024",
      checkOut: "Dec 22, 2024",
      nights: 7,
      room: "Deluxe Ocean View",
      price: 299 * 7,
    },
  }

  const totalPrice = bookingDetails.flight.price + bookingDetails.hotel.price
  const taxes = Math.round(totalPrice * 0.12)
  const finalTotal = totalPrice + taxes

  const handleConfirmBooking = () => {
    if (agreeToTerms && passengerInfo.firstName && passengerInfo.email && paymentInfo.cardNumber) {
      setBookingComplete(true)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your booking has been successfully confirmed. You will receive confirmation emails shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Booking Reference:</span>
                  <div className="text-blue-600 font-mono">
                    TH-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Total Amount:</span>
                  <div className="text-lg font-bold">${finalTotal.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full">Download E-tickets & Vouchers</Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Booking Details
              </Button>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/flights">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Plane className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600">Secure Booking</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Progress Steps */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                      1
                    </div>
                    <span className="text-sm font-medium">Passenger Details</span>
                  </div>
                  <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                      2
                    </div>
                    <span className="text-sm font-medium">Payment</span>
                  </div>
                  <div className={`flex items-center gap-2 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                      3
                    </div>
                    <span className="text-sm font-medium">Confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Information */}
            <Card>
              <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
                <CardDescription>Please provide details for the primary passenger</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={passengerInfo.firstName}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={passengerInfo.lastName}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={passengerInfo.email}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={passengerInfo.phone}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={passengerInfo.dateOfBirth}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passport">Passport Number</Label>
                    <Input
                      id="passport"
                      value={passengerInfo.passport}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, passport: e.target.value })}
                      placeholder="Enter passport number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Special Requests</CardTitle>
                <CardDescription>Any special requirements or requests for your trip</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter any special requests (dietary requirements, accessibility needs, etc.)"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>Enter your payment details to complete the booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Input
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                    placeholder="Name on card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      placeholder="123"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                      . I understand the cancellation policy and booking terms.
                    </Label>
                  </div>
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={!agreeToTerms}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Confirm Booking & Pay ${finalTotal.toLocaleString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                {/* Flight Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Plane className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Flight</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="font-medium">{bookingDetails.flight.airline}</div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>
                          {bookingDetails.flight.departure.city} ({bookingDetails.flight.departure.airport})
                        </span>
                        <span>{bookingDetails.flight.departure.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {bookingDetails.flight.arrival.city} ({bookingDetails.flight.arrival.airport})
                        </span>
                        <span>{bookingDetails.flight.arrival.time}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>{bookingDetails.flight.departure.date}</span>
                        <span>{bookingDetails.flight.duration}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm">{bookingDetails.flight.class}</span>
                      <span className="font-medium">${bookingDetails.flight.price}</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Hotel className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Hotel</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex gap-3">
                      <Image
                        src={bookingDetails.hotel.image || "/placeholder.svg"}
                        alt={bookingDetails.hotel.name}
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{bookingDetails.hotel.name}</div>
                        <div className="flex items-center gap-1">{renderStars(bookingDetails.hotel.rating)}</div>
                        <div className="text-xs text-gray-600">{bookingDetails.hotel.location}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>{bookingDetails.hotel.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>{bookingDetails.hotel.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room:</span>
                        <span>{bookingDetails.hotel.room}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm">{bookingDetails.hotel.nights} nights</span>
                      <span className="font-medium">${bookingDetails.hotel.price}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Flight</span>
                    <span>${bookingDetails.flight.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hotel ({bookingDetails.hotel.nights} nights)</span>
                    <span>${bookingDetails.hotel.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>${taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800 mb-1">Cancellation Policy</div>
                      <div className="text-yellow-700">
                        Free cancellation until 24 hours before departure. Hotel cancellation varies by property.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
