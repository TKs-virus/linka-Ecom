"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signUpUser, type AuthState } from "@/app/actions/auth-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { useActionState } from "@/hooks/use-action-state"

const initialState: AuthState = {
  message: "",
  success: false,
}

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUpUser, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const router = useRouter()

  return (
    <form action={formAction} className="space-y-4">
      {state && !state.success && state.error?.field === "general" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{state.error.message}</AlertDescription>
        </Alert>
      )}

      {state?.success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Account Created!</AlertTitle>
          <AlertDescription className="text-green-700">{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="John"
            className={state?.error?.field === "firstName" ? "border-red-500" : ""}
          />
          {state?.error?.field === "firstName" && <p className="text-sm text-red-600">{state.error.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Doe"
            className={state?.error?.field === "lastName" ? "border-red-500" : ""}
          />
          {state?.error?.field === "lastName" && <p className="text-sm text-red-600">{state.error.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className={state?.error?.field === "email" ? "border-red-500" : ""}
        />
        {state?.error?.field === "email" && <p className="text-sm text-red-600">{state.error.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+260 XXX XXX XXX" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="userType">I am a</Label>
        <Select name="userType" required value={userType} onValueChange={setUserType}>
          <SelectTrigger className={state?.error?.field === "userType" ? "border-red-500" : ""}>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer - I want to shop</SelectItem>
            <SelectItem value="retailer">Retailer - I want to sell products</SelectItem>
            <SelectItem value="delivery">Delivery Partner - I want to deliver orders</SelectItem>
          </SelectContent>
        </Select>
        {state?.error?.field === "userType" && <p className="text-sm text-red-600">{state.error.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Create a strong password"
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
        <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            placeholder="Confirm your password"
            className={state?.error?.field === "confirmPassword" ? "border-red-500" : ""}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {state?.error?.field === "confirmPassword" && <p className="text-sm text-red-600">{state.error.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" name="terms" required />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" name="marketing" />
        <Label htmlFor="marketing" className="text-sm">
          I want to receive marketing emails about new products and offers
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}
