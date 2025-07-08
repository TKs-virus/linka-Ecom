import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, MapPin, CreditCard } from "lucide-react"

interface OrderDetailsProps {
  orderId: string
}

// Mock order details - replace with actual data fetching
const mockOrderDetails = {
  id: "ORD-001",
  date: "2024-01-15",
  status: "delivered",
  total: 89.99,
  subtotal: 79.99,
  shipping: 5.0,
  tax: 5.0,
  retailer: "Local Electronics Store",
  items: [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "/placeholder.jpg",
    },
  ],
  shippingAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  paymentMethod: {
    type: "Credit Card",
    last4: "4242",
  },
  tracking: {
    number: "1Z999AA1234567890",
    carrier: "UPS",
    status: "Delivered",
  },
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const order = mockOrderDetails // In real app, fetch based on orderId

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Order Summary</span>
            </CardTitle>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Order Date</p>
              <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Order Total</p>
              <p className="font-medium">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Retailer</p>
              <p className="font-medium">{order.retailer}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Items</p>
              <p className="font-medium">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items Ordered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Shipping Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Method</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.paymentMethod.type}</p>
              <p>**** **** **** {order.paymentMethod.last4}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Information */}
      {order.tracking && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Tracking Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tracking Number</span>
                <span className="font-mono text-sm">{order.tracking.number}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Carrier</span>
                <span className="text-sm">{order.tracking.carrier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(order.tracking.status.toLowerCase())}>{order.tracking.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
