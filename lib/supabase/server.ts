import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "./types"

export const createServerClient = () => {
  const cookieStore = cookies()

  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

export const createServiceClient = () => {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
