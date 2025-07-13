"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, MapPin } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    } else {
      params.delete("search")
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          {/* Location Indicator */}
          <div className="absolute left-4 flex items-center gap-2 text-gray-500 z-10">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Lusaka</span>
            <div className="w-px h-4 bg-gray-300 ml-2" />
          </div>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search for products, services, or stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-24 pr-32 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-lg bg-white"
          />

          {/* Search Actions */}
          <div className="absolute right-2 flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" className="rounded-xl text-gray-500 hover:text-gray-700">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 hidden group-focus-within:block">
        <div className="text-sm text-gray-500 mb-2">Popular searches</div>
        <div className="flex flex-wrap gap-2">
          {["Electronics", "Web Design", "Cleaning Service", "Fashion", "Food Delivery"].map((term) => (
            <Button
              key={term}
              variant="ghost"
              size="sm"
              className="text-xs rounded-full bg-gray-50 hover:bg-gray-100"
              onClick={() => {
                setSearchQuery(term)
                const params = new URLSearchParams(searchParams.toString())
                params.set("search", term)
                router.push(`/shop?${params.toString()}`)
              }}
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
