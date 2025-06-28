import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Package, ShoppingCart, Users, BarChart3, Megaphone, Settings, LifeBuoy } from "lucide-react"
import Link from "next/link"

const mainMenuItems = [
  { title: "Dashboard", icon: Home, href: "/dashboard" },
  { title: "Orders", icon: ShoppingCart, href: "/dashboard/orders" }, // Updated href
  { title: "Products", icon: Package, href: "/dashboard/products" }, // Updated href
  { title: "Customers", icon: Users, href: "/dashboard/customers" }, // Updated href
]

const secondaryMenuItems = [
  { title: "Marketing", icon: Megaphone, href: "/dashboard/marketing" },
  { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
]

const utilityMenuItems = [
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Help & Support", icon: LifeBuoy, href: "/dashboard/help" },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Store Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
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
          <SidebarGroupLabel>Growth & Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          {" "}
          {/* Pushes this group to the bottom if content is scrollable */}
          <SidebarGroupLabel>Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
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
    </Sidebar>
  )
}
