"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/ui/app-sidebar"
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
  Target,
  BookOpen,
  BarChart3,
  FileText,
  UserCheck,
  Boxes,
  Sparkles,
  Bell,
  Settings,
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
          <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-800">Loading Dashboard</h2>
            <p className="text-slate-600 font-medium">Preparing your business insights...</p>
          </div>
          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar />

      {/* Main Content with Sidebar Offset */}
      <div className="ml-80">
        {/* Modern Header */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Business Dashboard</h1>
                <p className="text-sm text-slate-600 font-medium">Welcome back! Here's your business overview</p>
              </div>

              {/* Breadcrumb */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-sky-600 transition-colors">
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
                <p className="text-slate-600">Monitor your business performance and key metrics</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white">
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
                className="font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white"
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
                            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.05} />
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
                          stroke="#0EA5E9"
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
                              <AvatarFallback className="bg-sky-100 text-sky-700 font-bold text-sm">
                                {order.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{order.customer}</p>
                              <p className="text-xs text-slate-600">
                                {order.id} • {order.items} items
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-800">ZMW {order.amount}</p>
                            <Badge className={`text-xs ${order.statusColor}`}>{order.status}</Badge>
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
                      <CardDescription className="text-slate-600">Best performing items</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100">
                      <TrendingUp className="w-4 h-4 mr-2" />
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
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                              <span className="text-lg">{product.rank}</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{product.name}</p>
                              <p className="text-xs text-slate-600">
                                {product.category} • {product.sales} sales
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-800 text-sm">ZMW {product.revenue.toLocaleString()}</p>
                            <p className={`text-xs font-bold ${product.growthColor}`}>{product.growth}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800">Performance Metrics</CardTitle>
                    <CardDescription className="text-slate-600">Detailed analytics overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
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
                        <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="customers" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800">Growth Trends</CardTitle>
                    <CardDescription className="text-slate-600">Month-over-month comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Target className="w-8 h-8 text-emerald-600" />
                          <div>
                            <p className="font-bold text-emerald-800">Revenue Growth</p>
                            <p className="text-sm text-emerald-600">vs last month</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-800">+28.4%</p>
                          <p className="text-sm text-emerald-600">ZMW 48,000</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <UserCheck className="w-8 h-8 text-blue-600" />
                          <div>
                            <p className="font-bold text-blue-800">Customer Growth</p>
                            <p className="text-sm text-blue-600">New acquisitions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-800">+12.8%</p>
                          <p className="text-sm text-blue-600">1,421 new</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Boxes className="w-8 h-8 text-purple-600" />
                          <div>
                            <p className="font-bold text-purple-800">Product Performance</p>
                            <p className="text-sm text-purple-600">Sales velocity</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-800">+15.2%</p>
                          <p className="text-sm text-purple-600">Higher turnover</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">Sales Report</h3>
                        <p className="text-sm text-slate-600">Monthly sales analysis</p>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">Analytics Report</h3>
                        <p className="text-sm text-slate-600">Performance metrics</p>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">Customer Report</h3>
                        <p className="text-sm text-slate-600">Customer insights</p>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-sky-900">AI Insights</CardTitle>
                        <CardDescription className="text-sky-700">Powered by machine learning</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-bold text-sky-900 mb-2">Revenue Prediction</h4>
                      <p className="text-sm text-sky-800">
                        Based on current trends, you're projected to reach <strong>ZMW 1.4M</strong> in revenue next
                        month (+26% growth).
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-bold text-sky-900 mb-2">Inventory Alert</h4>
                      <p className="text-sm text-sky-800">
                        <strong>12 products</strong> are running low on stock. Consider restocking to avoid missed sales
                        opportunities.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-emerald-900">Recommendations</CardTitle>
                        <CardDescription className="text-emerald-700">Actionable business advice</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-bold text-emerald-900 mb-2">Marketing Opportunity</h4>
                      <p className="text-sm text-emerald-800">
                        Electronics category shows <strong>+18% growth</strong>. Consider increasing marketing spend in
                        this segment.
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-xl p-4">
                      <h4 className="font-bold text-emerald-900 mb-2">Customer Retention</h4>
                      <p className="text-sm text-emerald-800">
                        Implement a loyalty program to increase repeat purchases by an estimated <strong>15-20%</strong>
                        .
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
