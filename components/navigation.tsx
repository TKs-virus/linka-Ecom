"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  MapPin,
  Store,
  GraduationCap,
  Utensils,
  Stethoscope,
  Plane,
  Package,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "E-Commerce",
    href: "/services/e-commerce",
    description: "Shop from local retailers and discover unique products in your area",
    icon: Store,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Food Delivery",
    href: "/services/food-delivery",
    description: "Order from local restaurants and get fresh meals delivered",
    icon: Utensils,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "E-Learning",
    href: "/services/e-learning",
    description: "Learn new skills from local instructors and online courses",
    icon: GraduationCap,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Healthcare",
    href: "/services/healthcare",
    description: "Book appointments and order medicines from local providers",
    icon: Stethoscope,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Travel & Tourism",
    href: "/services/travel",
    description: "Discover local attractions and book travel experiences",
    icon: Plane,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Wholesale",
    href: "/services/wholesale",
    description: "Bulk purchasing for businesses and organizations",
    icon: Package,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItems, setCartItems] = useState(3) // Mock cart items
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-gray-200/50" : "bg-white border-gray-100",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 bg-clip-text text-transparent">
                Linka
              </span>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[700px] gap-2 p-4 md:grid-cols-2">
                      {services.map((service) => {
                        const Icon = service.icon
                        return (
                          <NavigationMenuLink key={service.title} asChild>
                            <Link
                              href={service.href}
                              className="group block select-none space-y-2 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 border border-transparent hover:border-gray-200 hover:shadow-sm"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={cn("p-2 rounded-lg", service.bgColor)}>
                                  <Icon className={cn("h-5 w-5", service.color)} />
                                </div>
                                <div className="text-sm font-semibold leading-none text-gray-900 group-hover:text-orange-600 transition-colors">
                                  {service.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600 group-hover:text-gray-700">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        )
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Enhanced Navigation Links */}
            <Link
              href="/shop"
              className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/retailers"
              className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              For Retailers
            </Link>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className={cn("relative w-full transition-all duration-200", isSearchFocused ? "scale-105" : "")}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products, stores..."
                className={cn(
                  "pl-12 pr-4 w-full h-11 rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 transition-all duration-200",
                  isSearchFocused ? "shadow-lg" : "shadow-sm",
                )}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Enhanced Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Enhanced Location */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Lusaka, ZM</span>
            </div>

            {/* Enhanced Action Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-orange-500 hover:bg-orange-600 transition-colors">
                2
              </Badge>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
            >
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-600 transition-colors">
                5
              </Badge>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-600 hover:bg-blue-700 transition-colors">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Enhanced User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-orange-200 transition-all duration-200">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3 bg-gray-50 rounded-lg mb-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-900">John Doe</p>
                    <p className="text-xs leading-none text-gray-500">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Package className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Heart className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Wishlist</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer">
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
                <SheetHeader className="p-6 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-xl font-bold text-gray-900">Menu</SheetTitle>
                  </div>
                  <SheetDescription className="text-gray-600">
                    Navigate through our services and features
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col h-full">
                  {/* Mobile Search */}
                  <div className="p-6 border-b">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-12 h-11 rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-1">
                      <Link
                        href="/shop"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                      >
                        Shop
                      </Link>

                      <div className="space-y-1">
                        <div className="px-4 py-3 text-base font-semibold text-gray-900">Services</div>
                        {services.map((service) => {
                          const Icon = service.icon
                          return (
                            <Link
                              key={service.title}
                              href={service.href}
                              className="flex items-center space-x-3 px-6 py-3 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                            >
                              <div className={cn("p-1.5 rounded-lg", service.bgColor)}>
                                <Icon className={cn("h-4 w-4", service.color)} />
                              </div>
                              <span className="font-medium">{service.title}</span>
                            </Link>
                          )
                        })}
                      </div>

                      <Link
                        href="/about"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                      >
                        Contact
                      </Link>
                      <Link
                        href="/retailers"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                      >
                        For Retailers
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Location */}
                  <div className="p-6 border-t bg-gray-50">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Lusaka, ZM</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
