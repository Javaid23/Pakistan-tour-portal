"use server"

import { createContactMessage } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const inquiry_type = formData.get("inquiry_type") as string

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Name, email, and message are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    await createContactMessage({
      name,
      email,
      phone: phone || undefined,
      subject: subject || undefined,
      message,
      inquiry_type: inquiry_type || undefined,
    })

    revalidatePath("/contact")

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    }
  }
}
