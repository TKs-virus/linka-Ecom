"use client"

import { useState, useEffect } from "react"
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
  FileText,
  UserCheck,
  Boxes,
  ArrowUpRight,
  Zap,
  Sparkles,
  Activity,
  Bell,
  Settings,
  RefreshCw,
} from "lucide-react"
import {
  Line,
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
  Pie, // Import Pie component
} from "recharts"

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
  { name: "Electronics", value: 35, amount: 76300, color: "#2563EB", trend: "+12%" },
  { name: "Fashion", value: 28, amount: 61040, color: "#059669", trend: "+8%" },
  { name: "Home & Garden", value: 18, amount: 39240, color: "#D97706", trend: "+15%" },
  { name: "Sports & Fitness", value: 12, amount: 26160, color: "#7C3AED", trend: "+5%" },
  { name: "Books & Media", value: 7, amount: 15260, color: "#DC2626", trend: "+3%" },
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
    statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    time: "2 hours ago",
  },
  {
    id: "ORD-2024-002",
    customer: "Marcus Johnson",
    avatar: "MJ",
    items: 2,
    amount: 289.5,
    status: "Processing",
    statusColor: "bg-blue-100 text-blue-700 border-blue-200",
    time: "4 hours ago",
  },
  {
    id: "ORD-2024-003",
    customer: "Sofia Rodriguez",
    avatar: "SR",
    items: 1,
    amount: 129.99,
    status: "Shipped",
    statusColor: "bg-amber-100 text-amber-700 border-amber-200",
    time: "6 hours ago",
  },
  {
    id: "ORD-2024-004",
    customer: "David Kim",
    avatar: "DK",
    items: 4,
    amount: 699.99,
    status: "Pending",
    statusColor: "bg-orange-100 text-orange-700 border-orange-200",
    time: "8 hours ago",
  },
  {
    id: "ORD-2024-005",
    customer: "Emma Thompson",
    avatar: "ET",
    items: 2,
    amount: 189.99,
    status: "Cancelled",
    statusColor: "bg-red-100 text-red-700 border-red-200",
    time: "1 day ago",
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
  {
    rank: 5,
    name: "Designer Backpack",
    category: "Fashion",
    sales: 1205,
    revenue: 96400,
    growth: "+15.3%",
    growthColor: "text-emerald-600",
    image: "/placeholder.svg?height=40&width=40&text=🎒",
  },
]

export default function RetailerDashboardDemo() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Loading Dashboard
            </h2>
            <p className="text-slate-600">Preparing your business insights...</p>
          </div>
          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white shadow-xl">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Zap className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">LINKA</h1>
                <p className="text-sm opacity-90 font-medium">Business Intelligence</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 max-w-lg border border-white/20">
              <Search className="w-5 h-5 opacity-70" />
              <Input
                placeholder="Search orders, products, customers, reports..."
                className="border-0 bg-transparent text-white placeholder:text-white/70 focus-visible:ring-0 font-medium"
              />
              <kbd className="text-xs bg-white/20 px-2 py-1 rounded-md font-mono">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm font-medium">
              <Activity className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <Bell className="w-5 h-5" />
              <div className="w-2 h-2 bg-amber-400 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 bg-white/95 backdrop-blur-sm border-r border-slate-200 min-h-screen shadow-lg">
            <div className="p-6 space-y-3">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className={`w-full justify-start font-semibold transition-all duration-200 ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-100 font-semibold">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Orders
                <Badge className="ml-auto bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold">23</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-100 font-semibold">
                <Package className="w-5 h-5 mr-3" />
                Products
                <Badge className="ml-auto bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold">5</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-100 font-semibold">
                <Users className="w-5 h-5 mr-3" />
                Customers
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className={`w-full justify-start font-semibold transition-all duration-200 ${
                  activeTab === "analytics"
                    ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-100 font-semibold">
                <Megaphone className="w-5 h-5 mr-3" />
                Marketing
              </Button>
            </div>

            {/* User Profile */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-100 to-blue-50 rounded-xl border border-slate-200 shadow-sm">
                <Avatar className="w-10 h-10 ring-2 ring-blue-200">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800">John Doe</p>
                  <p className="text-xs text-slate-600 font-medium">Administrator</p>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-200">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Dashboard Overview
                  </h1>
                  <p className="text-slate-600 font-medium mt-2">
                    Welcome back! Here's your business performance at a glance.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    New Order
                  </Button>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 max-w-md bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
                <TabsTrigger
                  value="overview"
                  className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  Reports
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <DollarSign className="w-7 h-7 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Total Revenue</p>
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-slate-700">ZMW</p>
                          <p className="text-3xl font-bold text-slate-800">1,108,000</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-emerald-600 font-bold">+28.4%</span>
                          <span className="text-sm text-slate-600 font-medium">vs last month</span>
                        </div>
                        <Progress value={85} className="h-3 bg-emerald-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <ShoppingCart className="w-7 h-7 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-blue-700 uppercase tracking-wide">Total Orders</p>
                        <p className="text-3xl font-bold text-slate-800">2,472</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600 font-bold">+15.2%</span>
                          <span className="text-sm text-slate-600 font-medium">23 pending</span>
                        </div>
                        <Progress value={75} className="h-3 bg-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Package className="w-7 h-7 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-amber-700 uppercase tracking-wide">Active Products</p>
                        <p className="text-3xl font-bold text-slate-800">3,847</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-amber-600 font-bold">+8.7%</span>
                          <span className="text-sm text-slate-600 font-medium">5 low stock</span>
                        </div>
                        <Progress value={90} className="h-3 bg-amber-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-purple-700 uppercase tracking-wide">Total Customers</p>
                        <p className="text-3xl font-bold text-slate-800">12,429</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-purple-600 font-bold">+12.8%</span>
                          <span className="text-sm text-slate-600 font-medium">325 new</span>
                        </div>
                        <Progress value={80} className="h-3 bg-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Analytics */}
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Revenue Analytics</CardTitle>
                        <CardDescription className="text-slate-600 font-medium">
                          Monthly performance and growth trends
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold bg-transparent"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          6M
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                        >
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="month" stroke="#64748B" fontSize={12} fontWeight={600} />
                          <YAxis stroke="#64748B" fontSize={12} fontWeight={600} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #E2E8F0",
                              borderRadius: "12px",
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              fontWeight: "600",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fill="url(#revenueGradient)"
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            stroke="#10B981"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Sales Distribution */}
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-slate-800">Sales Distribution</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">
                        Revenue by product category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center mb-6">
                        <ResponsiveContainer width="100%" height={240}>
                          <PieChart>
                            <Pie
                              data={salesDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={100}
                              dataKey="value"
                              stroke="#ffffff"
                              strokeWidth={3}
                            >
                              {salesDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #E2E8F0",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                fontWeight: "600",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        {salesDistributionData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-4 h-4 rounded-full shadow-sm"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm font-bold text-slate-700">{item.name}</span>
                              <Badge className="bg-emerald-100 text-emerald-700 font-bold">{item.trend}</Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-slate-800">{item.value}%</p>
                              <p className="text-xs text-slate-600 font-medium">ZMW {item.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders and Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Orders */}
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Recent Orders</CardTitle>
                        <CardDescription className="text-slate-600 font-medium">
                          Latest customer transactions
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-slate-100 font-semibold">
                        <Eye className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12 ring-2 ring-blue-200">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold">
                                  {order.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold text-slate-800">{order.customer}</p>
                                <p className="text-sm text-slate-600 font-medium">
                                  {order.id} • {order.items} items • {order.time}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={`${order.statusColor} font-bold`}>{order.status}</Badge>
                              <p className="text-sm font-bold text-slate-800 mt-1">ZMW {order.amount}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Products */}
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Top Products</CardTitle>
                        <CardDescription className="text-slate-600 font-medium">Best performing items</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-slate-100 font-semibold">
                        <Star className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topProducts.map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                                {product.rank}
                              </div>
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg"
                              />
                              <div>
                                <p className="font-bold text-slate-800">{product.name}</p>
                                <p className="text-sm text-slate-600 font-medium">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Performance Analytics */}
                  <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-slate-800">Performance Analytics</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">
                        Comprehensive business metrics and trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="month" stroke="#64748B" fontSize={12} fontWeight={600} />
                          <YAxis stroke="#64748B" fontSize={12} fontWeight={600} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #E2E8F0",
                              borderRadius: "12px",
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              fontWeight: "600",
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
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-slate-800">Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">Conversion Rate</span>
                          <span className="text-xl font-bold text-slate-800">4.2%</span>
                        </div>
                        <Progress value={42} className="h-3 bg-slate-200" />
                        <p className="text-xs text-emerald-600 font-bold">+0.8% from last month</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">Customer Satisfaction</span>
                          <span className="text-xl font-bold text-slate-800">4.9/5</span>
                        </div>
                        <Progress value={98} className="h-3 bg-slate-200" />
                        <p className="text-xs text-emerald-600 font-bold">Excellent rating</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">Return Rate</span>
                          <span className="text-xl font-bold text-slate-800">1.8%</span>
                        </div>
                        <Progress value={18} className="h-3 bg-slate-200" />
                        <p className="text-xs text-emerald-600 font-bold">-0.3% improvement</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">Avg Order Value</span>
                          <span className="text-xl font-bold text-slate-800">ZMW 448</span>
                        </div>
                        <Progress value={75} className="h-3 bg-slate-200" />
                        <p className="text-xs text-emerald-600 font-bold">+ZMW 23 increase</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900">Sales Report</h3>
                      </div>
                      <p className="text-blue-700 mb-8 font-medium leading-relaxed">
                        Comprehensive sales analysis with revenue breakdowns, product performance, and growth metrics.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <UserCheck className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-emerald-900">Customer Report</h3>
                      </div>
                      <p className="text-emerald-700 mb-8 font-medium leading-relaxed">
                        Customer behavior analysis, demographics insights, and retention metrics for strategic planning.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold shadow-lg">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Boxes className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-900">Inventory Report</h3>
                      </div>
                      <p className="text-amber-700 mb-8 font-medium leading-relaxed">
                        Stock levels, inventory turnover, and supply chain optimization recommendations.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold shadow-lg">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Business Insights */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center text-slate-800">
                      <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                      Business Insights
                    </h3>

                    <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-emerald-900">Exceptional Growth</h4>
                        </div>
                        <p className="text-emerald-700 font-medium leading-relaxed">
                          Revenue increased by 28.4% this month, driven by strong electronics sales and improved
                          customer retention.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-blue-900">Category Leader</h4>
                        </div>
                        <p className="text-blue-700 font-medium leading-relaxed">
                          Electronics category dominates with 35% market share and highest profit margins in your
                          portfolio.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-amber-900">Inventory Alert</h4>
                        </div>
                        <p className="text-amber-700 font-medium leading-relaxed">
                          5 high-demand products are running low. Consider restocking to avoid missed sales
                          opportunities.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Strategic Recommendations */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center text-slate-800">
                      <Target className="w-6 h-6 mr-3 text-amber-600" />
                      Strategic Recommendations
                    </h3>

                    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-3 text-slate-800">Optimize Product Listings</h4>
                        <p className="text-slate-600 font-medium mb-4 leading-relaxed">
                          Enhance product descriptions and images for top-performing items to boost conversion rates by
                          an estimated 15%.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold bg-transparent"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-3 text-slate-800">Expand Marketing Reach</h4>
                        <p className="text-slate-600 font-medium mb-4 leading-relaxed">
                          Increase advertising spend for electronics category to capitalize on high-performing products
                          and market demand.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold bg-transparent"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-3 text-slate-800">Customer Loyalty Program</h4>
                        <p className="text-slate-600 font-medium mb-4 leading-relaxed">
                          Implement a rewards system to increase repeat purchases and improve customer lifetime value by
                          25%.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold bg-transparent"
                        >
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
