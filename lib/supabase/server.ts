import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "./types"

export const createServerClient = () => {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables:", {
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
    })
    throw new Error("Missing Supabase environment variables")
  }

  // Validate URL format
  try {
    new URL(supabaseUrl)
  } catch (error) {
    console.error("Invalid Supabase URL format:", supabaseUrl)
    throw new Error("Invalid NEXT_PUBLIC_SUPABASE_URL format")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        const cookie = cookieStore.get(name)
        console.log(`Getting cookie ${name}:`, cookie?.value ? "present" : "missing")
        return cookie?.value
      },
      set(name: string, value: string, options: any) {
        try {
          console.log(`Setting cookie ${name}`)
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          console.error("Error setting cookie:", error)
        }
      },
      remove(name: string, options: any) {
        try {
          console.log(`Removing cookie ${name}`)
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          console.error("Error removing cookie:", error)
        }
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        "X-Client-Info": "linka-server",
      },
    },
  })
}

export const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase service role environment variables:", {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!serviceRoleKey,
    })
    throw new Error("Missing Supabase service role environment variables")
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "X-Client-Info": "linka-service",
      },
    },
  })
}

// Server-side connection test
export async function testServerConnection() {
  try {
    console.log("Testing server-side database connection...")
    const supabase = createServerClient()

    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      console.error("Server connection error:", error)
      return { success: false, error: error.message }
    }

    console.log("Server connection successful")
    return { success: true, data }
  } catch (err) {
    console.error("Server connection test failed:", err)
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
}
