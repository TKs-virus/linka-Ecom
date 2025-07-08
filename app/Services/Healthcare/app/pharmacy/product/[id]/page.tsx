"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id
  const [quantity, setQuantity] = useState("1")
  const [selectedImage, setSelectedImage] = useState(0)

  const [cartItems, setCartItems] = useState(0)
  const [isInCart, setIsInCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [showAddedToFavorites, setShowAddedToFavorites] = useState(false)

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: 1,
    name: "Paracetamol Tablets 500mg",
    genericName: "Acetaminophen",
    strength: "500mg",
    price: 8.99,
    originalPrice: 12.99,
    manufacturer: "PharmaCorp Ltd.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    rating: 4.5,
    reviews: 234,
    inStock: true,
    stockCount: 150,
    prescription: false,
    category: "Pain Relief",
    description:
      "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature. It's available combined with other painkillers and anti-sickness medicines.",
    activeIngredient: "Paracetamol 500mg per tablet",
    dosageForm: "Oral Tablet",
    packSize: "20 tablets per pack",
    expiryDate: "12/2026",
    batchNumber: "PAR2024001",

    dosageInstructions: {
      adults: "1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
      children: "Not recommended for children under 12 years without medical supervision.",
      elderly: "Same as adult dose, but consult healthcare provider if you have kidney or liver problems.",
    },

    indications: ["Headache and migraine", "Toothache", "Period pain", "Back pain", "Muscle pain", "Fever reduction"],

    contraindications: ["Allergy to paracetamol", "Severe liver disease", "Chronic alcohol abuse"],

    sideEffects: {
      common: ["Nausea", "Stomach upset (rare)"],
      rare: ["Skin rash", "Blood disorders", "Liver damage (with overdose)"],
      serious: ["Severe allergic reactions", "Liver failure (with overdose)"],
    },

    warnings: [
      "Do not exceed the recommended dose",
      "Avoid alcohol while taking this medication",
      "Consult a doctor if symptoms persist for more than 3 days",
      "Keep out of reach of children",
      "Do not take with other paracetamol-containing medicines",
    ],

    storage: "Store below 25°C in a dry place. Keep in original packaging.",

    relatedProducts: [
      { id: 2, name: "Ibuprofen 400mg", price: 9.99, image: "/placeholder.svg?height=100&width=100" },
      { id: 3, name: "Aspirin 75mg", price: 6.99, image: "/placeholder.svg?height=100&width=100" },
      { id: 4, name: "Paracetamol Liquid", price: 11.99, image: "/placeholder.svg?height=100&width=100" },
    ],
  }

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "1 week ago",
      comment: "Very effective for headaches. Fast delivery and good packaging.",
      verified: true,
    },
    {
      id: 2,
      name: "John D.",
      rating: 4,
      date: "2 weeks ago",
      comment: "Works well for pain relief. Good value for money.",
      verified: true,
    },
    {
      id: 3,
      name: "Emma L.",
      rating: 5,
      date: "3 weeks ago",
      comment: "Always keep these in my medicine cabinet. Reliable brand.",
      verified: false,
    },
  ]

  const handleAddToCart = () => {
    if (!product.inStock) return

    const quantityToAdd = Number.parseInt(quantity)
    setCartItems((prev) => prev + quantityToAdd)
    setIsInCart(true)
    setShowAddedToCart(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowAddedToCart(false)
    }, 3000)

    console.log(`Added ${quantityToAdd} of ${product.name} to cart`)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    setShowAddedToFavorites(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowAddedToFavorites(false)
    }, 3000)

    console.log(`${isFavorite ? "Removed from" : "Added to"} favorites: ${product.name}`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Product link copied to clipboard!")
    }
  }

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
              <Button variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItems > 0 && <Badge className="ml-2 px-1 min-w-[1.25rem] h-5">{cartItems}</Badge>}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/pharmacy" className="hover:text-blue-600">
            Pharmacy
          </Link>
          <span>/</span>
          <Link href="/pharmacy/otc" className="hover:text-blue-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link href="/pharmacy" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pharmacy
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border p-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-lg p-1 ${
                    selectedImage === index ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-2">Generic: {product.genericName}</p>
              <p className="text-gray-600">Strength: {product.strength}</p>
              <p className="text-gray-600">Manufacturer: {product.manufacturer}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-red-500">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Badge variant={product.inStock ? "secondary" : "destructive"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              {product.inStock && <span className="text-sm text-gray-600">{product.stockCount} units available</span>}
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Pack Size:</span>
                <span>{product.packSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dosage Form:</span>
                <span>{product.dosageForm}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Expiry Date:</span>
                <span>{product.expiryDate}</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Quantity</Label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleFavorite}
                  className={isFavorite ? "bg-red-50 border-red-200 text-red-600" : ""}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Success Messages */}
            {showAddedToCart && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">Added {quantity} item(s) to cart successfully!</span>
              </div>
            )}

            {showAddedToFavorites && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600 fill-blue-600" />
                <span className="text-blue-800">{isFavorite ? "Added to favorites!" : "Removed from favorites!"}</span>
              </div>
            )}

            {/* Delivery Info */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Same Day Delivery</p>
                  <p className="text-sm text-gray-600">Order before 2 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-gray-600">SSL encrypted checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="dosage">Dosage</TabsTrigger>
              <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
              <TabsTrigger value="warnings">Warnings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Product Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Active Ingredient</h3>
                  <p className="text-gray-700">{product.activeIngredient}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Indications</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {product.indications.map((indication, index) => (
                      <li key={index}>{indication}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dosage" className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Adults (18+ years)</h3>
                  <p className="text-gray-700">{product.dosageInstructions.adults}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Children</h3>
                  <p className="text-gray-700">{product.dosageInstructions.children}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Elderly</h3>
                  <p className="text-gray-700">{product.dosageInstructions.elderly}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Important</p>
                      <p className="text-yellow-700 text-sm">
                        Always follow the dosage instructions and consult a healthcare professional if unsure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="side-effects" className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Common Side Effects</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {product.sideEffects.common.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Rare Side Effects</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {product.sideEffects.rare.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Serious Side Effects</h3>
                  <ul className="list-disc list-inside text-red-700 space-y-1">
                    {product.sideEffects.serious.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="warnings" className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Important Warnings</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {product.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contraindications</h3>
                  <ul className="list-disc list-inside text-red-700 space-y-1">
                    {product.contraindications.map((contra, index) => (
                      <li key={index}>{contra}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Storage</h3>
                  <p className="text-gray-700">{product.storage}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={100}
                    height={100}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <p className="text-xl font-bold text-green-600 mb-3">${relatedProduct.price}</p>
                  <Link href={`/pharmacy/product/${relatedProduct.id}`}>
                    <Button className="w-full">View Product</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
