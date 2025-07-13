"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Target,
  BookOpen,
  BarChart3,
  FileText,
  UserCheck,
  Boxes,
  Zap,
  Sparkles,
  Bell,
  Settings,
  Home,
  ChevronRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
  Pie,
} from "recharts"
import Link from "next/link"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 145000, orders: 320, customers: 189, target: 140000 },
  { month: "Feb", revenue: 162000, orders: 380, customers: 234, target: 155000 },
  { month: "Mar", revenue: 158000, orders: 340, customers: 198, target: 160000 },
  { month: "Apr", revenue: 175000, orders: 420, customers: 267, target: 170000 },
  { month: "May", revenue: 195000, orders: 480, customers: 298, target: 185000 },
  { month: "Jun", revenue: 220000, orders: 520, customers: 312, target: 210000 },
]

const salesDistributionData = [
  { name: "Electronics", value: 35, amount: 76300, color: "#3B82F6", trend: "+12%" },
  { name: "Fashion", value: 28, amount: 61040, color: "#10B981", trend: "+8%" },
  { name: "Home & Garden", value: 18, amount: 39240, color: "#F59E0B", trend: "+15%" },
  { name: "Sports & Fitness", value: 12, amount: 26160, color: "#8B5CF6", trend: "+5%" },
  { name: "Books & Media", value: 7, amount: 15260, color: "#EF4444", trend: "+3%" },
]

const performanceData = [
  { month: "Jan", orders: 320, customers: 189, revenue: 145 },
  { month: "Feb", orders: 380, customers: 234, revenue: 162 },
  { month: "Mar", orders: 340, customers: 198, revenue: 158 },
  { month: "Apr", orders: 420, customers: 267, revenue: 175 },
  { month: "May", orders: 480, customers: 298, revenue: 195 },
  { month: "Jun", orders: 520, customers: 312, revenue: 220 },
]

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Alexandra Chen",
    avatar: "AC",
    items: 3,
    amount: 459.99,
    status: "Delivered",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    time: "2 hours ago",
  },
  {
    id: "ORD-2024-002",
    customer: "Marcus Johnson",
    avatar: "MJ",
    items: 2,
    amount: 289.5,
    status: "Processing",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    time: "4 hours ago",
  },
  {
    id: "ORD-2024-003",
    customer: "Sofia Rodriguez",
    avatar: "SR",
    items: 1,
    amount: 129.99,
    status: "Shipped",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    time: "6 hours ago",
  },
  {
    id: "ORD-2024-004",
    customer: "David Kim",
    avatar: "DK",
    items: 4,
    amount: 699.99,
    status: "Pending",
    statusColor: "bg-orange-50 text-orange-700 border-orange-200",
    time: "8 hours ago",
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
    growthColor: "text-emerald-600",
    image: "/placeholder.svg?height=40&width=40&text=🎧",
  },
  {
    rank: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    sales: 1523,
    revenue: 456900,
    growth: "+12.8%",
    growthColor: "text-emerald-600",
    image: "/placeholder.svg?height=40&width=40&text=⌚",
  },
  {
    rank: 3,
    name: "Ergonomic Office Chair",
    category: "Home & Garden",
    sales: 892,
    revenue: 178400,
    growth: "+24.5%",
    growthColor: "text-emerald-600",
    image: "/placeholder.svg?height=40&width=40&text=🪑",
  },
  {
    rank: 4,
    name: "Professional Camera Lens",
    category: "Electronics",
    sales: 634,
    revenue: 190200,
    growth: "+8.7%",
    growthColor: "text-emerald-600",
    image: "/placeholder.svg?height=40&width=40&text=📷",
  },
]

export default function RetailerDashboardDemo() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-800">Loading Dashboard</h2>
            <p className="text-slate-600 font-medium">Preparing your business insights...</p>
          </div>
          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">LINKA</h1>
                <p className="text-sm text-slate-600 font-medium">Business Dashboard</p>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-800 font-medium">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 bg-slate-100 rounded-xl px-4 py-2 min-w-80">
              <Search className="w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search orders, products, customers..."
                className="border-0 bg-transparent text-slate-700 placeholder:text-slate-500 focus-visible:ring-0 font-medium"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Landscape Layout */}
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
              <p className="text-slate-600">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md bg-white border border-slate-200 shadow-sm">
            <TabsTrigger
              value="overview"
              className="font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics - Landscape Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">+28.4%</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-slate-800">ZMW 1,108,000</p>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200">+15.2%</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Total Orders</p>
                    <p className="text-2xl font-bold text-slate-800">2,472</p>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-amber-600" />
                    </div>
                    <Badge className="bg-amber-50 text-amber-700 border-amber-200">+8.7%</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Active Products</p>
                    <p className="text-2xl font-bold text-slate-800">3,847</p>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge className="bg-purple-50 text-purple-700 border-purple-200">+12.8%</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Total Customers</p>
                    <p className="text-2xl font-bold text-slate-800">12,429</p>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section - Landscape Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue Analytics - Takes 2 columns */}
              <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Revenue Analytics</CardTitle>
                    <CardDescription className="text-slate-600">Monthly performance trends</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="bg-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      6M
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sales Distribution - Takes 1 column */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">Sales Distribution</CardTitle>
                  <CardDescription className="text-slate-600">By category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-6">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={salesDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                          stroke="#ffffff"
                          strokeWidth={2}
                        >
                          {salesDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {salesDistributionData.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-800">{item.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity - Landscape Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Recent Orders</CardTitle>
                    <CardDescription className="text-slate-600">Latest transactions</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-sm">
                              {order.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-800">{order.customer}</p>
                            <p className="text-sm text-slate-600">
                              {order.id} • {order.items} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${order.statusColor} text-xs`}>{order.status}</Badge>
                          <p className="text-sm font-bold text-slate-800 mt-1">ZMW {order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Top Products</CardTitle>
                    <CardDescription className="text-slate-600">Best performers</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100">
                    <Star className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                            {product.rank}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{product.name}</p>
                            <p className="text-sm text-slate-600">
                              {product.category} • {product.sales} sales
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">ZMW {product.revenue.toLocaleString()}</p>
                          <p className={`text-sm font-bold ${product.growthColor}`}>{product.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Performance Analytics */}
              <Card className="lg:col-span-3 bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">Performance Analytics</CardTitle>
                  <CardDescription className="text-slate-600">Comprehensive business metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="orders" fill="#3B82F6" name="Orders" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="customers" fill="#10B981" name="Customers" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="revenue" fill="#F59E0B" name="Revenue (K)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Conversion Rate</span>
                      <span className="text-lg font-bold text-slate-800">4.2%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                    <p className="text-xs text-emerald-600 font-medium">+0.8% from last month</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Customer Satisfaction</span>
                      <span className="text-lg font-bold text-slate-800">4.9/5</span>
                    </div>
                    <Progress value={98} className="h-2" />
                    <p className="text-xs text-emerald-600 font-medium">Excellent rating</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Return Rate</span>
                      <span className="text-lg font-bold text-slate-800">1.8%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <p className="text-xs text-emerald-600 font-medium">-0.3% improvement</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Avg Order Value</span>
                      <span className="text-lg font-bold text-slate-800">ZMW 448</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-emerald-600 font-medium">+ZMW 23 increase</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Sales Report</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Comprehensive sales analysis with revenue breakdowns and performance metrics.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                      <UserCheck className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Customer Report</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Customer behavior analysis and retention metrics for strategic planning.
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                      <Boxes className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Inventory Report</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Stock levels and supply chain optimization recommendations.
                  </p>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Generate Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Business Insights */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center text-slate-800">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  Strategic Recommendations
                </h3>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-slate-800">Optimize Product Listings</h4>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      Enhance product descriptions and images for top-performing items to boost conversion rates.
                    </p>
                    <Button variant="outline" size="sm" className="bg-white">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-slate-800">Expand Marketing Reach</h4>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      Increase advertising spend for electronics category to capitalize on market demand.
                    </p>
                    <Button variant="outline" size="sm" className="bg-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-slate-800">Customer Loyalty Program</h4>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      Implement a rewards system to increase repeat purchases and customer lifetime value.
                    </p>
                    <Button variant="outline" size="sm" className="bg-white">
                      <Users className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Demo Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center text-slate-800">
                  <Sparkles className="w-6 h-6 mr-3 text-purple-600" />
                  About This Demo
                </h3>

                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-slate-800">What You're Seeing</h4>
                    <div className="space-y-3 text-slate-700">
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Real-time analytics with sample business data</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Interactive charts and performance metrics</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>AI-powered business insights</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span>Complete dashboard functionality</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-slate-800">Ready to Get Started?</h4>
                    <p className="text-slate-600 mb-4">
                      Experience the full power of LINKA's business management platform with your own data.
                    </p>
                    <div className="space-y-3">
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/signup">Create Your Account</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full bg-white">
                        <Link href="/contact">Contact Sales</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
