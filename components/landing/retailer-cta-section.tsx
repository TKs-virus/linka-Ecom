"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function RetailerCtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-r from-[#E67E22]/10 to-[#2E86AB]/10 py-16 lg:py-24"
      id="retailer-cta"
    >
      {/*   Decorative blobs   */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-[72rem] -translate-x-1/2 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-full bg-gradient-to-tr from-[#E67E22]/30 to-[#2E86AB]/30 opacity-40"
          style={{
            clipPath: "polygon(74% 44%, 100% 58%, 97% 90%, 53% 100%, 11% 86%, 0 49%, 28% 0, 65% 13%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Image src="/linka-logo.png" alt="Linka logo" width={72} height={72} className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold tracking-tight text-[#2E86AB] sm:text-4xl">Sell smarter with Linka</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-700">
          Join hundreds of retailers already increasing sales and reaching new customers on Africa’s leading
          social-commerce marketplace.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-[#E67E22] hover:bg-[#d76c12]">
            <Link href="/signup?role=retailer">Get started</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="border-[#2E86AB] text-[#2E86AB] hover:bg-[#2E86AB]/10 bg-transparent"
          >
            <Link href="/login">I already have an account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
