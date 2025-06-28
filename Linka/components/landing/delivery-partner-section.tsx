import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, Zap } from "lucide-react"

export function DeliveryPartnerSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto px-4 text-center">
        <Truck className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Efficient Delivery Network</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Linka partners with reliable local delivery services to ensure your goods are transported swiftly and safely.
          Interested in becoming a delivery partner?
        </p>
        <Button size="lg" variant="outline" asChild className="mt-8">
          <Link href="/delivery-signup">
            {" "}
            {/* Assuming a dedicated page for delivery partners */}
            <Zap className="mr-2 h-5 w-5" />
            Partner with Us
          </Link>
        </Button>
      </div>
    </section>
  )
}
