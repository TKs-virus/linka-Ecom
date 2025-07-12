"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Download,
  Plus,
  Calendar,
  Filter,
  Eye,
  BarChart3,
  Settings,
  TrendingUp,
  Star,
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
  BarChart,
  Bar,
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
  { name: "Electronics", value: 35, amount: 76300, color: "#4F46E5", trend: "+18.2%" },
  { name: "Fashion", value: 28, amount: 61040, color: "#10B981", trend: "+12.8%" },
  { name: "Home & Garden", value: 18, amount: 39240, color: "#F59E0B", trend: "+24.5%" },
  { name: "Sports & Fitness", value: 12, amount: 26160, color: "#EF4444", trend: "+8.7%" },
  { name: "Books & Media", value: 7, amount: 15260, color: "#8B5CF6", trend: "+15.3%" },
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
    time: "2 hours ago",
  },
  {
    id: "ORD-2024-002",
    customer: "Marcus Johnson",
    avatar: "MJ",
    items: 2,
    amount: 289.5,
    status: "Processing",
    statusColor: "bg-blue-100 text-blue-800",
    time: "4 hours ago",
  },
  {
    id: "ORD-2024-003",
    customer: "Sofia Rodriguez",
    avatar: "SR",
    items: 1,
    amount: 129.99,
    status: "Shipped",
    statusColor: "bg-yellow-100 text-yellow-800",
    time: "6 hours ago",
  },
  {
    id: "ORD-2024-004",
    customer: "David Kim",
    avatar: "DK",
    items: 4,
    amount: 699.99,
    status: "Pending",
    statusColor: "bg-orange-100 text-orange-800",
    time: "8 hours ago",
  },
  {
    id: "ORD-2024-005",
    customer: "Emma Thompson",
    avatar: "ET",
    items: 2,
    amount: 189.99,
    status: "Cancelled",
    statusColor: "bg-red-100 text-red-800",
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

const keyMetrics = [
  {
    title: "Conversion Rate",
    value: "4.2%",
    change: "+0.8% from last month",
    changeColor: "text-green-600",
    progress: 84,
  },
  {
    title: "Customer Satisfaction",
    value: "4.9/5",
    change: "Excellent rating",
    changeColor: "text-green-600",
    progress: 98,
  },
  {
    title: "Return Rate",
    value: "1.8%",
    change: "-0.3% improvement",
    changeColor: "text-green-600",
    progress: 18,
  },
  {
    title: "Avg Order Value",
    value: "ZMW 448",
    change: "+ZMW 23 increase",
    changeColor: "text-green-600",
    progress: 75,
  },
]

const businessInsights = [
  {
    type: "success",
    title: "Exceptional Growth",
    description:
      "Revenue increased by 28.4% this month, driven by strong electronics sales and improved customer retention.",
    icon: TrendingUp,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    type: "info",
    title: "Category Leader",
    description: "Electronics category dominates with 35% market share and highest profit margins in your portfolio.",
    icon: Star,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    type: "warning",
    title: "Inventory Alert",
    description: "5 high-demand products are running low. Consider restocking to avoid missed sales opportunities.",
    icon: Package,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
]

const strategicRecommendations = [
  {
    title: "Optimize Product Listings",
    description:
      "Enhance product descriptions and images for top-performing items to boost conversion rates by an estimated 15%.",
    action: "Learn More",
  },
  {
    title: "Expand Marketing Reach",
    description:
      "Increase advertising spend for electronics category to capitalize on high-performing products and market demand.",
    action: "Learn More",
  },
  {
    title: "Customer Loyalty Program",
    description: "Implement a rewards system to increase repeat purchases and improve customer lifetime value by 25%.",
    action: "Learn More",
  },
]

export default function RetailerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's your business performance at a glance.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md bg-white border border-gray-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Reports
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">ZMW 1,108,000</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 font-medium">+28.4%</span>
                      <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900">2,472</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-blue-600 font-medium">+15.2%</span>
                      <span className="text-gray-500 ml-1">23 pending</span>
                    </div>
                    <Progress value={75} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Active Products</p>
                    <p className="text-3xl font-bold text-gray-900">3,847</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-orange-600 mr-1" />
                      <span className="text-orange-600 font-medium">+8.7%</span>
                      <span className="text-gray-500 ml-1">5 low stock</span>
                    </div>
                    <Progress value={90} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-3xl font-bold text-gray-900">12,429</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                      <span className="text-purple-600 font-medium">+12.8%</span>
                      <span className="text-gray-500 ml-1">325 new</span>
                    </div>
                    <Progress value={80} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Analytics */}
              <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Revenue Analytics</CardTitle>
                    <CardDescription className="text-gray-600">Monthly performance and growth trends</CardDescription>
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
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sales Distribution */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Sales Distribution</CardTitle>
                  <CardDescription className="text-gray-600">Revenue by product category</CardDescription>
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
                    {salesDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{item.value}%</p>
                          <p className="text-xs text-gray-500">ZMW {item.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Recent Orders</CardTitle>
                    <CardDescription className="text-gray-600">Latest customer transactions</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-sm">
                              {order.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <p className="text-sm text-gray-500">
                              {order.id} • {order.items} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">ZMW {order.amount}</p>
                          <Badge className={`text-xs ${order.statusColor}`}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Top Products</CardTitle>
                    <CardDescription className="text-gray-600">Best performing items</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                    <Star className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {product.rank}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              {product.category} • {product.sales} sales
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">ZMW {product.revenue.toLocaleString()}</p>
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
              <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Performance Analytics</CardTitle>
                  <CardDescription className="text-gray-600">Comprehensive business metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar dataKey="orders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="customers" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {keyMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                          <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                        </div>
                        <Progress value={metric.progress} className="h-2 bg-gray-100" />
                        <p className={`text-xs ${metric.changeColor}`}>{metric.change}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-blue-50 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Sales Report</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Comprehensive sales analysis with revenue breakdowns, product performance, and growth metrics.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Report</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Customer behavior analysis, demographics insights, and retention metrics for strategic planning.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Inventory Report</h3>
                  <p className="text-gray-600 text-sm mb-4">
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
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Business Insights</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {businessInsights.map((insight, index) => (
                      <div key={index} className={`p-4 rounded-lg ${insight.bgColor}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.bgColor}`}>
                            <insight.icon className={`w-4 h-4 ${insight.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strategic Recommendations */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Settings className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Strategic Recommendations</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {strategicRecommendations.map((recommendation, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                        <Button variant="outline" size="sm">
                          {recommendation.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
