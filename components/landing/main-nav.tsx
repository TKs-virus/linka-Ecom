"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingBag, BarChart3, Store, Phone, Info, LogIn, User, Home } from "lucide-react"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
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

          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg"
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
              <div className="flex items-center space-x-2 mb-8 pt-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    className="flex items-center space-x-3 text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Quick Access Section */}
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quick Access</h3>

                {/* Login Card */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
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
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Demo Dashboard</h4>
                      <p className="text-xs text-slate-600">Try our business platform</p>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
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
