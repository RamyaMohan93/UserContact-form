"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import { sendContactEmail } from "@/lib/email"
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

  /* ---------- Store in Database ---------- */
  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from("contacts").insert(contact).throwOnError()
    } catch (e: any) {
      console.error("Supabase insert error →", { message: e?.message, details: e?.details })
      // Continue with email sending even if database fails
    }
  }

  /* ---------- Send Email ---------- */
  const emailResult = await sendContactEmail({
    firstName: contact.first_name,
    lastName: contact.last_name,
    email: contact.email,
    phoneNumber: contact.phone_number || undefined,
    message: contact.message,
  })

  if (!emailResult.success) {
    return {
      success: false,
      error: "Failed to send email notification",
      details: emailResult.error,
    }
  }

  revalidatePath("/contact")
  return {
    success: true,
    message: "Thank you for your message! We've received your submission and will get back to you soon.",
  }
}
