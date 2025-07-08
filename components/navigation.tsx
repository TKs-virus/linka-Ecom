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
  },
  {
    title: "Food Delivery",
    href: "/services/food-delivery",
    description: "Order from local restaurants and get fresh meals delivered",
    icon: Utensils,
    color: "text-orange-600",
  },
  {
    title: "E-Learning",
    href: "/services/e-learning",
    description: "Learn new skills from local instructors and online courses",
    icon: GraduationCap,
    color: "text-green-600",
  },
  {
    title: "Healthcare",
    href: "/services/healthcare",
    description: "Book appointments and order medicines from local providers",
    icon: Stethoscope,
    color: "text-red-600",
  },
  {
    title: "Travel & Tourism",
    href: "/services/travel",
    description: "Discover local attractions and book travel experiences",
    icon: Plane,
    color: "text-purple-600",
  },
  {
    title: "Wholesale",
    href: "/services/wholesale",
    description: "Bulk purchasing for businesses and organizations",
    icon: Package,
    color: "text-indigo-600",
  },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItems, setCartItems] = useState(3) // Mock cart items

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
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Linka
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                      {services.map((service) => {
                        const Icon = service.icon
                        return (
                          <NavigationMenuLink key={service.title} asChild>
                            <Link
                              href={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center space-x-2">
                                <Icon className={cn("h-4 w-4", service.color)} />
                                <div className="text-sm font-medium leading-none">{service.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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

            <Link href="/shop" className="text-gray-700 hover:text-orange-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
            <Link href="/retailers" className="text-gray-700 hover:text-orange-600 transition-colors">
              For Retailers
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search products, stores..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Lusaka, ZM</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-orange-500">2</Badge>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">5</Badge>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-600">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through our services and features</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="search" placeholder="Search..." className="pl-10" />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    <Link
                      href="/shop"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                    >
                      Shop
                    </Link>
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-gray-900">Services</div>
                      {services.map((service) => {
                        const Icon = service.icon
                        return (
                          <Link
                            key={service.title}
                            href={service.href}
                            className="flex items-center space-x-2 px-6 py-2 text-sm text-gray-600 hover:text-orange-600"
                          >
                            <Icon className={cn("h-4 w-4", service.color)} />
                            <span>{service.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                    <Link
                      href="/about"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/retailers"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                    >
                      For Retailers
                    </Link>
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
