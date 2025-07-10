import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { CartProvider } from "@/contexts/cart-context"

const inter = localFont({
  src: [
    {
      path: "../../../public/fonts/inter/web/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/inter/web/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
})
export const metadata: Metadata = {
  title: "Linka - Online Learning Platform",
  description: "Discover and learn with Linka's comprehensive course catalog",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
