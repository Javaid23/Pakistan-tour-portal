import { neon } from "@neondatabase/serverless"

// Make database connection optional for development/preview
let sql: any = null

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL)
} else {
  console.warn("DATABASE_URL not set - using fallback data")
}

// Fallback data when database is not available
const fallbackDestinations = [
  {
    id: 1,
    name: "Hunza Valley",
    location: "Gilgit-Baltistan",
    category: "Mountain",
    rating: 4.9,
    reviews_count: 234,
    image_url: "/placeholder.svg?height=300&width=400",
    description: "A breathtaking valley surrounded by towering peaks, ancient forts, and apricot orchards.",
    highlights: ["Baltit Fort", "Attabad Lake", "Rakaposhi View", "Local Culture"],
    best_time: "April - October",
    difficulty: "Moderate",
  },
  {
    id: 2,
    name: "Lahore",
    location: "Punjab",
    category: "Cultural",
    rating: 4.7,
    reviews_count: 456,
    image_url: "/placeholder.svg?height=300&width=400",
    description: "The cultural heart of Pakistan with magnificent Mughal architecture and vibrant street life.",
    highlights: ["Badshahi Mosque", "Lahore Fort", "Food Street", "Shalimar Gardens"],
    best_time: "October - March",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Skardu",
    location: "Gilgit-Baltistan",
    category: "Adventure",
    rating: 4.8,
    reviews_count: 189,
    image_url: "/placeholder.svg?height=300&width=400",
    description: "Gateway to K2 and base camp for some of the world's highest peaks.",
    highlights: ["K2 Base Camp", "Shangrila Resort", "Deosai Plains", "Satpara Lake"],
    best_time: "May - September",
    difficulty: "Challenging",
  },
]

const fallbackPartners = [
  {
    id: 1,
    name: "Ahmad Khan",
    title: "Mountain Guide & Trekking Expert",
    location: "Hunza Valley",
    rating: 4.9,
    reviews_count: 127,
    experience: "8 years",
    languages: ["English", "Urdu", "Burushaski"],
    specialties: ["Mountain Trekking", "Cultural Tours", "Photography"],
    avatar_url: "/placeholder.svg?height=100&width=100",
    description: "Experienced mountain guide specializing in Karakoram range expeditions and cultural immersion tours.",
    price_range: "$50-80/day",
    verified: true,
    phone: "+92 300 1234567",
    email: "ahmad@example.com",
  },
  {
    id: 2,
    name: "Fatima Ali",
    title: "Cultural Heritage Specialist",
    location: "Lahore",
    rating: 4.8,
    reviews_count: 89,
    experience: "6 years",
    languages: ["English", "Urdu", "Punjabi"],
    specialties: ["Historical Tours", "Food Tours", "Art & Culture"],
    avatar_url: "/placeholder.svg?height=100&width=100",
    description:
      "Passionate about sharing Pakistan's rich cultural heritage through immersive historical and culinary experiences.",
    price_range: "$40-60/day",
    verified: true,
    phone: "+92 300 2345678",
    email: "fatima@example.com",
  },
]

const fallbackHotels = [
  {
    id: 1,
    name: "Hunza Serena Inn",
    location: "Hunza Valley",
    category: "Luxury",
    rating: 4.8,
    reviews_count: 234,
    price_range: "$120-180",
    image_url: "/placeholder.svg?height=300&width=400",
    description: "Luxury resort with stunning mountain views and traditional architecture.",
    amenities: ["Free WiFi", "Restaurant", "Spa", "Mountain Views", "Room Service"],
    features: ["24/7 Reception", "Airport Shuttle", "Laundry Service"],
    phone: "+92 5813 457001",
    email: "hunza@serena.com.pk",
  },
  {
    id: 2,
    name: "Pearl Continental Lahore",
    location: "Lahore",
    category: "Luxury",
    rating: 4.6,
    reviews_count: 456,
    price_range: "$90-140",
    image_url: "/placeholder.svg?height=300&width=400",
    description: "Premier hotel in the heart of Lahore with modern amenities and excellent service.",
    amenities: ["Free WiFi", "Pool", "Gym", "Multiple Restaurants", "Business Center"],
    features: ["Valet Parking", "Concierge", "Conference Rooms"],
    phone: "+92 42 111 505 505",
    email: "pc.lahore@pchotels.com",
  },
  {
    id: 3,
    name: "Shangrila Resort Skardu",
    location: "Skardu",
    category: "Resort",
    rating: 4.7,
    reviews_count: 189,
    price_range: "$80-120",
    image_url: "/placeholder.svg?height=300&width=400",
    description: "Beautiful lakeside resort known as 'Heaven on Earth' with breathtaking scenery.",
    amenities: ["Lake Views", "Restaurant", "Boating", "Garden", "Room Service"],
    features: ["Lake Activities", "Mountain Trekking", "Cultural Tours"],
    phone: "+92 5815 460523",
    email: "info@shangrilaresorts.com",
  },
]

// Database query functions with fallbacks
export async function getDestinations(filters?: {
  search?: string
  category?: string
  difficulty?: string
}) {
  if (!sql) {
    // Return filtered fallback data
    let filtered = fallbackDestinations

    if (filters?.search) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          d.location.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    if (filters?.category && filters.category !== "all") {
      filtered = filtered.filter((d) => d.category.toLowerCase() === filters.category!.toLowerCase())
    }

    if (filters?.difficulty && filters.difficulty !== "all") {
      filtered = filtered.filter((d) => d.difficulty.toLowerCase() === filters.difficulty!.toLowerCase())
    }

    return filtered
  }

  let query = `
    SELECT * FROM destinations 
    WHERE 1=1
  `
  const params: any[] = []

  if (filters?.search) {
    query += ` AND (name ILIKE $${params.length + 1} OR location ILIKE $${params.length + 1})`
    params.push(`%${filters.search}%`)
  }

  if (filters?.category && filters.category !== "all") {
    query += ` AND category ILIKE $${params.length + 1}`
    params.push(filters.category)
  }

  if (filters?.difficulty && filters.difficulty !== "all") {
    query += ` AND difficulty ILIKE $${params.length + 1}`
    params.push(filters.difficulty)
  }

  query += ` ORDER BY rating DESC, reviews_count DESC`

  return await sql(query, params)
}

export async function getTravelPartners(filters?: {
  search?: string
  location?: string
  specialty?: string
}) {
  if (!sql) {
    // Return filtered fallback data
    let filtered = fallbackPartners

    if (filters?.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          p.title.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    if (filters?.location && filters.location !== "all") {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters?.specialty && filters.specialty !== "all") {
      filtered = filtered.filter((p) =>
        p.specialties.some((s) => s.toLowerCase().includes(filters.specialty!.toLowerCase())),
      )
    }

    return filtered
  }

  let query = `
    SELECT * FROM travel_partners 
    WHERE 1=1
  `
  const params: any[] = []

  if (filters?.search) {
    query += ` AND (name ILIKE $${params.length + 1} OR title ILIKE $${params.length + 1})`
    params.push(`%${filters.search}%`)
  }

  if (filters?.location && filters.location !== "all") {
    query += ` AND location ILIKE $${params.length + 1}`
    params.push(`%${filters.location}%`)
  }

  if (filters?.specialty && filters.specialty !== "all") {
    query += ` AND $${params.length + 1} = ANY(specialties)`
    params.push(filters.specialty)
  }

  query += ` ORDER BY rating DESC, reviews_count DESC`

  return await sql(query, params)
}

export async function getHotels(filters?: {
  search?: string
  location?: string
  category?: string
}) {
  if (!sql) {
    // Return filtered fallback data
    let filtered = fallbackHotels

    if (filters?.search) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          h.location.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    if (filters?.location && filters.location !== "all") {
      filtered = filtered.filter((h) => h.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters?.category && filters.category !== "all") {
      filtered = filtered.filter((h) => h.category.toLowerCase() === filters.category!.toLowerCase())
    }

    return filtered
  }

  let query = `
    SELECT * FROM hotels 
    WHERE 1=1
  `
  const params: any[] = []

  if (filters?.search) {
    query += ` AND (name ILIKE $${params.length + 1} OR location ILIKE $${params.length + 1})`
    params.push(`%${filters.search}%`)
  }

  if (filters?.location && filters.location !== "all") {
    query += ` AND location ILIKE $${params.length + 1}`
    params.push(`%${filters.location}%`)
  }

  if (filters?.category && filters.category !== "all") {
    query += ` AND category ILIKE $${params.length + 1}`
    params.push(filters.category)
  }

  query += ` ORDER BY rating DESC, reviews_count DESC`

  return await sql(query, params)
}

export async function createContactMessage(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  inquiry_type?: string
}) {
  if (!sql) {
    // Return mock success for fallback
    console.log("Contact message (fallback):", data)
    return { id: Math.floor(Math.random() * 1000) }
  }

  const result = await sql`
    INSERT INTO contact_messages (name, email, phone, subject, message, inquiry_type)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.subject || null}, ${data.message}, ${data.inquiry_type || null})
    RETURNING id
  `
  return result[0]
}

export async function createBooking(data: {
  customer_name: string
  customer_email: string
  customer_phone?: string
  booking_type: string
  entity_id: number
  check_in_date?: string
  check_out_date?: string
  guests?: number
  total_amount?: number
  special_requests?: string
}) {
  if (!sql) {
    // Return mock success for fallback
    console.log("Booking (fallback):", data)
    return { id: Math.floor(Math.random() * 1000) }
  }

  const result = await sql`
    INSERT INTO bookings (
      customer_name, customer_email, customer_phone, booking_type, entity_id,
      check_in_date, check_out_date, guests, total_amount, special_requests
    )
    VALUES (
      ${data.customer_name}, ${data.customer_email}, ${data.customer_phone || null},
      ${data.booking_type}, ${data.entity_id}, ${data.check_in_date || null},
      ${data.check_out_date || null}, ${data.guests || 1}, ${data.total_amount || null},
      ${data.special_requests || null}
    )
    RETURNING id
  `
  return result[0]
}

export async function addReview(data: {
  entity_type: string
  entity_id: number
  reviewer_name: string
  reviewer_email?: string
  rating: number
  comment?: string
}) {
  if (!sql) {
    // Return mock success for fallback
    console.log("Review (fallback):", data)
    return { id: Math.floor(Math.random() * 1000) }
  }

  const result = await sql`
    INSERT INTO reviews (entity_type, entity_id, reviewer_name, reviewer_email, rating, comment)
    VALUES (${data.entity_type}, ${data.entity_id}, ${data.reviewer_name}, ${data.reviewer_email || null}, ${data.rating}, ${data.comment || null})
    RETURNING id
  `
  return result[0]
}
