import { getCustomerOrders } from "@/app/actions/order-actions"
import { OrderCard } from "@/components/orders/order-card"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

export default async function OrdersPage() {
  const orders = await getCustomerOrders()

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your order history and status</p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No orders yet</CardTitle>
            <CardDescription className="text-center">
              When you place your first order, it will appear here.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track your order history and status</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
