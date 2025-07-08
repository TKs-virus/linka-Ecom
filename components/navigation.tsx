"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

/**
 * A simple, responsive top navigation bar that can be reused
 * across the marketing pages of the application.
 */
export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold">
          {"Linka"}
        </Link>

        {/* Desktop links */}
        <nav className="hidden gap-6 md:flex">
          <Link href="/products" className="transition-colors hover:text-primary">
            {"Products"}
          </Link>
          <Link href="/services" className="transition-colors hover:text-primary">
            {"Services"}
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            {"About"}
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              {"Login"}
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">{"Sign Up"}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navigation
