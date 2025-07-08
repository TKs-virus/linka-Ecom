"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search } from "lucide-react"

export function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Linka
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/shop" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Shop
              </Link>
              <Link
                href="/orders"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Orders
              </Link>
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
