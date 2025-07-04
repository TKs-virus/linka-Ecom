"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export function Navigation() {
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Linka</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search courses, topics, or instructors..." className="pl-10" />
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/catalog" className="text-gray-700 hover:text-blue-600">
              Courses
            </Link>
            <Link href="/my-courses" className="text-gray-700 hover:text-blue-600">
              My Learning
            </Link>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button>Sign Up</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
