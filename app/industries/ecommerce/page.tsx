import { ShoppingCart, TrendingUp, Users, Zap } from "lucide-react"

export default function EcommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Complete Store Management",
      description: "Manage inventory, orders, and customer data from one comprehensive dashboard",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Track performance with real-time analytics, sales reports, and customer insights",
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build lasting relationships with integrated CRM tools and personalization",
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Get your store online in minutes with our streamlined deployment process",
    },
  ]

  const benefits = [
    "Multi-channel selling (online, mobile, social media)",
    "Automated inventory management and stock alerts",
    "Integrated payment processing with multiple gateways",
    "SEO-optimized product pages and site structure",
    "Mobile-responsive design for all devices",
    "24/7 customer support and technical assistance",
    "Advanced security features and SSL certificates",
    "Customizable themes and branding options",
  ]

  const stats = [
    { number: "500+", label: "Active Stores", icon: ShoppingCart },\
