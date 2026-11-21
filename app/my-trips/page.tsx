"use client"
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUserDetail } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'
import { MapPin, Clock, Users, Wallet, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const getDestinationImage = (destination: string) => {
  const images: Record<string, string> = {
    goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80',
    dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    rome: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=600&q=80',
    'new york': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
    mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80',
    delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
    bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
    bangkok: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80',
    sydney: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80',
    amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
    barcelona: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80',
  };
  return images[destination?.toLowerCase()] 
    || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80';
};

function MyTripsPage() {
  const { userDetail } = useUserDetail()
  const router = useRouter()

  const trips = useQuery(
    api.tripDetail.GetUserTrips,
    userDetail?._id ? { uid: userDetail._id } : 'skip'
  )

  if (!userDetail?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please log in to see your trips.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Trips</h1>
            <p className="text-gray-500 mt-1">All your AI generated travel plans in one place</p>
          </div>
          <Button onClick={() => router.push('/create-new-trip')}>
            <Plus className="h-4 w-4 mr-2" /> Create New Trip
          </Button>
        </div>

        {/* Loading Skeleton */}
        {trips === undefined && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {trips?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No trips yet</h2>
            <p className="text-gray-500 mb-6">Start planning your first AI-powered trip!</p>
            <Button onClick={() => router.push('/create-new-trip')}>
              <Plus className="h-4 w-4 mr-2" /> Create My First Trip
            </Button>
          </div>
        )}

        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips?.map((trip, index) => {
            const detail = trip.tripDetail;
            return (
              <div
                key={index}
                onClick={() => router.push(`/view-trip/${trip.tripId}`)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full bg-gray-100">
                  <img
                    src={getDestinationImage(detail?.destination)}
                    alt={detail?.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to- from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h2 className="text-xl font-bold">{detail?.destination}</h2>
                    <p className="text-sm text-gray-200">from {detail?.origin}</p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      {detail?.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      {detail?.group_size}
                    </div>
                    <div className="flex items-center gap-1">
                      <Wallet className="h-4 w-4 text-primary" />
                      {detail?.budget}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-primary" />
                    {detail?.itinerary?.length} day itinerary
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default MyTripsPage