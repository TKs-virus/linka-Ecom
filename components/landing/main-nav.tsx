"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import IndustriesDropdown from "@/components/IndustriesDropdown"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, LogIn } from "lucide-react"

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "For Retailers", href: "/retailers" },
  { name: "Contact", href: "/contact" },
]

const industries = [
  { name: "E-com", url: "http://localhost:3001" },
  { name: "E-Learning", url: "http://localhost:3002" },
  { name: "Entertainment & Streaming", url: "http://localhost:3003" },
  { name: "Financial Services", url: "http://localhost:3004" },
  { name: "Food Delivery", url: "http://localhost:3005" },
  { name: "General Services", url: "http://localhost:3006" },
  { name: "Healthcare", url: "http://localhost:3007" },
  { name: "Home Services", url: "http://localhost:3008" },
  { name: "Logistics & Delivery", url: "http://localhost:3009" },
  { name: "Professional Services", url: "http://localhost:3010" },
  { name: "Textile & Fabric", url: "http://localhost:3011" },
  { name: "Travel & Tourism", url: "http://localhost:3012" },
  { name: "Vehicle Store", url: "http://localhost:3013" },
  { name: "Wholesale", url: "http://localhost:3014" },
]


export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = false

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover-lift">
              <div className="relative h-10 w-10">
                <Image src="/linka-logo.png" alt="Linka Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-2xl font-bold gradient-text-linka">Linka</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg-linka transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}

              {/* Industries Dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-200">
                  Industries
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white border rounded-md shadow-lg z-50 mt-2 w-64">
                  <ul className="py-2">
                    {industries.map((industry, idx) => (
                      <li key={idx}>
                        <a
                          href={industry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                        >
                          {industry.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hover:bg-brand-orange/10 hover:text-brand-orange" asChild>
              <Link href="/shop">
                <ShoppingCart className="h-4 w-4" />
              </Link>
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-brand-blue/10 hover:text-brand-blue" asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hover:bg-brand-blue/10 hover:text-brand-blue" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow transition-all duration-200 hover-lift"
                  asChild
                >
                  <Link href="/retailers">Sell on Linka</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="hover:bg-brand-orange/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Image src="/linka-logo.png" alt="Linka Logo" width={32} height={32} className="object-contain" />
                  <span className="text-xl font-bold gradient-text-linka">Linka</span>
                </div>

                {/* Mobile Navigation */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-brand-orange transition-colors duration-200 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Industries Submenu */}
                <div className="mt-2">
                  <span className="text-lg font-medium text-gray-700">Industries</span>
                  <ul className="ml-4 mt-2 space-y-2">
                    {industries.map((industry, idx) => (
                      <li key={idx}>
                        <a
                          href={industry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 hover:text-brand-orange"
                          onClick={() => setIsOpen(false)}
                        >
                          {industry.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile User Actions */}
                <div className="border-t pt-6 space-y-3">
                  {isLoggedIn ? (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-brand-blue/10 border-brand-blue/20"
                        asChild
                      >
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-brand-orange/10 border-brand-orange/20"
                        asChild
                      >
                        <Link href="/orders" onClick={() => setIsOpen(false)}>
                          Orders
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:bg-brand-blue/10 border-brand-blue/20"
                      asChild
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                  )}
                  <Button
                    className="w-full gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow"
                    asChild
                  >
                    <Link href="/retailers" onClick={() => setIsOpen(false)}>
                      Sell on Linka
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
