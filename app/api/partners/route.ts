import { type NextRequest, NextResponse } from "next/server"
import { getTravelPartners } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const location = searchParams.get("location") || undefined
    const specialty = searchParams.get("specialty") || undefined

    const partners = await getTravelPartners({
      search,
      location,
      specialty,
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error("Error fetching travel partners:", error)
    return NextResponse.json({ error: "Failed to fetch travel partners" }, { status: 500 })
  }
}
