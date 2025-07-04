"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingCart, User, LogIn, Search, Bell, Heart, Settings, Package, MapPin, Phone } from "lucide-react"

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Industries", href: "/industries" },
  { name: "About", href: "/about" },
  { name: "For Retailers", href: "/retailers" },
  { name: "Contact", href: "/contact" },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = false // This would come from your auth context
  const cartItemCount = 3 // This would come from your cart context
  const notificationCount = 2 // This would come from your notification context

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover-lift">
              <div className="relative h-10 w-10">
                <Image src="/linka-logo.png" alt="Linka Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-2xl font-bold gradient-text-linka">Linka</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center aligned */}
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
            </div>
          </nav>

          {/* Desktop Actions - Right aligned with enhanced visibility */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Search Button */}
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 hover:text-gray-900 p-2 h-10 w-10" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-red-50 hover:text-red-600 p-2 h-10 w-10 relative"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            {/* Shopping Cart Button - Enhanced */}
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-orange-50 hover:text-orange-600 p-2 h-10 w-10 relative"
              asChild
            >
              <Link href="/shop">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 hover:bg-orange-600 text-white border-2 border-white">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart ({cartItemCount} items)</span>
              </Link>
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                {/* Notifications Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-blue-50 hover:text-blue-600 p-2 h-10 w-10 relative"
                  asChild
                >
                  <Link href="/notifications">
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500 hover:bg-blue-600 text-white border-2 border-white">
                        {notificationCount}
                      </Badge>
                    )}
                    <span className="sr-only">Notifications ({notificationCount})</span>
                  </Link>
                </Button>

                {/* User Profile Button - Enhanced */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-blue-50 hover:text-blue-600 p-2 h-10 w-10"
                  asChild
                >
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Login Button - Enhanced */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 px-4 h-10 font-medium bg-transparent"
                  asChild
                >
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>

                {/* Sign Up Button - Enhanced */}
                <Button
                  size="sm"
                  className="gradient-bg-linka hover:gradient-bg-linka-light text-white brand-shadow transition-all duration-200 hover-lift px-4 h-10 font-medium"
                  asChild
                >
                  <Link href="/retailers">Sell on Linka</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu - Enhanced */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="hover:bg-orange-50 p-2 h-10 w-10 relative">
                <Menu className="h-5 w-5" />
                {(cartItemCount > 0 || notificationCount > 0) && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border border-white">
                    {cartItemCount + notificationCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Header */}
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Image src="/linka-logo.png" alt="Linka Logo" width={32} height={32} className="object-contain" />
                  <span className="text-xl font-bold gradient-text-linka">Linka</span>
                </div>

                {/* Mobile Quick Actions */}
                <div className="grid grid-cols-2 gap-3 pb-4 border-b">
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent hover:bg-orange-50 border-orange-200 relative"
                    asChild
                  >
                    <Link href="/shop" onClick={() => setIsOpen(false)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart
                      {cartItemCount > 0 && (
                        <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 text-white">
                          {cartItemCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent hover:bg-red-50 border-red-200"
                    asChild
                  >
                    <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent hover:bg-gray-50 border-gray-200"
                    asChild
                  >
                    <Link href="/search" onClick={() => setIsOpen(false)}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent hover:bg-blue-50 border-blue-200 relative"
                    asChild
                  >
                    <Link href="/notifications" onClick={() => setIsOpen(false)}>
                      <Bell className="h-4 w-4 mr-2" />
                      Alerts
                      {notificationCount > 0 && (
                        <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500 text-white">
                          {notificationCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
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

                {/* Mobile User Actions */}
                <div className="border-t pt-6 space-y-3">
                  {isLoggedIn ? (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-blue-50 border-blue-200"
                        asChild
                      >
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-green-50 border-green-200"
                        asChild
                      >
                        <Link href="/orders" onClick={() => setIsOpen(false)}>
                          <Package className="h-4 w-4 mr-2" />
                          Orders
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent hover:bg-purple-50 border-purple-200"
                        asChild
                      >
                        <Link href="/settings" onClick={() => setIsOpen(false)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:bg-blue-50 border-blue-200"
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

                {/* Mobile Contact Info */}
                <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>1-800-LINKA-01</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
