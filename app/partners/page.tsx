"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, Search, Users, MessageCircle, Award, Languages, Mountain } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { BookingModal } from "@/components/booking-modal"

const travelPartners = [
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
  },
  {
    id: 3,
    name: "Rashid Ahmed",
    title: "Adventure Sports Guide",
    location: "Skardu",
    rating: 4.9,
    reviews_count: 156,
    experience: "10 years",
    languages: ["English", "Urdu", "Balti"],
    specialties: ["Rock Climbing", "Mountaineering", "Base Camp Treks"],
    avatar_url: "/placeholder.svg?height=100&width=100",
    description: "Professional mountaineer with extensive experience in K2 and other 8000m peak expeditions.",
    price_range: "$70-100/day",
    verified: true,
  },
  {
    id: 4,
    name: "Zara Malik",
    title: "Wildlife & Nature Guide",
    location: "Swat Valley",
    rating: 4.7,
    reviews_count: 73,
    experience: "5 years",
    languages: ["English", "Urdu", "Pashto"],
    specialties: ["Wildlife Photography", "Nature Walks", "Eco-Tourism"],
    avatar_url: "/placeholder.svg?height=100&width=100",
    description: "Nature enthusiast specializing in wildlife conservation and sustainable tourism practices.",
    price_range: "$45-65/day",
    verified: true,
  },
  {
    id: 5,
    name: "Hassan Raza",
    title: "Urban Explorer & Food Guide",
    location: "Karachi",
    rating: 4.6,
    reviews_count: 94,
    experience: "4 years",
    languages: ["English", "Urdu", "Sindhi"],
    specialties: ["Street Food", "Urban Tours", "Local Markets"],
    avatar_url: "/placeholder.svg?height=100&width=100",
    description: "Local Karachi expert who knows the best hidden gems, street food spots, and cultural experiences.",
    price_range: "$35-55/day",
    verified: false,
  },
  {
    id: 6,
    name: "Maria Khan",
    title: "Luxury Travel Consultant",
    location: "Islamabad",
    rating: 4.8,
    reviews_count: 112,
    experience: "7 years",
    languages: ["English", "Urdu", "French"],
    specialties: ["Luxury Tours", "Business Travel", "VIP Services"],
    avatar_url: "/placeholder.svg?height=100&width=100",
    description: "Specializes in high-end travel experiences with personalized service and exclusive access.",
    price_range: "$80-120/day",
    verified: true,
  },
]

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")

  const filteredPartners = travelPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation =
      selectedLocation === "all" || partner.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      partner.specialties.some((specialty) => specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()))

    return matchesSearch && matchesLocation && matchesSpecialty
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
              <Link href="/hotels" className="text-gray-700 hover:text-green-600 transition-colors">
                Hotels
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Travel Partner</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced local guides and travel experts who will make your Pakistan journey unforgettable.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search guides by name or expertise..."
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
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="mountain">Mountain Trekking</SelectItem>
                <SelectItem value="cultural">Cultural Tours</SelectItem>
                <SelectItem value="adventure">Adventure Sports</SelectItem>
                <SelectItem value="food">Food Tours</SelectItem>
                <SelectItem value="wildlife">Wildlife</SelectItem>
                <SelectItem value="luxury">Luxury Travel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPartners.length} of {travelPartners.length} travel partners
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={partner.avatar_url || "/placeholder.svg"} alt={partner.name} />
                    <AvatarFallback>
                      {partner.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                          {partner.verified && <Award className="h-5 w-5 text-green-600" />}
                        </div>
                        <p className="text-green-600 font-medium">{partner.title}</p>
                        <p className="text-gray-600 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {partner.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold">{partner.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({partner.reviews_count})</span>
                        </div>
                        <p className="text-sm text-gray-600">{partner.experience} experience</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">{partner.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {partner.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-1" />
                          <span>{partner.languages.join(", ")}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{partner.price_range}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <BookingModal
                        type="guide"
                        entityId={partner.id}
                        entityName={partner.name}
                        trigger={
                          <Button className="flex-1 bg-green-600 hover:bg-green-700">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Book Guide
                          </Button>
                        }
                      />
                      <Button variant="outline">View Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No travel partners found matching your criteria.</p>
            <p className="text-gray-400 mb-4">Try adjusting your search filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedLocation("all")
                setSelectedSpecialty("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-green-50 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Are you a travel guide?</h3>
          <p className="text-gray-600 mb-6">
            Join our network of professional travel partners and help tourists discover the beauty of Pakistan.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">Become a Partner</Button>
        </div>
      </div>
    </div>
  )
}
