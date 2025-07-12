"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Download,
  Plus,
  Search,
  Calendar,
  Filter,
  Eye,
  Star,
  AlertTriangle,
  Target,
  Megaphone,
  Award,
  BookOpen,
  BarChart3,
  PieChartIcon as RechartsPieChart,
  PhoneIcon as Cell,
  XIcon as XAxis,
  Axis3dIcon as YAxis,
  MapIcon as CartesianGrid,
  InfoIcon as Tooltip,
  ContainerIcon as ResponsiveContainer,
  PieChartIcon as Pie,
  FileText,
  UserCheck,
  Boxes,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  // PieChart as RechartsPieChart,
  // Cell,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // ResponsiveContainer,
  // Legend,
} from "recharts"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 145000, orders: 320, customers: 189 },
  { month: "Feb", revenue: 162000, orders: 380, customers: 234 },
  { month: "Mar", revenue: 158000, orders: 340, customers: 198 },
  { month: "Apr", revenue: 175000, orders: 420, customers: 267 },
  { month: "May", revenue: 195000, orders: 480, customers: 298 },
  { month: "Jun", revenue: 220000, orders: 520, customers: 312 },
]

const salesDistributionData = [
  { name: "Electronics", value: 35, amount: 76300, color: "#3B82F6" },
  { name: "Fashion", value: 28, amount: 61040, color: "#10B981" },
  { name: "Home & Garden", value: 18, amount: 39240, color: "#F59E0B" },
  { name: "Sports & Fitness", value: 12, amount: 26160, color: "#EF4444" },
  { name: "Books & Media", value: 7, amount: 15260, color: "#8B5CF6" },
]

const performanceData = [
  { month: "Jan", orders: 320, customers: 189 },
  { month: "Feb", orders: 380, customers: 234 },
  { month: "Mar", orders: 340, customers: 198 },
  { month: "Apr", orders: 420, customers: 267 },
  { month: "May", orders: 480, customers: 298 },
  { month: "Jun", orders: 520, customers: 312 },
]

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Alexandra Chen",
    avatar: "AC",
    items: 3,
    amount: 459.99,
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "ORD-2024-002",
    customer: "Marcus Johnson",
    avatar: "MJ",
    items: 2,
    amount: 289.5,
    status: "Processing",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "ORD-2024-003",
    customer: "Sofia Rodriguez",
    avatar: "SR",
    items: 1,
    amount: 129.99,
    status: "Shipped",
    statusColor: "bg-orange-100 text-orange-800",
  },
  {
    id: "ORD-2024-004",
    customer: "David Kim",
    avatar: "DK",
    items: 4,
    amount: 699.99,
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "ORD-2024-005",
    customer: "Emma Thompson",
    avatar: "ET",
    items: 2,
    amount: 189.99,
    status: "Cancelled",
    statusColor: "bg-red-100 text-red-800",
  },
]

const topProducts = [
  {
    rank: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    sales: 1847,
    revenue: 258580,
    growth: "+18.2%",
    growthColor: "text-green-600",
  },
  {
    rank: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    sales: 1523,
    revenue: 456900,
    growth: "+12.8%",
    growthColor: "text-green-600",
  },
  {
    rank: 3,
    name: "Ergonomic Office Chair",
    category: "Home & Garden",
    sales: 892,
    revenue: 178400,
    growth: "+24.5%",
    growthColor: "text-green-600",
  },
  {
    rank: 4,
    name: "Professional Camera Lens",
    category: "Electronics",
    sales: 634,
    revenue: 190200,
    growth: "+8.7%",
    growthColor: "text-green-600",
  },
  {
    rank: 5,
    name: "Designer Backpack",
    category: "Fashion",
    sales: 1205,
    revenue: 96400,
    growth: "+15.3%",
    growthColor: "text-green-600",
  },
]

export default function RetailerDashboardDemo() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">LINKA</h1>
                <p className="text-sm opacity-90">Business Intelligence</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 flex-1 max-w-md">
              <Search className="w-4 h-4 opacity-70" />
              <Input
                placeholder="Search orders, products, customers, reports..."
                className="border-0 bg-transparent text-white placeholder:text-white/70 focus-visible:ring-0"
              />
              <kbd className="text-xs bg-white/20 px-1 rounded">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
              <span className="text-sm">🔔</span>
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r min-h-screen">
            <div className="p-4 space-y-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders
                <Badge className="ml-auto bg-orange-500">23</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Products
                <Badge className="ml-auto bg-orange-500">5</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Customers
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Megaphone className="w-4 h-4 mr-2" />
                Marketing
              </Button>
            </div>

            {/* User Profile */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Order
                  </Button>
                </div>
              </div>
              <p className="text-gray-600">Welcome back! Here's your business performance at a glance.</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">ZMW</p>
                          <p className="text-2xl font-bold">1,108,000</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">+28.4%</span>
                          <span className="text-sm text-gray-500">vs last month</span>
                        </div>
                        <Progress value={85} className="h-2 bg-green-100" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-3xl font-bold">2,472</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600 font-medium">+15.2%</span>
                          <span className="text-sm text-gray-500">23 pending</span>
                        </div>
                        <Progress value={75} className="h-2 bg-blue-100" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Active Products</p>
                        <p className="text-3xl font-bold">3,847</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-600 font-medium">+8.7%</span>
                          <span className="text-sm text-gray-500">5 low stock</span>
                        </div>
                        <Progress value={90} className="h-2 bg-orange-100" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Total Customers</p>
                        <p className="text-3xl font-bold">12,429</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-purple-600 font-medium">+12.8%</span>
                          <span className="text-sm text-gray-500">325 new</span>
                        </div>
                        <Progress value={80} className="h-2 bg-purple-100" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Analytics */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Revenue Analytics</CardTitle>
                        <CardDescription>Monthly performance and growth trends</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          6M
                        </Button>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e0e0e0",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Sales Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Distribution</CardTitle>
                      <CardDescription>Revenue by product category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center mb-4">
                        <ResponsiveContainer width="100%" height={200}>
                          <RechartsPieChart>
                            <Pie
                              data={salesDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {salesDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        {salesDistributionData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold">{item.value}%</p>
                              <p className="text-xs text-gray-500">ZMW {item.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders and Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest customer transactions</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10 bg-blue-500 text-white">
                                <AvatarFallback>{order.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-sm text-gray-500">
                                  {order.id} • {order.items} items
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={order.statusColor}>{order.status}</Badge>
                              <p className="text-sm font-bold mt-1">ZMW {order.amount}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Products */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Top Products</CardTitle>
                        <CardDescription>Best performing items</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topProducts.map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                {product.rank}
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">
                                  {product.category} • {product.sales} sales
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">ZMW {product.revenue.toLocaleString()}</p>
                              <p className={`text-sm ${product.growthColor}`}>{product.growth}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Analytics */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                      <CardDescription>Comprehensive business metrics and trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3B82F6" name="Orders" />
                          <Bar dataKey="customers" fill="#10B981" name="Customers" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Key Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Conversion Rate</span>
                          <span className="text-lg font-bold">4.2%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">+0.8% from last month</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Customer Satisfaction</span>
                          <span className="text-lg font-bold">4.9/5</span>
                        </div>
                        <Progress value={98} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">Excellent rating</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Return Rate</span>
                          <span className="text-lg font-bold">1.8%</span>
                        </div>
                        <Progress value={18} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">-0.3% improvement</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Avg Order Value</span>
                          <span className="text-lg font-bold">ZMW 448</span>
                        </div>
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-green-600 mt-1">+ZMW 23 increase</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900">Sales Report</h3>
                      </div>
                      <p className="text-blue-700 mb-6">
                        Comprehensive sales analysis with revenue breakdowns, product performance, and growth metrics.
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Report</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-900">Customer Report</h3>
                      </div>
                      <p className="text-green-700 mb-6">
                        Customer behavior analysis, demographics insights, and retention metrics for strategic planning.
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Generate Report</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Boxes className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-900">Inventory Report</h3>
                      </div>
                      <p className="text-orange-700 mb-6">
                        Stock levels, inventory turnover, and supply chain optimization recommendations.
                      </p>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">Generate Report</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Business Insights */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Business Insights
                    </h3>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-green-900">Exceptional Growth</h4>
                        </div>
                        <p className="text-green-700 text-sm">
                          Revenue increased by 28.4% this month, driven by strong electronics sales and improved
                          customer retention.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-blue-900">Category Leader</h4>
                        </div>
                        <p className="text-blue-700 text-sm">
                          Electronics category dominates with 35% market share and highest profit margins in your
                          portfolio.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-orange-900">Inventory Alert</h4>
                        </div>
                        <p className="text-orange-700 text-sm">
                          5 high-demand products are running low. Consider restocking to avoid missed sales
                          opportunities.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Strategic Recommendations */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-600" />
                      Strategic Recommendations
                    </h3>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-2">Optimize Product Listings</h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Enhance product descriptions and images for top-performing items to boost conversion rates by
                          an estimated 15%.
                        </p>
                        <Button variant="outline" size="sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-2">Expand Marketing Reach</h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Increase advertising spend for electronics category to capitalize on high-performing products
                          and market demand.
                        </p>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-2">Customer Loyalty Program</h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Implement a rewards system to increase repeat purchases and improve customer lifetime value by
                          25%.
                        </p>
                        <Button variant="outline" size="sm">
                          <Users className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
