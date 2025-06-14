import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Hotel, Phone, Star, Search, Mountain, Camera, Compass } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Pakistan Tours</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/destinations" className="text-gray-700 hover:text-green-600 transition-colors">
                Destinations
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
            <Button className="bg-green-600 hover:bg-green-700">Plan Your Trip</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover the Beauty of <span className="text-green-600">Pakistan</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From the mighty peaks of K2 to the ancient ruins of Mohenjo-daro, explore Pakistan's incredible landscapes,
            rich culture, and warm hospitality with our comprehensive travel guide.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Search destinations, hotels, or activities..." className="pl-10 py-3 text-lg" />
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Search
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Beautiful landscape of Pakistan"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Hunza Valley, Gilgit-Baltistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Plan Your Perfect Journey</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/destinations">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200">
                <CardHeader className="text-center">
                  <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-800">Destinations</CardTitle>
                  <CardDescription>Explore breathtaking locations across Pakistan</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/partners">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-800">Travel Partners</CardTitle>
                  <CardDescription>Connect with experienced local guides</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/hotels">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200">
                <CardHeader className="text-center">
                  <Hotel className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-800">Hotels</CardTitle>
                  <CardDescription>Find comfortable accommodations</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200">
                <CardHeader className="text-center">
                  <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-800">Contact</CardTitle>
                  <CardDescription>Get in touch for personalized assistance</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Destinations</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Hunza Valley",
                location: "Gilgit-Baltistan",
                image: "/placeholder.svg?height=300&width=400",
                description: "Stunning mountain valley with ancient forts and friendly locals",
              },
              {
                name: "Lahore",
                location: "Punjab",
                image: "/placeholder.svg?height=300&width=400",
                description: "Cultural capital with Mughal architecture and vibrant food scene",
              },
              {
                name: "Skardu",
                location: "Gilgit-Baltistan",
                image: "/placeholder.svg?height=300&width=400",
                description: "Gateway to K2 and some of the world's highest peaks",
              },
            ].map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-gray-900">{destination.name}</h4>
                  <p className="text-green-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.location}
                  </p>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4.8</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Pakistan Tours?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Compass className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h4 className="text-xl font-bold mb-4 text-gray-900">Expert Local Knowledge</h4>
              <p className="text-gray-600">
                Our team of local experts knows Pakistan inside out, ensuring you discover hidden gems and authentic
                experiences.
              </p>
            </div>
            <div className="text-center">
              <Camera className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h4 className="text-xl font-bold mb-4 text-gray-900">Unforgettable Experiences</h4>
              <p className="text-gray-600">
                From mountain treks to cultural immersions, we curate experiences that create lasting memories.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h4 className="text-xl font-bold mb-4 text-gray-900">24/7 Support</h4>
              <p className="text-gray-600">
                Our dedicated support team is available around the clock to assist you throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mountain className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold">Pakistan Tours</h3>
              </div>
              <p className="text-gray-400">
                Your gateway to discovering the incredible beauty and culture of Pakistan.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/destinations" className="hover:text-white">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-white">
                    Travel Partners
                  </Link>
                </li>
                <li>
                  <Link href="/hotels" className="hover:text-white">
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Popular Destinations</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hunza Valley</li>
                <li>Lahore</li>
                <li>Skardu</li>
                <li>Islamabad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+92 300 1234567</li>
                <li>info@pakistantours.com</li>
                <li>Islamabad, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Pakistan Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
