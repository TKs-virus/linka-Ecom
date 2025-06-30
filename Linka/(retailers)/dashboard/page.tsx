import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  PackagePlus,
  Store,
  Settings,
  CalendarIcon,
  AlertTriangle,
  Megaphone,
  Search,
} from "lucide-react"
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis } from "recharts" // Added YAxis and RechartsTooltip

// Mock data - replace with actual data fetching
const recentSales = [
  { id: "1", customer: "Olivia Martin", email: "olivia.martin@email.com", amount: "ZMW 1,999.00", status: "Fulfilled" },
  { id: "2", customer: "Jackson Lee", email: "jackson.lee@email.com", amount: "ZMW 329.00", status: "Pending" },
  {
    id: "3",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "ZMW 150.00",
    status: "Fulfilled",
  },
]

const topProducts = [
  { name: "Handcrafted Chitenge Bag", sold: 120, revenue: "ZMW 29,988" },
  { name: "Organic Zambian Honey", sold: 95, revenue: "ZMW 11,400" },
]

const lowStockItems = [
  { name: "Wooden Maasai Figurine", stock: 3, threshold: 5 },
  { name: "Local Spices Set", stock: 2, threshold: 5 },
]

const activePromotions = [
  { name: "Weekend Special: 15% Off Fashion", ends: "2 days" },
  { name: "Free Delivery on Orders > ZMW 500", ends: "5 days" },
]

const salesTrendData = [
  { date: "Mon", sales: 2200 },
  { date: "Tue", sales: 3400 },
  { date: "Wed", sales: 2800 },
  { date: "Thu", sales: 4100 },
  { date: "Fri", sales: 3700 },
  { date: "Sat", sales: 5200 },
  { date: "Sun", sales: 4800 },
]

const chartConfig = {
  sales: {
    label: "Sales (ZMW)",
    color: "hsl(var(--chart-1))",
  },
}

export default function RetailerDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Filter by Date
            </Button>
            <Button asChild>
              <Link href="/dashboard/products/new">
                <PackagePlus className="mr-2 h-4 w-4" /> Add Product
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Details</TabsTrigger>
            <TabsTrigger value="products">Product Insights</TabsTrigger>
            <TabsTrigger value="customers">Customer Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">ZMW 45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+235</div>
                  <p className="text-xs text-muted-foreground">+18.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Store Performance</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Good</div>
                  <p className="text-xs text-muted-foreground">Overall rating: 4.5/5</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Sales Trend</CardTitle>
                  <CardDescription>Sales performance over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                  <Button variant="default" asChild size="sm">
                    <Link href="/dashboard/products/new">
                      <PackagePlus className="mr-2 h-4 w-4" /> Add New Product
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/dashboard/orders/new">
                      {" "}
                      {/* Assuming a page to create manual order */}
                      <CreditCard className="mr-2 h-4 w-4" /> Create Order
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/dashboard/marketing/promotions/new">
                      <Megaphone className="mr-2 h-4 w-4" /> Create Promotion
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/store/my-store-id" target="_blank">
                      {" "}
                      {/* Replace my-store-id with actual store slug/id */}
                      <Store className="mr-2 h-4 w-4" /> View My Storefront
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" /> Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Details Tab Content */}
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Overview of your latest sales transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.email}</TableCell>
                        <TableCell>{sale.amount}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              sale.status === "Fulfilled"
                                ? "bg-green-100 text-green-800"
                                : sale.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {sale.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/orders/${sale.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="default" asChild>
                  <Link href="/dashboard/orders">View All Orders</Link>
                </Button>
              </CardFooter>
            </Card>
            {/* Placeholder for more sales reports */}
          </TabsContent>

          {/* Product Insights Tab Content */}
          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" /> Low Stock Alerts
                  </CardTitle>
                  <CardDescription>Items needing your attention for restocking.</CardDescription>
                </CardHeader>
                <CardContent>
                  {lowStockItems.length > 0 ? (
                    <ul className="space-y-2">
                      {lowStockItems.map((item) => (
                        <li key={item.name} className="flex justify-between items-center text-sm">
                          <span>{item.name}</span>
                          <span className="font-semibold text-destructive">Stock: {item.stock}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No low stock items. Great job!</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="default" asChild>
                    <Link href="/dashboard/products?filter=low_stock">Manage Inventory</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Your best performers this period.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Sold: {product.sold} | Revenue: {product.revenue}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/products?sort=top_selling">View All Products</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            {/* Placeholder for product catalog management summary */}
          </TabsContent>

          {/* Customer Activity Tab Content */}
          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Insights</CardTitle>
                  <CardDescription>Understanding your customer base.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Customers</span>
                    <span className="font-semibold">1,280</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Repeat Customer Rate</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Order Value</span>
                    <span className="font-semibold">ZMW 350.75</span>
                  </div>
                  <div className="flex items-center">
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Top Search: "Chitenge Dress"</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" asChild>
                    <Link href="/dashboard/customers">View All Customers</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Megaphone className="mr-2 h-5 w-5 text-primary" /> Active Promotions
                  </CardTitle>
                  <CardDescription>Current marketing campaigns and discounts.</CardDescription>
                </CardHeader>
                <CardContent>
                  {activePromotions.length > 0 ? (
                    <ul className="space-y-2">
                      {activePromotions.map((promo) => (
                        <li key={promo.name} className="text-sm">
                          <p className="font-medium">{promo.name}</p>
                          <p className="text-xs text-muted-foreground">Ends in: {promo.ends}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No active promotions currently.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="default" asChild>
                    <Link href="/dashboard/marketing/promotions">Manage Promotions</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            {/* Placeholder for customer segmentation summary */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
