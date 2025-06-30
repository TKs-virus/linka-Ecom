import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PlusCircle, Edit3, Trash2, Percent } from "lucide-react"
import { getPromotions, type PromotionStatus } from "@/app/actions/marketing-actions"
import { format } from "date-fns"

function getStatusBadgeVariant(status: PromotionStatus) {
  switch (status) {
    case "active":
      return "success"
    case "scheduled":
      return "info"
    case "expired":
      return "secondary"
    case "draft":
      return "outline"
    default:
      return "default"
  }
}

export default async function PromotionsListPage() {
  const promotions = await getPromotions()

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground">Manage all your discounts, coupons, and special offers.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/marketing/promotions/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Promotion
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Promotions</CardTitle>
          <CardDescription>
            {promotions.length > 0
              ? `A list of all promotions in your store. You have ${promotions.length} total.`
              : "No promotions found. Create your first one!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {promotions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Coupon</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell className="capitalize">{promo.type.replace("_", " ")}</TableCell>
                    <TableCell>
                      {promo.type === "percentage"
                        ? `${promo.value}%`
                        : promo.type === "fixed_amount"
                          ? `ZMW ${promo.value.toFixed(2)}`
                          : "N/A"}
                    </TableCell>
                    <TableCell>{promo.couponCode || "N/A"}</TableCell>
                    <TableCell>
                      {format(new Date(promo.startDate), "MMM dd, yyyy")} -{" "}
                      {format(new Date(promo.endDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(promo.status)} className="capitalize">
                        {promo.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild disabled>
                        {/* Link to edit page will be /dashboard/marketing/promotions/${promo.id}/edit */}
                        <Link href={`#`}>
                          <Edit3 className="mr-1 h-3 w-3" /> Edit
                        </Link>
                      </Button>
                      {/* Delete would typically be a form action or a client-side call with confirmation */}
                      <Button variant="destructive" size="sm" disabled>
                        <Trash2 className="mr-1 h-3 w-3" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Percent className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No Promotions Yet</p>
              <p className="text-sm text-muted-foreground">Start by creating a promotion to attract more customers.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/marketing/promotions/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Promotion
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
