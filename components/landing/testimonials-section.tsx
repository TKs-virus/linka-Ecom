import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Local Business Owner",
      company: "Artisan Bakery",
      image: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Linka has transformed how we connect with our community. Our online sales have increased by 300% since joining the platform.",
      highlight: "300% increase in sales",
    },
    {
      name: "Michael Chen",
      role: "Customer",
      company: "Regular Shopper",
      image: "/placeholder-user.jpg",
      rating: 5,
      content:
        "I love supporting local businesses through Linka. The delivery is fast, and I always discover amazing new products in my area.",
      highlight: "Fast local delivery",
    },
    {
      name: "Emma Rodriguez",
      role: "Restaurant Owner",
      company: "Bella Vista Cafe",
      image: "/placeholder-user.jpg",
      rating: 5,
      content:
        "The food delivery platform is incredibly user-friendly. Our customers love the real-time tracking and easy ordering process.",
      highlight: "User-friendly platform",
    },
    {
      name: "David Park",
      role: "Healthcare Provider",
      company: "Community Clinic",
      image: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Linka's healthcare platform has streamlined our appointment booking and made telemedicine accessible to all our patients.",
      highlight: "Streamlined operations",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            What Our <span className="gradient-text-linka">Community</span> Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from local businesses and customers who are making a difference in their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-gray-200/50 hover:border-brand-orange/30 transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-brand-orange/20">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-brand-orange/10 text-brand-orange font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-brand-blue font-medium">{testimonial.company}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-brand-orange/20" />
                  <blockquote className="text-gray-700 leading-relaxed pl-6">"{testimonial.content}"</blockquote>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">{testimonial.highlight}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200/50">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-orange to-brand-blue border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">4.9/5</span> from 10,000+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
