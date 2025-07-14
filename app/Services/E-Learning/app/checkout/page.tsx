"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Wallet, Smartphone, Bitcoin, ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/cart-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type PaymentMethod = "card" | "ewallet" | "bank" | "mobile" | "crypto"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  const PaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
          </div>
        )

      case "ewallet":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ewallet">Select E-Wallet</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your e-wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple">Apple Pay</SelectItem>
                  <SelectItem value="google">Google Pay</SelectItem>
                  <SelectItem value="samsung">Samsung Pay</SelectItem>
                  <SelectItem value="skrill">Skrill</SelectItem>
                  <SelectItem value="neteller">Neteller</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ewalletEmail">E-Wallet Email/Username</Label>
              <Input id="ewalletEmail" placeholder="your-ewallet@example.com" />
            </div>
            <div>
              <Label htmlFor="ewalletPassword">Password</Label>
              <Input id="ewalletPassword" type="password" placeholder="Enter your e-wallet password" />
            </div>
          </div>
        )

      case "bank":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chase">Chase Bank</SelectItem>
                  <SelectItem value="bofa">Bank of America</SelectItem>
                  <SelectItem value="wells">Wells Fargo</SelectItem>
                  <SelectItem value="citi">Citibank</SelectItem>
                  <SelectItem value="goldman">Goldman Sachs</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" placeholder="Enter your account number" />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input id="routingNumber" placeholder="Enter routing number" />
            </div>
            <div>
              <Label htmlFor="accountHolder">Account Holder Name</Label>
              <Input id="accountHolder" placeholder="Full name as on account" />
            </div>
          </div>
        )

      case "mobile":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="orange">Orange Money</SelectItem>
                  <SelectItem value="tigo">Tigo Pesa</SelectItem>
                  <SelectItem value="vodacom">Vodacom M-Pesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="mobilePin">Mobile Money PIN</Label>
              <Input id="mobilePin" type="password" placeholder="Enter your PIN" />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                You will receive an SMS prompt to confirm this transaction on your mobile device.
              </p>
            </div>
          </div>
        )

      case "crypto":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cryptoWallet">Crypto Wallet</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your crypto wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metamask">MetaMask</SelectItem>
                  <SelectItem value="coinbase">Coinbase Wallet</SelectItem>
                  <SelectItem value="trust">Trust Wallet</SelectItem>
                  <SelectItem value="phantom">Phantom</SelectItem>
                  <SelectItem value="walletconnect">WalletConnect</SelectItem>
                  <SelectItem value="ledger">Ledger</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cryptoCurrency">Preferred Cryptocurrency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                  <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                  <SelectItem value="bnb">Binance Coin (BNB)</SelectItem>
                  <SelectItem value="ada">Cardano (ADA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input id="walletAddress" placeholder="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4" />
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Crypto Payment Process:</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• The equivalent crypto amount will be calculated at current market rates</li>
                <li>• Your crypto will be converted to USD and deposited to the seller</li>
                <li>• Transaction fees may apply based on network congestion</li>
                <li>• Payment confirmation may take 5-15 minutes</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-800">Estimated Crypto Amount:</span>
                <span className="text-sm font-bold text-green-800">≈ 0.00234 BTC</span>
              </div>
              <p className="text-xs text-green-600 mt-1">*Final amount will be calculated at the time of transaction</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Secure Checkout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="ewallet" id="ewallet" />
                          <Label htmlFor="ewallet" className="flex items-center gap-2 cursor-pointer">
                            <Wallet className="h-5 w-5" />
                            E-Wallet
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5" />
                            Bank Account
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="mobile" id="mobile" />
                          <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="h-5 w-5" />
                            Mobile Money
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 md:col-span-2">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer">
                            <Bitcoin className="h-5 w-5" />
                            Cryptocurrency
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                    <PaymentForm />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="truncate pr-2">{item.title}</span>
                        <span className="font-medium">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-2">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button onClick={handlePayment} className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <a href="/cart">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Cart
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
