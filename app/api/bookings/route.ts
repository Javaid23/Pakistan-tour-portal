import { type NextRequest, NextResponse } from "next/server"
import { createBooking } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customer_name,
      customer_email,
      customer_phone,
      booking_type,
      entity_id,
      check_in_date,
      check_out_date,
      guests,
      total_amount,
      special_requests,
    } = body

    // Validate required fields
    if (!customer_name || !customer_email || !booking_type || !entity_id) {
      return NextResponse.json(
        { error: "Customer name, email, booking type, and entity ID are required" },
        { status: 400 },
      )
    }

    const result = await createBooking({
      customer_name,
      customer_email,
      customer_phone,
      booking_type,
      entity_id,
      check_in_date,
      check_out_date,
      guests,
      total_amount,
      special_requests,
    })

    return NextResponse.json({
      success: true,
      message: "Booking created successfully!",
      booking_id: result.id,
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
