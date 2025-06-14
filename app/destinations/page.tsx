"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Search, Mountain, Camera, Thermometer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const destinations = [
  {
    id: 1,
    name: "Hunza Valley",
    location: "Gilgit-Baltistan",
    category: "Mountain",
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=400",
    description: "A breathtaking valley surrounded by towering peaks, ancient forts, and apricot orchards.",
    highlights: ["Baltit Fort", "Attabad Lake", "Rakaposhi View", "Local Culture"],
    bestTime: "April - October",
    difficulty: "Moderate",
  },
  {
    id: 2,
    name: "Lahore",
    location: "Punjab",
    category: "Cultural",
    rating: 4.7,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=400",
    description: "The cultural heart of Pakistan with magnificent Mughal architecture and vibrant street life.",
    highlights: ["Badshahi Mosque", "Lahore Fort", "Food Street", "Shalimar Gardens"],
    bestTime: "October - March",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Skardu",
    location: "Gilgit-Baltistan",
    category: "Adventure",
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=400",
    description: "Gateway to K2 and base camp for some of the world's highest peaks.",
    highlights: ["K2 Base Camp", "Shangrila Resort", "Deosai Plains", "Satpara Lake"],
    bestTime: "May - September",
    difficulty: "Challenging",
  },
  {
    id: 4,
    name: "Karachi",
    location: "Sindh",
    category: "Urban",
    rating: 4.5,
    reviews: 312,
    image: "/placeholder.svg?height=300&width=400",
    description: "Pakistan's largest city and economic hub with beautiful beaches and modern attractions.",
    highlights: ["Clifton Beach", "Quaid's Mausoleum", "Port Grand", "Empress Market"],
    bestTime: "November - February",
    difficulty: "Easy",
  },
  {
    id: 5,
    name: "Swat Valley",
    location: "Khyber Pakhtunkhwa",
    category: "Nature",
    rating: 4.6,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=400",
    description: "Known as the 'Switzerland of Pakistan' for its lush green valleys and crystal-clear rivers.",
    highlights: ["Kalam Valley", "Mahodand Lake", "Ushu Forest", "White Palace"],
    bestTime: "April - October",
    difficulty: "Moderate",
  },
  {
    id: 6,
    name: "Islamabad",
    location: "Capital Territory",
    category: "Urban",
    rating: 4.4,
    reviews: 298,
    image: "/placeholder.svg?height=300&width=400",
    description: "The modern capital city nestled against the Margalla Hills with planned architecture.",
    highlights: ["Faisal Mosque", "Margalla Hills", "Pakistan Monument", "Lok Virsa"],
    bestTime: "March - May, September - November",
    difficulty: "Easy",
  },
]

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || destination.category.toLowerCase() === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === "all" || destination.difficulty.toLowerCase() === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
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
              <Link href="/partners" className="text-gray-700 hover:text-green-600 transition-colors">
                Travel Partners
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Pakistan's Destinations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover incredible landscapes, rich culture, and unforgettable experiences across Pakistan's diverse
            regions.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="mountain">Mountain</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="urban">Urban</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="challenging">Challenging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={
                      destination.difficulty === "Easy"
                        ? "default"
                        : destination.difficulty === "Moderate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {destination.difficulty}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                    <p className="text-green-600 flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({destination.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">{destination.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {destination.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{destination.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1" />
                    <span>Best: {destination.bestTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">View Details</Button>
                  <Button variant="outline" size="icon">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedDifficulty("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
