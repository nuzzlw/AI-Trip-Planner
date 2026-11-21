"use client"
import React from 'react'
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  ticket_pricing: string;
  best_time_to_visit: string;
};

type DayPlan = {
  day: number;
  best_time_to_visit_day: string;
  activities: Activity[];
};

type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

type TripData = {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels: Hotel[];
  itinerary: DayPlan[];
};

function Itinerary() {
  const { tripDetailInfo } = useTripDetail();
  const tripData = tripDetailInfo as TripData | null;

  if (!tripData) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: "83vh" }}>
        <div
          className="relative rounded-3xl overflow-hidden shadow-lg"
          style={{ width: "85%", height: "75%" }}
        >
          {/* travel.jpg image */}
          <Image
            src="/travel.jpg"
            alt="Travel"
            fill
            className="object-cover"
            priority
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to- from-black/70 via-transparent to-transparent rounded-3xl pointer-events-none" />

          {/* Text at bottom */}
          <h2 className="absolute bottom-6 left-6 flex gap-2 text-2xl font-semibold text-white items-center z-10">
            <ArrowLeft /> Getting to know you to build the perfect trip here
          </h2>
        </div>
      </div>
    );
  }

  const data = [
    {
      title: "Hotels",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tripData.hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ),
    },
    ...tripData.itinerary.map((dayData) => ({
      title: `Day ${dayData.day}`,
      content: (
        <div>
          <p className="mb-3 font-medium">
            Best Time: {dayData.best_time_to_visit_day}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayData.activities.map((activity, index) => (
              <PlaceCardItem key={index} activity={activity} />
            ))}
          </div>
        </div>
      ),
    })),
  ];

  return (
    <div className="relative w-full overflow-auto" style={{ height: "83vh" }}>
      <Timeline data={data} tripData={tripData} />
    </div>
  );
}

export default Itinerary;
