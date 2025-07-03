/**
 * Server-side Supabase client that uses the Service-Role key.
 * IMPORTANT:  This file must only be imported from Server Components,
 * Server Actions, or API routes – never from the client bundle.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    [
      "Missing Supabase environment variables.",
      "Ensure the Supabase integration is added so SUPABASE_SERVICE_ROLE_KEY and",
      "SUPABASE_URL are available on the server.",
    ].join("\n"),
  )
}

// Singleton pattern
let _admin: SupabaseClient | undefined
export const supabaseAdmin = (() => {
  if (_admin) return _admin
  _admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }, // no cookies/session on the server
  })
  return _admin
})()
