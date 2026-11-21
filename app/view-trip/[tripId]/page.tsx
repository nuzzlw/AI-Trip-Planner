"use client"
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Clock, Users, Wallet, Star, ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const getDestinationImage = (destination: string) => {
  const images: Record<string, string> = {
    goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
    paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80',
    dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    rome: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=1200&q=80',
    'new york': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80',
    mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
    delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
    singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
    bangkok: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80',
    sydney: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80',
    amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80',
    barcelona: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80',
  };
  return images[destination?.toLowerCase()]
    || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80';
};

function ViewTripPage() {
  const { tripId } = useParams()
  const router = useRouter()

  const trips = useQuery(api.tripDetail.GetTripById, 
    tripId ? { tripId: tripId as string } : 'skip'
  )

  if (trips === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="h-72 bg-gray-200 w-full" />
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-40 bg-gray-200 rounded-2xl" />)}
          </div>
        </div>
      </div>
    )
  }

  if (!trips) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Trip not found.</p>
      </div>
    )
  }

  const detail = trips.tripDetail;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Banner */}
      <div className="relative h-72 w-full">
        <img
          src={getDestinationImage(detail?.destination)}
          alt={detail?.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to- from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold">{detail?.destination}</h1>
          <p className="text-gray-300 mt-1">from {detail?.origin}</p>
        </div>
        <Button
          variant="outline"
          className="absolute top-6 left-6 bg-white/20 border-white text-white hover:bg-white hover:text-black"
          onClick={() => router.push('/my-trips')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Trips
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* Trip Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-gray-400">Duration</p>
                <p className="font-semibold">{detail?.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-gray-400">Group Size</p>
                <p className="font-semibold">{detail?.group_size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-gray-400">Budget</p>
                <p className="font-semibold">{detail?.budget}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-gray-400">Origin</p>
                <p className="font-semibold">{detail?.origin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏨 Recommended Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {detail?.hotels?.map((hotel: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="h-40 bg-gray-100">
                  <img
                    src={hotel.hotel_image_url || getDestinationImage(detail?.destination)}
                    alt={hotel.hotel_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getDestinationImage(detail?.destination);
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{hotel.hotel_name}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {hotel.hotel_address}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-primary font-semibold text-sm">{hotel.price_per_night}/night</span>
                    <span className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-400" /> {hotel.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗓️ Day by Day Itinerary</h2>
          <div className="flex flex-col gap-6">
            {detail?.itinerary?.map((day: any) => (
              <div key={day.day} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{day.day_plan}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Best time: {day.best_time_to_visit_day}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {day.activities?.map((activity: any, i: number) => (
                    <div key={i} className="flex gap-4 border-l-2 border-primary pl-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{activity.place_name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{activity.place_details}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-primary" /> {activity.place_address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" /> {activity.time_travel_each_location}
                          </span>
                          <span className="flex items-center gap-1">
                            🎟️ {activity.ticket_pricing}
                          </span>
                          <span className="flex items-center gap-1">
                            🕐 Best time: {activity.best_time_to_visit}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewTripPage