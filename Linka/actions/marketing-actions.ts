"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type PromotionStatus = "active" | "scheduled" | "expired" | "draft"
export type PromotionType = "percentage" | "fixed_amount" | "free_shipping"
export type PromotionApplicability = "all_products" | "specific_products" | "specific_categories"

export interface Promotion {
  id: string
  name: string
  description?: string
  type: PromotionType
  value: number // e.g., 10 for 10% or 50 for ZMW 50. For free_shipping, could be 0 or 1 (true)
  couponCode?: string
  startDate: string // ISO Date string
  endDate: string // ISO Date string
  status: PromotionStatus
  applicableTo: PromotionApplicability
  productIds?: string[] // if applicableTo is specific_products
  categoryIds?: string[] // if applicableTo is specific_categories
  usageLimit?: number // Max times a coupon can be used in total
  timesUsed?: number
  createdAt: string
}

// Mock database for promotions
let MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo1",
    name: "Weekend Bonanza",
    description: "15% off all fashion items this weekend.",
    type: "percentage",
    value: 15,
    couponCode: "WEEKEND15",
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Started 2 days ago
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 1 day
    status: "active",
    applicableTo: "specific_categories",
    categoryIds: ["cat_fashion"],
    timesUsed: 25,
    usageLimit: 100,
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo2",
    name: "Launch Special: Free Shipping",
    description: "Free shipping on all orders above ZMW 500.",
    type: "free_shipping",
    value: 1, // Represents true for free shipping
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Started 7 days ago
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 7 days
    status: "active",
    applicableTo: "all_products", // Assuming a minimum order value condition handled elsewhere or implied
    timesUsed: 150,
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo3",
    name: "Summer Sale (Scheduled)",
    description: "Get ZMW 100 off on selected summer items.",
    type: "fixed_amount",
    value: 100,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Starts in 5 days
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 15 days
    status: "scheduled",
    applicableTo: "specific_products",
    productIds: ["prod_summer_dress", "prod_sunglasses"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo4",
    name: "Old Flash Sale",
    description: "20% off everything for 24 hours.",
    type: "percentage",
    value: 20,
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    applicableTo: "all_products",
    timesUsed: 200,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function getPromotions(): Promise<Promotion[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Update status based on current date (simple logic for mock)
  const now = new Date()
  MOCK_PROMOTIONS.forEach((promo) => {
    const startDate = new Date(promo.startDate)
    const endDate = new Date(promo.endDate)
    if (promo.status !== "draft") {
      // Keep draft status as is
      if (endDate < now) promo.status = "expired"
      else if (startDate <= now && endDate >= now) promo.status = "active"
      else if (startDate > now) promo.status = "scheduled"
    }
  })
  return JSON.parse(JSON.stringify(MOCK_PROMOTIONS)) // Return a deep copy
}

export async function getPromotionById(id: string): Promise<Promotion | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_PROMOTIONS.find((p) => p.id === id)
}

export type CreatePromotionState = {
  message?: string
  success: boolean
  errors?: Partial<Record<keyof Omit<Promotion, "id" | "createdAt" | "status" | "timesUsed">, string>>
}

export async function createPromotion(
  prevState: CreatePromotionState | undefined,
  formData: FormData,
): Promise<CreatePromotionState> {
  // Basic validation (in a real app, use Zod or similar)
  const name = formData.get("name") as string
  const type = formData.get("type") as PromotionType
  const value = Number.parseFloat(formData.get("value") as string)
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const applicableTo = formData.get("applicableTo") as PromotionApplicability
  const couponCode = formData.get("couponCode") as string | undefined
  const description = formData.get("description") as string | undefined

  const errors: CreatePromotionState["errors"] = {}
  if (!name) errors.name = "Promotion name is required."
  if (!type) errors.type = "Promotion type is required."
  if (isNaN(value) || value < 0) errors.value = "Valid discount value is required."
  if (!startDate) errors.startDate = "Start date is required."
  if (!endDate) errors.endDate = "End date is required."
  if (new Date(endDate) < new Date(startDate)) errors.endDate = "End date cannot be before start date."
  if (!applicableTo) errors.applicableTo = "Applicability is required."

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please correct the errors." }
  }

  const newPromotion: Promotion = {
    id: `promo${Date.now()}`,
    name,
    type,
    value,
    startDate,
    endDate,
    applicableTo,
    couponCode: couponCode || undefined,
    description: description || undefined,
    status: new Date(startDate) > new Date() ? "scheduled" : "active", // Basic status logic
    timesUsed: 0,
    createdAt: new Date().toISOString(),
    // productIds and categoryIds would be handled based on 'applicableTo'
  }

  MOCK_PROMOTIONS.unshift(newPromotion) // Add to the beginning of the array

  revalidatePath("/dashboard/marketing/promotions") // Revalidate the list page
  // Instead of redirecting from action, return success and let client handle it
  // This is better for forms using useActionState to display success messages
  return { success: true, message: "Promotion created successfully!" }
}

// Placeholder for update and delete actions
export async function updatePromotion(id: string, formData: FormData) {
  // ... similar logic to createPromotion ...
  console.log("Updating promotion:", id, formData)
  revalidatePath("/dashboard/marketing/promotions")
  revalidatePath(`/dashboard/marketing/promotions/${id}/edit`)
  redirect("/dashboard/marketing/promotions")
}

export async function deletePromotion(id: string) {
  MOCK_PROMOTIONS = MOCK_PROMOTIONS.filter((p) => p.id !== id)
  console.log("Deleting promotion:", id)
  revalidatePath("/dashboard/marketing/promotions")
  // No redirect needed if called from a button that stays on the page,
  // or handle redirect on client if it's a dedicated delete action page.
}
