import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { LocationProvider } from "@/components/location-provider"

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
  title: "Linka - Food Delivery",
  description: "Order food from your favorite restaurants",
  generator: "v0.dev",
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
