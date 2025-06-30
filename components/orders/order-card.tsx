import type { Order } from "@/app/actions/order-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "preparing":
        return "outline"
      case "ready":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPaymentStatusColor = (status: Order["payment_status"]) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "refunded":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
            <Badge variant={getPaymentStatusColor(order.payment_status)}>{order.payment_status}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {new Date(order.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {typeof order.delivery_address === "object" && order.delivery_address?.city}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {order.order_items?.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-md overflow-hidden">
                <Image
                  src={item.product?.images?.[0] || "/placeholder.svg?height=48&width=48"}
                  alt={item.product?.name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product?.name || "Product"}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ZMW {item.unit_price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-medium">ZMW {item.total_price.toFixed(2)}</p>
            </div>
          ))}
          {order.order_items && order.order_items.length > 3 && (
            <p className="text-xs text-muted-foreground">+{order.order_items.length - 3} more items</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-lg font-bold">ZMW {order.total_amount.toFixed(2)}</p>
            </div>
            <Button asChild>
              <Link href={`/orders/${order.id}`}>
                <Package className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
          </div>
        </div>

        {/* Estimated Delivery */}
        {order.estimated_delivery && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Estimated Delivery</p>
            <p className="text-sm font-medium">
              {new Date(order.estimated_delivery).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
