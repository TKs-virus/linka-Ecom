import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

const cartItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Portable Phone Charger",
    price: 29.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Linka
            </Link>
            <nav className="flex items-center space-x-4 md:space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto sm:mx-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                      <p className="text-gray-600 text-sm md:text-base">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2 mx-auto sm:mx-0">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                        <Minus className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <span className="px-2 md:px-3 py-1 border rounded text-sm">{item.quantity}</span>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                        <Plus className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="font-semibold text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 mt-1">
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-base md:text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full mt-2 bg-transparent text-sm md:text-base">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
