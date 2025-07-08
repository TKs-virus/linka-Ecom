import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Test connection function
export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count").limit(1)
    if (error) {
      console.error("Database connection error:", error)
      return { success: false, error: error.message }
    }
    console.log("Database connection successful")
    return { success: true, data }
  } catch (err) {
    console.error("Database connection failed:", err)
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
}
