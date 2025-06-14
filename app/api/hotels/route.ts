import { type NextRequest, NextResponse } from "next/server"
import { getHotels } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const location = searchParams.get("location") || undefined
    const category = searchParams.get("category") || undefined

    const hotels = await getHotels({
      search,
      location,
      category,
    })

    return NextResponse.json(hotels)
  } catch (error) {
    console.error("Error fetching hotels:", error)
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 })
  }
}
