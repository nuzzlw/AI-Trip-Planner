"use client"
import React, { useState } from "react"
import { Mail, MapPin, Phone, Send, Bot, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Section */}
      <div className="text-center pt-20 pb-12 px-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 bg-orange-100 border border-orange-200 px-4 py-1 rounded-full">
          Contact Us
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-4">
          Get in <span className="text-orange-500">Touch</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have a question, feedback, or just want to say hello? We'd love to hear from you.
          Our team is always ready to help you plan your next adventure.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <Bot className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-gray-600 text-sm">
              Our intelligent AI assistant creates fully personalized trip itineraries
              tailored to your budget, group size, and travel interests.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <Globe className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Any Destination</h3>
            <p className="text-gray-600 text-sm">
              From Goa to Tokyo, plan trips anywhere worldwide with curated
              recommendations and day-by-day itineraries.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <Sparkles className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Save & Revisit</h3>
            <p className="text-gray-600 text-sm">
              All generated trips are saved to your account so you can revisit,
              share, and reference anytime.
            </p>
          </div>

        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left - Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">We're here to help</h2>
              <p className="text-gray-600">
                Whether you're having trouble generating a trip or want to suggest
                a feature — reach out anytime.
              </p>
            </div>

            <div className="flex flex-col gap-5">

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email us at</p>
                  <p className="font-semibold">hspandey203@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Phone className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call us at</p>
                  <p className="font-semibold">9503344082</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Based in</p>
                  <p className="font-semibold">Mumbai, India 🇮🇳</p>
                </div>
              </div>

            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-sm text-orange-600 font-semibold">⚡ Quick Response</p>
              <p className="text-gray-600 text-sm mt-1">
                We typically respond within 24 hours on business days.
              </p>
            </div>

          </div>

          {/* Right - Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
                <div className="text-5xl">🎉</div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-gray-600">
                  Thanks for reaching out! We'll get back to you soon.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <h2 className="text-xl font-bold mb-2">Send us a message</h2>

                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <input
                  type="text"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <textarea
                  required
                  rows={5}
                  placeholder="Tell us more about your query..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />

                <Button
                  type="submit"
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
