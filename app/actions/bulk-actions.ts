"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth-actions"
import { revalidatePath } from "next/cache"

export async function bulkUpdateProducts(productIds: string[], action: string, value?: string) {
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

  let updateData: any = {}

  switch (action) {
    case "updateStatus":
      updateData = { is_active: value === "active" }
      break
    case "updateCategory":
      updateData = { category: value }
      break
    case "archive":
      updateData = { is_active: false, archived_at: new Date().toISOString() }
      break
    default:
      throw new Error("Invalid action")
  }

  const { error } = await supabase
    .from("products")
    .update(updateData)
    .in("id", productIds)
    .eq("retailer_id", retailer.id)

  if (error) {
    throw new Error(`Failed to ${action} products`)
  }

  revalidatePath("/dashboard/products")
  return { success: true, message: `Successfully updated ${productIds.length} products` }
}

export async function bulkUpdateOrders(orderIds: string[], action: string, value?: string) {
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

  let updateData: any = {}

  switch (action) {
    case "updateStatus":
      updateData = {
        status: value,
        updated_at: new Date().toISOString(),
      }
      break
    case "cancel":
      updateData = {
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      break
    case "sendNotification":
      // In a real app, this would trigger email notifications
      updateData = {
        notification_sent: true,
        updated_at: new Date().toISOString(),
      }
      break
    default:
      throw new Error("Invalid action")
  }

  const { error } = await supabase.from("orders").update(updateData).in("id", orderIds).eq("retailer_id", retailer.id)

  if (error) {
    throw new Error(`Failed to ${action} orders`)
  }

  // If sending notifications, also log the activity
  if (action === "sendNotification") {
    await supabase.from("order_notifications").insert(
      orderIds.map((orderId) => ({
        order_id: orderId,
        type: "status_update",
        sent_at: new Date().toISOString(),
      })),
    )
  }

  revalidatePath("/dashboard/orders")
  return { success: true, message: `Successfully updated ${orderIds.length} orders` }
}

export async function bulkUpdateCustomers(customerIds: string[], action: string, value?: string) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  const supabase = createServerClient()

  let updateData: any = {}

  switch (action) {
    case "updateStatus":
      updateData = {
        status: value,
        updated_at: new Date().toISOString(),
      }
      break
    case "archive":
      updateData = {
        archived: true,
        archived_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      break
    case "sendEmail":
      // In a real app, this would trigger email campaigns
      updateData = {
        last_email_sent: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      break
    default:
      throw new Error("Invalid action")
  }

  const { error } = await supabase.from("customers").update(updateData).in("id", customerIds)

  if (error) {
    throw new Error(`Failed to ${action} customers`)
  }

  // If sending emails, log the activity
  if (action === "sendEmail") {
    await supabase.from("customer_communications").insert(
      customerIds.map((customerId) => ({
        customer_id: customerId,
        type: "bulk_email",
        sent_at: new Date().toISOString(),
        retailer_id: user.id,
      })),
    )
  }

  revalidatePath("/dashboard/customers")
  return { success: true, message: `Successfully updated ${customerIds.length} customers` }
}

export async function exportData(type: "products" | "orders" | "customers", ids?: string[]) {
  const user = await getCurrentUser()
  if (!user || user.role !== "RETAILER") {
    throw new Error("Unauthorized")
  }

  // In a real app, this would generate and return a CSV/Excel file
  // For now, we'll simulate the export process
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const timestamp = new Date().toISOString().split("T")[0]
  const filename = `${type}_export_${timestamp}.csv`

  return {
    success: true,
    message: `Export completed: ${filename}`,
    downloadUrl: `/api/exports/${filename}`, // This would be a real download URL
  }
}
