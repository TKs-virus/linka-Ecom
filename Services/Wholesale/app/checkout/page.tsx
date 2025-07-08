"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, Building2, Bitcoin, Wallet, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CryptoBalance {
  symbol: string
  name: string
  balance: number
  usdValue: number
  icon: string
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock order data
  const orderTotal = 4799.48
  const orderItems = [
    { name: "Advanced Digital Marketing Course", price: 299.99, quantity: 1 },
    { name: "Business Analytics Masterclass", price: 199.99, quantity: 1 },
    { name: "Industrial LED Lights (Wholesale)", price: 45.5, quantity: 100 },
  ]

  // Mock crypto wallet balances
  const cryptoBalances: CryptoBalance[] = [
    { symbol: "BTC", name: "Bitcoin", balance: 0.12, usdValue: 5200.0, icon: "₿" },
    { symbol: "ETH", name: "Ethereum", balance: 2.5, usdValue: 6250.0, icon: "Ξ" },
    { symbol: "USDC", name: "USD Coin", balance: 8500.0, usdValue: 8500.0, icon: "$" },
    { symbol: "BNB", name: "Binance Coin", balance: 15.2, usdValue: 4560.0, icon: "B" },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to success page
      window.location.href = "/checkout/success"
    }, 3000)
  }

  const getCryptoEquivalent = (crypto: CryptoBalance) => {
    const rate = crypto.usdValue / crypto.balance
    return (orderTotal / rate).toFixed(6)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Linka
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/cart">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {/* Credit/Debit Card */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                        </div>
                      </Label>
                    </div>

                    {/* E-Wallets */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="ewallet" id="ewallet" />
                      <Label htmlFor="ewallet" className="flex items-center cursor-pointer flex-1">
                        <Wallet className="h-5 w-5 mr-3 text-purple-600" />
                        <div>
                          <p className="font-medium">E-Wallets</p>
                          <p className="text-sm text-muted-foreground">PayPal, Apple Pay, Google Pay</p>
                        </div>
                      </Label>
                    </div>

                    {/* Bank Account */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center cursor-pointer flex-1">
                        <Building2 className="h-5 w-5 mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-muted-foreground">Direct bank account transfer</p>
                        </div>
                      </Label>
                    </div>

                    {/* Mobile Money */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label htmlFor="mobile" className="flex items-center cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 mr-3 text-orange-600" />
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-muted-foreground">M-Pesa, MTN Mobile Money, Airtel Money</p>
                        </div>
                      </Label>
                    </div>

                    {/* Crypto Wallet */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="flex items-center cursor-pointer flex-1">
                        <Bitcoin className="h-5 w-5 mr-3 text-orange-500" />
                        <div>
                          <p className="font-medium">Crypto Wallet</p>
                          <p className="text-sm text-muted-foreground">Pay with cryptocurrency</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details Forms */}
              {paymentMethod === "card" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "ewallet" && (
                <Card>
                  <CardHeader>
                    <CardTitle>E-Wallet Selection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your e-wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="applepay">Apple Pay</SelectItem>
                        <SelectItem value="googlepay">Google Pay</SelectItem>
                        <SelectItem value="skrill">Skrill</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "bank" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bank Account Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" placeholder="Enter your bank name" />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="Enter account number" />
                    </div>
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input id="routingNumber" placeholder="Enter routing number" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "mobile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Mobile Money Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                          <SelectItem value="tigo">Tigo Pesa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input id="mobileNumber" placeholder="+1 (555) 123-4567" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "crypto" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Crypto Wallet Payment</CardTitle>
                    <CardDescription>
                      Select a cryptocurrency to pay with. The equivalent amount will be converted to USD and deposited
                      to the seller's account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Payment amount: <strong>${orderTotal.toFixed(2)} USD</strong>
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {cryptoBalances.map((crypto) => (
                        <div
                          key={crypto.symbol}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedCrypto === crypto.symbol
                              ? "border-primary bg-primary/5"
                              : "hover:border-muted-foreground"
                          }`}
                          onClick={() => setSelectedCrypto(crypto.symbol)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold">
                                {crypto.icon}
                              </div>
                              <div>
                                <p className="font-medium">{crypto.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Balance: {crypto.balance} {crypto.symbol}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${crypto.usdValue.toFixed(2)}</p>
                              {crypto.usdValue >= orderTotal ? (
                                <Badge variant="secondary" className="text-green-600">
                                  <Check className="h-3 w-3 mr-1" />
                                  Sufficient
                                </Badge>
                              ) : (
                                <Badge variant="destructive">Insufficient</Badge>
                              )}
                            </div>
                          </div>

                          {selectedCrypto === crypto.symbol && crypto.usdValue >= orderTotal && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex justify-between text-sm">
                                <span>Payment amount:</span>
                                <span className="font-medium">
                                  {getCryptoEquivalent(crypto)} {crypto.symbol}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>USD equivalent:</span>
                                <span>${orderTotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Remaining balance:</span>
                                <span>
                                  {(crypto.balance - Number.parseFloat(getCryptoEquivalent(crypto))).toFixed(6)}{" "}
                                  {crypto.symbol}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedCrypto && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          The crypto amount will be automatically converted to USD and deposited into the seller's
                          account upon payment confirmation.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(orderTotal - 384.0 - 25.0).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$25.00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$384.00</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayment}
                    disabled={!paymentMethod || isProcessing || (paymentMethod === "crypto" && !selectedCrypto)}
                  >
                    {isProcessing ? "Processing Payment..." : `Pay $${orderTotal.toFixed(2)}`}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p className="flex items-center justify-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      SSL Encrypted Payment
                    </p>
                    <p className="flex items-center justify-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      PCI DSS Compliant
                    </p>
                    <p className="flex items-center justify-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      24/7 Fraud Monitoring
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
