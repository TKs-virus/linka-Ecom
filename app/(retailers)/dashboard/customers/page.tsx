import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Mail, Phone, MapPin, Calendar, TrendingUp, Users, ShoppingBag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock customer data
const customers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+260 97 123 4567",
    location: "Lusaka, Zambia",
    totalOrders: 12,
    totalSpent: 2450.0,
    lastOrder: "2024-01-15",
    status: "active",
    joinDate: "2023-08-15",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Michael Banda",
    email: "m.banda@email.com",
    phone: "+260 96 987 6543",
    location: "Ndola, Zambia",
    totalOrders: 8,
    totalSpent: 1890.5,
    lastOrder: "2024-01-12",
    status: "active",
    joinDate: "2023-09-22",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    name: "Grace Mwanza",
    email: "grace.mwanza@email.com",
    phone: "+260 95 456 7890",
    location: "Kitwe, Zambia",
    totalOrders: 15,
    totalSpent: 3200.75,
    lastOrder: "2024-01-10",
    status: "vip",
    joinDate: "2023-07-03",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    name: "David Phiri",
    email: "d.phiri@email.com",
    phone: "+260 97 234 5678",
    location: "Livingstone, Zambia",
    totalOrders: 3,
    totalSpent: 450.25,
    lastOrder: "2023-12-28",
    status: "inactive",
    joinDate: "2023-11-10",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    name: "Ruth Tembo",
    email: "ruth.tembo@email.com",
    phone: "+260 96 345 6789",
    location: "Kabwe, Zambia",
    totalOrders: 6,
    totalSpent: 1125.0,
    lastOrder: "2024-01-08",
    status: "active",
    joinDate: "2023-10-18",
    avatar: "/placeholder-user.jpg",
  },
]

const stats = [
  {
    title: "Total Customers",
    value: "1,234",
    change: "+12%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Active Customers",
    value: "987",
    change: "+8%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "New This Month",
    value: "45",
    change: "+23%",
    icon: Calendar,
    trend: "up",
  },
  {
    title: "Avg. Order Value",
    value: "ZMW 185",
    change: "+5%",
    icon: ShoppingBag,
    trend: "up",
  },
]

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: {
  title: string
  value: string
  change: string
  icon: any
  trend: "up" | "down"
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}>{change} from last month</p>
      </CardContent>
    </Card>
  )
}

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage your customer relationships and track their activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>A list of all your customers and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{customer.name}</h3>
                      <Badge
                        variant={
                          customer.status === "vip" ? "default" : customer.status === "active" ? "secondary" : "outline"
                        }
                      >
                        {customer.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{customer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">ZMW {customer.totalSpent.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">{customer.totalOrders} orders</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Block Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
