"use client"
import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser, type AuthState } from "@/app/actions/auth-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

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
    <form ref={formRef} action={formAction} className="space-y-6">
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

      <div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-50 px-2 text-muted-foreground">Or</span> {/* Updated bg for consistency */}
        </div>
      </div>

      <div>
        <Button type="button" variant="outline" className="w-full" onClick={handleDemoLogin} disabled={isPending}>
          {isPending ? "Loading Demo..." : "Explore Seller Dashboard"} {/* Updated Button Text */}
        </Button>
      </div>
    </form>
  )
}
