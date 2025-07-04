"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Shield,
  Zap,
  HeadphonesIcon,
  ShoppingBag,
  GraduationCap,
  Utensils,
  Heart,
  Plane,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Video,
  BookOpen,
  Award,
  Users,
  Store,
  MapPin,
  MessageSquare,
  Stethoscope,
  Pill,
  FileText,
  Hotel,
  Camera,
} from "lucide-react"
import { MainNav } from "@/components/landing/main-nav"
import { AppFooter } from "@/components/landing/app-footer"

// Comprehensive industry data with actual service functionalities
const industryData = {
  ecommerce: {
    name: "E-Commerce",
    description: "Complete online retail solutions for modern businesses",
    icon: ShoppingBag,
    hero: {
      title: "Transform Your Retail Business",
      subtitle: "Build, manage, and scale your online store with our comprehensive e-commerce platform",
      image: "/placeholder.svg?height=400&width=600",
    },
    services: [
      {
        name: "Product Catalog Management",
        description: "Comprehensive product listing and categorization system",
        icon: Package,
        features: [
          "Dynamic product categories with unlimited nesting",
          "Advanced search and filtering with faceted navigation",
          "Product variants (size, color, material) with inventory tracking",
          "Bulk product import/export with CSV and Excel support",
          "SEO-optimized product pages with meta tags and structured data",
          "Multi-image gallery with zoom and 360° view support",
          "Product comparison and wishlist functionality",
          "Inventory alerts and automated reorder points",
        ],
        demo: "/Services/E-com/products",
        pricing: "Starting at $29/month",
        users: "2,500+ stores using this service",
        integrations: ["Shopify", "WooCommerce", "Magento", "BigCommerce"],
      },
      {
        name: "Shopping Cart & Checkout",
        description: "Seamless shopping experience with secure payment processing",
        icon: ShoppingCart,
        features: [
          "Persistent shopping cart across devices and sessions",
          "Guest checkout with optional account creation",
          "Multiple payment gateways (Stripe, PayPal, Square, etc.)",
          "Real-time tax calculation based on location",
          "Dynamic shipping rate calculation with multiple carriers",
          "Order confirmation with automated email receipts",
          "Abandoned cart recovery with automated email sequences",
          "One-click checkout for returning customers",
        ],
        demo: "/Services/E-com/cart",
        pricing: "Starting at $39/month",
        users: "100K+ transactions processed monthly",
        integrations: ["Stripe", "PayPal", "Square", "Authorize.Net"],
      },
      {
        name: "Order Management System",
        description: "Complete order processing and fulfillment automation",
        icon: CreditCard,
        features: [
          "Real-time order tracking with status updates",
          "Automated inventory management with stock synchronization",
          "Multi-channel order consolidation (web, mobile, marketplace)",
          "Return and refund processing with automated workflows",
          "Shipping label generation and tracking integration",
          "Customer notification system via email and SMS",
          "Backorder management with automatic fulfillment",
          "Order analytics and performance reporting",
        ],
        demo: "/Services/E-com/categories",
        pricing: "Starting at $49/month",
        users: "50K+ orders processed monthly",
        integrations: ["FedEx", "UPS", "DHL", "USPS"],
      },
      {
        name: "Business Analytics Dashboard",
        description: "Data-driven insights for strategic business decisions",
        icon: BarChart3,
        features: [
          "Real-time sales performance tracking and KPI monitoring",
          "Customer behavior analysis with heat maps and user journeys",
          "Inventory turnover reports with demand forecasting",
          "Revenue forecasting with seasonal trend analysis",
          "Marketing ROI analysis across all channels",
          "Custom dashboard creation with drag-and-drop widgets",
          "Automated report generation and email delivery",
          "A/B testing framework for conversion optimization",
        ],
        demo: "/Services/E-com/deals",
        pricing: "Starting at $59/month",
        users: "Real-time insights for all stores",
        integrations: ["Google Analytics", "Facebook Pixel", "Klaviyo", "Mailchimp"],
      },
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        company: "Fashion Forward Boutique",
        role: "CEO & Founder",
        content:
          "Linka's e-commerce platform helped us increase online sales by 300% in just 6 months. The integrated analytics gave us insights we never had before.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
      {
        name: "Mike Chen",
        company: "Tech Gadgets Pro",
        role: "Operations Manager",
        content:
          "The inventory management system saved us countless hours every week. Automated reordering and real-time stock tracking are game-changers.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
      {
        name: "Elena Rodriguez",
        company: "Artisan Crafts Co.",
        role: "Owner",
        content:
          "The multi-channel integration allowed us to sell on our website, Amazon, and eBay from one dashboard. Our efficiency improved dramatically.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
    ],
    stats: {
      "Active Stores": "2,500+",
      "Products Listed": "50,000+",
      "Monthly Orders": "100,000+",
      "Customer Satisfaction": "98%",
      "Average Revenue Increase": "250%",
      "Order Processing Time": "< 2 mins",
    },
    benefits: [
      "24/7 automated online presence",
      "Global market reach with multi-currency support",
      "Automated order processing and fulfillment",
      "Real-time analytics and business intelligence",
      "Scalable infrastructure that grows with your business",
      "Mobile-first responsive design",
    ],
  },
  education: {
    name: "E-Learning",
    description: "Digital education platforms and online learning solutions",
    icon: GraduationCap,
    hero: {
      title: "Revolutionize Education Delivery",
      subtitle: "Create engaging online learning experiences with our comprehensive e-learning ecosystem",
      image: "/placeholder.svg?height=400&width=600",
    },
    services: [
      {
        name: "Course Creation Platform",
        description: "Build interactive courses with multimedia content and assessments",
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
        ],
        demo: "/Services/E-Learning/catalog",
        pricing: "Starting at $39/month",
        users: "1,200+ courses created",
        integrations: ["Zoom", "Google Classroom", "Canvas", "Blackboard"],
      },
      {
        name: "Virtual Classroom Environment",
        description: "Live online teaching with advanced collaboration tools",
        icon: Video,
        features: [
          "HD video conferencing with up to 500 participants",
          "Screen sharing with annotation tools and laser pointer",
          "Interactive whiteboard with real-time collaboration",
          "Breakout rooms for small group activities and discussions",
          "Session recording with automatic transcription",
          "Real-time chat with file sharing and emoji reactions",
          "Polling and Q&A features for audience engagement",
          "Integration with calendar systems for automated scheduling",
        ],
        demo: "/Services/E-Learning/course/1",
        pricing: "Starting at $59/month",
        users: "500+ active instructors",
        integrations: ["Zoom", "Microsoft Teams", "Google Meet", "WebEx"],
      },
      {
        name: "Student Management System",
        description: "Comprehensive student enrollment, tracking, and communication",
        icon: Users,
        features: [
          "Automated student enrollment with bulk import capabilities",
          "Comprehensive gradebook with weighted categories and curves",
          "Attendance tracking with automated notifications",
          "Parent/guardian portal with progress reports and messaging",
          "Multi-language communication tools with translation support",
          "Performance analytics with predictive insights",
          "Custom reporting with export to PDF and Excel",
          "Integration with Student Information Systems (SIS)",
        ],
        demo: "/Services/E-Learning/my-courses",
        pricing: "Starting at $29/month",
        users: "25,000+ students managed",
        integrations: ["PowerSchool", "Infinite Campus", "Skyward", "Clever"],
      },
      {
        name: "Certification & Assessment System",
        description: "Automated certificate generation with verification and compliance",
        icon: Award,
        features: [
          "Custom certificate templates with brand customization",
          "Automated certificate generation upon course completion",
          "Digital badge system with Open Badges compliance",
          "Blockchain-based certificate verification system",
          "Skill assessment tracking with competency mapping",
          "Continuing education credits (CEU) management",
          "Proctored exam capabilities with identity verification",
          "Integration with professional certification bodies",
        ],
        demo: "/Services/E-Learning/cart",
        pricing: "Starting at $19/month",
        users: "10K+ certificates issued monthly",
        integrations: ["Credly", "Accredible", "BadgeList", "Mozilla Backpack"],
      },
    ],
    testimonials: [
      {
        name: "Dr. Emily Rodriguez",
        company: "EduTech Academy",
        role: "Academic Director",
        content:
          "Our student engagement increased by 250% after switching to Linka. The interactive features and analytics help us continuously improve our courses.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
      {
        name: "James Wilson",
        company: "Corporate Training Solutions",
        role: "Training Manager",
        content:
          "The certification system streamlined our compliance training. We can now track and verify employee certifications across multiple locations.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
    ],
    stats: {
      "Active Courses": "1,200+",
      "Students Enrolled": "25,000+",
      Instructors: "500+",
      "Completion Rate": "85%",
      "Certificates Issued": "10,000+",
      "Average Engagement": "92%",
    },
    benefits: [
      "Flexible learning schedules with 24/7 access",
      "Interactive content delivery with multimedia support",
      "Comprehensive progress monitoring and analytics",
      "Automated certification and compliance tracking",
      "Global accessibility with multi-language support",
      "Cost-effective training delivery at scale",
    ],
  },
  food: {
    name: "Food Delivery",
    description: "Restaurant and food delivery management systems",
    icon: Utensils,
    hero: {
      title: "Streamline Food Service Operations",
      subtitle: "Manage orders, deliveries, and customer relationships with our integrated food service platform",
      image: "/placeholder.svg?height=400&width=600",
    },
    services: [
      {
        name: "Restaurant Management Hub",
        description: "Complete restaurant operations and menu management system",
        icon: Store,
        features: [
          "Digital menu management with real-time pricing updates",
          "Multi-location order processing with centralized dashboard",
          "Kitchen display system with order prioritization",
          "Inventory tracking with automated supplier ordering",
          "Staff scheduling and performance management",
          "Revenue analytics with profit margin analysis",
          "Customer feedback management and response system",
          "Integration with POS systems and accounting software",
        ],
        demo: "/Services/Food-Delivery/restaurants",
        pricing: "Starting at $49/month",
        users: "800+ restaurants using this service",
        integrations: ["Square", "Toast", "Clover", "Resy"],
      },
      {
        name: "Delivery Optimization System",
        description: "Real-time order tracking and delivery route optimization",
        icon: MapPin,
        features: [
          "Real-time GPS tracking with live map updates",
          "AI-powered route optimization for multiple deliveries",
          "Dynamic delivery time estimation with traffic data",
          "Automated customer notifications via SMS and push notifications",
          "Driver performance metrics and rating system",
          "Proof of delivery with photo confirmation",
          "Contactless delivery options with special instructions",
          "Integration with third-party delivery services",
        ],
        demo: "/Services/Food-Delivery/restaurant/1",
        pricing: "Starting at $69/month",
        users: "1,500+ active drivers",
        integrations: ["Google Maps", "Mapbox", "DoorDash", "Uber Eats"],
      },
      {
        name: "Customer Experience Platform",
        description: "Enhanced customer ordering and engagement system",
        icon: MessageSquare,
        features: [
          "User-friendly ordering interface with visual menu",
          "Multiple payment options including digital wallets",
          "Order history with reorder functionality",
          "Rating and review system with photo uploads",
          "24/7 customer support chat with AI assistance",
          "Loyalty program with points and rewards",
          "Personalized recommendations based on order history",
          "Social media integration for sharing and reviews",
        ],
        demo: "/Services/Food-Delivery/checkout",
        pricing: "Starting at $39/month",
        users: "100K+ active customers",
        integrations: ["Apple Pay", "Google Pay", "PayPal", "Venmo"],
      },
      {
        name: "Business Intelligence Dashboard",
        description: "Comprehensive analytics for food service operations",
        icon: BarChart3,
        features: [
          "Real-time sales performance tracking by location and time",
          "Peak hours analysis with demand forecasting",
          "Customer behavior insights and ordering patterns",
          "Driver efficiency metrics and delivery performance",
          "Revenue forecasting with seasonal adjustments",
          "Food cost analysis and profit margin optimization",
          "Marketing campaign effectiveness tracking",
          "Competitive analysis and market positioning insights",
        ],
        demo: "/Services/Food-Delivery/order-confirmation",
        pricing: "Starting at $79/month",
        users: "Real-time insights for all restaurants",
        integrations: ["Google Analytics", "Tableau", "Power BI", "Mixpanel"],
      },
    ],
    testimonials: [
      {
        name: "Antonio Martinez",
        company: "Bella Vista Restaurant Group",
        role: "Operations Director",
        content:
          "Delivery times improved by 40% and customer satisfaction is at an all-time high. The route optimization alone saved us thousands in delivery costs.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
      {
        name: "Lisa Chen",
        company: "Urban Eats Collective",
        role: "Founder",
        content:
          "The integrated platform helped us scale from 3 to 15 locations. Managing everything from one dashboard is incredibly efficient.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
    ],
    stats: {
      "Partner Restaurants": "800+",
      "Monthly Orders": "75,000+",
      "Active Drivers": "1,500+",
      "Average Delivery Time": "28 mins",
      "Customer Satisfaction": "94%",
      "Order Accuracy": "99.2%",
    },
    benefits: [
      "Faster order processing with automated workflows",
      "Real-time delivery tracking and customer updates",
      "Enhanced customer engagement and loyalty tools",
      "Comprehensive revenue and performance analytics",
      "Multi-restaurant and multi-location support",
      "Driver optimization and performance management",
    ],
  },
  healthcare: {
    name: "Healthcare",
    description: "Digital health services and telemedicine solutions",
    icon: Heart,
    hero: {
      title: "Modernize Healthcare Delivery",
      subtitle: "Provide accessible, secure healthcare services with our comprehensive telemedicine platform",
      image: "/placeholder.svg?height=400&width=600",
    },
    services: [
      {
        name: "Telemedicine Platform",
        description: "Secure video consultations and comprehensive patient management",
        icon: Stethoscope,
        features: [
          "HIPAA-compliant HD video consultations with encryption",
          "Secure patient data storage with blockchain verification",
          "Electronic health records (EHR) with interoperability",
          "E-prescribing with pharmacy integration and drug interaction checks",
          "Automated appointment scheduling with calendar integration",
          "Insurance verification and claims processing",
          "Multi-provider support with specialist referrals",
          "Remote patient monitoring with IoT device integration",
        ],
        demo: "/Services/Healthcare/doctors",
        pricing: "Starting at $99/month",
        users: "300+ healthcare providers",
        integrations: ["Epic", "Cerner", "Allscripts", "athenahealth"],
      },
      {
        name: "Digital Pharmacy System",
        description: "Online pharmacy with prescription management and home delivery",
        icon: Pill,
        features: [
          "Comprehensive medicine catalog with drug information",
          "Prescription upload system with OCR technology",
          "Automated home delivery with temperature-controlled shipping",
          "Medication reminders via SMS and mobile app notifications",
          "Drug interaction checker with allergy alerts",
          "Insurance claim processing with real-time verification",
          "Pharmacy network integration for local pickup options",
          "Medication adherence tracking with patient engagement tools",
        ],
        demo: "/Services/Healthcare/pharmacy",
        pricing: "Starting at $79/month",
        users: "50K+ prescriptions processed",
        integrations: ["CVS", "Walgreens", "Rite Aid", "Express Scripts"],
      },
      {
        name: "Patient Portal & Management",
        description: "Comprehensive patient engagement and health record management",
        icon: FileText,
        features: [
          "Patient registration system with identity verification",
          "Comprehensive medical history tracking with timeline view",
          "Lab results portal with trend analysis and alerts",
          "Appointment booking with provider availability and preferences",
          "Secure messaging with healthcare providers",
          "Billing and payment processing with insurance integration",
          "Health monitoring tools with wearable device integration",
          "Family account management with dependent access controls",
        ],
        demo: "/Services/Healthcare/doctors/1",
        pricing: "Starting at $59/month",
        users: "15,000+ active patients",
        integrations: ["Apple Health", "Google Fit", "Fitbit", "Garmin"],
      },
      {
        name: "Healthcare Analytics & Reporting",
        description: "Data-driven insights for healthcare providers and administrators",
        icon: BarChart3,
        features: [
          "Patient outcome tracking with predictive analytics",
          "Treatment effectiveness analysis with evidence-based insights",
          "Resource utilization reports with optimization recommendations",
          "Revenue cycle management with billing analytics",
          "Quality metrics dashboard with regulatory compliance tracking",
          "Population health management with risk stratification",
          "Clinical decision support with AI-powered recommendations",
          "Regulatory reporting with automated compliance documentation",
        ],
        demo: "/Services/Healthcare/cart",
        pricing: "Starting at $129/month",
        users: "Comprehensive insights for all providers",
        integrations: ["Tableau", "Power BI", "SAS", "IBM Watson Health"],
      },
    ],
    testimonials: [
      {
        name: "Dr. James Wilson",
        company: "City Health Clinic Network",
        role: "Chief Medical Officer",
        content:
          "We've been able to serve 3x more patients while maintaining quality care. The telemedicine platform is intuitive and our patients love the convenience.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
      {
        name: "Maria Gonzalez",
        company: "Community Health Center",
        role: "Practice Administrator",
        content:
          "The integrated EHR and billing system streamlined our operations. We reduced administrative overhead by 40% and improved patient satisfaction scores.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
    ],
    stats: {
      "Healthcare Providers": "300+",
      "Patients Served": "15,000+",
      Consultations: "30,000+",
      "Patient Satisfaction": "96%",
      "Prescriptions Processed": "50,000+",
      "Average Wait Time": "< 5 mins",
    },
    benefits: [
      "Remote patient consultations with secure video technology",
      "Comprehensive digital health records management",
      "Automated prescription management and delivery",
      "24/7 healthcare access and emergency support",
      "Reduced wait times and improved patient flow",
      "Cost-effective care delivery with better outcomes",
    ],
  },
  travel: {
    name: "Travel & Tourism",
    description: "Travel booking and tourism management platforms",
    icon: Plane,
    hero: {
      title: "Simplify Travel Planning & Management",
      subtitle: "Comprehensive travel booking and management platform for agencies, operators, and travelers",
      image: "/placeholder.svg?height=400&width=600",
    },
    services: [
      {
        name: "Flight Booking System",
        description: "Comprehensive flight search, booking, and management platform",
        icon: Plane,
        features: [
          "Real-time flight search across 500+ airlines worldwide",
          "Multi-city and complex itinerary booking capabilities",
          "Dynamic seat selection with real-time availability",
          "Baggage management with fee calculation and tracking",
          "Online check-in services with mobile boarding passes",
          "Flight status updates with delay notifications",
          "Group booking management with special rates",
          "Loyalty program integration with miles tracking",
        ],
        demo: "/Services/Travel&Tourism/flights",
        pricing: "Starting at $89/month",
        users: "5,000+ flights booked monthly",
        integrations: ["Amadeus", "Sabre", "Travelport", "Expedia"],
      },
      {
        name: "Hotel Reservation System",
        description: "Hotel booking and accommodation management platform",
        icon: Hotel,
        features: [
          "Hotel search with advanced filtering and mapping",
          "Real-time room availability and pricing updates",
          "Booking management with modification and cancellation",
          "Guest services integration with special requests",
          "Review and rating system with photo galleries",
          "Loyalty program support with points redemption",
          "Group reservations with block booking capabilities",
          "Property management system integration",
        ],
        demo: "/Services/Travel&Tourism/hotels",
        pricing: "Starting at $69/month",
        users: "3,000+ hotel bookings monthly",
        integrations: ["Booking.com", "Expedia", "Hotels.com", "Agoda"],
      },
      {
        name: "Tour Package Management",
        description: "Complete tour and activity booking and management system",
        icon: Camera,
        features: [
          "Dynamic package creation with customizable components",
          "Itinerary management with day-by-day planning",
          "Activity and excursion booking with availability tracking",
          "Tour guide assignment and management system",
          "Group management with participant tracking",
          "Custom tour builder with pricing calculator",
          "Multi-language support for international travelers",
          "Weather integration with activity recommendations",
        ],
        demo: "/Services/Travel&Tourism/packages",
        pricing: "Starting at $129/month",
        users: "500+ tour packages created",
        integrations: ["Viator", "GetYourGuide", "Klook", "TripAdvisor"],
      },
      {
        name: "Travel Analytics & Intelligence",
        description: "Business intelligence and analytics for travel operations",
        icon: BarChart3,
        features: [
          "Booking trend analysis with seasonal forecasting",
          "Revenue optimization with dynamic pricing recommendations",
          "Customer preference insights and behavior analysis",
          "Destination popularity tracking with market intelligence",
          "Partner performance metrics and commission tracking",
          "Market analysis reports with competitive intelligence",
          "Customer lifetime value analysis with retention strategies",
          "ROI tracking for marketing campaigns and channels",
        ],
        demo: "/Services/Travel&Tourism/deals",
        pricing: "Starting at $99/month",
        users: "Data-driven insights for all bookings",
        integrations: ["Google Analytics", "Tableau", "Power BI", "Looker"],
      },
    ],
    testimonials: [
      {
        name: "Lisa Thompson",
        company: "Adventure Tours Worldwide",
        role: "Operations Manager",
        content:
          "Booking efficiency improved by 200% and customer satisfaction is through the roof. The integrated platform handles everything from flights to activities seamlessly.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
      {
        name: "David Kim",
        company: "Global Travel Solutions",
        role: "CEO",
        content:
          "The analytics dashboard gives us insights we never had before. We can now predict demand and optimize pricing across all our services.",
        rating: 5,
        image: "/placeholder-user.jpg",
      },
    ],
    stats: {
      "Travel Bookings": "10,000+",
      Destinations: "150+",
      "Partner Hotels": "500+",
      "Customer Rating": "4.8/5",
      "Tour Packages": "500+",
      "Average Savings": "25%",
    },
    benefits: [
      "Integrated booking system for all travel components",
      "Real-time availability and pricing across all services",
      "Customizable package creation and management",
      "Comprehensive travel management tools",
      "Multi-channel distribution and marketing",
      "Enhanced customer experience with 24/7 support",
    ],
  },
}

interface IndustryPageProps {
  params: { industry: string }
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const { industry } = params
  const data = industryData[industry as keyof typeof industryData]

  if (!data) {
    return (
      <div className="min-h-screen bg-white">
        <MainNav />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Industry Not Found</h1>
          <p className="text-gray-600 mb-8">The industry you're looking for doesn't exist.</p>
          <Link href="/industries">
            <Button>Back to Industries</Button>
          </Link>
        </div>
        <AppFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <MainNav />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/industries">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Industries
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-orange-100 text-orange-600">
              <data.icon className="h-4 w-4 mr-2" />
              {data.name}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{data.hero.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{data.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-blue-500 text-white">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src={data.hero.image || "/placeholder.svg"}
                alt={data.name}
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">{value}</div>
                <div className="text-sm text-gray-600">{key}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive {data.name} Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized tools and services designed specifically for the {data.name.toLowerCase()} industry with
              integrated functionalities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                      <service.icon className="h-8 w-8 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {service.pricing}
                        </Badge>
                        <span className="text-sm text-gray-500">• {service.users}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Core Functionalities:</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Integrations:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.integrations.map((integration, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={service.demo} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white">
                        Try Live Demo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Linka for {data.name}?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-leading features and capabilities that set us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description: "Serve customers worldwide with multi-language support",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with compliance certifications",
              },
              { icon: Zap, title: "Lightning Performance", description: "99.9% uptime with global CDN delivery" },
              {
                icon: HeadphonesIcon,
                title: "24/7 Expert Support",
                description: "Dedicated support team with industry expertise",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your {data.name.toLowerCase()} operations with these powerful advantages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit}</h3>
                    <p className="text-sm text-gray-600">Enhanced operational capability</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600">Real results from {data.name.toLowerCase()} businesses using Linka</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-orange-500">{testimonial.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your {data.name} Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of {data.name.toLowerCase()} businesses already using Linka's comprehensive platform to grow
            their operations and serve customers better
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  )
}
