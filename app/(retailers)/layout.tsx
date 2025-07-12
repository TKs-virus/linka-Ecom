import type React from "react"
import { AppSidebar } from "@/components/ui/app-sidebar"

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="ml-80">{children}</div>
    </div>
  )
}
