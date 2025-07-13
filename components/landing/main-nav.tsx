"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  BarChart3,
  Store,
  Phone,
  Info,
  LogIn,
  User,
  Home,
  ChevronDown,
  Building2,
  Users,
  ShoppingCart,
  BookOpen,
  Heart,
  Truck,
  Plane,
  Package,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
            <Image src="/linka-logo.png" alt="Linka" fill className="object-contain" priority />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Linka
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-orange-500 transition-all duration-200 flex items-center space-x-2 relative group py-2"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Industries Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-slate-700 hover:text-orange-500 transition-all duration-200 flex items-center space-x-2 relative group py-2 h-auto"
              >
                <Building2 className="w-4 h-4" />
                <span>Industries</span>
                <ChevronDown className="w-3 h-3 transition-transform group-data-[state=open]:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2 bg-white/95 backdrop-blur border shadow-xl">
              <div className="px-2 py-1 mb-2">
                <h4 className="text-sm font-semibold text-slate-900">Industries We Serve</h4>
                <p className="text-xs text-slate-600">Specialized solutions for every sector</p>
              </div>
              <DropdownMenuSeparator />
              {industries.map((industry) => (
                <DropdownMenuItem key={industry.name} asChild className="p-0">
                  <Link
                    href={industry.href}
                    className="flex items-start p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-all duration-200 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${industry.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}
                    >
                      <industry.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">
                        {industry.name}
                      </span>
                      <p className="text-xs text-slate-600 mt-1">{industry.description}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* For Retailers */}
          <Link
            href="/retailers"
            className="text-sm font-medium text-slate-700 hover:text-orange-500 transition-all duration-200 flex items-center space-x-2 relative group py-2"
          >
            <Users className="w-4 h-4" />
            <span>For Retailers</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            asChild
            variant="ghost"
            className="text-slate-700 hover:text-orange-500 font-medium hover:bg-orange-50 transition-all duration-200"
          >
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>

          <Button
            asChild
            className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Link href="/dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Sidebar */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-orange-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center space-x-3 p-6 border-b bg-gradient-to-r from-orange-50 to-blue-50">
                <div className="relative w-8 h-8">
                  <Image src="/linka-logo.png" alt="Linka" fill className="object-contain" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Linka
                </span>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Main Navigation Links */}
                <div className="p-6 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Navigation</h3>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 text-base font-medium text-slate-700 hover:text-orange-500 transition-colors py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 group"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Industries Section */}
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Industries</h3>
                  <div className="space-y-2">
                    {industries.map((industry) => (
                      <Link
                        key={industry.name}
                        href={industry.href}
                        className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-r ${industry.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <industry.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-slate-700 group-hover:text-orange-600 transition-colors text-sm">
                            {industry.name}
                          </span>
                          <p className="text-xs text-slate-600">{industry.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile For Retailers */}
                <div className="px-6 pb-6">
                  <Link
                    href="/retailers"
                    className="flex items-center space-x-3 text-base font-medium text-slate-700 hover:text-orange-500 transition-colors py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>For Retailers</span>
                  </Link>
                </div>

                {/* Mobile Quick Access Section */}
                <div className="px-6 pb-6 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quick Access</h3>

                  {/* Login Card */}
                  <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Account Access</h4>
                        <p className="text-xs text-slate-600">Login or create account</p>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <LogIn className="w-4 h-4 mr-2" />
                        Login / Register
                      </Link>
                    </Button>
                  </div>

                  {/* Demo Dashboard Card */}
                  <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Demo Dashboard</h4>
                        <p className="text-xs text-slate-600">Try our business platform</p>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold"
                    >
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t bg-slate-50">
                <p className="text-xs text-slate-500 text-center">© 2024 Linka. All rights reserved.</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
