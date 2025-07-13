"use server"

import { createServerClient } from "@/lib/supabase/server"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  retailer_id: string
  retailer_name?: string
  stock_quantity: number
  is_active: boolean
  type: "product" | "service"
  created_at: string
  updated_at: string
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  type?: "product" | "service" | "all"
  retailerId?: string
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  try {
    const supabase = createServerClient()

    let query = supabase
      .from("products")
      .select(`
        *,
        retailers!inner(
          business_name
        )
      `)
      .eq("is_active", true)

    // Apply filters
    if (filters.category) {
      query = query.eq("category", filters.category)
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters.minPrice) {
      query = query.gte("price", filters.minPrice)
    }

    if (filters.maxPrice) {
      query = query.lte("price", filters.maxPrice)
    }

    if (filters.type && filters.type !== "all") {
      query = query.eq("type", filters.type)
    }

    if (filters.retailerId) {
      query = query.eq("retailer_id", filters.retailerId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    // Transform the data to include retailer name
    const products =
      data?.map((item: any) => ({
        ...item,
        retailer_name: item.retailers?.business_name || "Unknown Retailer",
      })) || []

    return products
  } catch (error) {
    console.error("Error in getProducts:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        retailers!inner(
          business_name
        )
      `)
      .eq("id", id)
      .eq("is_active", true)
      .single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return {
      ...data,
      retailer_name: data.retailers?.business_name || "Unknown Retailer",
    }
  } catch (error) {
    console.error("Error in getProductById:", error)
    return null
  }
}

export async function getProductCategories(): Promise<string[]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("products").select("category").eq("is_active", true)

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    // Get unique categories
    const categories = [...new Set(data?.map((item) => item.category).filter(Boolean))] || []
    return categories
  } catch (error) {
    console.error("Error in getProductCategories:", error)
    return []
  }
}
