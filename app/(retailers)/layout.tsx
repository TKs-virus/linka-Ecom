import type React from "react"
import { AppSidebar } from "@/components/retailer/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-1">{children}</SidebarInset>
    </SidebarProvider>
  )
}
