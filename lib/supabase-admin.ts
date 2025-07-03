/**
 * Server-side Supabase client.
 *
 * •  Uses the Service-Role key when it’s available
 * •  Falls back to the anon key otherwise
 * •  NEVER ships a secret to the browser
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

function clean(v?: string) {
  // Trim whitespace that sometimes slips into env vars
  return v?.trim() || undefined
}

const supabaseUrl = clean(process.env.SUPABASE_URL) ?? clean(process.env.NEXT_PUBLIC_SUPABASE_URL)

const serviceKey = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)
const anonKey = clean(process.env.SUPABASE_ANON_KEY) ?? clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const apiKey = serviceKey && serviceKey !== "YOUR_SERVICE_ROLE_KEY" ? serviceKey : anonKey

if (!supabaseUrl || !apiKey) {
  throw new Error(
    [
      "Supabase environment variables are missing or incorrect.",
      "",
      "Required on the server:",
      "   • SUPABASE_URL  (or NEXT_PUBLIC_SUPABASE_URL)",
      "   • SUPABASE_SERVICE_ROLE_KEY  – preferred, but falls back to anon key",
      "",
      "Fix:",
      "   • Add the Supabase integration in Vercel (recommended), or",
      "   • Create a `.env.local` with the two variables above.",
    ].join("\n"),
  )
}

/* ─── Singleton ─────────────────────────────────────────────────────────── */
let _client: SupabaseClient | undefined
export const supabaseAdmin = (() => {
  if (_client) return _client
  _client = createClient(supabaseUrl, apiKey, {
    auth: { persistSession: false },
  })
  return _client
})()
