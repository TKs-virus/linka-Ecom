"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth-actions"
import { revalidatePath } from "next/cache"

export interface Order {
  id: string
  customer_id: string
  retailer_id: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  total_amount: number
  delivery_fee: number
  tax_amount: number
  discount_amount: number
  delivery_address: any
  payment_method: string
  payment_status: "pending" | "paid" | "failed" | "refunded"
  notes?: string
  estimated_delivery?: string
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  product?: {
    name: string
    images: string[]
  }
}

export async function getCustomerOrders(): Promise<Order[]> {
  const user = await getCurrentUser()
  if (!user || user.role !== "CUSTOMER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          images
        )
      )
    `)
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch orders")
  }

  return orders.map((order) => ({
    ...order,
    order_items: order.order_items?.map((item: any) => ({
      ...item,
      product: item.products,
    })),
  })) as Order[]
}

export async function getRetailerOrders(): Promise<Order[]> {
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

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          images
        )
      ),
      users!orders_customer_id_fkey (
        first_name,
        last_name,
        email
      )
    `)
    .eq("retailer_id", retailer.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch orders")
  }

  return orders.map((order) => ({
    ...order,
    order_items: order.order_items?.map((item: any) => ({
      ...item,
      product: item.products,
    })),
    customer: order.users,
  })) as Order[]
}

export async function getOrderById(id: string): Promise<Order | null> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  let query = supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          images
        )
      )
    `)
    .eq("id", id)

  // Filter by user role
  if (user.role === "CUSTOMER") {
    query = query.eq("customer_id", user.id)
  } else if (user.role === "RETAILER") {
    // Get retailer profile first
    const { data: retailer } = await supabase.from("retailers").select("id").eq("user_id", user.id).single()

    if (!retailer) {
      throw new Error("Retailer profile not found")
    }

    query = query.eq("retailer_id", retailer.id)
  }

  const { data: order, error } = await query.single()

  if (error || !order) {
    return null
  }

  return {
    ...order,
    order_items: order.order_items?.map((item: any) => ({
      ...item,
      product: item.products,
    })),
  } as Order
}

export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId)

  if (error) {
    throw new Error("Failed to update order status")
  }

  revalidatePath("/dashboard/orders")
  revalidatePath(`/dashboard/orders/${orderId}`)
}

export async function createOrder(orderData: {
  retailer_id: string
  items: { product_id: string; quantity: number; unit_price: number }[]
  delivery_address: any
  payment_method: string
  notes?: string
}) {
  const user = await getCurrentUser()
  if (!user || user.role !== "CUSTOMER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  // Calculate totals
  const subtotal = orderData.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
  const deliveryFee = 25.0 // Fixed delivery fee for now
  const taxAmount = subtotal * 0.15 // 15% tax
  const totalAmount = subtotal + deliveryFee + taxAmount

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: user.id,
      retailer_id: orderData.retailer_id,
      total_amount: totalAmount,
      delivery_fee: deliveryFee,
      tax_amount: taxAmount,
      discount_amount: 0,
      delivery_address: orderData.delivery_address,
      payment_method: orderData.payment_method,
      payment_status: "pending",
      notes: orderData.notes || null,
      estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    })
    .select()
    .single()

  if (orderError || !order) {
    throw new Error("Failed to create order")
  }

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.unit_price * item.quantity,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    throw new Error("Failed to create order items")
  }

  revalidatePath("/orders")
  return order
}
