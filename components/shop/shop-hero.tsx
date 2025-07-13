"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ShopHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 py-16 text-center lg:py-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
          Discover Premium Local Products &amp; Services
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
          Support neighbourhood businesses while enjoying world-class quality.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#shop">Shop now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white/60 hover:bg-white/10 bg-transparent"
          >
            <Link href="/about">Learn more</Link>
          </Button>
        </div>
      </div>

      {/* subtle shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.1),transparent_30%)]"
      />
    </section>
  )
}
