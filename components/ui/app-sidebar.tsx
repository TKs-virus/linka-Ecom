"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ShoppingBag,
  Home,
  BarChart3,
  Store,
  Phone,
  Info,
  LogIn,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-2xl transition-all duration-300",
        isCollapsed ? "w-16" : "w-80",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-sky-300/30">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-3">
            <ShoppingBag className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Linka</span>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="flex items-center justify-center w-full">
            <ShoppingBag className="h-8 w-8 text-white" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-sky-500/30 ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6 space-y-8">
          {/* Main Navigation */}
          <div>
            {!isCollapsed && (
              <h3 className="text-sm font-bold text-sky-100 uppercase tracking-wider mb-4">Navigation</h3>
            )}
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                    pathname === item.href
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-sky-100 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            {!isCollapsed && (
              <h3 className="text-sm font-bold text-sky-100 uppercase tracking-wider mb-4">Quick Access</h3>
            )}

            {/* Login Card */}
            <div className={cn("mb-4", isCollapsed && "flex justify-center")}>
              {!isCollapsed ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Account Access</h4>
                      <p className="text-xs text-sky-100">Login or register</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-bold"
                  >
                    <Link href="/login">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Link href="/login">
                    <LogIn className="w-5 h-5" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Demo Dashboard Card */}
            <div className={cn("mb-4", isCollapsed && "flex justify-center")}>
              {!isCollapsed ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Demo Dashboard</h4>
                      <p className="text-xs text-sky-100">Try our platform</p>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-white text-sky-600 hover:bg-sky-50 font-bold shadow-lg">
                    <Link href="/dashboard">
                      <Play className="w-4 h-4 mr-2" />
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Link href="/dashboard">
                    <BarChart3 className="w-5 h-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Demo Badge */}
          {!isCollapsed && isDashboard && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-bold text-white">Demo Mode</span>
              </div>
              <p className="text-xs text-sky-100 mb-3">
                You're exploring our platform with sample data. All features are functional!
              </p>
              <Button asChild size="sm" className="w-full bg-white text-sky-600 hover:bg-sky-50 font-bold">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-6 border-t border-sky-300/30">
            <div className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Avatar className="w-10 h-10 ring-2 ring-white/30">
                <AvatarFallback className="bg-white/20 text-white font-bold">
                  {isDashboard ? "DEMO" : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">{isDashboard ? "Demo User" : "Guest User"}</p>
                <p className="text-xs text-sky-100">{isDashboard ? "Administrator" : "Visitor"}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Collapsed User Profile */}
        {isCollapsed && (
          <div className="p-4 border-t border-sky-300/30 flex justify-center">
            <Avatar className="w-10 h-10 ring-2 ring-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold">{isDashboard ? "D" : "U"}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  )
}
