"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, MessageSquare, Users, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CustomQuotePage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package") || ""
  const packageTitle = searchParams.get("title") || "Travel Package"

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelers: "2",
    travelDates: "",
    flexibility: "",
    budget: "",
    specialRequests: "",
    interests: [] as string[],
    contactPreference: "email",
  })

  const [submitted, setSubmitted] = useState(false)

  const interests = [
    "Cultural experiences",
    "Adventure activities",
    "Food & dining",
    "Photography",
    "Shopping",
    "Nightlife",
    "Wellness & spa",
    "Historical sites",
    "Nature & wildlife",
    "Local festivals",
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in our travel packages. Our travel specialists will review your requirements
              and get back to you within 24 hours with a personalized quote.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="text-sm">
                <div className="font-medium text-blue-800 mb-2">What happens next?</div>
                <div className="text-blue-700 space-y-1">
                  <div>• Our travel specialist will review your requirements</div>
                  <div>• We'll create a customized itinerary just for you</div>
                  <div>• You'll receive a detailed quote within 24 hours</div>
                  <div>• We'll schedule a call to discuss your perfect trip</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/packages">
                <Button className="w-full">Browse More Packages</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
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
              <Link href={packageId ? `/packages/${packageId}` : "/packages"}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Package
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Request Custom Quote</h1>
            <p className="text-lg text-gray-600">
              Tell us about your dream trip and we'll create a personalized itinerary just for you
            </p>
            {packageTitle && (
              <div className="mt-4">
                <span className="text-sm text-gray-500">Customizing: </span>
                <span className="font-medium text-blue-600">{packageTitle}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tell Us About Your Trip</CardTitle>
                  <CardDescription>
                    The more details you provide, the better we can customize your perfect vacation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Trip Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="travelers">Number of Travelers *</Label>
                          <Select
                            value={formData.travelers}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, travelers: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Traveler</SelectItem>
                              <SelectItem value="2">2 Travelers</SelectItem>
                              <SelectItem value="3">3 Travelers</SelectItem>
                              <SelectItem value="4">4 Travelers</SelectItem>
                              <SelectItem value="5">5 Travelers</SelectItem>
                              <SelectItem value="6+">6+ Travelers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                          <Input
                            id="travelDates"
                            value={formData.travelDates}
                            onChange={(e) => setFormData((prev) => ({ ...prev, travelDates: e.target.value }))}
                            placeholder="e.g., June 2024 or Summer 2024"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="flexibility">Date Flexibility</Label>
                          <Select
                            value={formData.flexibility}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, flexibility: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select flexibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="exact">Exact dates only</SelectItem>
                              <SelectItem value="1-2weeks">1-2 weeks flexible</SelectItem>
                              <SelectItem value="1month">1 month flexible</SelectItem>
                              <SelectItem value="seasonal">Seasonal (any time in season)</SelectItem>
                              <SelectItem value="anytime">Anytime this year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget Range (per person)</Label>
                          <Select
                            value={formData.budget}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1000">Under $1,000</SelectItem>
                              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                              <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="over-10000">Over $10,000</SelectItem>
                              <SelectItem value="no-limit">No specific limit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Your Interests</h3>
                      <p className="text-sm text-gray-600">
                        Select all that apply to help us customize your experience
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {interests.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest}
                              checked={formData.interests.includes(interest)}
                              onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                            />
                            <Label htmlFor={interest} className="text-sm">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Special Requests & Preferences</h3>
                      <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, celebration occasions, or specific experiences you'd like to include..."
                        className="min-h-[120px]"
                      />
                    </div>

                    {/* Contact Preference */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Preferred Contact Method</h3>
                      <Select
                        value={formData.contactPreference}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, contactPreference: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="both">Both Email and Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Submit Quote Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Why Request a Custom Quote?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Personalized Experience</div>
                        <div className="text-xs text-gray-600">Tailored to your interests and preferences</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Flexible Dates</div>
                        <div className="text-xs text-gray-600">Work with your schedule and budget</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Expert Planning</div>
                        <div className="text-xs text-gray-600">Professional travel specialists</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm">
                      <div className="font-medium text-blue-800 mb-1">Response Time</div>
                      <div className="text-blue-700">We'll get back to you within 24 hours with a detailed quote</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm">
                      <div className="font-medium text-green-800 mb-1">No Obligation</div>
                      <div className="text-green-700">Free quote with no commitment required</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
