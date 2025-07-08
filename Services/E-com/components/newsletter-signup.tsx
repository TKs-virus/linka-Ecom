"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto text-white">
          <Mail className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Stay Updated</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-blue-100">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
            offers.
          </p>

          {isSubscribed ? (
            <div className="bg-green-500 text-white p-3 md:p-4 rounded-lg">
              <p className="font-semibold text-sm md:text-base">Thank you for subscribing!</p>
              <p className="text-xs md:text-sm">You'll receive our latest updates soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-black text-sm md:text-base"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 md:px-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
