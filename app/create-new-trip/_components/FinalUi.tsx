"use client"
import { Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function FinalUi({ viewTrip }: { viewTrip: () => void }) {
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  const handleViewTrip = async () => {
    setLoading(true)
    setReady(false)
    try {
      await viewTrip()
      setReady(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-xl shadow-sm border">
      <Globe2 className={`text-primary text-4xl ${loading ? "animate-spin" : "animate-bounce"}`} />

      <h2 className="mt-3 text-lg font-semibold text-primary">
        {loading ? "✈ Generating your trip..." : "✈ Ready to plan your dream trip!"}
      </h2>

      <p className="text-gray-500 text-sm text-center mt-1">
        {loading
          ? "Gathering best destinations, activities, and travel details for you."
          : "Click below to generate your personalized itinerary."}
      </p>

      {/* Button only shows when NOT loading */}
      {!loading && (
        <Button onClick={handleViewTrip} className="mt-4">
          {ready ? "View Trip Again" : "Generate My Trip"}
        </Button>
      )}

      {/* Progress bar only shows while loading */}
      {loading && (
        <div className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className="h-2 bg-primary animate-pulse w-3/4"></div>
        </div>
      )}
    </div>
  )
}

export default FinalUi
