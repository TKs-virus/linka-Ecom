import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Pill, Shield, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practice",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
      experience: "15 years",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80",
      experience: "12 years",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
      experience: "10 years",
    },
  ]

  const pharmacyCategories = [
    { name: "Prescription Medications", icon: "💊" },
    { name: "Over-the-Counter", icon: "🏥" },
    { name: "Vitamins & Supplements", icon: "🌿" },
    { name: "Personal Care", icon: "🧴" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">Linka</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600">
              Find Doctors
            </Link>
            <Link href="/pharmacy" className="text-gray-600 hover:text-blue-600">
              Pharmacy
            </Link>
            <Button variant="outline">Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Health, <span className="text-blue-600">Connected</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Access quality healthcare from the comfort of your home. Book consultations with certified doctors or order
            medications online.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Consultation Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Online Consultation</CardTitle>
                <CardDescription className="text-lg">
                  Connect with certified doctors via video, phone, or chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/doctors">
                  <Button className="w-full text-lg py-6" size="lg">
                    Book a Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pharmacy Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Pill className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Online Pharmacy</CardTitle>
                <CardDescription className="text-lg">
                  Order prescription medications and health products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pharmacy">
                  <Button className="w-full text-lg py-6 bg-green-600 hover:bg-green-700" size="lg">
                    Order Medication
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Linka Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Service</h3>
              <p className="text-gray-600">Select between online consultation or pharmacy services</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book or Order</h3>
              <p className="text-gray-600">Schedule an appointment or add items to your cart</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Care</h3>
              <p className="text-gray-600">Receive treatment or have medications delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Doctors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{doctor.experience} experience</p>
                  <Link href={`/doctors/${doctor.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Pharmacy Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {pharmacyCategories.map((category, index) => (
              <Link key={index} href="/pharmacy">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">HIPAA compliant platform</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Licensed Doctors</h3>
              <p className="text-gray-600">Board-certified physicians</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
              <p className="text-gray-600">Round-the-clock care</p>
            </div>
            <div>
              <Pill className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick medication delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-2xl font-bold">Linka</span>
              </div>
              <p className="text-gray-400">Your trusted healthcare partner</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/doctors">Online Consultations</Link>
                </li>
                <li>
                  <Link href="/pharmacy">Online Pharmacy</Link>
                </li>
                <li>Health Records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">support@linka.health</p>
              <p className="text-gray-400">1-800-LINKA-CARE</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Linka Healthcare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
