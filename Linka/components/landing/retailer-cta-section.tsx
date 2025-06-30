import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Store } from "lucide-react"

const benefits = [
  "Reach thousands of customers across Zambia.",
  "Easy-to-use tools to manage your online store.",
  "Secure payments and reliable delivery options.",
  "Grow your business with Linka's support.",
]

export function RetailerCtaSection() {
  return (
    <section id="for-retailers" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              For Retailers & SMEs
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Empower Your Business with Linka</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join our platform designed to help Zambian SMEs thrive in the digital age. Showcase your products, connect
              with customers, and expand your reach like never before.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild className="mt-8">
              <Link href="/login?type=retailer">
                <Store className="mr-2 h-5 w-5" />
                Start Selling Today
              </Link>
            </Button>
          </div>
          <div className="hidden md:block">
            {/* You can use a relevant image or illustration here */}
            <Image
              src="/placeholder.svg?width=500&height=400&text=Happy+Retailer"
              alt="Retailer using Linka platform"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
