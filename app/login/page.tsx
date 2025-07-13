import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, BarChart3, Play, ArrowRight } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Demo Access */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Linka</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Try Our Demo</h1>
            <p className="text-slate-600">Experience the full power of our business platform</p>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Retailer Dashboard Demo</CardTitle>
              <CardDescription className="text-blue-700 font-medium">
                Full access to analytics, inventory, orders, and customer management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="font-bold text-blue-800">ZMW 1.1M+</div>
                  <div className="text-blue-600">Revenue</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="font-bold text-blue-800">2,472</div>
                  <div className="text-blue-600">Orders</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="font-bold text-blue-800">3,847</div>
                  <div className="text-blue-600">Products</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="font-bold text-blue-800">12,429</div>
                  <div className="text-blue-600">Customers</div>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg"
              >
                <Link href="/dashboard">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Demo Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <p className="text-xs text-blue-600 text-center font-medium">
                ✨ No registration required • Instant access • Full features
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>

          <div className="text-center text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">Don't have an account? </span>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
            <div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">← Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
