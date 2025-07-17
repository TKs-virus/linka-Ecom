"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser, type AuthState } from "@/app/actions/auth-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2, Eye, EyeOff } from "lucide-react"
import { useActionState } from "@/hooks/use-action-state"

const initialState: AuthState = {
  message: "",
  success: false,
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Handle successful login redirect
  if (state?.success && state.redirectTo) {
    router.push(state.redirectTo)
  }

  return (
    <form action={formAction} className="space-y-4">
      {state && !state.success && state.error?.field === "general" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{state.error.message}</AlertDescription>
        </Alert>
      )}

      {state?.success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
          className={state?.error?.field === "email" ? "border-red-500" : ""}
        />
        {state?.error?.field === "email" && <p className="text-sm text-red-600">{state.error.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className={state?.error?.field === "password" ? "border-red-500" : ""}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {state?.error?.field === "password" && <p className="text-sm text-red-600">{state.error.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="link" className="p-0 h-auto text-sm" asChild>
          <a href="/forgot-password">Forgot your password?</a>
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Demo credentials: demo@retailer.com / password123</p>
      </div>
    </form>
  )
}
