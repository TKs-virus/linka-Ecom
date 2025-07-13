"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, X, TrendingUp, Clock, MapPin } from "lucide-react"

const trendingSearches = [
  "Solar panels",
  "Chitenge fabric",
  "House cleaning",
  "Fresh vegetables",
  "Digital marketing",
  "Copper jewelry",
]

const recentSearches = ["Zambian honey", "Fitness training", "Coffee beans", "Phone repair"]

const popularLocations = ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Livingstone"]

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  const handleSearch = (term?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const searchValue = term || searchTerm

    if (searchValue.trim()) {
      params.set("search", searchValue.trim())
    } else {
      params.delete("search")
    }

    router.push(`/shop?${params.toString()}`)
    setIsExpanded(false)
  }

  const clearSearch = () => {
    setSearchTerm("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    router.push(`/shop?${params.toString()}`)
  }

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term)
    handleSearch(term)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for products, services, or retailers in Zambia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
                if (e.key === "Escape") {
                  setIsExpanded(false)
                }
              }}
              className="pl-12 pr-12 py-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Button
            onClick={() => handleSearch()}
            className="ml-3 px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Expanded Search Suggestions */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsExpanded(false)} />

          {/* Search Suggestions Panel */}
          <Card className="absolute top-full left-0 right-0 mt-2 p-6 shadow-2xl border-0 z-50 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-900">Trending Now</h3>
                </div>
                <div className="space-y-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Locations */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-gray-900">Popular Locations</h3>
                </div>
                <div className="space-y-2">
                  {popularLocations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleQuickSearch(location)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Quick searches:</p>
              <div className="flex flex-wrap gap-2">
                {[...trendingSearches.slice(0, 4), ...recentSearches.slice(0, 2)].map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors px-3 py-1"
                    onClick={() => handleQuickSearch(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Current Search Display */}
      {searchParams.get("search") && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Searching for:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            {searchParams.get("search")}
            <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={clearSearch} />
          </Badge>
        </div>
      )}
    </div>
  )
}
