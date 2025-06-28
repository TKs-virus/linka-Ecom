import type React from "react"
import { ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="/shop" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Linka</span>
          </Link>
          <Link href="/shop" className="text-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/shop/categories" className="text-muted-foreground transition-colors hover:text-foreground">
            Categories
          </Link>
          <Link href="/shop/deals" className="text-muted-foreground transition-colors hover:text-foreground">
            Deals
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">My Account</span>
            </Button>
          </div>
          {/* Add Logout Button Here */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
