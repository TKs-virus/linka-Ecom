"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, LogIn } from "lucide-react" // Changed Leaf to ShoppingBag for e-commerce context

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-primary" /> {/* Changed icon */}
          <span className="font-bold sm:inline-block">Linka</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-4 text-sm font-medium md:flex">
          <Link href="/shop" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Shop
          </Link>
          <Link href="#how-it-works" className="text-foreground/60 transition-colors hover:text-foreground/80">
            How it Works
          </Link>
          <Link href="#for-retailers" className="text-foreground/60 transition-colors hover:text-foreground/80">
            For Retailers
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login?type=signup">
              {" "}
              {/* Assuming signup is part of login page or a separate one */}
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
