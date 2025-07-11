import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Use local Inter font
const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/web/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/web/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    // Add more weights/styles if needed
  ],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Linka - Business Management Platform",
  description: "Comprehensive business management platform for retailers and customers",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
