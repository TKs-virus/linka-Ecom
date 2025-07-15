"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  BookOpen,
  Car,
  Gamepad2,
  Heart,
  Utensils,
  Plane,
  GraduationCap,
  ShoppingBag,
} from "lucide-react"

const categories = [
  { id: "all", name: "All Products", icon: ShoppingBag, count: 10247, color: "bg-slate-100 text-slate-700" },
  { id: "electronics", name: "Electronics", icon: Smartphone, count: 2847, color: "bg-blue-100 text-blue-700" },
  { id: "fashion", name: "Fashion", icon: Shirt, count: 1923, color: "bg-pink-100 text-pink-700" },
  { id: "home", name: "Home & Garden", icon: Home, count: 1456, color: "bg-emerald-100 text-emerald-700" },
  { id: "sports", name: "Sports & Fitness", icon: Dumbbell, count: 892, color: "bg-orange-100 text-orange-700" },
  { id: "books", name: "Books & Media", icon: BookOpen, count: 734, color: "bg-purple-100 text-purple-700" },
  { id: "automotive", name: "Automotive", icon: Car, count: 567, color: "bg-red-100 text-red-700" },
  { id: "gaming", name: "Gaming", icon: Gamepad2, count: 445, color: "bg-indigo-100 text-indigo-700" },
  { id: "health", name: "Health & Beauty", icon: Heart, count: 623, color: "bg-rose-100 text-rose-700" },
  { id: "food", name: "Food & Beverages", icon: Utensils, count: 389, color: "bg-amber-100 text-amber-700" },
  { id: "travel", name: "Travel & Tourism", icon: Plane, count: 234, color: "bg-cyan-100 text-cyan-700" },
  { id: "education", name: "Education", icon: GraduationCap, count: 178, color: "bg-teal-100 text-teal-700" },
]

interface CategoryTabsProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Shop by Category</h2>
        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          {categories.find((cat) => cat.id === selectedCategory)?.count.toLocaleString()} items
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "ghost"}
              onClick={() => onCategoryChange(category.id)}
              className={`h-auto p-4 flex flex-col items-center space-y-3 transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "hover:bg-white/80 hover:shadow-md hover:scale-105"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-white/20" : category.color
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? "text-white" : ""}`} />
              </div>

              <div className="text-center">
                <p className={`font-semibold text-sm ${isSelected ? "text-white" : "text-slate-800"}`}>
                  {category.name}
                </p>
                <p className={`text-xs ${isSelected ? "text-white/80" : "text-slate-600"}`}>
                  {category.count.toLocaleString()} items
                </p>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
