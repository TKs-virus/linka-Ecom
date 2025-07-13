"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const featured = [
  {
    title: "Top Electronics",
    img: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Professional Services",
    img: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Fashion Essentials",
    img: "/placeholder.svg?height=400&width=400",
  },
]

export function FeaturedSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-2xl font-bold text-gray-900">Featured Collections</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((f) => (
          <Card key={f.title} className="group overflow-hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={f.img || "/placeholder.svg"}
                alt={f.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{f.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
