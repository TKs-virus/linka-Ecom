import type React from "react"
import { cookies } from "next/headers"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/retailer/app-sidebar"
import { Button } from "@/components/ui/button" // Added
import { LogOut } from "lucide-react" // Added
import { logoutUser } from "@/app/actions/auth-actions" // Added

export default function RetailersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            {/* The h1 title will be set by the specific page, e.g., Dashboard page */}
          </div>
          <form action={logoutUser}>
            {" "}
            {/* Added logout form */}
            <Button variant="ghost" size="icon" type="submit">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </form>
        </header>
        <main className="flex-1">{children}</main> {/* Removed p-4, let page add its own padding */}
      </SidebarInset>
    </SidebarProvider>
  )
}
