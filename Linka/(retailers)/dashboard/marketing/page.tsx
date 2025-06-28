import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Megaphone, Percent, Mail, BarChart3 } from "lucide-react"

export default function MarketingDashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Hub</h1>
        <Button asChild>
          <Link href="/dashboard/marketing/promotions/new">
            <Percent className="mr-2 h-4 w-4" /> Create New Promotion
          </Link>
        </Button>
      </div>

      <p className="text-muted-foreground">Manage your promotions, campaigns, and analyze their performance.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" />
              Promotions & Discounts
            </CardTitle>
            <CardDescription>Create and manage sales, coupons, and special offers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/marketing/promotions">Manage Promotions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Campaigns
            </CardTitle>
            <CardDescription>Engage your customers with targeted email marketing. (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Manage Campaigns
            </Button>
          </CardContent>
        </Card>

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Campaign Analytics
            </CardTitle>
            <CardDescription>Track the performance of your marketing efforts. (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
