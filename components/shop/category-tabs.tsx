"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Wrench, Palette, Home, Dumbbell, Laptop, ShoppingBag } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface CategoryTabsProps {
  currentType?: string
}

const categories = [
  { id: "all", label: "All", icon: ShoppingBag, count: "10K+" },
  { id: "product", label: "Products", icon: Package, count: "8K+" },
  { id: "service", label: "Services", icon: Wrench, count: "2K+" },
]

const subCategories = [
  { id: "Electronics", label: "Electronics", icon: Laptop },
  { id: "Fashion", label: "Fashion", icon: Palette },
  { id: "Home Services", label: "Home", icon: Home },
  { id: "Health & Fitness", label: "Fitness", icon: Dumbbell },
  { id: "Design", label: "Design", icon: Palette },
]

export function CategoryTabs({ currentType = "all" }: CategoryTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type === "all") {
      params.delete("type")
    } else {
      params.set("type", type)
    }
    router.push(`/shop?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("category", category)
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Main Type Tabs */}
      <Tabs defaultValue={currentType} onValueChange={handleTypeChange}>
        <TabsList className="mx-auto w-full max-w-md justify-center">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <div className="flex items-center bg-white rounded-2xl p-2 shadow-lg border">
                <Button
                  variant={currentType === category.id ? "default" : "ghost"}
                  className={`
                    relative px-6 py-3 rounded-xl transition-all duration-200
                    ${
                      currentType === category.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {category.icon({ className: "w-5 h-5 mr-2" })}
                  <span className="font-medium">{category.label}</span>
                  <Badge
                    variant="secondary"
                    className={`ml-2 ${currentType === category.id ? "bg-white/20 text-white" : "bg-gray-100"}`}
                  >
                    {category.count}
                  </Badge>
                </Button>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Sub Categories */}
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-3 max-w-4xl">
          {subCategories.map((category) => {
            const Icon = category.icon
            const isActive = searchParams.get("category") === category.id

            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  rounded-full transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
