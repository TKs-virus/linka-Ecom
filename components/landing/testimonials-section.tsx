import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jane Cooper",
      title: "Owner, Local Cafe",
      avatarUrl: "/placeholder-user.jpg",
      rating: 5,
      comment:
        "Linka has transformed our business! We've seen a huge increase in online orders and new customers. Highly recommended!",
    },
    {
      name: "John Smith",
      title: "Manager, Clothing Boutique",
      avatarUrl: "/placeholder-user.jpg",
      rating: 4,
      comment:
        "The platform is easy to use and the support team is fantastic. We're reaching a wider audience and boosting our sales.",
    },
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            What Our <span className="gradient-text-linka">Customers</span> Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how local businesses are thriving with Linka. Read their success stories and discover the benefits of
            joining our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-4">
                    <AvatarImage src={testimonial.avatarUrl || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
