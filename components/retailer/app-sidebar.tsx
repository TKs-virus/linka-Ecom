"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Package, ShoppingCart, Users, Megaphone, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      badge: null,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
      badge: "23",
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
      badge: "5",
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
      badge: null,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      title: "Marketing",
      url: "/dashboard/marketing",
      icon: Megaphone,
      badge: null,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props} className="w-72 bg-gradient-to-b from-blue-600 to-teal-500">
      <SidebarHeader className="border-b border-white/10 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LINKA</h1>
            <p className="text-sm text-blue-100">Business Intelligence</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "w-full h-12 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200",
                      pathname === item.url && "bg-white/20 text-white shadow-lg",
                    )}
                  >
                    <Link href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-white text-blue-600 font-bold">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-blue-100 truncate">Administrator</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
