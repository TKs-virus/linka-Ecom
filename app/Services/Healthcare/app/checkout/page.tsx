"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Smartphone,
  Building2,
  Bitcoin,
  Shield,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [selectedEWallet, setSelectedEWallet] = useState("")
  const [selectedMobileMoney, setSelectedMobileMoney] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 8.99,
      quantity: 2,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Vitamin D3 1000 IU",
      price: 15.99,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Payment options
  const eWallets = [
    { id: "paypal", name: "PayPal", icon: "💳", fee: "2.9%" },
    { id: "apple-pay", name: "Apple Pay", icon: "🍎", fee: "Free" },
    { id: "google-pay", name: "Google Pay", icon: "📱", fee: "Free" },
    { id: "amazon-pay", name: "Amazon Pay", icon: "📦", fee: "2.9%" },
  ]

  const cryptoWallets = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", rate: 43250.5, icon: "₿" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", rate: 2840.25, icon: "Ξ" },
    { id: "usdc", name: "USD Coin", symbol: "USDC", rate: 1.0, icon: "💵" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", rate: 72.8, icon: "Ł" },
  ]

  const mobileMoneyProviders = [
    { id: "mpesa", name: "M-Pesa", icon: "📱", countries: ["Kenya", "Tanzania"] },
    { id: "mtn-money", name: "MTN Mobile Money", icon: "💛", countries: ["Ghana", "Uganda"] },
    { id: "airtel-money", name: "Airtel Money", icon: "🔴", countries: ["Kenya", "Rwanda"] },
    { id: "orange-money", name: "Orange Money", icon: "🟠", countries: ["Senegal", "Mali"] },
  ]

  const getCryptoAmount = (cryptoId: string) => {
    const crypto = cryptoWallets.find((c) => c.id === cryptoId)
    if (!crypto) return "0"
    return (total / crypto.rate).toFixed(8)
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
  }

  if (orderComplete) {
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
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. Your medications will be prepared and delivered to you soon.
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Order Number</span>
                  <span className="font-mono">#LNK2024001</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total Paid</span>
                  <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated Delivery</span>
                  <span className="text-blue-600">Tomorrow, 2-4 PM</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Link href="/orders">
                <Button variant="outline">Track Order</Button>
              </Link>
              <Link href="/pharmacy">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="State" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input id="zip" placeholder="ZIP Code" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea id="instructions" placeholder="Any special delivery instructions..." />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label htmlFor="payment-method">Select Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ewallet">
                        <div className="flex items-center space-x-2">
                          <Wallet className="w-4 h-4" />
                          <span>E-Wallet</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="crypto">
                        <div className="flex items-center space-x-2">
                          <Bitcoin className="w-4 h-4" />
                          <span>Cryptocurrency</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="w-4 h-4" />
                          <span>Mobile Money</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="bank">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4" />
                          <span>Bank Account</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* E-Wallet Options */}
                {paymentMethod === "ewallet" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Choose your E-Wallet</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {eWallets.map((wallet) => (
                        <div
                          key={wallet.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedEWallet === wallet.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedEWallet(wallet.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{wallet.icon}</span>
                              <div>
                                <p className="font-medium">{wallet.name}</p>
                                <p className="text-sm text-gray-500">Fee: {wallet.fee}</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              {selectedEWallet === wallet.id && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedEWallet && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          You will be redirected to {eWallets.find((w) => w.id === selectedEWallet)?.name} to complete
                          your payment.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Crypto Options */}
                {paymentMethod === "crypto" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Choose your Cryptocurrency</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {cryptoWallets.map((crypto) => (
                        <div
                          key={crypto.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedCrypto === crypto.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedCrypto(crypto.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl font-bold">{crypto.icon}</span>
                              <div>
                                <p className="font-medium">{crypto.name}</p>
                                <p className="text-sm text-gray-500">${crypto.rate.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              {selectedCrypto === crypto.id && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedCrypto && (
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Bitcoin className="w-5 h-5 text-orange-600" />
                            <span className="font-medium text-orange-800">Crypto Payment Details</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Amount to pay:</span>
                              <span className="font-medium">
                                {getCryptoAmount(selectedCrypto)}{" "}
                                {cryptoWallets.find((c) => c.id === selectedCrypto)?.symbol}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>USD Equivalent:</span>
                              <span className="font-medium">${total.toFixed(2)}</span>
                            </div>
                            <p className="text-orange-700 mt-2">
                              The equivalent USD amount will be converted to your selected cryptocurrency at current
                              market rates.
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="wallet-address">Your Wallet Address</Label>
                          <Input id="wallet-address" placeholder="Enter your crypto wallet address" className="mt-1" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Money Options */}
                {paymentMethod === "mobile" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Choose your Mobile Money Provider</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {mobileMoneyProviders.map((provider) => (
                        <div
                          key={provider.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedMobileMoney === provider.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedMobileMoney(provider.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{provider.icon}</span>
                              <div>
                                <p className="font-medium">{provider.name}</p>
                                <p className="text-sm text-gray-500">{provider.countries.join(", ")}</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              {selectedMobileMoney === provider.id && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedMobileMoney && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mobile-number">Mobile Number</Label>
                          <Input id="mobile-number" placeholder="Enter your mobile money number" className="mt-1" />
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">
                            You will receive a prompt on your phone to authorize the payment of ${total.toFixed(2)}.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bank Account Options */}
                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Bank Account Details</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="account-holder">Account Holder Name</Label>
                        <Input id="account-holder" placeholder="Enter account holder name" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input id="account-number" placeholder="Enter account number" className="mt-1" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="routing-number">Routing Number</Label>
                          <Input id="routing-number" placeholder="Routing number" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="bank-name">Bank Name</Label>
                          <Input id="bank-name" placeholder="Bank name" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-blue-800 font-medium">Secure Bank Transfer</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">
                          Your bank details are encrypted and processed securely. Processing may take 1-3 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that prescription medications require valid prescriptions and may be subject to
                    pharmacist verification.
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={
                !paymentMethod ||
                isProcessing ||
                (paymentMethod === "ewallet" && !selectedEWallet) ||
                (paymentMethod === "crypto" && !selectedCrypto) ||
                (paymentMethod === "mobile" && !selectedMobileMoney)
              }
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Complete Payment - ${total.toFixed(2)}</span>
                </div>
              )}
            </Button>

            {/* Security Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Secure Payment</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>Fraud protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Delivery Information</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🚚</span>
                    <span>Same-day delivery available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">📦</span>
                    <span>Discreet packaging</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">📱</span>
                    <span>Real-time tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">💊</span>
                    <span>Prescription verification included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
