import type React from "react"
import { ShoppingCart, Search, Heart, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartSidebar } from "@/components/shop/cart-sidebar"
import { UserMenu } from "@/components/user-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Suspense } from "react"

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <nav className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span>Linka</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/shop" className="text-foreground transition-colors hover:text-primary">
              Shop
            </Link>
            <Link href="/shop/categories" className="text-muted-foreground transition-colors hover:text-foreground">
              Categories
            </Link>
            <Link href="/shop/deals" className="text-muted-foreground transition-colors hover:text-foreground">
              Deals
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/shop" className="text-lg font-medium">
                Shop
              </Link>
              <Link href="/shop/categories" className="text-lg font-medium">
                Categories
              </Link>
              <Link href="/shop/deals" className="text-lg font-medium">
                Deals
              </Link>
              <Link href="/profile" className="text-lg font-medium">
                Profile
              </Link>
              <Link href="/orders" className="text-lg font-medium">
                Orders
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Suspense fallback={null}>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <CartSidebar />
            <UserMenu />
          </div>
        </Suspense>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
