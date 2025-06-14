import { type NextRequest, NextResponse } from "next/server"
import { getDestinations } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const category = searchParams.get("category") || undefined
    const difficulty = searchParams.get("difficulty") || undefined

    const destinations = await getDestinations({
      search,
      category,
      difficulty,
    })

    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}
