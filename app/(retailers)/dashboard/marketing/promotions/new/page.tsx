"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// For DatePicker, you'd typically use a component like the one from shadcn/ui docs
// For simplicity, we'll use <Input type="date" /> here, but a proper DatePicker is recommended.
import { createPromotion, type CreatePromotionState } from "@/app/actions/marketing-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"

const initialState: CreatePromotionState = {
  success: false,
}

export default function CreatePromotionPage() {
  const [state, formAction, isPending] = useActionState(createPromotion, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success && state.message) {
      // Optionally, show a toast notification here
      // For now, redirect after a short delay to show the success message
      setTimeout(() => {
        router.push("/dashboard/marketing/promotions")
      }, 1500) // Give time for user to see success message
    }
  }, [state, router])

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Promotion</CardTitle>
          <CardDescription>Set up a new discount, coupon, or special offer for your store.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
            {state.message && (
              <Alert variant={state.success ? "success" : "destructive"}>
                {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle>{state.success ? "Success!" : "Error"}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Promotion Name</Label>
              <Input id="name" name="name" placeholder="e.g., Summer Kick-off Sale" required />
              {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" name="description" placeholder="Briefly describe the promotion." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Promotion Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                    <SelectItem value="fixed_amount">Fixed Amount Discount</SelectItem>
                    <SelectItem value="free_shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.type && <p className="text-sm text-destructive">{state.errors.type}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  placeholder="e.g., 10 for 10% or 50 for ZMW 50"
                  required
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground">
                  Enter percentage (e.g., 10), fixed amount (e.g., 50), or 1 for free shipping.
                </p>
                {state.errors?.value && <p className="text-sm text-destructive">{state.errors.value}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
              <Input id="couponCode" name="couponCode" placeholder="e.g., SUMMER2024" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" required />
                {state.errors?.startDate && <p className="text-sm text-destructive">{state.errors.startDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" required />
                {state.errors?.endDate && <p className="text-sm text-destructive">{state.errors.endDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicableTo">Applicable To</Label>
              <Select name="applicableTo" defaultValue="all_products" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select applicability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_products">All Products</SelectItem>
                  <SelectItem value="specific_products" disabled>
                    Specific Products (Coming Soon)
                  </SelectItem>
                  <SelectItem value="specific_categories" disabled>
                    Specific Categories (Coming Soon)
                  </SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.applicableTo && <p className="text-sm text-destructive">{state.errors.applicableTo}</p>}
            </div>
            {/* Add fields for product/category selection when enabled */}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/marketing/promotions">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Promotion"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
