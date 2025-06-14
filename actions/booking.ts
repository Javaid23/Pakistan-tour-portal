"use server"

import { createBooking } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createHotelBooking(formData: FormData) {
  try {
    const customer_name = formData.get("customer_name") as string
    const customer_email = formData.get("customer_email") as string
    const customer_phone = formData.get("customer_phone") as string
    const hotel_id = Number.parseInt(formData.get("hotel_id") as string)
    const check_in_date = formData.get("check_in_date") as string
    const check_out_date = formData.get("check_out_date") as string
    const guests = Number.parseInt(formData.get("guests") as string) || 1
    const special_requests = formData.get("special_requests") as string

    // Validate required fields
    if (!customer_name || !customer_email || !hotel_id || !check_in_date || !check_out_date) {
      return {
        success: false,
        error: "All required fields must be filled",
      }
    }

    // Validate dates
    const checkIn = new Date(check_in_date)
    const checkOut = new Date(check_out_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkIn < today) {
      return {
        success: false,
        error: "Check-in date cannot be in the past",
      }
    }

    if (checkOut <= checkIn) {
      return {
        success: false,
        error: "Check-out date must be after check-in date",
      }
    }

    const result = await createBooking({
      customer_name,
      customer_email,
      customer_phone: customer_phone || undefined,
      booking_type: "hotel",
      entity_id: hotel_id,
      check_in_date,
      check_out_date,
      guests,
      special_requests: special_requests || undefined,
    })

    revalidatePath("/hotels")

    return {
      success: true,
      message: "Hotel booking request submitted successfully! We'll confirm your reservation within 24 hours.",
      booking_id: result.id,
    }
  } catch (error) {
    console.error("Error creating hotel booking:", error)
    return {
      success: false,
      error: "Failed to create booking. Please try again.",
    }
  }
}

export async function createGuideBooking(formData: FormData) {
  try {
    const customer_name = formData.get("customer_name") as string
    const customer_email = formData.get("customer_email") as string
    const customer_phone = formData.get("customer_phone") as string
    const guide_id = Number.parseInt(formData.get("guide_id") as string)
    const service_date = formData.get("service_date") as string
    const duration_days = Number.parseInt(formData.get("duration_days") as string) || 1
    const group_size = Number.parseInt(formData.get("group_size") as string) || 1
    const special_requests = formData.get("special_requests") as string

    // Validate required fields
    if (!customer_name || !customer_email || !guide_id || !service_date) {
      return {
        success: false,
        error: "All required fields must be filled",
      }
    }

    const result = await createBooking({
      customer_name,
      customer_email,
      customer_phone: customer_phone || undefined,
      booking_type: "guide",
      entity_id: guide_id,
      check_in_date: service_date,
      guests: group_size,
      special_requests: special_requests || undefined,
    })

    revalidatePath("/partners")

    return {
      success: true,
      message: "Guide booking request submitted successfully! The guide will contact you within 24 hours.",
      booking_id: result.id,
    }
  } catch (error) {
    console.error("Error creating guide booking:", error)
    return {
      success: false,
      error: "Failed to create booking. Please try again.",
    }
  }
}
