"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingBag, BarChart3, Store, Phone, Info, Play, LogIn } from "lucide-react"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: ShoppingBag },
    { name: "About", href: "/about", icon: Info },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Linka
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="ghost" className="text-slate-700 hover:text-blue-600 font-medium">
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>

          <div className="relative">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg"
            >
              <Link href="/dashboard">
                <BarChart3 className="w-4 h-4 mr-2" />
                Demo Dashboard
              </Link>
            </Button>
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 animate-pulse">
              NEW
            </Badge>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Linka
                </span>
              </Link>

              {/* Demo Dashboard - Featured */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Demo Dashboard</h3>
                    <p className="text-xs text-slate-600">Try our business platform</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Play className="w-4 h-4 mr-2" />
                    Launch Demo
                  </Link>
                </Button>
              </div>

              {/* Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <hr className="my-4" />

              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login / Register
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
