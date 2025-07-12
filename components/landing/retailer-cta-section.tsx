"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

/**
 * Call-to-action section encouraging retailers to join Linka.
 * Exported as `RetailerCtaSection` to satisfy the deployment check.
 */
export function RetailerCtaSection() {
  return (
    <section id="retailer-cta" className="mx-auto max-w-6xl px-6 py-20 md:px-10 lg:py-28">
      <Card className="flex flex-col items-center gap-8 rounded-2xl bg-gradient-to-br from-[#E67E22]/10 to-[#2E86AB]/10 p-10 text-center shadow-lg md:flex-row md:text-left">
        <CardHeader className="flex-shrink-0">
          <Image src="/linka-logo.png" alt="Linka brand logo" width={120} height={120} priority />
        </CardHeader>

        <CardContent className="space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Become a Linka Retail Partner
          </h2>
          <p className="text-muted-foreground">
            Access a new audience, boost your sales, and get real-time insights with our analytics dashboard. Join
            hundreds of successful retailers already growing with Linka.
          </p>
        </CardContent>

        <CardFooter className="mt-4 md:mt-0">
          <Button size="lg" className="bg-[#E67E22] text-white hover:bg-[#d66f1e]">
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
