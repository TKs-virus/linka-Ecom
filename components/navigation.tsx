"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, User, Search, Menu, ShoppingBag, ChevronDown, Store, Truck, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const services = [
  { name: "E-Commerce", href: "/services/e-commerce", icon: ShoppingBag },
  { name: "Food Delivery", href: "/services/food-delivery", icon: Truck },
  { name: "Healthcare", href: "/services/healthcare", icon: Users },
  { name: "E-Learning", href: "/services/e-learning", icon: Users },
  { name: "Travel & Tourism", href: "/services/travel-tourism", icon: Users },
  { name: "Wholesale", href: "/services/wholesale", icon: Store },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors"
              aria-label="Linka Home"
            >
              <ShoppingBag className="h-8 w-8 text-primary inline-block mr-2" aria-hidden="true" />
              Linka
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/shop"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Shop products"
              >
                Shop
              </Link>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Services menu"
                  >
                    Services
                    <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {services.map((service) => {
                    const Icon = service.icon
                    return (
                      <DropdownMenuItem key={service.name} asChild>
                        <Link href={service.href} className="flex items-center">
                          <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                          {service.name}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Contact
              </Link>
              <Link
                href="/retailers"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                For Retailers
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Search"
              className="hidden sm:inline-flex focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Shopping cart"
              className="hidden sm:inline-flex focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="User account"
              className="hidden sm:inline-flex focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <User className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/login">Sign In</Link>
            </Button>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  <Link
                    href="/shop"
                    className="text-lg font-medium text-gray-900 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop
                  </Link>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">Services</h3>
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center text-gray-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ml-4"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                          {service.name}
                        </Link>
                      )
                    })}
                  </div>

                  <Link
                    href="/about"
                    className="text-lg font-medium text-gray-900 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-gray-900 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/retailers"
                    className="text-lg font-medium text-gray-900 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    For Retailers
                  </Link>

                  <div className="pt-4 border-t space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <div className="flex justify-center space-x-4 pt-2">
                      <Button variant="ghost" size="sm" aria-label="Search">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" aria-label="Shopping cart">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" aria-label="User account">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
