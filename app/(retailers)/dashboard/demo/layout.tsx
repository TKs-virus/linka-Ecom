import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LINKA Dashboard Demo | Business Intelligence Platform",
  description:
    "Experience the power of LINKA's comprehensive business intelligence dashboard with real-time analytics, insights, and performance metrics.",
  keywords: ["business intelligence", "dashboard", "analytics", "retail", "e-commerce", "LINKA"],
  openGraph: {
    title: "LINKA Dashboard Demo",
    description: "Comprehensive business intelligence platform for modern retailers",
    type: "website",
  },
}

export default function DashboardDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
