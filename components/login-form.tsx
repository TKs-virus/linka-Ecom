"use client"
import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser, type AuthState } from "@/app/actions/auth-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Play, BarChart3 } from "lucide-react"
import Link from "next/link"

const initialState: AuthState = {
  message: "",
  success: false,
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  const handleDemoLogin = async () => {
    const formData = new FormData()
    formData.append("email", "demo@example.com")
    formData.append("password", "demo")
    // Directly invoke the server action
    await (formAction as (payload: FormData) => Promise<void>)(formData)
  }

  return (
    <div className="space-y-6">
      {/* Demo Access - Prominent */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Try Demo Dashboard</h3>
            <p className="text-sm text-slate-600">Full access, no registration needed</p>
          </div>
        </div>
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg"
        >
          <Link href="/dashboard">
            <Play className="w-4 h-4 mr-2" />
            Launch Demo Dashboard
          </Link>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Or sign in with your account</span>
        </div>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        {state && !state.success && state.error?.field === "general" && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{state.error.message}</AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-2">
            <Input id="email" name="email" type="email" autoComplete="email" required />
            {state?.error?.field === "email" && <p className="mt-1 text-xs text-red-600">{state.error.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-2">
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
            {state?.error?.field === "password" && <p className="mt-1 text-xs text-red-600">{state.error.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>

        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleDemoLogin}
            disabled={isPending}
          >
            {isPending ? "Loading Demo..." : "Quick Demo Login"}
          </Button>
          <p className="text-xs text-slate-500 mt-2">Use demo credentials: demo@example.com / demo</p>
        </div>
      </form>
    </div>
  )
}
