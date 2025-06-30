import { OrderDetails } from "@/components/orders/order-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface OrderPageProps {
  params: {
    orderId: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">Order #{params.orderId}</p>
      </div>

      <OrderDetails orderId={params.orderId} />
    </div>
  )
}
