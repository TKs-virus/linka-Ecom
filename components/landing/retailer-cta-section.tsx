import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Store, TrendingUp, Users } from "lucide-react"

export function RetailerCtaSection() {
  const benefits = [
    {
      icon: Store,
      title: "Easy Setup",
      description: "Get your online store running in minutes with our intuitive setup process.",
    },
    {
      icon: TrendingUp,
      title: "Boost Sales",
      description: "Reach more customers and increase revenue with our marketing tools.",
    },
    {
      icon: Users,
      title: "Customer Insights",
      description: "Understand your customers better with detailed analytics and reports.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to Grow Your Business?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of retailers who trust Linka to power their online presence and connect with local customers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <benefit.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">
                Start Selling Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/dashboard">Guest Login</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required • Free 30-day trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
