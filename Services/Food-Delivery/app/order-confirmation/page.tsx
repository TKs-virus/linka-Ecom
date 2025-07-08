"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const [orderStatus, setOrderStatus] = useState("confirmed")
  const [progress, setProgress] = useState(25)
  const [estimatedTime, setEstimatedTime] = useState(35)

  const orderNumber = "LK" + Math.random().toString(36).substr(2, 9).toUpperCase()

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const statusSteps = [
    { id: "confirmed", label: "Order Confirmed", completed: true },
    { id: "preparing", label: "Preparing Food", completed: orderStatus !== "confirmed" },
    { id: "ready", label: "Ready for Pickup", completed: false },
    { id: "delivered", label: "Delivered", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Linka</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Your order has been placed successfully. Order #{orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Order Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">{estimatedTime} minutes</div>
                <p className="text-gray-600">Estimated delivery time</p>
              </div>

              <Progress value={progress} className="w-full" />

              <div className="space-y-4">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className={`${step.completed ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Delivery Address</h4>
                <p className="text-gray-600">
                  123 Main Street
                  <br />
                  New York, NY 10001
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Restaurant</h4>
                <p className="text-gray-600">Pizzeria Del Sol</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Driver</h4>
                <p className="text-gray-600">Will be assigned soon</p>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Order Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/restaurants">Browse Restaurants</Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500">You will receive SMS updates about your order status</p>
        </div>
      </div>
    </div>
  )
}
