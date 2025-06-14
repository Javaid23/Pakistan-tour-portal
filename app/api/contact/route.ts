import { type NextRequest, NextResponse } from "next/server"
import { createContactMessage } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, inquiry_type } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    const result = await createContactMessage({
      name,
      email,
      phone,
      subject,
      message,
      inquiry_type,
    })

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
      id: result.id,
    })
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
