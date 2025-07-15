import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Star,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Mock data - replace with real data from your API
const mockData = {
  stats: {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    totalOrders: 1234,
    ordersChange: 15.3,
    totalCustomers: 892,
    customersChange: 8.7,
    totalProducts: 156,
    productsChange: 12.4,
  },
  recentOrders: [
    { id: "ORD-001", customer: "John Doe", amount: 125.5, status: "completed", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", amount: 89.99, status: "pending", date: "2024-01-15" },
    { id: "ORD-003", customer: "Bob Johnson", amount: 234.75, status: "processing", date: "2024-01-14" },
    { id: "ORD-004", customer: "Alice Brown", amount: 67.25, status: "completed", date: "2024-01-14" },
    { id: "ORD-005", customer: "Charlie Wilson", amount: 156.8, status: "shipped", date: "2024-01-13" },
  ],
  topProducts: [
    { name: "Premium Headphones", sales: 234, revenue: 23400, trend: "up" },
    { name: "Wireless Mouse", sales: 189, revenue: 9450, trend: "up" },
    { name: "Mechanical Keyboard", sales: 156, revenue: 18720, trend: "down" },
    { name: "USB-C Hub", sales: 134, revenue: 8040, trend: "up" },
    { name: "Laptop Stand", sales: 98, revenue: 4900, trend: "down" },
  ],
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-500 font-medium">Welcome back, let's grow your business</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="bg-white/50 border-slate-200 hover:bg-white/80">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Quick Actions
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Revenue</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-900">K{mockData.stats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  <TrendingUp className="w-3 h-3 mr-1" />+{mockData.stats.revenueChange}%
                </Badge>
                <span className="text-xs text-slate-500 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Orders</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-900">{mockData.stats.totalOrders.toLocaleString()}</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  <TrendingUp className="w-3 h-3 mr-1" />+{mockData.stats.ordersChange}%
                </Badge>
                <span className="text-xs text-slate-500 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Customers</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-900">{mockData.stats.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  <TrendingUp className="w-3 h-3 mr-1" />+{mockData.stats.customersChange}%
                </Badge>
                <span className="text-xs text-slate-500 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Products</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <Package className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-900">{mockData.stats.totalProducts.toLocaleString()}</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  <TrendingUp className="w-3 h-3 mr-1" />+{mockData.stats.productsChange}%
                </Badge>
                <span className="text-xs text-slate-500 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Recent Orders</CardTitle>
                    <CardDescription className="text-slate-500 font-medium">
                      Latest customer orders and their status
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white/50 border-slate-200">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                          <AvatarImage src={`/placeholder-user.jpg`} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{order.customer}</p>
                          <p className="text-sm text-slate-500 font-medium">{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-slate-900">K{order.amount}</p>
                        <Badge
                          variant={order.status === "completed" ? "default" : "secondary"}
                          className={
                            order.status === "completed"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                : order.status === "processing"
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-purple-100 text-purple-700 border-purple-200"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <div>
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Top Products</CardTitle>
                <CardDescription className="text-slate-500 font-medium">
                  Best performing products this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.topProducts.map((product, index) => (
                    <div
                      key={product.name}
                      className="flex items-center space-x-4 p-3 bg-slate-50/50 rounded-xl border border-slate-100"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{product.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-slate-500">{product.sales} sales</span>
                          <Badge
                            variant="secondary"
                            className={
                              product.trend === "up" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            }
                          >
                            {product.trend === "up" ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">K{product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Insights */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Performance Insights</CardTitle>
                <CardDescription className="text-slate-500 font-medium">
                  Key metrics and recommendations for your business
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-white/50 border-slate-200">
                  <PieChart className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm" className="bg-white/50 border-slate-200">
                  <Target className="w-4 h-4 mr-2" />
                  Goals
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Conversion Rate</h3>
                    <p className="text-sm text-slate-500">Customer purchase rate</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">3.2%</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +0.4%
                    </Badge>
                  </div>
                  <Progress value={32} className="h-2 bg-slate-100" />
                  <p className="text-xs text-slate-500">Above industry average (2.8%)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Customer Satisfaction</h3>
                    <p className="text-sm text-slate-500">Average rating score</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">4.8</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Progress value={96} className="h-2 bg-slate-100" />
                  <p className="text-xs text-slate-500">Based on 1,234 reviews</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Avg. Order Time</h3>
                    <p className="text-sm text-slate-500">Processing to delivery</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">2.3 days</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                      -0.5 days
                    </Badge>
                  </div>
                  <Progress value={77} className="h-2 bg-slate-100" />
                  <p className="text-xs text-slate-500">23% faster than last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
