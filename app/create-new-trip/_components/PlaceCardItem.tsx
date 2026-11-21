"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Clock, ExternalLink, Ticket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import axios from 'axios';

type Activity = {
  place_name: string;
  place_details: string;
  ticket_pricing: string;
  best_time_to_visit: string;
}

type Props = {
  activity: Activity
}

function PlaceCardItem({ activity }: Props) {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!activity?.place_name) return;

    const fetchImage = async () => {
      try {
        const result = await axios.post('/api/unsplash-image', {
          query: activity.place_name
        });

        setImageUrl(result.data.imageUrl);
      } catch {
        setImageUrl(null);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className='flex flex-col gap-2'>

      <Image
        src={imageUrl || "/Travel.jpg"}
        width={400}
        height={200}
        alt={activity.place_name}
        className='object-cover rounded-xl'
      />

      <h2 className='font-semibold text-lg'>
        {activity.place_name}
      </h2>

      <p className='text-gray-500 line-clamp-2'>
        {activity.place_details}
      </p>

      <h2 className='flex gap-2 text-blue-500 items-center'>
        <Ticket size={16}/> {activity.ticket_pricing}
      </h2>

      <p className='flex text-orange-500 gap-2 items-center'>
        <Clock size={16}/> {activity.best_time_to_visit}
      </p>

      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.place_name)}`}
        target="_blank"
      >
        <Button size="sm" variant="outline" className="w-full mt-2">
          View on Maps <ExternalLink size={16}/>
        </Button>
      </Link>
    </div>
  )
}

export default PlaceCardItem
