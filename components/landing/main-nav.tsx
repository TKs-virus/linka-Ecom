"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BarChart3, Store, Phone, Info, LogIn, User, Home, ChevronDown, Building2, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  const industries = [
    { name: "E-commerce", href: "/industries/ecommerce", description: "Online retail solutions" },
    { name: "E-Learning", href: "/industries/elearning", description: "Educational platforms" },
    { name: "Healthcare", href: "/industries/healthcare", description: "Medical services" },
    { name: "Food Delivery", href: "/industries/food-delivery", description: "Restaurant & delivery" },
    { name: "Travel & Tourism", href: "/industries/travel", description: "Booking & experiences" },
    { name: "Wholesale", href: "/industries/wholesale", description: "B2B marketplace" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-8 h-8">
            <Image src="/linka-logo.png" alt="Linka" fill className="object-contain" priority />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Linka
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors flex items-center space-x-1 relative group"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Industries Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors flex items-center space-x-1 relative group"
              >
                <Building2 className="w-4 h-4" />
                <span>Industries</span>
                <ChevronDown className="w-3 h-3" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
              {industries.map((industry) => (
                <DropdownMenuItem key={industry.name} asChild>
                  <Link
                    href={industry.href}
                    className="flex flex-col items-start p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-colors"
                  >
                    <span className="font-medium text-slate-900">{industry.name}</span>
                    <span className="text-xs text-slate-600">{industry.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* For Retailers */}
          <Link
            href="/retailers"
            className="text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors flex items-center space-x-1 relative group"
          >
            <Users className="w-4 h-4" />
            <span>For Retailers</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="ghost" className="text-slate-700 hover:text-orange-500 font-medium">
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>

          <Button
            asChild
            className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href="/dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Sidebar */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-8 pt-4">
                <div className="relative w-8 h-8">
                  <Image src="/linka-logo.png" alt="Linka" fill className="object-contain" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Linka
                </span>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Navigation</h3>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-lg font-medium text-slate-700 hover:text-orange-500 transition-colors py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Industries Section */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Industries</h4>
                  {industries.map((industry) => (
                    <Link
                      key={industry.name}
                      href={industry.href}
                      className="flex flex-col py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium text-slate-700">{industry.name}</span>
                      <span className="text-xs text-slate-600">{industry.description}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile For Retailers */}
                <Link
                  href="/retailers"
                  className="flex items-center space-x-3 text-lg font-medium text-slate-700 hover:text-orange-500 transition-colors py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  <span>For Retailers</span>
                </Link>
              </div>

              {/* Quick Access Section */}
              <div className="space-y-4 mb-8">
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
                  <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">© 2024 Linka. All rights reserved.</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
