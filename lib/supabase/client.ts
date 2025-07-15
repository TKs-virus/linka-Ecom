import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error("Invalid NEXT_PUBLIC_SUPABASE_URL format")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "X-Client-Info": "linka-app",
    },
  },
})

// Test connection function with detailed error reporting
export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection...")
    console.log("Supabase URL:", supabaseUrl)
    console.log("Anon Key (first 10 chars):", supabaseAnonKey?.substring(0, 10) + "...")

    // Test basic connection
    const { data, error, status, statusText } = await supabase.from("users").select("count").limit(1)

    console.log("Connection test response:", { data, error, status, statusText })

    if (error) {
      console.error("Database connection error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      return {
        success: false,
        error: error.message,
        details: {
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
      }
    }

    console.log("Database connection successful")
    return { success: true, data }
  } catch (err) {
    console.error("Database connection failed with exception:", err)
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
      details: err,
    }
  }
}

// Test authentication
export async function testAuth() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    console.log("Auth session test:", { session: !!session, error })
    return { success: !error, session, error }
  } catch (err) {
    console.error("Auth test failed:", err)
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
}
