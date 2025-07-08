import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { LocationProvider } from "@/components/location-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Linka - Food Delivery",
  description: "Order food from your favorite restaurants",
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
        <LocationProvider>
          <CartProvider>{children}</CartProvider>
        </LocationProvider>
      </body>
    </html>
  )
}
