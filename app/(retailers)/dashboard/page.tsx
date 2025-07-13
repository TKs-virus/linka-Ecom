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
  Filter,
  Eye,
  Star,
  Target,
  BarChart3,
  FileText,
  UserCheck,
  Boxes,
  Zap,
  Bell,
  Settings,
  Home,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  Globe,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  PieChart,
  MoreHorizontal,
  CalendarIcon,
  Percent,
} from "lucide-react"
import {
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart as RechartsPieChart,
  Pie,
  Line,
  ComposedChart,
} from "recharts"
import Link from "next/link"

// Enhanced mock data with more realistic business metrics
const revenueData = [
  { month: "Jan", revenue: 145000, orders: 320, customers: 189, target: 140000, profit: 29000, expenses: 116000 },
  { month: "Feb", revenue: 162000, orders: 380, customers: 234, target: 155000, profit: 35640, expenses: 126360 },
  { month: "Mar", revenue: 158000, orders: 340, customers: 198, target: 160000, profit: 33180, expenses: 124820 },
  { month: "Apr", revenue: 175000, orders: 420, customers: 267, target: 170000, profit: 38500, expenses: 136500 },
  { month: "May", revenue: 195000, orders: 480, customers: 298, target: 185000, profit: 44850, expenses: 150150 },
  { month: "Jun", revenue: 220000, orders: 520, customers: 312, target: 210000, profit: 52800, expenses: 167200 },
]

const salesDistributionData = [
  { name: "Electronics", value: 35, amount: 76300, color: "#6366F1", trend: "+12%", orders: 234 },
  { name: "Fashion", value: 28, amount: 61040, color: "#10B981", trend: "+8%", orders: 189 },
  { name: "Home & Garden", value: 18, amount: 39240, color: "#F59E0B", trend: "+15%", orders: 156 },
  { name: "Sports & Fitness", value: 12, amount: 26160, color: "#8B5CF6", trend: "+5%", orders: 98 },
  { name: "Books & Media", value: 7, amount: 15260, color: "#EF4444", trend: "+3%", orders: 67 },
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
    location: "Lusaka, Zambia",
    paymentMethod: "Mobile Money",
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
    location: "Ndola, Zambia",
    paymentMethod: "Bank Transfer",
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
    location: "Kitwe, Zambia",
    paymentMethod: "Credit Card",
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
    location: "Livingstone, Zambia",
    paymentMethod: "Mobile Money",
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
    stock: 234,
    rating: 4.8,
  },
  {
    rank: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    sales: 1523,
    revenue: 456900,
    growth: "+12.8%",
    growthColor: "text-emerald-600",
    stock: 156,
    rating: 4.9,
  },
  {
    rank: 3,
    name: "Ergonomic Office Chair",
    category: "Home & Garden",
    sales: 892,
    revenue: 178400,
    growth: "+24.5%",
    growthColor: "text-emerald-600",
    stock: 89,
    rating: 4.7,
  },
  {
    rank: 4,
    name: "Professional Camera Lens",
    category: "Electronics",
    sales: 634,
    revenue: 190200,
    growth: "+8.7%",
    growthColor: "text-emerald-600",
    stock: 45,
    rating: 4.6,
  },
]

const businessAlerts = [
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Low Stock Alert",
    message: "5 products are running low on inventory",
    time: "2 hours ago",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Payment Received",
    message: "ZMW 2,450 payment confirmed from Marcus Johnson",
    time: "4 hours ago",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    type: "info",
    icon: TrendingUp,
    title: "Sales Milestone",
    message: "You've reached 500 orders this month!",
    time: "1 day ago",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
]

const quickActions = [
  { name: "Add Product", icon: Plus, href: "/dashboard/products/new", color: "bg-blue-600" },
  { name: "View Orders", icon: ShoppingCart, href: "/dashboard/orders", color: "bg-emerald-600" },
  { name: "Customer Support", icon: Users, href: "/dashboard/customers", color: "bg-purple-600" },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics", color: "bg-amber-600" },
  { name: "Marketing", icon: Target, href: "/dashboard/marketing", color: "bg-pink-600" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings", color: "bg-slate-600" },
]

// Custom Tooltip component to prevent context issues
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-slate-200 rounded-lg p-3 shadow-lg backdrop-blur-sm">
        <p className="font-semibold text-slate-800">{`${label}: ${payload[0].value}%`}</p>
        <p className="text-sm text-slate-600">{`${payload[0].payload.orders} orders`}</p>
        <p className="text-sm text-emerald-600 font-medium">{payload[0].payload.trend}</p>
      </div>
    )
  }
  return null
}

// Safe PieChart component with error boundary
const SafePieChart = ({ data }: { data: typeof salesDistributionData }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-500">
        <div className="text-center">
          <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          stroke="#ffffff"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

export default function RetailerDashboardDemo() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 1200)
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  // Don't render charts until component is mounted to prevent SSR issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Initializing Dashboard
            </h2>
            <p className="text-slate-600 font-medium text-lg">Setting up your business insights...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Loading Dashboard
            </h2>
            <p className="text-slate-600 font-medium text-lg">Preparing your business insights...</p>
          </div>
          <div className="w-80 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-pulse w-4/5 transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  LINKA
                </h1>
                <p className="text-sm text-slate-600 font-medium">Business Command Center</p>
              </div>
            </div>

            {/* Enhanced Breadcrumb */}
            <div className="hidden lg:flex items-center space-x-3 text-sm">
              <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-slate-800 font-semibold">Dashboard</span>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Live</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Enhanced Search */}
            <div className="hidden md:flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-5 py-3 min-w-96 border border-slate-200/60 shadow-sm">
              <Search className="w-5 h-5 text-slate-500" />
              <Input
                placeholder="Search orders, products, customers..."
                className="border-0 bg-transparent text-slate-700 placeholder:text-slate-500 focus-visible:ring-0 font-medium"
              />
              <kbd className="px-2 py-1 text-xs text-slate-500 bg-slate-100 rounded border">⌘K</kbd>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-white/60 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-white/60">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
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

      {/* Main Content */}
      <div className="p-8">
        {/* Enhanced Page Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <p className="text-slate-600 text-lg">Welcome back! Here's what's happening with your business today.</p>
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: {currentTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>Zambia (UTC+2)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="bg-white/60 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Quick Action
              </Button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-white/60 backdrop-blur-sm hover:bg-white border border-slate-200/60 shadow-sm"
              >
                <Link href={action.href}>
                  <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{action.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-sm">
            <TabsTrigger
              value="overview"
              className="font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="finance"
              className="font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Finance
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center space-x-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+28.4%</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Revenue</p>
                    <p className="text-3xl font-bold text-slate-800">ZMW 1,108,000</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Target: ZMW 1,000,000</span>
                      <span className="text-emerald-600 font-semibold">110.8%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ShoppingCart className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 flex items-center space-x-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+15.2%</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Orders</p>
                    <p className="text-3xl font-bold text-slate-800">2,472</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">This month</span>
                      <span className="text-blue-600 font-semibold">+312 orders</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className="bg-amber-50 text-amber-700 border-amber-200 flex items-center space-x-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+8.7%</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Active Products</p>
                    <p className="text-3xl font-bold text-slate-800">3,847</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">In stock: 3,234</span>
                      <span className="text-amber-600 font-semibold">84.1%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className="bg-purple-50 text-purple-700 border-purple-200 flex items-center space-x-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+12.8%</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Customers</p>
                    <p className="text-3xl font-bold text-slate-800">12,429</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Active: 8,234</span>
                      <span className="text-purple-600 font-semibold">66.2%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Alerts */}
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-amber-600" />
                      <span>Business Alerts</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">Important notifications and updates</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white/60">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 ${alert.bgColor} rounded-xl border border-slate-200/60`}
                    >
                      <div className={`w-10 h-10 ${alert.bgColor} rounded-xl flex items-center justify-center`}>
                        <alert.icon className={`w-5 h-5 ${alert.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{alert.title}</h4>
                        <p className="text-sm text-slate-600">{alert.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{alert.time}</p>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white/60 mt-1">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue Analytics */}
              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Revenue Analytics</CardTitle>
                    <CardDescription className="text-slate-600">
                      Monthly performance trends with targets
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="bg-white/60 backdrop-blur-sm">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      6M
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/60 backdrop-blur-sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #E2E8F0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366F1"
                        strokeWidth={3}
                        fill="url(#revenueGradient)"
                        name="Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sales Distribution */}
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">Sales Distribution</CardTitle>
                  <CardDescription className="text-slate-600">By category performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-6">
                    <SafePieChart data={salesDistributionData} />
                  </div>
                  <div className="space-y-4">
                    {salesDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50/60 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <div>
                            <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                            <p className="text-xs text-slate-500">{item.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-800">{item.value}%</p>
                          <p className="text-xs text-emerald-600 font-semibold">{item.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Recent Orders</CardTitle>
                    <CardDescription className="text-slate-600">Latest customer transactions</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white/60">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50/60 rounded-xl hover:bg-white/60 transition-all duration-300 border border-slate-200/60"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                              {order.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-800">{order.customer}</p>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <span>{order.id}</span>
                              <span>•</span>
                              <span>{order.items} items</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                              <MapPin className="w-3 h-3" />
                              <span>{order.location}</span>
                              <span>•</span>
                              <CreditCard className="w-3 h-3" />
                              <span>{order.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${order.statusColor} text-xs mb-2`}>{order.status}</Badge>
                          <p className="text-lg font-bold text-slate-800">ZMW {order.amount}</p>
                          <p className="text-xs text-slate-500">{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Top Products</CardTitle>
                    <CardDescription className="text-slate-600">Best performing items</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white/60">
                    <Star className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50/60 rounded-xl hover:bg-white/60 transition-all duration-300 border border-slate-200/60"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
                            {product.rank}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{product.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <span>{product.category}</span>
                              <span>•</span>
                              <span>{product.sales} sales</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                              <Package className="w-3 h-3" />
                              <span>Stock: {product.stock}</span>
                              <span>•</span>
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-800">ZMW {product.revenue.toLocaleString()}</p>
                          <p
                            className={`text-sm font-bold ${product.growthColor} flex items-center justify-end space-x-1`}
                          >
                            <ArrowUpRight className="w-3 h-3" />
                            <span>{product.growth}</span>
                          </p>
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
              <Card className="lg:col-span-3 bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">Performance Analytics</CardTitle>
                  <CardDescription className="text-slate-600">
                    Comprehensive business metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #E2E8F0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Bar dataKey="orders" fill="#6366F1" name="Orders" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="customers" fill="#10B981" name="New Customers" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="profit" stroke="#F59E0B" strokeWidth={3} name="Profit (K)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced Key Metrics */}
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">Key Metrics</CardTitle>
                  <CardDescription className="text-slate-600">Performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-600">Conversion Rate</span>
                      <span className="text-lg font-bold text-slate-800">4.2%</span>
                    </div>
                    <Progress value={42} className="h-3" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+0.8% from last month</span>
                      </span>
                      <span className="text-slate-500">Target: 5%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-600">Customer Satisfaction</span>
                      <span className="text-lg font-bold text-slate-800">4.9/5</span>
                    </div>
                    <Progress value={98} className="h-3" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-semibold">Excellent rating</span>
                      <span className="text-slate-500">1,247 reviews</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-600">Return Rate</span>
                      <span className="text-lg font-bold text-slate-800">1.8%</span>
                    </div>
                    <Progress value={18} className="h-3" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                        <ArrowDownRight className="w-3 h-3" />
                        <span>-0.3% improvement</span>
                      </span>
                      <span className="text-slate-500">Industry: 2.5%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-600">Avg Order Value</span>
                      <span className="text-lg font-bold text-slate-800">ZMW 448</span>
                    </div>
                    <Progress value={75} className="h-3" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+ZMW 23 increase</span>
                      </span>
                      <span className="text-slate-500">Target: ZMW 500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Financial Overview */}
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Financial Overview</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Revenue, expenses, and profit analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #E2E8F0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stackId="1"
                        stroke="#10B981"
                        fill="url(#profitGradient)"
                        name="Profit"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stackId="2"
                        stroke="#EF4444"
                        fill="url(#expenseGradient)"
                        name="Expenses"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Financial Metrics */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30">This Month</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-100 mb-1">Net Profit</p>
                      <p className="text-3xl font-bold text-white">ZMW 52,800</p>
                      <p className="text-sm text-emerald-100 mt-2">Margin: 24%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30">Outstanding</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-100 mb-1">Accounts Receivable</p>
                      <p className="text-3xl font-bold text-white">ZMW 23,450</p>
                      <p className="text-sm text-blue-100 mt-2">12 pending invoices</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Percent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30">Growth</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-100 mb-1">Profit Margin</p>
                      <p className="text-3xl font-bold text-white">24.8%</p>
                      <p className="text-sm text-purple-100 mt-2">+2.3% vs last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Sales Report</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Comprehensive sales analysis with revenue breakdowns, performance metrics, and growth insights.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Last generated:</span>
                      <span className="text-slate-800 font-medium">2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Format:</span>
                      <span className="text-slate-800 font-medium">PDF, Excel</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <UserCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Customer Report</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Customer behavior analysis, retention metrics, and segmentation for strategic planning.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Last generated:</span>
                      <span className="text-slate-800 font-medium">1 day ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Format:</span>
                      <span className="text-slate-800 font-medium">PDF, CSV</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Boxes className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Inventory Report</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Stock levels, supply chain optimization, and inventory turnover recommendations.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Last generated:</span>
                      <span className="text-slate-800 font-medium">6 hours ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Format:</span>
                      <span className="text-slate-800 font-medium">PDF, Excel</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* —— Insights TAB (placeholder for future expansion) —— */}
          <TabsContent value="insights" className="flex items-center justify-center py-24">
            <div className="text-center space-y-4">
              <PieChart className="mx-auto w-16 h-16 text-blue-400" />
              <h3 className="text-xl font-semibold text-slate-800">Powerful Insights coming soon</h3>
              <p className="text-slate-600">
                We’re working hard to bring you advanced, AI-powered insights for your business.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
