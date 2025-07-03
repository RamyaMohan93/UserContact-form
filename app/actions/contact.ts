"use server"

import { supabaseAdmin as supabase } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

type ActionResult = { success: true; message: string } | { success: false; error: string; details?: string }

export async function submitContact(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const f = (k: string) => {
    const v = formData.get(k)
    return typeof v === "string" ? v.trim() : ""
  }

  const contact = {
    first_name: f("firstName"),
    last_name: f("lastName"),
    email: f("email").toLowerCase(),
    phone_number: f("phoneNumber") || null,
    message: f("message"),
  }

  /* ---------- Validation ---------- */
  if (!contact.first_name || !contact.last_name || !contact.email || !contact.message) {
    return { success: false, error: "Please fill in all required fields." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  /* ---------- Insert ---------- */
  try {
    await supabase.from("contacts").insert(contact).throwOnError()
  } catch (e: any) {
    // PostgrestError fields are non-enumerable; pull them out explicitly
    const msg = e?.message || "Insert blocked (likely RLS - see console)"
    const det = e?.details
    console.error("Supabase insert error →", { message: msg, details: det })
    return { success: false, error: msg, details: det }
  }

  revalidatePath("/contact")
  return { success: true, message: "Thank you for your message! We'll get back to you soon." }
}
