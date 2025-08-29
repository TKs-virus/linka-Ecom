import { createBrowserClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey)

let client: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!client) {
    client = createClient()
  }
  return client
}
