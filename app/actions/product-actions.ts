"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth-actions"
import { revalidatePath } from "next/cache"

// Mock product data - in a real app, this would come from your database
const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    category: "Electronics",
    price: 299.99,
    stock_quantity: 45,
    status: "active",
    description: "High-quality wireless headphones with noise cancellation",
    brand: "TechSound",
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    sku: "CTS-002",
    category: "Clothing",
    price: 29.99,
    stock_quantity: 120,
    status: "active",
    description: "Comfortable 100% cotton t-shirt",
    brand: "ComfortWear",
  },
  {
    id: "3",
    name: "Smart Watch",
    sku: "SW-003",
    category: "Electronics",
    price: 199.99,
    stock_quantity: 8,
    status: "active",
    description: "Feature-rich smartwatch with health tracking",
    brand: "SmartTech",
  },
]

export interface Product {
  id: string
  retailer_id: string
  name: string
  description?: string
  price: number
  compare_at_price?: number
  category: string
  subcategory?: string
  images: string[]
  inventory_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getProducts(filters?: {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
}): Promise<Product[]> {
  const supabase = createServerClient()

  let query = supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false })

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters?.minPrice) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters?.maxPrice) {
    query = query.lte("price", filters.maxPrice)
  }

  const { data: products, error } = await query

  if (error) {
    throw new Error("Failed to fetch products")
  }

  return products as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.find((product) => product.id === id) || null
}

export async function getRetailerProducts(): Promise<Product[]> {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts
}

export type CreateProductState = {
  message?: string
  success: boolean
  errors?: Partial<Record<keyof Omit<Product, "id" | "created_at" | "updated_at" | "retailer_id">, string>>
}

export async function createProduct(
  prevState: CreateProductState | undefined,
  formData: FormData,
): Promise<CreateProductState> {
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
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const compareAtPrice = formData.get("compareAtPrice")
    ? Number.parseFloat(formData.get("compareAtPrice") as string)
    : undefined
  const category = formData.get("category") as string
  const subcategory = formData.get("subcategory") as string
  const inventoryCount = Number.parseInt(formData.get("inventoryCount") as string)

  // Validation
  const errors: CreateProductState["errors"] = {}
  if (!name) errors.name = "Product name is required."
  if (isNaN(price) || price <= 0) errors.price = "Valid price is required."
  if (!category) errors.category = "Category is required."
  if (isNaN(inventoryCount) || inventoryCount < 0) errors.inventory_count = "Valid inventory count is required."

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please correct the errors." }
  }

  // Insert product
  const { error } = await supabase.from("products").insert({
    retailer_id: retailer.id,
    name,
    description: description || null,
    price,
    compare_at_price: compareAtPrice || null,
    category,
    subcategory: subcategory || null,
    inventory_count: inventoryCount,
    images: ["/placeholder.svg?height=300&width=300"], // Default placeholder
    is_active: true,
  })

  if (error) {
    return { success: false, message: "Failed to create product." }
  }

  revalidatePath("/dashboard/products")
  return { success: true, message: "Product created successfully!" }
}

export async function updateProduct(id: string, formData: FormData) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const compareAtPrice = formData.get("compareAtPrice")
    ? Number.parseFloat(formData.get("compareAtPrice") as string)
    : null
  const category = formData.get("category") as string
  const subcategory = formData.get("subcategory") as string
  const inventoryCount = Number.parseInt(formData.get("inventoryCount") as string)

  const { error } = await supabase
    .from("products")
    .update({
      name,
      description: description || null,
      price,
      compare_at_price: compareAtPrice,
      category,
      subcategory: subcategory || null,
      inventory_count: inventoryCount,
    })
    .eq("id", id)

  if (error) {
    throw new Error("Failed to update product")
  }

  revalidatePath("/dashboard/products")
}

export async function deleteProduct(id: string) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const { error } = await supabase.from("products").update({ is_active: false }).eq("id", id)

  if (error) {
    throw new Error("Failed to delete product")
  }

  revalidatePath("/dashboard/products")
}
