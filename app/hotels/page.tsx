"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Search, Mountain, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const hotels = [
  {
    id: 1,
    name: "Hunza Serena Inn",
    location: "Hunza Valley",
    category: "Luxury",
    rating: 4.8,
    reviews: 234,
    price: "$120-180",
    image: "/placeholder.svg?height=300&width=400",
    description: "Luxury resort with stunning mountain views and traditional architecture.",
    amenities: ["Free WiFi", "Restaurant", "Spa", "Mountain Views", "Room Service"],
    contact: {
      phone: "+92 5813 457001",
      email: "hunza@serena.com.pk",
    },
    features: ["24/7 Reception", "Airport Shuttle", "Laundry Service"],
  },
  {
    id: 2,
    name: "Pearl Continental Lahore",
    location: "Lahore",
    category: "Luxury",
    rating: 4.6,
    reviews: 456,
    price: "$90-140",
    image: "/placeholder.svg?height=300&width=400",
    description: "Premier hotel in the heart of Lahore with modern amenities and excellent service.",
    amenities: ["Free WiFi", "Pool", "Gym", "Multiple Restaurants", "Business Center"],
    contact: {
      phone: "+92 42 111 505 505",
      email: "pc.lahore@pchotels.com",
    },
    features: ["Valet Parking", "Concierge", "Conference Rooms"],
  },
  {
    id: 3,
    name: "Shangrila Resort Skardu",
    location: "Skardu",
    category: "Resort",
    rating: 4.7,
    reviews: 189,
    price: "$80-120",
    image: "/placeholder.svg?height=300&width=400",
    description: "Beautiful lakeside resort known as 'Heaven on Earth' with breathtaking scenery.",
    amenities: ["Lake Views", "Restaurant", "Boating", "Garden", "Room Service"],
    contact: {
      phone: "+92 5815 460523",
      email: "info@shangrilaresorts.com",
    },
    features: ["Lake Activities", "Mountain Trekking", "Cultural Tours"],
  },
  {
    id: 4,
    name: "Movenpick Hotel Karachi",
    location: "Karachi",
    category: "Business",
    rating: 4.5,
    reviews: 312,
    price: "$100-150",
    image: "/placeholder.svg?height=300&width=400",
    description: "Modern business hotel with excellent facilities and prime location.",
    amenities: ["Free WiFi", "Pool", "Gym", "Spa", "Multiple Restaurants"],
    contact: {
      phone: "+92 21 111 117 117",
      email: "hotel.karachi@movenpick.com",
    },
    features: ["Business Center", "Meeting Rooms", "Airport Transfer"],
  },
  {
    id: 5,
    name: "Swat Serena Hotel",
    location: "Swat Valley",
    category: "Heritage",
    rating: 4.4,
    reviews: 167,
    price: "$70-110",
    image: "/placeholder.svg?height=300&width=400",
    description: "Charming heritage hotel surrounded by lush green valleys and mountains.",
    amenities: ["Garden Views", "Restaurant", "Cultural Shows", "Hiking Trails"],
    contact: {
      phone: "+92 946 710257",
      email: "swat@serena.com.pk",
    },
    features: ["Nature Walks", "Local Cuisine", "Cultural Programs"],
  },
  {
    id: 6,
    name: "Islamabad Serena Hotel",
    location: "Islamabad",
    category: "Luxury",
    rating: 4.7,
    reviews: 298,
    price: "$110-160",
    image: "/placeholder.svg?height=300&width=400",
    description: "Elegant hotel in the capital with world-class amenities and service.",
    amenities: ["Free WiFi", "Pool", "Spa", "Multiple Restaurants", "Tennis Court"],
    contact: {
      phone: "+92 51 287 4000",
      email: "islamabad@serena.com.pk",
    },
    features: ["Business Facilities", "Event Spaces", "Diplomatic Quarter"],
  },
]

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation =
      selectedLocation === "all" || hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || hotel.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesLocation && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Pakistan Tours</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/destinations" className="text-gray-700 hover:text-green-600 transition-colors">
                Destinations
              </Link>
              <Link href="/partners" className="text-gray-700 hover:text-green-600 transition-colors">
                Travel Partners
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Perfect Accommodations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover comfortable hotels and resorts across Pakistan, from luxury mountain retreats to business hotels in
            major cities.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search hotels by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="hunza">Hunza Valley</SelectItem>
                <SelectItem value="lahore">Lahore</SelectItem>
                <SelectItem value="skardu">Skardu</SelectItem>
                <SelectItem value="swat">Swat Valley</SelectItem>
                <SelectItem value="karachi">Karachi</SelectItem>
                <SelectItem value="islamabad">Islamabad</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="resort">Resort</SelectItem>
                <SelectItem value="heritage">Heritage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredHotels.length} of {hotels.length} hotels
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {hotel.category}
                    </Badge>
                  </div>
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                      <p className="text-green-600 flex items-center text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hotel.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{hotel.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({hotel.reviews})</span>
                      </div>
                      <p className="font-bold text-green-600">{hotel.price}/night</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">{hotel.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{hotel.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{hotel.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{hotel.contact.email}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Book Now</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedLocation("all")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Booking Tips */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Tips for Pakistan</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Best Time to Visit:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Northern Areas: April to October</li>
                <li>• Plains: October to March</li>
                <li>• Coastal Areas: November to February</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Booking Recommendations:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Book in advance during peak season</li>
                <li>• Confirm amenities before arrival</li>
                <li>• Check cancellation policies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
