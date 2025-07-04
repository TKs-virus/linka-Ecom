"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, ArrowLeft, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PrescriptionPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const prescriptionOrders = [
    {
      id: "RX001",
      patientName: "John Doe",
      medication: "Amoxicillin 500mg",
      status: "Processing",
      uploadDate: "2024-01-15",
      estimatedReady: "2024-01-16",
    },
    {
      id: "RX002",
      patientName: "Jane Smith",
      medication: "Lisinopril 10mg",
      status: "Ready",
      uploadDate: "2024-01-14",
      estimatedReady: "2024-01-15",
    },
    {
      id: "RX003",
      patientName: "Mike Johnson",
      medication: "Metformin 850mg",
      status: "Delivered",
      uploadDate: "2024-01-12",
      estimatedReady: "2024-01-13",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Ready":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Delivered":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Delivered":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600">
              Find Doctors
            </Link>
            <Link href="/pharmacy" className="text-blue-600 font-medium">
              Pharmacy
            </Link>
            <Button variant="outline">Sign In</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/pharmacy" className="hover:text-blue-600">
            Pharmacy
          </Link>
          <span>/</span>
          <span className="text-gray-900">Prescription Upload</span>
        </div>

        {/* Back Button */}
        <Link href="/pharmacy" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pharmacy
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Prescription</CardTitle>
                <CardDescription>
                  Upload a clear photo or scan of your prescription. Our licensed pharmacists will review it within 2
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Prescription Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your prescription here</p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <Button variant="outline">Choose File</Button>
                    <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patient-name">Patient Name</Label>
                    <Input id="patient-name" placeholder="Enter patient name as shown on prescription" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea id="address" placeholder="Enter complete delivery address" />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea id="notes" placeholder="Any special instructions, allergies, or questions..." />
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Upload className="w-5 h-5 mr-2" />
                  Submit Prescription
                </Button>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Ensure the prescription is clearly visible and readable</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Include all pages if the prescription spans multiple pages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Make sure the doctor's signature and clinic details are visible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Prescription must be valid and not expired</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Our pharmacists will contact you if any clarification is needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Prescription Orders</CardTitle>
                <CardDescription>Track your prescription orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptionOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">Order #{order.id}</span>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Patient: {order.patientName}</p>
                      <p className="text-sm text-gray-600 mb-1">Medication: {order.medication}</p>
                      <p className="text-sm text-gray-600 mb-2">Uploaded: {order.uploadDate}</p>
                      {order.status === "Processing" && (
                        <p className="text-sm text-blue-600">Estimated ready: {order.estimatedReady}</p>
                      )}
                      {order.status === "Ready" && (
                        <Button size="sm" className="mt-2">
                          Proceed to Checkout
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Upload Prescription</h4>
                      <p className="text-sm text-gray-600">Submit a clear photo of your prescription</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Pharmacist Review</h4>
                      <p className="text-sm text-gray-600">Licensed pharmacist verifies your prescription</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Order & Pay</h4>
                      <p className="text-sm text-gray-600">Complete your order and make payment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Fast Delivery</h4>
                      <p className="text-sm text-gray-600">Receive your medication at your doorstep</p>
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
