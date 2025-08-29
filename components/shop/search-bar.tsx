"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, MapPin, Mic } from "lucide-react"
import { useState } from "react"

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const toggleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice search implementation would go here
  }

  const popularSearches = ["Coffee", "Electronics", "Fashion", "Books", "Home Decor", "Food"]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-400" />
            <div className="h-4 w-px bg-gray-300" />
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Lusaka</span>
          </div>

          <Input
            type="text"
            placeholder="Search for products, stores, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-32 pr-24 py-4 text-lg border-2 border-gray-200 focus:border-orange-500 rounded-full shadow-lg"
          />

          <div className="absolute right-2 flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleVoiceSearch}
              className={`h-8 w-8 rounded-full ${isListening ? "bg-red-100 text-red-600" : "hover:bg-gray-100"}`}
            >
              <Mic className="h-4 w-4" />
            </Button>

            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="h-8 w-8 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white rounded-full px-6"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Popular Searches */}
      {!searchQuery && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Popular:</span>
          {popularSearches.map((search) => (
            <Badge
              key={search}
              variant="outline"
              className="cursor-pointer hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600 transition-colors"
              onClick={() => setSearchQuery(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
