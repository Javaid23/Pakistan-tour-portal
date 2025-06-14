"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Hotel, MessageCircle, Calendar, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  inquiry_type: string
  status: string
  created_at: string
}

interface Booking {
  id: number
  customer_name: string
  customer_email: string
  booking_type: string
  entity_id: number
  check_in_date: string
  check_out_date: string
  guests: number
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalBookings: 0,
    pendingMessages: 0,
    pendingBookings: 0,
  })

  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    // For demo purposes, we'll use mock data
    const mockMessages: ContactMessage[] = [
      {
        id: 1,
        name: "John Smith",
        email: "john@example.com",
        subject: "Trip to Hunza Valley",
        message: "I'm interested in planning a trip to Hunza Valley for next month.",
        inquiry_type: "destinations",
        status: "pending",
        created_at: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        subject: "Hotel Booking",
        message: "Need help with hotel reservations in Lahore.",
        inquiry_type: "hotels",
        status: "pending",
        created_at: "2024-01-14T15:45:00Z",
      },
    ]

    const mockBookings: Booking[] = [
      {
        id: 1,
        customer_name: "Mike Wilson",
        customer_email: "mike@example.com",
        booking_type: "hotel",
        entity_id: 1,
        check_in_date: "2024-02-15",
        check_out_date: "2024-02-18",
        guests: 2,
        status: "pending",
        created_at: "2024-01-15T12:00:00Z",
      },
    ]

    setMessages(mockMessages)
    setBookings(mockBookings)
    setStats({
      totalMessages: mockMessages.length,
      totalBookings: mockBookings.length,
      pendingMessages: mockMessages.filter((m) => m.status === "pending").length,
      pendingBookings: mockBookings.filter((b) => b.status === "pending").length,
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Pakistan Tours portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingMessages}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Messages</CardTitle>
                <CardDescription>Manage and respond to customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{message.name}</h4>
                          <p className="text-sm text-gray-600">{message.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={message.status === "pending" ? "destructive" : "default"}>
                            {message.status}
                          </Badge>
                          <Badge variant="outline">{message.inquiry_type}</Badge>
                        </div>
                      </div>
                      <h5 className="font-medium mb-1">{message.subject}</h5>
                      <p className="text-sm text-gray-600 mb-3">{message.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleDateString()}</p>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            Reply
                          </Button>
                          <Button size="sm">Mark as Resolved</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Manage hotel and guide booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{booking.customer_name}</h4>
                          <p className="text-sm text-gray-600">{booking.customer_email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={booking.status === "pending" ? "destructive" : "default"}>
                            {booking.status}
                          </Badge>
                          <Badge variant="outline">{booking.booking_type}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Check-in:</span> {booking.check_in_date}
                        </div>
                        <div>
                          <span className="font-medium">Check-out:</span> {booking.check_out_date}
                        </div>
                        <div>
                          <span className="font-medium">Guests:</span> {booking.guests}
                        </div>
                        <div>
                          <span className="font-medium">Booking ID:</span> #{booking.id}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{new Date(booking.created_at).toLocaleDateString()}</p>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            Contact Customer
                          </Button>
                          <Button size="sm">Confirm Booking</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                  <CardDescription>Most viewed destinations this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Hunza Valley", "Lahore", "Skardu", "Swat Valley"].map((destination, index) => (
                      <div key={destination} className="flex items-center justify-between">
                        <span className="text-sm">{destination}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${100 - index * 20}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{100 - index * 20}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Booking requests by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Hotel className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Hotel Bookings</span>
                      </div>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Guide Bookings</span>
                      </div>
                      <span className="font-semibold">35%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
