"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Category {
  id: number
  name: string
  image: string
  productCount: number
}

const categories: Category[] = [
  { id: 1, name: "Electronics", image: "/placeholder.svg?height=150&width=150", productCount: 1234 },
  { id: 2, name: "Fashion", image: "/placeholder.svg?height=150&width=150", productCount: 2567 },
  { id: 3, name: "Home & Garden", image: "/placeholder.svg?height=150&width=150", productCount: 890 },
  { id: 4, name: "Sports & Outdoors", image: "/placeholder.svg?height=150&width=150", productCount: 456 },
  { id: 5, name: "Books", image: "/placeholder.svg?height=150&width=150", productCount: 3421 },
  { id: 6, name: "Toys & Games", image: "/placeholder.svg?height=150&width=150", productCount: 678 },
  { id: 7, name: "Beauty & Health", image: "/placeholder.svg?height=150&width=150", productCount: 1123 },
  { id: 8, name: "Automotive", image: "/placeholder.svg?height=150&width=150", productCount: 234 },
]

export default function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  }

  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return itemsPerView.mobile
      if (window.innerWidth < 1024) return itemsPerView.tablet
      return itemsPerView.desktop
    }
    return itemsPerView.desktop
  }

  const [itemsShown, setItemsShown] = useState(getItemsPerView())
  const maxIndex = Math.max(0, categories.length - itemsShown)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="relative">
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 md:h-10 md:w-10 p-0 bg-transparent"
            >
              <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="h-8 w-8 md:h-10 md:w-10 p-0"
            >
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsShown)}%)` }}
          >
            {categories.map((category) => (
              <div key={category.id} className="w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2">
                <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="mb-3 md:mb-4">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={150}
                          height={150}
                          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-sm md:text-base lg:text-lg mb-1 md:mb-2">{category.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500">{category.productCount} products</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="mb-2 sm:mb-3">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-1">{category.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500">{category.productCount} products</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
