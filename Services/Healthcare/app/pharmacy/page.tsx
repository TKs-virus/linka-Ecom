"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, ShoppingCart, Star, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function OnlinePharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState(0)

  const categories = [
    {
      name: "Prescription Medications",
      description: "Upload your prescription and order medications",
      icon: "💊",
      color: "bg-blue-50 border-blue-200",
      href: "/pharmacy/prescription",
    },
    {
      name: "Over-the-Counter",
      description: "Pain relief, cold & flu, allergies, and more",
      icon: "🏥",
      color: "bg-green-50 border-green-200",
      href: "/pharmacy/otc",
    },
    {
      name: "Vitamins & Supplements",
      description: "Daily vitamins, minerals, and health supplements",
      icon: "🌿",
      color: "bg-orange-50 border-orange-200",
      href: "/pharmacy/vitamins",
    },
    {
      name: "Personal Care",
      description: "Skincare, oral care, hygiene products",
      icon: "🧴",
      color: "bg-purple-50 border-purple-200",
      href: "/pharmacy/personal-care",
    },
    {
      name: "Medical Devices",
      description: "Blood pressure monitors, thermometers, diabetic supplies",
      icon: "🩺",
      color: "bg-red-50 border-red-200",
      href: "/pharmacy/devices",
    },
    {
      name: "Baby & Mother Care",
      description: "Baby formula, diapers, maternity products",
      icon: "👶",
      color: "bg-pink-50 border-pink-200",
      href: "/pharmacy/baby-care",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Pain relief and fever reducer",
      price: 8.99,
      originalPrice: 12.99,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      prescription: false,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Vitamin D3 1000 IU",
      description: "Daily vitamin D supplement",
      price: 15.99,
      originalPrice: null,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.7,
      reviews: 189,
      inStock: true,
      prescription: false,
      badge: null,
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      description: "Acid reflux and heartburn relief",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      prescription: true,
      badge: "Prescription Required",
    },
    {
      id: 4,
      name: "Digital Thermometer",
      description: "Fast and accurate temperature reading",
      price: 19.99,
      originalPrice: null,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.4,
      reviews: 98,
      inStock: true,
      prescription: false,
      badge: "New",
    },
  ]

  const promotions = [
    {
      title: "Free Delivery",
      description: "On orders over $50",
      icon: <Truck className="w-8 h-8 text-green-600" />,
    },
    {
      title: "Same Day Delivery",
      description: "Order before 2 PM",
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Prescription Upload",
      description: "Easy online process",
      icon: <Upload className="w-8 h-8 text-purple-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">Linka</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600">
              Find Doctors
            </Link>
            <Link href="/pharmacy" className="text-blue-600 font-medium">
              Pharmacy
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="relative bg-transparent">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5">{cartItems}</Badge>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Online Pharmacy</h1>
            <p className="text-xl mb-6">
              Order medications and health products with fast, secure delivery to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Prescription
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Prescription</DialogTitle>
                    <DialogDescription>
                      Upload a clear photo or scan of your prescription. Our pharmacists will review it within 2 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop your prescription here</p>
                      <p className="text-sm text-gray-500 mb-4">or</p>
                      <Button variant="outline">Choose File</Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Patient Name</Label>
                      <Input id="patient-name" placeholder="Enter patient name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number for updates" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea id="notes" placeholder="Any special instructions or questions..." />
                    </div>
                    <Button className="w-full">Submit Prescription</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                onClick={() => {
                  const categoriesSection = document.getElementById("categories-section")
                  categoriesSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for medications, health products, or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* Promotions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {promotions.map((promo, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{promo.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
                <p className="text-gray-600">{promo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-12" id="categories-section">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className={`hover:shadow-lg transition-shadow cursor-pointer h-full ${category.color}`}>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline">View All Products</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    {product.badge && (
                      <Badge
                        className={`absolute top-2 right-2 ${
                          product.badge === "Prescription Required"
                            ? "bg-red-500"
                            : product.badge === "Best Seller"
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                      >
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <Link href={`/pharmacy/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant={product.inStock ? "secondary" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <Link href={`/pharmacy/product/${product.id}`}>
                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      variant={product.prescription ? "outline" : "default"}
                    >
                      {product.prescription ? "View Details" : "Add to Cart"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upload Prescription CTA */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need Prescription Medications?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Upload your prescription and our licensed pharmacists will review and process your order. We accept
              prescriptions from all licensed healthcare providers.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Prescription Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Prescription</DialogTitle>
                  <DialogDescription>
                    Upload a clear photo or scan of your prescription. Our pharmacists will review it within 2 hours.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your prescription here</p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-name-2">Patient Name</Label>
                    <Input id="patient-name-2" placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-2">Phone Number</Label>
                    <Input id="phone-2" placeholder="Enter phone number for updates" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes-2">Additional Notes (Optional)</Label>
                    <Textarea id="notes-2" placeholder="Any special instructions or questions..." />
                  </div>
                  <Button className="w-full">Submit Prescription</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
