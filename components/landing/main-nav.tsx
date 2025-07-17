"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, ShoppingCart, BookOpen, Heart, Truck, Plane, Package } from "lucide-react"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Shop", href: "/shop" },
    { name: "Industries", href: "/industries" },
    { name: "About", href: "/about" },
    { name: "For Retailers", href: "/retailers" },
    { name: "Contact", href: "/contact" },
  ]

  const industries = [
    {
      name: "E-commerce",
      href: "/industries/ecommerce",
      description: "Online retail solutions",
      icon: ShoppingCart,
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "E-Learning",
      href: "/industries/elearning",
      description: "Educational platforms",
      icon: BookOpen,
      color: "from-green-500 to-blue-600",
    },
    {
      name: "Healthcare",
      href: "/industries/healthcare",
      description: "Medical services",
      icon: Heart,
      color: "from-red-500 to-pink-600",
    },
    {
      name: "Food Delivery",
      href: "/industries/food-delivery",
      description: "Restaurant & delivery",
      icon: Truck,
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Travel & Tourism",
      href: "/industries/travel",
      description: "Booking & experiences",
      icon: Plane,
      color: "from-sky-500 to-blue-600",
    },
    {
      name: "Wholesale",
      href: "/industries/wholesale",
      description: "B2B marketplace",
      icon: Package,
      color: "from-indigo-500 to-purple-600",
    },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-white font-bold text-xl">Linka</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <Link href="/retailers">Sell on Linka</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 hover:text-orange-500 transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/login">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                    <Link href="/retailers">Sell on Linka</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
