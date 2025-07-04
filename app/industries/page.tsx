"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  ShoppingBag,
  GraduationCap,
  Utensils,
  Heart,
  Plane,
  Store,
  Users,
  TrendingUp,
  ArrowRight,
  Grid,
  List,
  ShoppingCart,
  CreditCard,
  Package,
  BarChart3,
  Video,
  BookOpen,
  Award,
  MessageSquare,
  MapPin,
  Stethoscope,
  Pill,
  FileText,
  Hotel,
  Camera,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  Target,
  Smartphone,
  Cloud,
  Headphones,
  Calendar,
  Eye,
} from "lucide-react"
import { MainNav } from "@/components/landing/main-nav"
import { AppFooter } from "@/components/landing/app-footer"

// Comprehensive industry data with actual service functionalities from Services folder
const industries = [
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Complete online retail solutions for modern businesses",
    icon: ShoppingBag,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    image: "/placeholder.svg?height=300&width=400",
    stats: {
      stores: "2,500+",
      products: "50,000+",
      orders: "100,000+",
      revenue: "$50M+",
      satisfaction: "98%",
      growth: "250%",
    },
    services: [
      {
        name: "Product Catalog Management",
        description: "Advanced product listing, categorization, and inventory management system",
        icon: Package,
        features: [
          "Dynamic product categories with unlimited nesting levels",
          "Advanced search and filtering with faceted navigation",
          "Product variants (size, color, material) with inventory tracking",
          "Bulk product import/export with CSV and Excel support",
          "SEO-optimized product pages with meta tags and structured data",
          "Multi-image gallery with zoom and 360° view support",
          "Product comparison and wishlist functionality",
          "Inventory alerts and automated reorder points",
          "Price management with bulk pricing and discount rules",
          "Product reviews and ratings with moderation tools",
        ],
        path: "/Services/E-com",
        demo: "/Services/E-com/products",
        pricing: "Starting at $29/month",
        users: "2,500+ stores",
        integrations: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Amazon", "eBay"],
        metrics: {
          "Products Managed": "50,000+",
          Categories: "1,000+",
          "Search Accuracy": "99.2%",
          "Load Time": "< 2s",
        },
      },
      {
        name: "Shopping Cart & Checkout",
        description: "Seamless shopping experience with secure payment processing and conversion optimization",
        icon: ShoppingCart,
        features: [
          "Persistent shopping cart across devices and sessions",
          "Guest checkout with optional account creation",
          "Multiple payment gateways (Stripe, PayPal, Square, Apple Pay)",
          "Real-time tax calculation based on location and product type",
          "Dynamic shipping rate calculation with multiple carriers",
          "Order confirmation with automated email receipts",
          "Abandoned cart recovery with automated email sequences",
          "One-click checkout for returning customers",
          "Mobile-optimized checkout process",
          "Security compliance (PCI DSS, SSL encryption)",
        ],
        path: "/Services/E-com",
        demo: "/Services/E-com/cart",
        pricing: "Starting at $39/month",
        users: "100K+ transactions",
        integrations: ["Stripe", "PayPal", "Square", "Apple Pay", "Google Pay", "Klarna"],
        metrics: {
          "Conversion Rate": "3.2%",
          "Cart Recovery": "25%",
          "Payment Success": "99.8%",
          "Checkout Speed": "< 30s",
        },
      },
      {
        name: "Order Management System",
        description: "Complete order processing, fulfillment automation, and customer service integration",
        icon: CreditCard,
        features: [
          "Real-time order tracking with status updates and notifications",
          "Automated inventory management with stock synchronization",
          "Multi-channel order consolidation (web, mobile, marketplace)",
          "Return and refund processing with automated workflows",
          "Shipping label generation and tracking integration",
          "Customer notification system via email, SMS, and push notifications",
          "Backorder management with automatic fulfillment",
          "Order analytics and performance reporting",
          "Integration with warehouse management systems",
          "Customer service tools with order history access",
        ],
        path: "/Services/E-com",
        demo: "/Services/E-com/categories",
        pricing: "Starting at $49/month",
        users: "50K+ orders monthly",
        integrations: ["FedEx", "UPS", "DHL", "USPS", "ShipStation", "Fulfillment by Amazon"],
        metrics: {
          "Order Accuracy": "99.5%",
          "Processing Time": "< 2 hours",
          "Shipping Speed": "Same day",
          "Return Rate": "< 5%",
        },
      },
      {
        name: "Business Analytics & Intelligence",
        description: "Data-driven insights, reporting, and business intelligence for strategic decision making",
        icon: BarChart3,
        features: [
          "Real-time sales performance tracking and KPI monitoring",
          "Customer behavior analysis with heat maps and user journeys",
          "Inventory turnover reports with demand forecasting",
          "Revenue forecasting with seasonal trend analysis",
          "Marketing ROI analysis across all channels and campaigns",
          "Custom dashboard creation with drag-and-drop widgets",
          "Automated report generation and email delivery",
          "A/B testing framework for conversion optimization",
          "Cohort analysis and customer lifetime value tracking",
          "Competitive analysis and market intelligence",
        ],
        path: "/Services/E-com",
        demo: "/Services/E-com/deals",
        pricing: "Starting at $59/month",
        users: "Real-time insights",
        integrations: ["Google Analytics", "Facebook Pixel", "Klaviyo", "Mailchimp", "Tableau", "Power BI"],
        metrics: {
          "Data Points": "1M+ daily",
          "Report Generation": "< 5 minutes",
          Accuracy: "99.9%",
          Insights: "Real-time",
        },
      },
    ],
    benefits: [
      "24/7 automated online presence with global reach",
      "Scalable infrastructure that grows with your business",
      "Mobile-first responsive design for all devices",
      "Advanced SEO optimization for better visibility",
      "Integrated marketing tools and automation",
      "Comprehensive security and compliance features",
    ],
    useCases: [
      "Fashion and Apparel Retailers",
      "Electronics and Gadgets Stores",
      "Home and Garden Suppliers",
      "Health and Beauty Products",
      "Specialty and Niche Markets",
    ],
  },
  {
    id: "education",
    name: "E-Learning",
    description: "Digital education platforms and comprehensive online learning solutions",
    icon: GraduationCap,
    color: "bg-green-500",
    gradient: "from-green-500 to-green-600",
    image: "/placeholder.svg?height=300&width=400",
    stats: {
      courses: "1,200+",
      students: "25,000+",
      instructors: "500+",
      completion: "85%",
      satisfaction: "94%",
      certificates: "10,000+",
    },
    services: [
      {
        name: "Course Creation & Management Platform",
        description: "Comprehensive course building tools with multimedia content and interactive assessments",
        icon: BookOpen,
        features: [
          "Drag-and-drop course builder with pre-built templates",
          "HD video hosting with adaptive streaming and CDN delivery",
          "Interactive quizzes with multiple question types and auto-grading",
          "Progress tracking with detailed analytics and completion certificates",
          "SCORM and xAPI compliance for enterprise integration",
          "Mobile-responsive design with offline content access",
          "Collaborative tools including discussion forums and peer reviews",
          "Gamification elements with badges, points, and leaderboards",
          "Content versioning and revision history",
          "Multi-language support with automatic translation",
        ],
        path: "/Services/E-Learning",
        demo: "/Services/E-Learning/catalog",
        pricing: "Starting at $39/month",
        users: "1,200+ courses",
        integrations: ["Zoom", "Google Classroom", "Canvas", "Blackboard", "Moodle", "Brightspace"],
        metrics: {
          "Course Completion": "85%",
          "Student Engagement": "92%",
          "Content Hours": "10,000+",
          "Video Quality": "4K HD",
        },
      },
      {
        name: "Virtual Classroom Environment",
        description: "Live online teaching platform with advanced collaboration and interaction tools",
        icon: Video,
        features: [
          "HD video conferencing with up to 500 participants",
          "Screen sharing with annotation tools and laser pointer",
          "Interactive whiteboard with real-time collaboration",
          "Breakout rooms for small group activities and discussions",
          "Session recording with automatic transcription and searchable content",
          "Real-time chat with file sharing and emoji reactions",
          "Polling and Q&A features for audience engagement",
          "Integration with calendar systems for automated scheduling",
          "Attendance tracking with automated reports",
          "Virtual hand raising and participant management",
        ],
        path: "/Services/E-Learning",
        demo: "/Services/E-Learning/course/1",
        pricing: "Starting at $59/month",
        users: "500+ instructors",
        integrations: ["Zoom", "Microsoft Teams", "Google Meet", "WebEx", "BigBlueButton", "Jitsi"],
        metrics: {
          "Max Participants": "500",
          Uptime: "99.9%",
          "Video Quality": "1080p HD",
          Latency: "< 100ms",
        },
      },
      {
        name: "Student Management System",
        description: "Comprehensive student enrollment, progress tracking, and communication platform",
        icon: Users,
        features: [
          "Automated student enrollment with bulk import capabilities",
          "Comprehensive gradebook with weighted categories and grade curves",
          "Attendance tracking with automated notifications to parents",
          "Parent/guardian portal with progress reports and messaging",
          "Multi-language communication tools with translation support",
          "Performance analytics with predictive insights and early warning systems",
          "Custom reporting with export to PDF, Excel, and CSV",
          "Integration with Student Information Systems (SIS)",
          "Behavior tracking and disciplinary record management",
          "Financial aid and scholarship management tools",
        ],
        path: "/Services/E-Learning",
        demo: "/Services/E-Learning/my-courses",
        pricing: "Starting at $29/month",
        users: "25,000+ students",
        integrations: ["PowerSchool", "Infinite Campus", "Skyward", "Clever", "ClassLink", "Google for Education"],
        metrics: {
          "Student Retention": "95%",
          "Parent Engagement": "78%",
          "Grade Accuracy": "99.8%",
          "Response Time": "< 24 hours",
        },
      },
      {
        name: "Certification & Assessment System",
        description: "Automated certificate generation, skill assessment, and compliance tracking platform",
        icon: Award,
        features: [
          "Custom certificate templates with brand customization and digital signatures",
          "Automated certificate generation upon course completion with verification",
          "Digital badge system with Open Badges compliance and blockchain verification",
          "Comprehensive skill assessment tracking with competency mapping",
          "Continuing education credits (CEU) management and reporting",
          "Proctored exam capabilities with identity verification and monitoring",
          "Integration with professional certification bodies and accreditation agencies",
          "Compliance tracking for regulatory requirements and industry standards",
          "Portfolio assessment tools with peer and instructor evaluation",
          "Analytics dashboard for certification program performance",
        ],
        path: "/Services/E-Learning",
        demo: "/Services/E-Learning/cart",
        pricing: "Starting at $19/month",
        users: "10K+ certificates",
        integrations: ["Credly", "Accredible", "BadgeList", "Mozilla Backpack", "IMS Global", "IEEE"],
        metrics: {
          "Certificates Issued": "10,000+",
          "Verification Rate": "100%",
          "Fraud Prevention": "99.9%",
          "Processing Time": "< 5 minutes",
        },
      },
    ],
    benefits: [
      "Flexible learning schedules with 24/7 accessibility",
      "Interactive content delivery with multimedia support",
      "Comprehensive progress monitoring and analytics",
      "Automated certification and compliance tracking",
      "Global accessibility with multi-language support",
      "Cost-effective training delivery at enterprise scale",
    ],
    useCases: [
      "Corporate Training and Development",
      "Higher Education Institutions",
      "K-12 Schools and Districts",
      "Professional Certification Programs",
      "Continuing Education Providers",
    ],
  },
  {
    id: "food",
    name: "Food Delivery",
    description: "Restaurant and food delivery management systems with real-time optimization",
    icon: Utensils,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    image: "/placeholder.svg?height=300&width=400",
    stats: {
      restaurants: "800+",
      orders: "75,000+",
      drivers: "1,500+",
      avgTime: "28 mins",
      satisfaction: "94%",
      accuracy: "99.2%",
    },
    services: [
      {
        name: "Restaurant Management Hub",
        description: "Complete restaurant operations, menu management, and kitchen optimization system",
        icon: Store,
        features: [
          "Digital menu management with real-time pricing updates and availability",
          "Multi-location order processing with centralized dashboard and reporting",
          "Kitchen display system with order prioritization and timing optimization",
          "Inventory tracking with automated supplier ordering and cost management",
          "Staff scheduling and performance management with payroll integration",
          "Revenue analytics with profit margin analysis and forecasting",
          "Customer feedback management and automated response system",
          "Integration with POS systems and accounting software",
          "Table reservation and waitlist management for dine-in services",
          "Loyalty program management with points and rewards tracking",
        ],
        path: "/Services/Food-Delivery",
        demo: "/Services/Food-Delivery/restaurants",
        pricing: "Starting at $49/month",
        users: "800+ restaurants",
        integrations: ["Square", "Toast", "Clover", "Resy", "OpenTable", "QuickBooks"],
        metrics: {
          "Order Processing": "< 2 minutes",
          "Kitchen Efficiency": "+35%",
          "Revenue Growth": "+40%",
          "Customer Satisfaction": "94%",
        },
      },
      {
        name: "Delivery Optimization System",
        description: "AI-powered delivery routing, real-time tracking, and driver management platform",
        icon: MapPin,
        features: [
          "Real-time GPS tracking with live map updates and ETA calculations",
          "AI-powered route optimization for multiple deliveries and traffic conditions",
          "Dynamic delivery time estimation with weather and traffic data integration",
          "Automated customer notifications via SMS, email, and push notifications",
          "Driver performance metrics and rating system with incentive programs",
          "Proof of delivery with photo confirmation and digital signatures",
          "Contactless delivery options with special instructions and safety protocols",
          "Integration with third-party delivery services and logistics partners",
          "Fleet management tools with vehicle tracking and maintenance scheduling",
          "Emergency response system with real-time driver assistance",
        ],
        path: "/Services/Food-Delivery",
        demo: "/Services/Food-Delivery/restaurant/1",
        pricing: "Starting at $69/month",
        users: "1,500+ drivers",
        integrations: ["Google Maps", "Mapbox", "DoorDash", "Uber Eats", "Grubhub", "Postmates"],
        metrics: {
          "Delivery Time": "28 minutes avg",
          "Route Efficiency": "+25%",
          "Driver Utilization": "85%",
          "On-Time Rate": "96%",
        },
      },
      {
        name: "Customer Experience Platform",
        description: "Enhanced customer ordering, engagement, and loyalty management system",
        icon: MessageSquare,
        features: [
          "User-friendly ordering interface with visual menu and customization options",
          "Multiple payment options including digital wallets and buy-now-pay-later",
          "Order history with reorder functionality and favorite items",
          "Rating and review system with photo uploads and detailed feedback",
          "24/7 customer support chat with AI assistance and human escalation",
          "Loyalty program with points, rewards, and personalized offers",
          "Personalized recommendations based on order history and preferences",
          "Social media integration for sharing and community reviews",
          "Group ordering capabilities for office and event catering",
          "Dietary restriction and allergy management with ingredient tracking",
        ],
        path: "/Services/Food-Delivery",
        demo: "/Services/Food-Delivery/checkout",
        pricing: "Starting at $39/month",
        users: "100K+ customers",
        integrations: ["Apple Pay", "Google Pay", "PayPal", "Venmo", "Stripe", "Square"],
        metrics: {
          "Customer Retention": "78%",
          "Order Frequency": "2.3x/month",
          "App Rating": "4.7/5",
          "Support Response": "< 2 minutes",
        },
      },
      {
        name: "Business Intelligence Dashboard",
        description: "Comprehensive analytics, reporting, and business intelligence for food service operations",
        icon: BarChart3,
        features: [
          "Real-time sales performance tracking by location, time, and menu items",
          "Peak hours analysis with demand forecasting and staff optimization",
          "Customer behavior insights and ordering pattern analysis",
          "Driver efficiency metrics and delivery performance optimization",
          "Revenue forecasting with seasonal adjustments and trend analysis",
          "Food cost analysis and profit margin optimization with supplier insights",
          "Marketing campaign effectiveness tracking with ROI measurement",
          "Competitive analysis and market positioning insights with pricing intelligence",
          "Waste reduction analytics with inventory optimization recommendations",
          "Custom KPI dashboards with automated alerts and notifications",
        ],
        path: "/Services/Food-Delivery",
        demo: "/Services/Food-Delivery/order-confirmation",
        pricing: "Starting at $79/month",
        users: "Real-time insights",
        integrations: ["Google Analytics", "Tableau", "Power BI", "Mixpanel", "Segment", "Amplitude"],
        metrics: {
          "Data Processing": "Real-time",
          "Report Generation": "< 30 seconds",
          "Forecast Accuracy": "92%",
          "Cost Savings": "15-20%",
        },
      },
    ],
    benefits: [
      "Faster order processing with automated workflows",
      "Real-time delivery tracking and customer updates",
      "Enhanced customer engagement and loyalty tools",
      "Comprehensive revenue and performance analytics",
      "Multi-restaurant and multi-location support",
      "Driver optimization and performance management",
    ],
    useCases: [
      "Quick Service Restaurants (QSR)",
      "Fine Dining and Casual Restaurants",
      "Food Trucks and Mobile Vendors",
      "Ghost Kitchens and Cloud Restaurants",
      "Catering and Event Services",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Digital health services, telemedicine, and comprehensive patient care solutions",
    icon: Heart,
    color: "bg-red-500",
    gradient: "from-red-500 to-pink-500",
    image: "/placeholder.svg?height=300&width=400",
    stats: {
      doctors: "300+",
      patients: "15,000+",
      consultations: "30,000+",
      satisfaction: "96%",
      prescriptions: "50,000+",
      waitTime: "< 5 mins",
    },
    services: [
      {
        name: "Telemedicine Platform",
        description: "Secure video consultations, patient management, and comprehensive healthcare delivery system",
        icon: Stethoscope,
        features: [
          "HIPAA-compliant HD video consultations with end-to-end encryption",
          "Secure patient data storage with blockchain verification and audit trails",
          "Electronic health records (EHR) with interoperability and data exchange",
          "E-prescribing with pharmacy integration and drug interaction checking",
          "Automated appointment scheduling with calendar integration and reminders",
          "Insurance verification and claims processing with real-time eligibility",
          "Multi-provider support with specialist referrals and care coordination",
          "Remote patient monitoring with IoT device integration and alerts",
          "Clinical decision support with AI-powered diagnostic assistance",
          "Telehealth analytics with outcome tracking and quality metrics",
        ],
        path: "/Services/Healthcare",
        demo: "/Services/Healthcare/doctors",
        pricing: "Starting at $99/month",
        users: "300+ providers",
        integrations: ["Epic", "Cerner", "Allscripts", "athenahealth", "NextGen", "eClinicalWorks"],
        metrics: {
          "Consultation Time": "< 5 minutes wait",
          "Patient Satisfaction": "96%",
          "Security Compliance": "100%",
          Uptime: "99.9%",
        },
      },
      {
        name: "Digital Pharmacy System",
        description: "Online pharmacy platform with prescription management, delivery, and medication adherence",
        icon: Pill,
        features: [
          "Comprehensive medicine catalog with drug information and interactions",
          "Prescription upload system with OCR technology and verification",
          "Automated home delivery with temperature-controlled shipping and tracking",
          "Medication reminders via SMS, email, and mobile app notifications",
          "Drug interaction checker with allergy alerts and contraindication warnings",
          "Insurance claim processing with real-time verification and copay calculation",
          "Pharmacy network integration for local pickup options and transfers",
          "Medication adherence tracking with patient engagement tools",
          "Prescription refill automation with doctor approval workflows",
          "Clinical pharmacy services with medication therapy management",
        ],
        path: "/Services/Healthcare",
        demo: "/Services/Healthcare/pharmacy",
        pricing: "Starting at $79/month",
        users: "50K+ prescriptions",
        integrations: ["CVS", "Walgreens", "Rite Aid", "Express Scripts", "OptumRx", "Humana Pharmacy"],
        metrics: {
          "Prescription Accuracy": "99.9%",
          "Delivery Time": "Same day",
          "Adherence Rate": "85%",
          "Cost Savings": "30%",
        },
      },
      {
        name: "Patient Portal & Management",
        description: "Comprehensive patient engagement, health record management, and care coordination platform",
        icon: FileText,
        features: [
          "Patient registration system with identity verification and insurance validation",
          "Comprehensive medical history tracking with timeline view and search",
          "Lab results portal with trend analysis, alerts, and physician notes",
          "Appointment booking with provider availability, preferences, and wait times",
          "Secure messaging with healthcare providers and care team members",
          "Billing and payment processing with insurance integration and payment plans",
          "Health monitoring tools with wearable device integration and data sync",
          "Family account management with dependent access controls and permissions",
          "Care plan management with goal setting and progress tracking",
          "Health education resources with personalized content recommendations",
        ],
        path: "/Services/Healthcare",
        demo: "/Services/Healthcare/doctors/1",
        pricing: "Starting at $59/month",
        users: "15,000+ patients",
        integrations: ["Apple Health", "Google Fit", "Fitbit", "Garmin", "Samsung Health", "Withings"],
        metrics: {
          "Patient Engagement": "82%",
          "Portal Usage": "Daily active",
          "Data Accuracy": "99.5%",
          "Response Time": "< 2 hours",
        },
      },
      {
        name: "Healthcare Analytics & Reporting",
        description: "Advanced healthcare analytics, population health management, and clinical intelligence platform",
        icon: BarChart3,
        features: [
          "Patient outcome tracking with predictive analytics and risk stratification",
          "Treatment effectiveness analysis with evidence-based insights and recommendations",
          "Resource utilization reports with optimization recommendations and cost analysis",
          "Revenue cycle management with billing analytics and denial management",
          "Quality metrics dashboard with regulatory compliance tracking and reporting",
          "Population health management with chronic disease monitoring and prevention",
          "Clinical decision support with AI-powered recommendations and alerts",
          "Regulatory reporting with automated compliance documentation and submissions",
          "Research and clinical trial management with patient matching and recruitment",
          "Public health surveillance with outbreak detection and reporting",
        ],
        path: "/Services/Healthcare",
        demo: "/Services/Healthcare/cart",
        pricing: "Starting at $129/month",
        users: "Comprehensive insights",
        integrations: ["Tableau", "Power BI", "SAS", "IBM Watson Health", "Microsoft Healthcare Bot", "AWS HealthLake"],
        metrics: {
          "Data Processing": "Real-time",
          "Predictive Accuracy": "94%",
          "Compliance Rate": "100%",
          "Cost Reduction": "25%",
        },
      },
    ],
    benefits: [
      "Remote patient consultations with secure technology",
      "Comprehensive digital health records management",
      "Automated prescription management and delivery",
      "24/7 healthcare access and emergency support",
      "Reduced wait times and improved patient flow",
      "Cost-effective care delivery with better outcomes",
    ],
    useCases: [
      "Primary Care Practices",
      "Specialty Medical Clinics",
      "Hospitals and Health Systems",
      "Urgent Care Centers",
      "Mental Health Providers",
    ],
  },
  {
    id: "travel",
    name: "Travel & Tourism",
    description: "Comprehensive travel booking, tourism management, and customer experience platforms",
    icon: Plane,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-indigo-500",
    image: "/placeholder.svg?height=300&width=400",
    stats: {
      bookings: "10,000+",
      destinations: "150+",
      partners: "200+",
      rating: "4.8/5",
      packages: "500+",
      savings: "25%",
    },
    services: [
      {
        name: "Flight Booking & Management System",
        description: "Comprehensive flight search, booking, management, and customer service platform",
        icon: Plane,
        features: [
          "Real-time flight search across 500+ airlines worldwide with price comparison",
          "Multi-city and complex itinerary booking capabilities with flexible dates",
          "Dynamic seat selection with real-time availability and upgrade options",
          "Baggage management with fee calculation, tracking, and special handling",
          "Online check-in services with mobile boarding passes and gate notifications",
          "Flight status updates with delay notifications and rebooking assistance",
          "Group booking management with special rates and coordination tools",
          "Loyalty program integration with miles tracking and redemption options",
          "Travel insurance integration with coverage options and claims processing",
          "24/7 customer support with multilingual assistance and emergency services",
        ],
        path: "/Services/Travel&Tourism",
        demo: "/Services/Travel&Tourism/flights",
        pricing: "Starting at $89/month",
        users: "5,000+ flights monthly",
        integrations: ["Amadeus", "Sabre", "Travelport", "Expedia", "Kayak", "Skyscanner"],
        metrics: {
          "Booking Success": "98%",
          "Price Accuracy": "99.5%",
          "Customer Satisfaction": "4.8/5",
          "Response Time": "< 3 seconds",
        },
      },
      {
        name: "Hotel Reservation System",
        description: "Hotel booking, accommodation management, and guest experience optimization platform",
        icon: Hotel,
        features: [
          "Hotel search with advanced filtering, mapping, and availability checking",
          "Real-time room availability and dynamic pricing with rate comparison",
          "Booking management with modification, cancellation, and upgrade options",
          "Guest services integration with special requests and concierge services",
          "Review and rating system with photo galleries and verified feedback",
          "Loyalty program support with points redemption and member benefits",
          "Group reservations with block booking capabilities and event coordination",
          "Property management system integration with inventory and revenue management",
          "Mobile check-in and keyless entry with digital room keys",
          "Guest communication platform with pre-arrival and post-stay engagement",
        ],
        path: "/Services/Travel&Tourism",
        demo: "/Services/Travel&Tourism/hotels",
        pricing: "Starting at $69/month",
        users: "3,000+ hotels monthly",
        integrations: ["Booking.com", "Expedia", "Hotels.com", "Agoda", "Airbnb", "Vrbo"],
        metrics: {
          "Occupancy Rate": "+15%",
          "Revenue per Room": "+20%",
          "Guest Satisfaction": "4.7/5",
          "Booking Conversion": "12%",
        },
      },
      {
        name: "Tour Package Management",
        description: "Complete tour and activity booking, itinerary management, and experience optimization system",
        icon: Camera,
        features: [
          "Dynamic package creation with customizable components and pricing",
          "Itinerary management with day-by-day planning and activity scheduling",
          "Activity and excursion booking with availability tracking and confirmation",
          "Tour guide assignment and management system with ratings and scheduling",
          "Group management with participant tracking and communication tools",
          "Custom tour builder with pricing calculator and profit optimization",
          "Multi-language support for international travelers and local guides",
          "Weather integration with activity recommendations and alternative planning",
          "Transportation coordination with vehicle booking and route planning",
          "Emergency assistance and 24/7 traveler support with local contacts",
        ],
        path: "/Services/Travel&Tourism",
        demo: "/Services/Travel&Tourism/packages",
        pricing: "Starting at $129/month",
        users: "500+ packages",
        integrations: ["Viator", "GetYourGuide", "Klook", "TripAdvisor", "Airbnb Experiences", "Musement"],
        metrics: {
          "Package Sales": "+35%",
          "Customer Satisfaction": "4.9/5",
          "Repeat Bookings": "40%",
          "Profit Margin": "+25%",
        },
      },
      {
        name: "Travel Analytics & Intelligence",
        description: "Advanced travel analytics, market intelligence, and business optimization platform",
        icon: BarChart3,
        features: [
          "Booking trend analysis with seasonal forecasting and demand prediction",
          "Revenue optimization with dynamic pricing recommendations and yield management",
          "Customer preference insights and behavior analysis with segmentation",
          "Destination popularity tracking with market intelligence and competitor analysis",
          "Partner performance metrics and commission tracking with optimization",
          "Market analysis reports with competitive intelligence and pricing strategies",
          "Customer lifetime value analysis with retention strategies and upselling",
          "ROI tracking for marketing campaigns and channel performance",
          "Operational efficiency metrics with cost analysis and process optimization",
          "Risk management analytics with travel advisories and safety monitoring",
        ],
        path: "/Services/Travel&Tourism",
        demo: "/Services/Travel&Tourism/deals",
        pricing: "Starting at $99/month",
        users: "Data-driven insights",
        integrations: ["Google Analytics", "Tableau", "Power BI", "Looker", "Adobe Analytics", "Mixpanel"],
        metrics: {
          "Revenue Growth": "+30%",
          "Forecast Accuracy": "91%",
          "Cost Optimization": "20%",
          "Market Share": "+5%",
        },
      },
    ],
    benefits: [
      "Integrated booking system for all travel components",
      "Real-time availability and competitive pricing",
      "Customizable package creation and management",
      "Comprehensive travel management and support tools",
      "Multi-channel distribution and marketing capabilities",
      "Enhanced customer experience with 24/7 support",
    ],
    useCases: [
      "Travel Agencies and Tour Operators",
      "Online Travel Agencies (OTAs)",
      "Corporate Travel Management",
      "Destination Management Companies",
      "Adventure and Specialty Travel",
    ],
  },
]

export default function IndustriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredIndustries = industries.filter(
    (industry) =>
      industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      industry.services.some(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
  )

  const categories = [
    { id: "all", name: "All Industries", count: industries.length },
    { id: "retail", name: "Retail & Commerce", count: 1 },
    { id: "education", name: "Education & Training", count: 1 },
    { id: "food", name: "Food & Hospitality", count: 1 },
    { id: "health", name: "Healthcare & Wellness", count: 1 },
    { id: "travel", name: "Travel & Tourism", count: 1 },
  ]

  return (
    <div className="min-h-screen bg-white">
      <MainNav />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Industries We{" "}
              <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                Transform
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover how Linka revolutionizes businesses across diverse industries with comprehensive digital
              solutions, integrated services, and cutting-edge technology platforms
            </p>

            {/* Enhanced Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search industries, services, or features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-orange-300 rounded-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setViewMode("grid")}
                    className="h-14 px-6"
                  >
                    <Grid className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setViewMode("list")}
                    className="h-14 px-6"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={filterCategory === category.id ? "default" : "outline"}
                    onClick={() => setFilterCategory(category.id)}
                    className="rounded-full px-6 py-2"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 bg-white/20">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold text-orange-500 mb-2">5</div>
                <div className="text-gray-600 font-medium">Industries</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold text-blue-500 mb-2">20+</div>
                <div className="text-gray-600 font-medium">Services</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold text-green-500 mb-2">100K+</div>
                <div className="text-gray-600 font-medium">Active Users</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold text-purple-500 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Industry Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each industry has unique requirements and challenges. Our specialized solutions are meticulously designed
              to address specific needs and unlock unprecedented growth opportunities.
            </p>
          </div>

          {/* Industry Cards */}
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-6xl mx-auto"
            }`}
          >
            {filteredIndustries.map((industry) => (
              <Card
                key={industry.id}
                className={`group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : "h-56"}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-90`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <industry.icon className="h-20 w-20 text-white drop-shadow-lg" />
                  </div>
                  {viewMode === "grid" && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur">
                        {Object.values(industry.stats)[0]}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      {industry.services.slice(0, 2).map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/20 text-white text-xs backdrop-blur">
                          <service.icon className="h-3 w-3 mr-1" />
                          {service.name.split(" ")[0]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-8 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="text-2xl font-bold">{industry.name}</CardTitle>
                      {viewMode === "list" && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                          {Object.values(industry.stats)[0]}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      {Object.entries(industry.stats)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-orange-500">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Service Highlights */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Store className="h-4 w-4 mr-3 text-orange-500" />
                        <span className="font-medium">{industry.services.length} Specialized Services</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-3 text-blue-500" />
                        <span className="font-medium">{Object.values(industry.stats)[1]} Active Users</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 mr-3 text-green-500" />
                        <span className="font-medium">
                          {industry.services.reduce((acc, service) => acc + service.features.length, 0)} Features
                        </span>
                      </div>
                    </div>

                    {/* Service Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {industry.services.slice(0, 4).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white">
                          <service.icon className="h-3 w-3 mr-1" />
                          {service.name.split(" ")[0]}
                        </Badge>
                      ))}
                      {industry.services.length > 4 && (
                        <Badge variant="outline" className="text-xs bg-gray-100">
                          +{industry.services.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 bg-transparent border-2 border-gray-200 hover:border-transparent">
                      Explore Solutions
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Industry View */}
      {selectedIndustry && (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto">
            {(() => {
              const industry = industries.find((i) => i.id === selectedIndustry)
              if (!industry) return null

              return (
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedIndustry(null)}
                      className="mb-6 hover:bg-gray-100"
                    >
                      ← Back to All Industries
                    </Button>
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                        <industry.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-4xl font-bold text-gray-900">{industry.name} Solutions</h2>
                        <p className="text-gray-600">Comprehensive digital transformation platform</p>
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{industry.description}</p>
                  </div>

                  {/* Enhanced Industry Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
                    {Object.entries(industry.stats).map(([key, value], index) => (
                      <Card
                        key={key}
                        className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                      >
                        <div
                          className={`text-3xl font-bold mb-2 ${
                            index % 6 === 0
                              ? "text-orange-500"
                              : index % 6 === 1
                                ? "text-blue-500"
                                : index % 6 === 2
                                  ? "text-green-500"
                                  : index % 6 === 3
                                    ? "text-purple-500"
                                    : index % 6 === 4
                                      ? "text-red-500"
                                      : "text-indigo-500"
                          }`}
                        >
                          {value}
                        </div>
                        <div className="text-gray-600 font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Tabs defaultValue="services" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-12 h-14">
                      <TabsTrigger value="services" className="text-lg">
                        Services & Features
                      </TabsTrigger>
                      <TabsTrigger value="benefits" className="text-lg">
                        Key Benefits
                      </TabsTrigger>
                      <TabsTrigger value="usecases" className="text-lg">
                        Use Cases
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="services" className="space-y-12">
                      {industry.services.map((service, index) => (
                        <Card
                          key={index}
                          className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50"
                        >
                          <div className="md:flex">
                            <div className="md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
                              <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                                  <service.icon className="h-6 w-6" />
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold">{service.name}</h3>
                                  <p className="text-gray-300 text-sm">{service.pricing}</p>
                                </div>
                              </div>
                              <p className="text-gray-200 mb-6 leading-relaxed">{service.description}</p>

                              {/* Service Metrics */}
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                {Object.entries(service.metrics).map(([key, value]) => (
                                  <div key={key} className="text-center p-3 bg-white/10 rounded-lg backdrop-blur">
                                    <div className="text-lg font-bold text-orange-300">{value}</div>
                                    <div className="text-xs text-gray-300">{key}</div>
                                  </div>
                                ))}
                              </div>

                              <div className="flex gap-3">
                                <Button asChild className="flex-1 bg-white text-gray-900 hover:bg-gray-100">
                                  <Link href={service.demo}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Live Demo
                                  </Link>
                                </Button>
                                <Button
                                  variant="outline"
                                  asChild
                                  className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                                >
                                  <Link href={service.path}>
                                    <ArrowRight className="h-4 w-4 mr-2" />
                                    Explore
                                  </Link>
                                </Button>
                              </div>
                            </div>

                            <div className="md:w-2/3 p-8">
                              <div className="mb-8">
                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                  Key Features & Capabilities
                                </h4>
                                <div className="grid gap-3">
                                  {service.features.map((feature, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                      <Zap className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Integration Partners */}
                              <div className="mb-6">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                  <Globe className="h-5 w-5 text-blue-500 mr-2" />
                                  Integration Partners
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {service.integrations.map((integration, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                      {integration}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Service Stats */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                                  <Users className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                                  <div className="text-lg font-bold text-orange-600">{service.users}</div>
                                  <div className="text-sm text-orange-600">Active Users</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                                  <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                  <div className="text-lg font-bold text-green-600">{service.features.length}</div>
                                  <div className="text-sm text-green-600">Features</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="benefits" className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        {industry.benefits.map((benefit, index) => (
                          <Card
                            key={index}
                            className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                          >
                            <div className="flex items-start">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                                  index % 6 === 0
                                    ? "bg-orange-100"
                                    : index % 6 === 1
                                      ? "bg-blue-100"
                                      : index % 6 === 2
                                        ? "bg-green-100"
                                        : index % 6 === 3
                                          ? "bg-purple-100"
                                          : index % 6 === 4
                                            ? "bg-red-100"
                                            : "bg-indigo-100"
                                }`}
                              >
                                <CheckCircle
                                  className={`h-6 w-6 ${
                                    index % 6 === 0
                                      ? "text-orange-500"
                                      : index % 6 === 1
                                        ? "text-blue-500"
                                        : index % 6 === 2
                                          ? "text-green-500"
                                          : index % 6 === 3
                                            ? "text-purple-500"
                                            : index % 6 === 4
                                              ? "text-red-500"
                                              : "text-indigo-500"
                                  }`}
                                />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">
                                  {benefit.split(" ").slice(0, 3).join(" ")}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">{benefit}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="usecases" className="space-y-8">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industry.useCases.map((useCase, index) => (
                          <Card
                            key={index}
                            className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                          >
                            <div
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                                index % 5 === 0
                                  ? "bg-orange-100"
                                  : index % 5 === 1
                                    ? "bg-blue-100"
                                    : index % 5 === 2
                                      ? "bg-green-100"
                                      : index % 5 === 3
                                        ? "bg-purple-100"
                                        : "bg-red-100"
                              }`}
                            >
                              <Target
                                className={`h-8 w-8 ${
                                  index % 5 === 0
                                    ? "text-orange-500"
                                    : index % 5 === 1
                                      ? "text-blue-500"
                                      : index % 5 === 2
                                        ? "text-green-500"
                                        : index % 5 === 3
                                          ? "text-purple-500"
                                          : "text-red-500"
                                }`}
                              />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{useCase}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              Specialized solutions designed for {useCase.toLowerCase()} with industry-specific features
                              and compliance requirements.
                            </p>
                            <Button variant="outline" className="mt-4 w-full bg-transparent">
                              Learn More
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Call to Action */}
                  <div className="text-center mt-16 p-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-3xl text-white">
                    <h3 className="text-3xl font-bold mb-4">Ready to Transform Your {industry.name} Business?</h3>
                    <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
                      Join thousands of businesses already using our comprehensive {industry.name.toLowerCase()}{" "}
                      solutions to drive growth, improve efficiency, and enhance customer experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">
                        Start Free Trial
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                      >
                        Schedule Demo
                        <Calendar className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>
      )}

      {/* Cross-Industry Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Universal Platform Features</h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Every industry solution includes these powerful core features designed to accelerate your digital
            transformation
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Bank-grade security with end-to-end encryption, compliance certifications, and advanced threat protection",
              },
              {
                icon: Cloud,
                title: "Cloud Infrastructure",
                description:
                  "Scalable cloud architecture with 99.9% uptime, global CDN, and automatic scaling capabilities",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description:
                  "Responsive design optimized for all devices with native mobile apps and progressive web technology",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support with dedicated account managers and technical assistance",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  )
}
