"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, Target, Globe, Zap } from "lucide-react"

export default function InvestorPitch() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    // Slide 1: Title
    {
      title: "Linka E-commerce Platform",
      subtitle: "Empowering Zambian SMEs in a $405M Market",
      content: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-200">
              <Globe className="w-24 h-24 mx-auto mb-6 text-orange-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Linka
              </h1>
              <p className="text-xl text-gray-600 mb-6">AI-driven E-commerce Platform</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>Prepared by Linka Team</span>
                <span>•</span>
                <span>Zambia-based Startup</span>
                <span>•</span>
                <span>August 29, 2025</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: The Problem
    {
      title: "The Problem: SME Digital Gap in Zambia",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
              <Users className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">99% of Zambian businesses are SMEs</h3>
              <p className="text-gray-600">Driving 70% of employment across Africa</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Limited Digital Presence</h3>
              <p className="text-gray-600">Only 22% have websites, 50% internet penetration</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <Target className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Key Challenges</h3>
              <p className="text-gray-600">Logistics, payment fragmentation, digital skills gaps</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="relative w-64 h-64 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E67E22"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${22 * 2.51} ${78 * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">22%</div>
                    <div className="text-sm text-gray-600">Have Websites</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3: Solution
    {
      title: "Linka's Solution: AI-driven E-commerce Platform",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Tools</h3>
                <p className="text-sm text-gray-600">
                  Dashboard for inventory/sales, customer interface, courier integration
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <DollarSign className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Affordable Pricing</h3>
                <p className="text-sm text-gray-600">Bronze (470 ZMW), Silver (1,175 ZMW), Gold (2,350 ZMW)</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-gray-600">WhatsApp integration for testing and feedback</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-orange-100 to-blue-100 p-8 rounded-2xl border border-orange-200">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h3 className="text-2xl font-bold mb-2">Goal: Boost SME Revenue by 25%</h3>
              <p className="text-gray-600">Within the first two years of operation</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Market Opportunity
    {
      title: "Market Opportunity: $405M Zambian E-commerce",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Zambia Market</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">$405M</span> market in 2025
                </p>
                <p>
                  <span className="font-semibold">7.79%</span> CAGR growth
                </p>
                <p>
                  <span className="font-semibold">5M</span> internet users
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Africa Market</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">$40.49B</span> total market
                </p>
                <p>
                  <span className="font-semibold">8.46%</span> CAGR through 2030
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold mb-4 text-green-700">SADC Trends</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">$460M</span> startup funding in Q1 2025
                </p>
                <p>
                  <span className="font-semibold">$1.5M</span> average seed funding
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Market Growth Projection</h3>
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">2025</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$405M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2026</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$437M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2027</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$471M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2028</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$508M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2029</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$548M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2030</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$591M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 5: Traction
    {
      title: "Traction: Pilot and Early Success",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Pilot Program</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Market Size:</span>
                    <span className="font-semibold">150 participants</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SMEs:</span>
                    <span className="font-semibold">100 businesses</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customers:</span>
                    <span className="font-semibold">50+ active users</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Revenue Growth:</span>
                    <span className="font-semibold text-green-600">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NPS Score:</span>
                    <span className="font-semibold text-green-600">75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-semibold">326,070 ZMW</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Growth Trajectory</h3>
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-600 border-b pb-2">
                  <span>Period</span>
                  <span>Revenue</span>
                  <span>Users</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span>Month 1</span>
                  <span>50K ZMW</span>
                  <span>20</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span>Month 3</span>
                  <span>150K ZMW</span>
                  <span>50</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span>Month 6</span>
                  <span>326K ZMW</span>
                  <span>100</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span>Month 12</span>
                  <span>500K ZMW</span>
                  <span>200</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span>Month 18</span>
                  <span>750K ZMW</span>
                  <span>400</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm font-semibold">
                  <span>Month 24</span>
                  <span>1.2M ZMW</span>
                  <span>700</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg">
              <p className="text-center font-semibold">Scale Plan: 700 SMEs at launch → 10,000 in two years</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 6: Financial Overview
    {
      title: "Financial Overview",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Revenue Breakdown (Monthly)</h3>
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span>Subscriptions</span>
                  </div>
                  <span className="font-semibold">137,475 ZMW</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Transaction Fees</span>
                  </div>
                  <span className="font-semibold">114,915 ZMW</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Commissions</span>
                  </div>
                  <span className="font-semibold">73,680 ZMW</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Monthly Revenue:</span>
                    <span>326,070 ZMW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-700">Revenue Streams</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subscriptions (100 SMEs):</span>
                    <span className="font-semibold">137,475 ZMW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Fees (4,890 orders):</span>
                    <span className="font-semibold">114,915 ZMW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commissions:</span>
                    <span className="font-semibold">73,680 ZMW</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Monthly Revenue:</span>
                    <span>326,070 ZMW</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-700">Financial Projections</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Costs:</span>
                    <span className="font-semibold">364,250 ZMW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Monthly:</span>
                    <span className="font-semibold text-red-600">(38,180) ZMW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year 1 Revenue:</span>
                    <span className="font-semibold">1,833,000 ZMW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break-even Target:</span>
                    <span className="font-semibold text-green-600">18 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },

    // Slide 7: Investment Opportunity
    {
      title: "Investment Opportunity",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-100 to-orange-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Investment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Seeking:</span>
                    <span className="font-bold">$300,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equity:</span>
                    <span className="font-bold">28.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shares:</span>
                    <span className="font-bold">5,720 shares</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Share Price:</span>
                    <span className="font-bold">$37.50 (881.25 ZMW)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Investment Split</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Lead Investor:</span>
                    <span className="font-bold">$90,000 (2,400 shares)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4 Other Investors:</span>
                    <span className="font-bold">$31,125 each (830 shares)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Use of Funds</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Platform Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Pilot Program Expansion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Market Launch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Performance Monitoring</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">18-month runway to break-even</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Exit Strategy</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Break-even:</span> 18 months
                  </p>
                  <p>
                    <span className="font-semibold">Year 2 Revenue:</span> $250K target
                  </p>
                  <p>
                    <span className="font-semibold">Potential Exit:</span> Strategic acquisition or Series A
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },

    // Slide 8: Why Invest
    {
      title: "Why Invest in Linka?",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-100 to-orange-50">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Market Opportunity</h3>
                <p className="text-gray-600">
                  Addresses SME digital gap in fast-growing $405M market with proven demand
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Scalable Technology</h3>
                <p className="text-gray-600">AI-powered platform with proven pilot traction and strong user feedback</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Regional Alignment</h3>
                <p className="text-gray-600">
                  Aligned with SADC growth trends, ZDA incentives, and Digital Africa funding initiatives
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Social Impact</h3>
                <p className="text-gray-600">
                  Empower 10,000 SMEs, boosting employment in the sector that drives 70% of Africa's jobs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },

    // Slide 9: Next Steps
    {
      title: "Next Steps",
      content: (
        <div className="text-center space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-100 to-orange-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Review Documentation</h3>
                <p className="text-gray-600">Term sheet and valuation details available for due diligence</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Strategic Partnership</h3>
                <p className="text-gray-600">Engage with lead investors for strategic alignment and market entry</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-green-100 p-8 rounded-2xl border border-orange-200">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Journey?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Contact us for detailed due diligence materials and pilot program access
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-semibold">support@linka.zm</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-semibold">WhatsApp Pilot Access</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Investor Pitch
            </h2>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>
                Slide {currentSlide + 1} of {slides.length}
              </span>
              <div className="flex space-x-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Slide Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12 min-h-[600px]">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{slides[currentSlide].title}</h3>
                {slides[currentSlide].subtitle && (
                  <p className="text-xl text-gray-600">{slides[currentSlide].subtitle}</p>
                )}
              </div>
              <div className="h-full">{slides[currentSlide].content}</div>
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                disabled={currentSlide === 0}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-gray-500">
                {currentSlide + 1} / {slides.length}
              </div>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="sm"
                disabled={currentSlide === slides.length - 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
