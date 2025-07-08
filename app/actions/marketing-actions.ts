"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "./auth-actions"

export type PromotionStatus = "active" | "scheduled" | "expired" | "draft"
export type PromotionType = "percentage" | "fixed_amount" | "free_shipping"
export type PromotionApplicability = "all_products" | "specific_products" | "specific_categories"

export interface Promotion {
  id: string
  retailer_id: string
  name: string
  description?: string
  type: PromotionType
  value: number
  coupon_code?: string
  start_date: string
  end_date: string
  status: PromotionStatus
  applicable_to: PromotionApplicability
  product_ids?: string[]
  category_ids?: string[]
  usage_limit?: number
  times_used?: number
  created_at: string
  updated_at: string
}

export async function getPromotions(): Promise<Promotion[]> {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  // Get retailer profile
  const { data: retailer } = await supabase.from("retailers").select("id").eq("user_id", user.id).single()

  if (!retailer) {
    throw new Error("Retailer profile not found")
  }

  const { data: promotions, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("retailer_id", retailer.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch promotions")
  }

  // Update status based on current date
  const now = new Date()
  const updatedPromotions = promotions.map((promo) => {
    const startDate = new Date(promo.start_date)
    const endDate = new Date(promo.end_date)

    let status = promo.status
    if (promo.status !== "draft") {
      if (endDate < now) status = "expired"
      else if (startDate <= now && endDate >= now) status = "active"
      else if (startDate > now) status = "scheduled"
    }

    return {
      ...promo,
      status,
      product_ids: promo.product_ids || [],
      category_ids: promo.category_ids || [],
    }
  })

  return updatedPromotions as Promotion[]
}

export async function getPromotionById(id: string): Promise<Promotion | undefined> {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const { data: promotion, error } = await supabase.from("promotions").select("*").eq("id", id).single()

  if (error || !promotion) {
    return undefined
  }

  return {
    ...promotion,
    product_ids: promotion.product_ids || [],
    category_ids: promotion.category_ids || [],
  } as Promotion
}

export type CreatePromotionState = {
  message?: string
  success: boolean
  errors?: Partial<
    Record<keyof Omit<Promotion, "id" | "created_at" | "updated_at" | "retailer_id" | "status" | "times_used">, string>
  >
}

export async function createPromotion(
  prevState: CreatePromotionState | undefined,
  formData: FormData,
): Promise<CreatePromotionState> {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    return { success: false, message: "Unauthorized" }
  }

  const supabase = createServerClient()

  // Get retailer profile
  const { data: retailer } = await supabase.from("retailers").select("id").eq("user_id", user.id).single()

  if (!retailer) {
    return { success: false, message: "Retailer profile not found" }
  }

  // Extract form data
  const name = formData.get("name") as string
  const type = formData.get("type") as PromotionType
  const value = Number.parseFloat(formData.get("value") as string)
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const applicableTo = formData.get("applicableTo") as PromotionApplicability
  const couponCode = formData.get("couponCode") as string | undefined
  const description = formData.get("description") as string | undefined

  // Validation
  const errors: CreatePromotionState["errors"] = {}
  if (!name) errors.name = "Promotion name is required."
  if (!type) errors.type = "Promotion type is required."
  if (isNaN(value) || value < 0) errors.value = "Valid discount value is required."
  if (!startDate) errors.start_date = "Start date is required."
  if (!endDate) errors.end_date = "End date is required."
  if (new Date(endDate) < new Date(startDate)) errors.end_date = "End date cannot be before start date."
  if (!applicableTo) errors.applicable_to = "Applicability is required."

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please correct the errors." }
  }

  // Insert promotion
  const { error } = await supabase.from("promotions").insert({
    retailer_id: retailer.id,
    name,
    type,
    value,
    start_date: startDate,
    end_date: endDate,
    applicable_to: applicableTo,
    coupon_code: couponCode || null,
    description: description || null,
    status: new Date(startDate) > new Date() ? "scheduled" : "active",
    times_used: 0,
  })

  if (error) {
    return { success: false, message: "Failed to create promotion." }
  }

  revalidatePath("/dashboard/marketing/promotions")
  return { success: true, message: "Promotion created successfully!" }
}

export async function updatePromotion(id: string, formData: FormData) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const name = formData.get("name") as string
  const type = formData.get("type") as PromotionType
  const value = Number.parseFloat(formData.get("value") as string)
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const applicableTo = formData.get("applicableTo") as PromotionApplicability
  const couponCode = formData.get("couponCode") as string | undefined
  const description = formData.get("description") as string | undefined

  const { error } = await supabase
    .from("promotions")
    .update({
      name,
      type,
      value,
      start_date: startDate,
      end_date: endDate,
      applicable_to: applicableTo,
      coupon_code: couponCode || null,
      description: description || null,
    })
    .eq("id", id)

  if (error) {
    throw new Error("Failed to update promotion")
  }

  revalidatePath("/dashboard/marketing/promotions")
  revalidatePath(`/dashboard/marketing/promotions/${id}/edit`)
}

export async function deletePromotion(id: string) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const { error } = await supabase.from("promotions").delete().eq("id", id)

  if (error) {
    throw new Error("Failed to delete promotion")
  }

  revalidatePath("/dashboard/marketing/promotions")
}
