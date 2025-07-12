import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ServicesOverview() {
  const services = [
    {
      name: "E-commerce",
      description: "Sell your products online with a fully customizable e-commerce platform.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      link: "https://e-com.example.com",
    },
    {
      name: "Food Delivery",
      description: "Offer online ordering and delivery services to your customers.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      link: "https://food-delivery.example.com",
    },
    {
      name: "Healthcare",
      description: "Provide online appointment booking and telehealth services.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      link: "https://healthcare.example.com",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Explore Our <span className="gradient-text-linka">Industry Platforms</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer tailored solutions for various industries, helping local businesses thrive online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.name}
              className="border-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={service.imageUrl || "/placeholder.svg"}
                    alt={service.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <Button
                  variant="outline"
                  className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 bg-transparent"
                  asChild
                >
                  <Link href={service.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
