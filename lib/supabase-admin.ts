/**
 * Server-side Supabase client.
 *
 * •  Uses the Service-Role key when it’s available
 * •  Falls back to the anon key otherwise
 * •  NEVER ships a secret to the browser
 */
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null
