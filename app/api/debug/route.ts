import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Test various database operations
    const tests = {
      users: null as any,
      products: null as any,
      orders: null as any,
      retailers: null as any,
    }

    // Test users table
    try {
      const { data: users, error: usersError } = await supabase.from("users").select("id, email, role").limit(5)

      tests.users = usersError ? { error: usersError.message } : { count: users?.length || 0 }
    } catch (err) {
      tests.users = { error: err instanceof Error ? err.message : "Unknown error" }
    }

    // Test products table
    try {
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, price")
        .limit(5)

      tests.products = productsError ? { error: productsError.message } : { count: products?.length || 0 }
    } catch (err) {
      tests.products = { error: err instanceof Error ? err.message : "Unknown error" }
    }

    // Test orders table
    try {
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("id, status, total_amount")
        .limit(5)

      tests.orders = ordersError ? { error: ordersError.message } : { count: orders?.length || 0 }
    } catch (err) {
      tests.orders = { error: err instanceof Error ? err.message : "Unknown error" }
    }

    // Test retailers table
    try {
      const { data: retailers, error: retailersError } = await supabase
        .from("retailers")
        .select("id, business_name")
        .limit(5)

      tests.retailers = retailersError ? { error: retailersError.message } : { count: retailers?.length || 0 }
    } catch (err) {
      tests.retailers = { error: err instanceof Error ? err.message : "Unknown error" }
    }

    return NextResponse.json({
      status: "debug",
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
        SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing",
      },
      database_tests: tests,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Debug check failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
