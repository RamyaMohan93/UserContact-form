import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Try both public and non-public names so it "just works" in most setups.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    [
      "Supabase environment variables are missing.",
      "Please add the Supabase integration to your project.",
      "This will automatically provide the required environment variables:",
      "• SUPABASE_URL",
      "• SUPABASE_ANON_KEY",
      "",
      "The integration handles the setup for you - no manual env vars needed!",
    ].join("\n"),
  )
}

// --- Singleton client ----------------------------------------------------
let _client: SupabaseClient | undefined

export const supabase = (() => {
  if (_client) return _client
  _client = createClient(supabaseUrl, supabaseAnonKey)
  return _client
})()

export type Contact = {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone_number?: string
  message: string
  created_at?: string
  updated_at?: string
}
