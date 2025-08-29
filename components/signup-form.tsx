"use client"

import type React from "react"
import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2, Upload, X } from "lucide-react"
import { signUpUser } from "@/app/actions/auth-actions"
import { useToast } from "@/hooks/use-toast"

const industryTypes = [
  "Retail & E-commerce",
  "Food & Beverage",
  "Fashion & Apparel",
  "Health & Beauty",
  "Electronics & Technology",
  "Home & Garden",
  "Sports & Recreation",
  "Books & Media",
  "Automotive",
  "Arts & Crafts",
  "Other",
]

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const [inventoryFile, setInventoryFile] = useState<File | null>(null)
  const { toast } = useToast()

  const [state, formAction, isPending] = useActionState(signUpUser, undefined)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ]

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload an Excel (.xlsx, .xls) or CSV file.",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      setInventoryFile(file)
    }
  }

  const removeFile = () => {
    setInventoryFile(null)
    // Reset the file input
    const fileInput = document.getElementById("inventoryFile") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  // Show success message if signup was successful
  if (state?.success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">Account Created Successfully!</CardTitle>
          <CardDescription>
            We've sent a verification email to your address. Please check your email and click the verification link to
            activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Error Message */}
      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-sm">{state.error.message}</p>
        </div>
      )}

      {/* Basic Information */}
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={state?.error?.field === "phone" ? "border-red-500" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="userType">I am a</Label>
        <Select name="userType" required onValueChange={setUserType}>
          <SelectTrigger className={state?.error?.field === "userType" ? "border-red-500" : ""}>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="retailer">Retailer</SelectItem>
            <SelectItem value="delivery">Delivery Partner</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Retailer-specific fields */}
      {userType === "retailer" && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
          <h3 className="font-medium text-blue-900">Business Information</h3>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              placeholder="Your Business Name"
              className={state?.error?.field === "companyName" ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industryType">Industry Type</Label>
            <Select name="industryType" required>
              <SelectTrigger className={state?.error?.field === "industryType" ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industryTypes.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeLocation">Store Location</Label>
            <Textarea
              id="storeLocation"
              name="storeLocation"
              required
              placeholder="Enter your store address"
              className={`min-h-[80px] ${state?.error?.field === "storeLocation" ? "border-red-500" : ""}`}
            />
          </div>

          {/* Inventory Upload */}
          <div className="space-y-2">
            <Label htmlFor="inventoryFile">
              Inventory Data (Optional)
              <span className="text-sm text-muted-foreground ml-2">
                Upload Excel or CSV file with your current inventory
              </span>
            </Label>

            {!inventoryFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</div>
                <div className="text-xs text-gray-500">Excel (.xlsx, .xls) or CSV files up to 10MB</div>
                <input
                  id="inventoryFile"
                  name="inventoryFile"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">{inventoryFile.name}</span>
                  <span className="text-xs text-green-600">({(inventoryFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Password fields */}
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
      </div>

      {/* Terms and conditions */}
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
