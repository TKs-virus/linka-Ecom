import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCartIcon, StoreIcon, RocketIcon } from "lucide-react"

const steps = [
  {
    icon: <ShoppingCartIcon className="mb-4 h-12 w-12 text-primary" />,
    title: "Customers: Discover & Buy",
    description: "Browse a wide range of products from local SMEs, add to cart, and checkout securely.",
  },
  {
    icon: <StoreIcon className="mb-4 h-12 w-12 text-primary" />,
    title: "Retailers: Showcase & Sell",
    description: "Easily set up your online store, manage inventory, and reach more customers across Zambia.",
  },
  {
    icon: <RocketIcon className="mb-4 h-12 w-12 text-primary" />, // Changed from Truck for a more dynamic feel
    title: "Delivery: Swift & Reliable",
    description: "Our network of delivery partners ensures your orders reach you quickly and safely.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Linka Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">A simple, efficient process for everyone involved.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center">{step.icon}</div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
