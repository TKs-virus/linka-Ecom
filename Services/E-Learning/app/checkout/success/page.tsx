import Link from "next/link"
import { CheckCircle, Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
            <p className="text-gray-600">Thank you for your purchase. Your courses are now available.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Order Details</h3>
              <div className="text-sm text-gray-600">
                <p>Order ID: #LNK-2024-001234</p>
                <p>Payment Method: Credit Card</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">What's Next?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <Play className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Start Learning</h4>
                    <p className="text-sm text-gray-600">
                      Access your courses immediately and start your learning journey.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <Download className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Download Receipt</h4>
                    <p className="text-sm text-gray-600">Get your purchase receipt for your records.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link href="/my-courses">
                  <Play className="mr-2 h-4 w-4" />
                  Go to My Courses
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/catalog">Continue Shopping</Link>
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>A confirmation email has been sent to your registered email address.</p>
              <p>
                Need help?{" "}
                <Link href="/support" className="text-blue-600 hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
