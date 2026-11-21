"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destination to visit...
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const CityContent = ({
  description,
  highlights,
  bestTime,
  tip,
}: {
  description: string;
  highlights: string[];
  bestTime: string;
  tip: string;
}) => (
  <div className="flex flex-col gap-6 text-neutral-700 dark:text-neutral-300">
    <p className="text-base md:text-lg leading-relaxed">{description}</p>

    <div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        🏙️ Top Highlights
      </h3>
      <ul className="list-disc list-inside space-y-1">
        {highlights.map((h, i) => (
          <li key={i} className="text-sm md:text-base">{h}</li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col gap-1">
      <p className="text-sm md:text-base">
        <span className="font-semibold text-neutral-900 dark:text-white">🗓️ Best Time to Visit: </span>
        {bestTime}
      </p>
      <p className="text-sm md:text-base">
        <span className="font-semibold text-neutral-900 dark:text-white">💡 Travel Tip: </span>
        {tip}
      </p>
    </div>
  </div>
);

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: (
      <CityContent
        description="Paris is one of the world's most iconic cities, blending timeless art, exquisite cuisine, and breathtaking architecture. From the glittering Eiffel Tower to the grand halls of the Louvre, every corner of Paris tells a story of romance and culture."
        highlights={[
          "Eiffel Tower – the iron symbol of France",
          "Louvre Museum – home to the Mona Lisa",
          "Notre-Dame Cathedral – a Gothic masterpiece",
          "Champs-Élysées & Arc de Triomphe",
          "Montmartre & Sacré-Cœur Basilica",
        ]}
        bestTime="April–June and September–November for mild weather and fewer crowds."
        tip="Buy skip-the-line tickets for the Louvre and Eiffel Tower online in advance to save hours of waiting."
      />
    ),
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square, Central Park, Broadway",
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1170&auto=format&fit=crop",
    content: (
      <CityContent
        description="New York City is the city that never sleeps — a melting pot of cultures, cuisines, and creativity. From the neon buzz of Times Square to the peaceful paths of Central Park, NYC delivers an unmatched urban experience at every turn."
        highlights={[
          "Times Square – the crossroads of the world",
          "Central Park – 843 acres of green in the heart of Manhattan",
          "Statue of Liberty & Ellis Island",
          "Broadway Shows & Theatre District",
          "Brooklyn Bridge & DUMBO neighborhood",
        ]}
        bestTime="April–June and September–November for comfortable temperatures and outdoor activities."
        tip="Get a 7-day MetroCard for unlimited subway rides — it's the fastest and cheapest way to explore all 5 boroughs."
      />
    ),
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1170&auto=format&fit=crop",
    content: (
      <CityContent
        description="Tokyo is a city where ancient temples stand beside futuristic skyscrapers. Japan's capital is a sensory wonderland — from the world-famous Shibuya Crossing to serene Shinto shrines, cherry blossom parks, and some of the planet's best street food."
        highlights={[
          "Shibuya Crossing – the world's busiest pedestrian scramble",
          "Senso-ji Temple in Asakusa",
          "Shinjuku Gyoen – stunning cherry blossoms in spring",
          "Akihabara – electronics and anime culture hub",
          "teamLab Borderless – immersive digital art museum",
        ]}
        bestTime="March–May for cherry blossoms, or October–November for autumn foliage."
        tip="Get a Suica card at the airport for seamless travel on trains, subways, and even convenience store purchases."
      />
    ),
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum, Vatican, Roman Forum",
    src: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=1170&auto=format&fit=crop",
    content: (
      <CityContent
        description="Rome is an open-air museum where 2,000 years of history line every cobblestone street. The Eternal City is home to the mighty Colosseum, the spiritual grandeur of Vatican City, and countless piazzas where life moves at a beautiful, unhurried pace."
        highlights={[
          "Colosseum – ancient Rome's iconic amphitheatre",
          "Vatican Museums & Sistine Chapel",
          "Roman Forum & Palatine Hill",
          "Trevi Fountain – toss a coin for good luck",
          "Pantheon – the best-preserved ancient building in Rome",
        ]}
        bestTime="April–May and September–October for pleasant weather and manageable crowds."
        tip="Book Vatican Museums tickets weeks in advance — queues without a booking can be 3–4 hours long."
      />
    ),
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation – Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1170&auto=format&fit=crop",
    content: (
      <CityContent
        description="Dubai is a city of superlatives — the tallest tower, the largest mall, the most ambitious architecture. This gleaming desert metropolis offers a unique blend of ultra-modern luxury, Arabian heritage, and adrenaline-pumping desert adventures."
        highlights={[
          "Burj Khalifa – world's tallest building at 828m",
          "Desert Safari with dune bashing & camel rides",
          "Dubai Mall & the Dubai Fountain Show",
          "Palm Jumeirah – the iconic man-made island",
          "Dubai Creek & Al Fahidi Historic District",
        ]}
        bestTime="November–March for cooler weather, perfect for outdoor exploration."
        tip="Visit the Burj Khalifa observation deck at sunset for stunning views of the city transitioning from day to night."
      />
    ),
  },
  {
    category: "India",
    title: "Incredible India – Taj Mahal, Temples & Cultural Wonders",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1170&auto=format&fit=crop",
    content: (
      <CityContent
        description="India is a land of extraordinary diversity — ancient civilizations, vibrant festivals, majestic palaces, and spiritual retreats all coexist in one breathtaking country. From the iconic Taj Mahal in Agra to the backwaters of Kerala, India offers an unforgettable journey for every traveller."
        highlights={[
          "Taj Mahal, Agra – a UNESCO World Heritage Site",
          "Jaipur – the Pink City with Amber Fort & Hawa Mahal",
          "Varanasi – one of the world's oldest living cities",
          "Kerala Backwaters – tranquil houseboat cruises",
          "Goa – beaches, Portuguese heritage & vibrant nightlife",
        ]}
        bestTime="October–March for most regions; avoid peak summer heat and monsoon season."
        tip="Hire a local guide in cities like Varanasi and Jaipur — their knowledge transforms good sightseeing into unforgettable storytelling."
      />
    ),
  },
];