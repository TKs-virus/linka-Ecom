"use client"

import { CheckCircle, Download, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CheckoutSuccessPage() {
  const orderNumber = "LNK-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Linka
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                Order Confirmation
                <Badge variant="secondary" className="ml-2">
                  #{orderNumber}
                </Badge>
              </CardTitle>
              <CardDescription>Your order details and receipt have been sent to your email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Order Total</p>
                  <p className="text-2xl font-bold text-green-600">$4,799.48</p>
                </div>
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p>Crypto Wallet (ETH)</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Items Purchased:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Advanced Digital Marketing Course</span>
                    <Badge variant="outline">Digital Access</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Business Analytics Masterclass</span>
                    <Badge variant="outline">Digital Access</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Industrial LED Lights (100 units)</span>
                    <Badge variant="outline">Ships in 3-5 days</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Digital Courses</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access your courses immediately in your account dashboard
                  </p>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Access Courses
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Physical Products</h4>
                  <p className="text-sm text-muted-foreground mb-3">Track your wholesale order shipment</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Track Shipment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/account/orders">
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, our support team is here to help.
            </p>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
