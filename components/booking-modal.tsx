"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createHotelBooking, createGuideBooking } from "@/actions/booking"
import { useActionState } from "react"

interface BookingModalProps {
  type: "hotel" | "guide"
  entityId: number
  entityName: string
  trigger: React.ReactNode
}

export function BookingModal({ type, entityId, entityName, trigger }: BookingModalProps) {
  const [state, formAction, isPending] = useActionState(
    type === "hotel" ? createHotelBooking : createGuideBooking,
    null,
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Book {type === "hotel" ? "Hotel" : "Guide"}: {entityName}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to request a booking. We'll confirm your reservation within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name={`${type}_id`} value={entityId} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input id="customer_name" name="customer_name" required placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="customer_email">Email *</Label>
              <Input id="customer_email" name="customer_email" type="email" required placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <Label htmlFor="customer_phone">Phone Number</Label>
            <Input id="customer_phone" name="customer_phone" type="tel" placeholder="+92 300 1234567" />
          </div>

          {type === "hotel" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="check_in_date">Check-in Date *</Label>
                  <Input id="check_in_date" name="check_in_date" type="date" required />
                </div>
                <div>
                  <Label htmlFor="check_out_date">Check-out Date *</Label>
                  <Input id="check_out_date" name="check_out_date" type="date" required />
                </div>
              </div>
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input id="guests" name="guests" type="number" min="1" max="10" defaultValue="1" />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service_date">Service Date *</Label>
                  <Input id="service_date" name="service_date" type="date" required />
                </div>
                <div>
                  <Label htmlFor="duration_days">Duration (Days)</Label>
                  <Input id="duration_days" name="duration_days" type="number" min="1" max="30" defaultValue="1" />
                </div>
              </div>
              <div>
                <Label htmlFor="group_size">Group Size</Label>
                <Input id="group_size" name="group_size" type="number" min="1" max="20" defaultValue="1" />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              name="special_requests"
              placeholder="Any special requirements or requests..."
              className="min-h-[80px]"
            />
          </div>

          {/* Display success/error messages */}
          {state?.success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{state.message}</p>
            </div>
          )}

          {state?.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{state.error}</p>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full bg-green-600 hover:bg-green-700">
            {isPending ? "Submitting..." : `Request ${type === "hotel" ? "Hotel" : "Guide"} Booking`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
