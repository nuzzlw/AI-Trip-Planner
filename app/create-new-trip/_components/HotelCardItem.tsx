"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Star, Wallet2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';


type Props = {
  hotel: {
    hotel_name: string;
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    rating: number;
    description: string;
  }
}

function HotelCardItem({ hotel }: Props) {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!hotel?.hotel_name) return;

    const fetchImage = async () => {
      try {
        const result = await axios.post('/api/unsplash-image', {
          query: `${hotel.hotel_name} hotel`
        });

        setImageUrl(result.data.imageUrl);
      } catch {
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [hotel?.hotel_name]);

  return (
    <div className='flex flex-col gap-2'>

      <Image
        src={imageUrl || "/Travel.jpg"}
        alt={hotel.hotel_name}
        width={400}
        height={200}
        className='rounded-xl shadow object-cover'
      />

      <h2 className='font-semibold text-lg'>
        {hotel.hotel_name}
      </h2>

      <p className='text-gray-500'>
        {hotel.hotel_address}
      </p>

      <div className='flex flex-col items-start gap-1'>
        <p className='flex gap-2 text-green-600 items-center'>
          <Wallet2 size={16}/> {hotel.price_per_night}
        </p>

        <p className='text-yellow-500 flex gap-2 items-center'>
          <Star size={16}/> {hotel.rating}
        </p>
      </div>

      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotel_name)}`}
        target="_blank"
      >
        <Button
          variant="outline"
          className="mt-2 w-full flex items-center justify-center gap-2"
        >
          View on Maps <ExternalLink size={16} />
        </Button>
      </Link>

      <p className='line-clamp-2 text-gray-500'>
        {hotel.description}
      </p>

    </div>
  )
}

export default HotelCardItem;
