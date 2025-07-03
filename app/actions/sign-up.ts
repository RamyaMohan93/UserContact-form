"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

type ActionResult = { success: true; message: string } | { success: false; error: string; details?: string }

export async function submitSignUp(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  // Check if Supabase client is configured
  if (!supabaseAdmin) {
    return {
      success: false,
      error: "Database connection not configured. Please add Supabase environment variables.",
    }
  }

  const f = (k: string) => {
    const v = formData.get(k)
    return typeof v === "string" ? v.trim() : ""
  }

  // Get all selected challenges
  const challenges = formData.getAll("challenges").filter((c) => typeof c === "string") as string[]

  const signUp = {
    name: f("name"),
    country_code: f("countryCode"),
    phone: f("phone"),
    email: f("email").toLowerCase(),
    challenges: challenges.join(", "),
    stay_in_loop: formData.get("stayInLoop") === "yes",
    subject: f("subject"),
  }

  /* ---------- Validation ---------- */
  if (!signUp.name || !signUp.email || !signUp.subject) {
    return { success: false, error: "Please fill in all required fields (Name, Email, Subject)." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUp.email)) {
    return { success: false, error: "Please enter a valid email address." }
  }
  if (challenges.length === 0) {
    return { success: false, error: "Please select at least one learning challenge." }
  }

  /* ---------- Store in Database ---------- */
  try {
    const { data, error } = await supabaseAdmin.from("signups").insert(signUp).select()

    if (error) {
      console.error("Supabase insert error:", error)
      return {
        success: false,
        error: `Database error: ${error.message}`,
        details: error.details || error.hint,
      }
    }

    console.log("Successfully inserted sign-up:", data)
  } catch (e: any) {
    console.error("Unexpected error:", e)
    return {
      success: false,
      error: "An unexpected error occurred while saving your sign-up.",
      details: e.message,
    }
  }

  revalidatePath("/sign-up")
  return {
    success: true,
    message: "🎉 Thank you for signing up! We'll be in touch soon with updates about CortexCatalyst.",
  }
}
