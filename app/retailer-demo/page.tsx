"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Loader2 } from "lucide-react"

export default function RetailerDemoRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Launching Demo Dashboard
            </h1>
            <p className="text-slate-600 font-medium">Preparing your business analytics experience...</p>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-sm text-slate-600 font-medium">Loading dashboard...</span>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <p>✨ Full access to all features</p>
            <p>📊 Real-time analytics and insights</p>
            <p>🚀 No registration required</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
