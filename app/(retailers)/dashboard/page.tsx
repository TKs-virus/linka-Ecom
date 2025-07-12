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
  Download,
  Plus,
  Search,
  Calendar,
  Filter,
  Eye,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react"
import {
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
                              \
