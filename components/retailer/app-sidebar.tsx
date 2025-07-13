"use client"

import type * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Megaphone,
  Gift,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
  ],
  marketing: [
    {
      title: "Marketing",
      url: "/dashboard/marketing",
      icon: Megaphone,
    },
    {
      title: "Promotions",
      url: "/dashboard/marketing/promotions",
      icon: Gift,
    },
  ],
  support: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-3 px-3 py-2">
          <Image src="/linka-logo.png" alt="Linka Logo" width={32} height={32} className="object-contain" />
          <span className="text-lg font-bold gradient-text-linka">Linka</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-brand-orange font-semibold">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "hover:bg-brand-orange/10 hover:text-brand-orange",
                      pathname === item.url && "bg-brand-orange/10 text-brand-orange border-r-2 border-brand-orange",
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-brand-blue font-semibold">Marketing & Sales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.marketing.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "hover:bg-brand-blue/10 hover:text-brand-blue",
                      pathname === item.url && "bg-brand-blue/10 text-brand-blue border-r-2 border-brand-blue",
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.support.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-3">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className="bg-brand-orange text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">john@retailer.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
