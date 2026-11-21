import { PricingTable } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center pt-16 pb-10 px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-200 px-4 py-1 rounded-full mb-4">
          Pricing
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Unlock unlimited trip generations, premium destinations, and 
          personalized itineraries — all tailored just for you.
        </p>

        {/* Stats Row */}
        <div className="flex gap-10 mt-10">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900">10k+</span>
            <span className="text-gray-400 text-sm mt-1">Trips Planned</span>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900">50+</span>
            <span className="text-gray-400 text-sm mt-1">Destinations</span>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900">4.9★</span>
            <span className="text-gray-400 text-sm mt-1">User Rating</span>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
          <PricingTable />
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center pb-16">
        <p className="text-gray-400 text-sm">
          No hidden fees. Cancel anytime. Questions?{" "}
          <a href="mailto:support@yourdomain.com" className="text-orange-500 underline hover:text-orange-600 transition">
            Contact us
          </a>
        </p>
      </div>

    </div>
  )
}