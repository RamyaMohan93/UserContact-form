import { createClient } from "@supabase/supabase-js"

// Only create client if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

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
