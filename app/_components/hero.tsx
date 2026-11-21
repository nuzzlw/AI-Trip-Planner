"use client"
import React, { useRef, useState } from 'react'
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Globe2, Plane, Landmark } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { ArrowDown } from "lucide-react";
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';
import { useRouter } from "next/navigation";

export const suggestions = [
  {
    title: 'Create New Trip',
    icon: <Globe2 className='text-blue-400 h-5 w-5' />
  },
  {
    title: 'Inspire me where to go',
    icon: <Plane className='text-green-500 h-5 w-5' />
  },
  {
    title: 'Discover new gem',
    icon: <Landmark className='text-orange-500 h-5 w-5' />
  },
  {
    title: 'Adventure destination',
    icon: <Globe2 className='text-yellow-600 h-5 w-5' />
  }
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const videoRef = useRef<HTMLDivElement>(null);

  const onSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    if (inputValue.trim()) {
      router.push(`/create-new-trip?q=${encodeURIComponent(inputValue)}`);
    } else {
      router.push('/create-new-trip');
    }
  };

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-24 w-full flex flex-col items-center">

      {/* Content */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I&apos;m your personal{" "}
          <span className="text-primary">Trip planner</span>
        </h1>
        <p className="text-lg text-center">
          Tell me what you want, and I will handle the rest:
          Flights, Hotels, trip planner — all in seconds
        </p>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-3xl mt-6">
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Create a trip from Paris to New York"
            className="w-full h-28 bg-transparent border-none shadow-none focus-visible:ring-0 resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            className="text-center absolute bottom-6 right-6"
            size={'icon'}
            onClick={onSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Suggestion list */}
      <div className='flex gap-5 mt-4'>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'
            onClick={() => {
              if (!user) {
                router.push('/sign-in');
                return;
              }
              router.push('/create-new-trip');
            }}
          >
            {suggestion.icon}
            <h2 className='text-sm'>{suggestion.title}</h2>
          </div>
        ))}
      </div>

      {/* Scroll to video */}
      <h2
        className='my-7 mt-14 flex gap-2 text-center cursor-pointer hover:opacity-70 transition'
        onClick={scrollToVideo}
      >
       <p className="text-2xl text-muted-foreground text- align-middle max-w-3xl mx-auto mb-6">
  Planning a trip shouldn’t take hours of research and endless tabs.  
  Watch how our AI Trip Planner understands your preferences, designs a complete itinerary, suggests hotels, activities, and routes — all in seconds.  
  Smart travel planning, powered by AI.
</p>
 <ArrowDown />
      </h2>

      {/* Video section */}
      <div ref={videoRef} className="w-full flex justify-center mt-10">
        <div className="max-w-5xl w-full rounded-3xl overflow-hidden">
         <HeroVideoDialog
  className="block dark:hidden"
  animationStyle="from-center"
  videoSrc="https://www.youtube.com/embed/7g3a_GqPo5E"
  thumbnailSrc="https://img.youtube.com/vi/7g3a_GqPo5E/maxresdefault.jpg"
  thumbnailAlt="Demo Video"
/>

        </div>
      </div>

    </div>
  );
}

export default Hero;