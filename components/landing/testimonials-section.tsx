import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Local Business Owner",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Linka has transformed how I connect with customers. My sales have increased by 300% since joining the platform. The support team is amazing!",
      business: "Sarah's Artisan Bakery",
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "I love supporting local businesses through Linka. The delivery is super fast and I've discovered so many amazing products I never knew existed in my area.",
      business: "Verified Customer",
    },
    {
      name: "Emma Rodriguez",
      role: "Restaurant Owner",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "The food delivery service has been a game-changer for our restaurant. We've reached customers we never could before, and the platform is so easy to use.",
      business: "Emma's Kitchen",
    },
    {
      name: "David Thompson",
      role: "Frequent Shopper",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Shopping local has never been easier. The variety of products and services available on Linka is incredible. Plus, I feel good supporting my community.",
      business: "Verified Customer",
    },
    {
      name: "Lisa Park",
      role: "Healthcare Provider",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Linka's healthcare platform has helped us reach more patients and provide better service. The booking system is intuitive and our patients love the convenience.",
      business: "Park Family Clinic",
    },
    {
      name: "James Wilson",
      role: "Course Instructor",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      content:
        "Teaching through Linka's e-learning platform has allowed me to share my skills with the local community. The tools are professional and easy to use.",
      business: "Wilson Photography School",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">What Our Community Says</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who are building stronger communities together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-orange-500 mb-2" />
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-orange-600 font-medium">{testimonial.business}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="text-xs">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">Join 50,000+ happy customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
