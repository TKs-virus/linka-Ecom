"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  type: "course" | "product"
  moq?: number // Minimum order quantity for wholesale products
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Advanced Digital Marketing Course",
      price: 299.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      type: "course",
    },
    {
      id: "2",
      name: "Business Analytics Masterclass",
      price: 199.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      type: "course",
    },
    {
      id: "3",
      name: "Industrial LED Lights (Wholesale)",
      price: 45.5,
      quantity: 100,
      image: "/placeholder.svg?height=100&width=100",
      type: "product",
      moq: 50,
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const minQty = item.type === "product" && item.moq ? item.moq : 1
          return { ...item, quantity: Math.max(minQty, newQuantity) }
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = cartItems.some((item) => item.type === "product") ? 25.0 : 0 // Shipping only for physical products
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Linka
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/wholesale" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Wholesale
              </Link>
              <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Courses
              </Link>
              <div className="flex items-center text-primary">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="font-medium">Cart ({cartItems.length})</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Shopping Cart ({cartItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button className="mt-4" asChild>
                      <Link href="/wholesale/products">Continue Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type === "course" ? "Digital Course" : "Wholesale Product"}
                        </p>
                        {item.moq && <p className="text-xs text-blue-600">MOQ: {item.moq} units</p>}
                        <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= (item.moq || 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-20 text-center"
                          min={item.moq || 1}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full" size="lg" disabled={cartItems.length === 0} asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/wholesale/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">🔒 Secure Checkout</p>
                  <p>Your payment information is encrypted and secure</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
