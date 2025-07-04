"use client"

import { useState, useMemo } from "react"
import { Grid, List, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  moq: number
  category: string
  brand: string
  rating: number
  inStock: boolean
}

export default function WholesaleProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("relevance")
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showPreOrderOnly, setShowPreOrderOnly] = useState(false)

  const [cart, setCart] = useState<{ [key: string]: number }>({})

  const addToCart = (product: Product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + product.moq,
    }))
  }

  const getCartQuantity = (productId: string) => {
    return cart[productId] || 0
  }

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }

  const categories = [
    {
      value: "grocery",
      label: "Grocery",
      subcategories: [
        { value: "fresh-produce", label: "Fresh Produce" },
        { value: "dairy-products", label: "Dairy Products" },
        { value: "meat-poultry", label: "Meat and Poultry" },
        { value: "frozen-foods", label: "Frozen Foods" },
        { value: "canned-packaged", label: "Canned and Packaged Foods" },
        { value: "snacks-beverages", label: "Snacks and Beverages" },
        { value: "bakery-items", label: "Bakery Items" },
        { value: "pantry-staples", label: "Pantry Staples" },
      ],
    },
    {
      value: "household-essentials",
      label: "Household Essentials",
      subcategories: [
        { value: "cleaning-supplies", label: "Cleaning Supplies" },
        { value: "paper-products", label: "Paper Products" },
        { value: "laundry-supplies", label: "Laundry Supplies" },
        { value: "home-maintenance", label: "Home Maintenance and Repair" },
      ],
    },
    {
      value: "health-personal-care",
      label: "Health and Personal Care",
      subcategories: [
        { value: "otc-medications", label: "Over-the-Counter Medications" },
        { value: "vitamins-supplements", label: "Vitamins and Supplements" },
        { value: "cosmetics-skincare", label: "Cosmetics and Skincare" },
        { value: "personal-hygiene", label: "Personal Hygiene Products" },
        { value: "first-aid", label: "First Aid Supplies" },
      ],
    },
    {
      value: "electronics",
      label: "Electronics",
      subcategories: [
        { value: "tvs-entertainment", label: "TVs and Home Entertainment" },
        { value: "computers-tablets", label: "Computers and Tablets" },
        { value: "mobile-phones", label: "Mobile Phones and Accessories" },
        { value: "audio-equipment", label: "Audio Equipment" },
        { value: "video-games", label: "Video Games and Consoles" },
      ],
    },
    {
      value: "clothing-accessories",
      label: "Clothing and Accessories",
      subcategories: [
        { value: "mens-apparel", label: "Men's Apparel" },
        { value: "womens-apparel", label: "Women's Apparel" },
        { value: "childrens-apparel", label: "Children's Apparel" },
        { value: "footwear", label: "Footwear" },
        { value: "accessories", label: "Accessories" },
        { value: "seasonal-clothing", label: "Seasonal Clothing" },
      ],
    },
    {
      value: "home-garden",
      label: "Home and Garden",
      subcategories: [
        { value: "furniture", label: "Furniture" },
        { value: "home-decor", label: "Home Decor" },
        { value: "kitchenware", label: "Kitchenware" },
        { value: "bedding-linens", label: "Bedding and Linens" },
        { value: "gardening-supplies", label: "Gardening Supplies" },
        { value: "outdoor-equipment", label: "Outdoor Equipment" },
      ],
    },
    {
      value: "toys-baby",
      label: "Toys and Baby Products",
      subcategories: [
        { value: "toys-all-ages", label: "Toys for All Ages" },
        { value: "baby-gear", label: "Baby Gear" },
        { value: "nursery-furniture", label: "Nursery Furniture" },
        { value: "diapers-baby-care", label: "Diapers and Baby Care" },
      ],
    },
    {
      value: "sports-outdoors",
      label: "Sports and Outdoors",
      subcategories: [
        { value: "exercise-equipment", label: "Exercise Equipment" },
        { value: "sporting-goods", label: "Sporting Goods" },
        { value: "outdoor-recreation", label: "Outdoor Recreation Gear" },
      ],
    },
    {
      value: "automotive",
      label: "Automotive",
      subcategories: [
        { value: "car-care", label: "Car Care Products" },
        { value: "tools-equipment", label: "Tools and Equipment" },
        { value: "tires-accessories", label: "Tires and Accessories" },
      ],
    },
    {
      value: "pet-supplies",
      label: "Pet Supplies",
      subcategories: [
        { value: "pet-food", label: "Pet Food" },
        { value: "pet-care", label: "Pet Care Products" },
        { value: "pet-accessories", label: "Pet Accessories" },
      ],
    },
  ]

  const brands = [
    "TechLite",
    "WorkWear Pro",
    "SafeGuard",
    "Bean Masters",
    "ChefWear",
    "CleanPro",
    "Tea Masters",
    "FreshFarms",
    "DairyFresh",
    "CheeseWorks",
    "SoftTouch",
    "SafeHands",
    "VitaLife",
    "OfficePro",
    "ChefMaster",
    "PlayTime",
    "BabyComfort",
    "FitLife",
    "OutdoorPro",
    "AutoLube",
    "RoadGrip",
    "PetNutrition",
    "CleanPaws",
    "DisplayMax",
    "NetPro",
    "RetailTech",
    "ScanPro",
    "RuggedTech",
    "PowerGuard",
    "TrackTech",
    "PrintPro",
    "SensorTech",
    "ClimateControl",
    "CablePro",
    "InputTech",
    "MeetTech",
    "AudioPro",
    "TestPro",
    "ConnectTech",
    "OrganizeTech",
    "SafetyTech",
    "CommTech",
    "TimeTech",
    "SecureTech",
    "ElectroSafe",
    "PowerTech",
    "ControlTech",
    "MotorTech",
    "AutoTech",
    "SwitchTech",
    "MeterTech",
    "SafetyFirst",
    "MedWear",
    "CorporateStyle",
    "GripTech",
    "SecurityPro",
    "HospitalityWear",
    "AutoWear",
    "FoodSafe",
    "MedSafe",
    "ReflectTech",
    "BasicWear",
    "ComfortWear",
    "OutdoorWear",
    "CapStyle",
    "WarmWear",
    "ComfortFeet",
    "LeatherCraft",
  ]

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((item) => item !== category)))
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) => (checked ? [...prev, brand] : prev.filter((item) => item !== brand)))
  }

  const allProducts: Product[] = [
    // GROCERY - FRESH PRODUCE (40 products)
    {
      id: "prod_001",
      name: "Organic Bananas (40lb Case)",
      description: "Fresh organic bananas, perfect for retail or food service",
      image: "/placeholder.svg?height=200&width=200",
      price: 24.99,
      moq: 10,
      category: "fresh-produce",
      brand: "FreshFarms",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "prod_002",
      name: "Premium Avocados (25lb Box)",
      description: "Hass avocados, ready to eat or ripen",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 8,
      category: "fresh-produce",
      brand: "GreenHarvest",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "prod_003",
      name: "Fresh Strawberries (12 Pints)",
      description: "Sweet, juicy strawberries in retail-ready containers",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 15,
      category: "fresh-produce",
      brand: "BerryBest",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "prod_004",
      name: "Organic Spinach (20lb Case)",
      description: "Fresh organic baby spinach leaves",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 12,
      category: "fresh-produce",
      brand: "GreenLeaf",
      rating: 4.2,
      inStock: false,
    },
    {
      id: "prod_005",
      name: "Red Apples (40lb Box)",
      description: "Crisp red delicious apples",
      image: "/placeholder.svg?height=200&width=200",
      price: 28.99,
      moq: 10,
      category: "fresh-produce",
      brand: "OrchardFresh",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "prod_006",
      name: "Organic Carrots (50lb Bag)",
      description: "Fresh organic carrots, perfect for juicing or cooking",
      image: "/placeholder.svg?height=200&width=200",
      price: 22.99,
      moq: 8,
      category: "fresh-produce",
      brand: "RootVeggies",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "prod_007",
      name: "Fresh Broccoli (30lb Case)",
      description: "Premium fresh broccoli crowns",
      image: "/placeholder.svg?height=200&width=200",
      price: 38.99,
      moq: 12,
      category: "fresh-produce",
      brand: "GreenLeaf",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "prod_008",
      name: "Organic Tomatoes (25lb Box)",
      description: "Vine-ripened organic tomatoes",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 10,
      category: "fresh-produce",
      brand: "SunGrown",
      rating: 4.6,
      inStock: false,
    },
    {
      id: "prod_009",
      name: "Fresh Lettuce (24 Heads)",
      description: "Crisp iceberg lettuce heads",
      image: "/placeholder.svg?height=200&width=200",
      price: 32.99,
      moq: 15,
      category: "fresh-produce",
      brand: "CrispGreens",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "prod_010",
      name: "Sweet Potatoes (40lb Box)",
      description: "Fresh sweet potatoes, perfect for roasting",
      image: "/placeholder.svg?height=200&width=200",
      price: 26.99,
      moq: 8,
      category: "fresh-produce",
      brand: "FarmFresh",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "prod_011",
      name: "Organic Kale (15lb Case)",
      description: "Fresh organic kale leaves",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 12,
      category: "fresh-produce",
      brand: "SuperGreens",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "prod_012",
      name: "Bell Peppers Mixed (30lb Box)",
      description: "Colorful bell peppers - red, yellow, green",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 10,
      category: "fresh-produce",
      brand: "RainbowProduce",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "prod_013",
      name: "Fresh Cucumbers (25lb Case)",
      description: "Crisp fresh cucumbers",
      image: "/placeholder.svg?height=200&width=200",
      price: 28.99,
      moq: 12,
      category: "fresh-produce",
      brand: "CrispVeggies",
      rating: 4.2,
      inStock: false,
    },
    {
      id: "prod_014",
      name: "Organic Celery (20lb Case)",
      description: "Fresh organic celery stalks",
      image: "/placeholder.svg?height=200&width=200",
      price: 24.99,
      moq: 15,
      category: "fresh-produce",
      brand: "GreenStalk",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "prod_015",
      name: "Fresh Mushrooms (10lb Case)",
      description: "White button mushrooms",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 8,
      category: "fresh-produce",
      brand: "FungiPro",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "prod_016",
      name: "Organic Blueberries (12 Pints)",
      description: "Fresh organic blueberries",
      image: "/placeholder.svg?height=200&width=200",
      price: 68.99,
      moq: 6,
      category: "fresh-produce",
      brand: "WildBerry",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "prod_017",
      name: "Fresh Corn (50 Ears)",
      description: "Sweet corn on the cob",
      image: "/placeholder.svg?height=200&width=200",
      price: 32.99,
      moq: 10,
      category: "fresh-produce",
      brand: "GoldenKernel",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "prod_018",
      name: "Organic Onions (50lb Bag)",
      description: "Yellow organic onions",
      image: "/placeholder.svg?height=200&width=200",
      price: 18.99,
      moq: 8,
      category: "fresh-produce",
      brand: "BulbFarms",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "prod_019",
      name: "Fresh Garlic (10lb Box)",
      description: "Fresh garlic bulbs",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 12,
      category: "fresh-produce",
      brand: "FlavorFarm",
      rating: 4.4,
      inStock: false,
    },
    {
      id: "prod_020",
      name: "Organic Potatoes (50lb Bag)",
      description: "Russet organic potatoes",
      image: "/placeholder.svg?height=200&width=200",
      price: 22.99,
      moq: 8,
      category: "fresh-produce",
      brand: "SpudMaster",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "prod_021",
      name: "Fresh Lemons (40lb Box)",
      description: "Juicy fresh lemons",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 10,
      category: "fresh-produce",
      brand: "CitrusFresh",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "prod_022",
      name: "Fresh Limes (25lb Box)",
      description: "Zesty fresh limes",
      image: "/placeholder.svg?height=200&width=200",
      price: 38.99,
      moq: 12,
      category: "fresh-produce",
      brand: "CitrusFresh",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "prod_023",
      name: "Organic Oranges (40lb Box)",
      description: "Sweet navel oranges",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 10,
      category: "fresh-produce",
      brand: "SunnyGrove",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "prod_024",
      name: "Fresh Grapes (20lb Box)",
      description: "Seedless red grapes",
      image: "/placeholder.svg?height=200&width=200",
      price: 58.99,
      moq: 8,
      category: "fresh-produce",
      brand: "VineSweet",
      rating: 4.5,
      inStock: false,
    },
    {
      id: "prod_025",
      name: "Fresh Pineapples (12 Count)",
      description: "Ripe golden pineapples",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 6,
      category: "fresh-produce",
      brand: "TropicalFresh",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "prod_026",
      name: "Fresh Mangoes (20 Count)",
      description: "Sweet ripe mangoes",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 8,
      category: "fresh-produce",
      brand: "TropicalFresh",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "prod_027",
      name: "Fresh Cauliflower (24 Heads)",
      description: "White cauliflower heads",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 10,
      category: "fresh-produce",
      brand: "WhiteVeggies",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "prod_028",
      name: "Fresh Asparagus (15lb Case)",
      description: "Premium fresh asparagus spears",
      image: "/placeholder.svg?height=200&width=200",
      price: 65.99,
      moq: 8,
      category: "fresh-produce",
      brand: "GreenSpear",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "prod_029",
      name: "Fresh Zucchini (30lb Box)",
      description: "Fresh green zucchini",
      image: "/placeholder.svg?height=200&width=200",
      price: 28.99,
      moq: 12,
      category: "fresh-produce",
      brand: "SquashFarm",
      rating: 4.0,
      inStock: false,
    },
    {
      id: "prod_030",
      name: "Fresh Eggplant (20lb Case)",
      description: "Purple eggplants",
      image: "/placeholder.svg?height=200&width=200",
      price: 38.99,
      moq: 10,
      category: "fresh-produce",
      brand: "PurpleProduce",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "prod_031",
      name: "Fresh Radishes (15lb Case)",
      description: "Crisp red radishes",
      image: "/placeholder.svg?height=200&width=200",
      price: 22.99,
      moq: 15,
      category: "fresh-produce",
      brand: "RootCrisp",
      rating: 3.9,
      inStock: true,
    },
    {
      id: "prod_032",
      name: "Fresh Beets (25lb Case)",
      description: "Red beets with greens",
      image: "/placeholder.svg?height=200&width=200",
      price: 32.99,
      moq: 12,
      category: "fresh-produce",
      brand: "RedRoot",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "prod_033",
      name: "Fresh Turnips (20lb Case)",
      description: "White turnips",
      image: "/placeholder.svg?height=200&width=200",
      price: 24.99,
      moq: 12,
      category: "fresh-produce",
      brand: "WhiteRoot",
      rating: 3.8,
      inStock: true,
    },
    {
      id: "prod_034",
      name: "Fresh Parsnips (15lb Case)",
      description: "Cream-colored parsnips",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 10,
      category: "fresh-produce",
      brand: "CreamRoot",
      rating: 4.0,
      inStock: false,
    },
    {
      id: "prod_035",
      name: "Fresh Cabbage (30lb Case)",
      description: "Green cabbage heads",
      image: "/placeholder.svg?height=200&width=200",
      price: 26.99,
      moq: 12,
      category: "fresh-produce",
      brand: "CrunchyGreens",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "prod_036",
      name: "Fresh Brussels Sprouts (10lb Case)",
      description: "Fresh Brussels sprouts",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 8,
      category: "fresh-produce",
      brand: "MiniCabbage",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "prod_037",
      name: "Fresh Artichokes (12 Count)",
      description: "Large fresh artichokes",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 6,
      category: "fresh-produce",
      brand: "GourmetVeggies",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "prod_038",
      name: "Fresh Fennel (15lb Case)",
      description: "Fresh fennel bulbs",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 8,
      category: "fresh-produce",
      brand: "AniseFresh",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "prod_039",
      name: "Fresh Leeks (20lb Case)",
      description: "Fresh leeks",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 10,
      category: "fresh-produce",
      brand: "OnionFamily",
      rating: 4.1,
      inStock: false,
    },
    {
      id: "prod_040",
      name: "Fresh Herbs Mix (5lb Case)",
      description: "Mixed fresh herbs - basil, parsley, cilantro",
      image: "/placeholder.svg?height=200&width=200",
      price: 68.99,
      moq: 12,
      category: "fresh-produce",
      brand: "HerbGarden",
      rating: 4.5,
      inStock: true,
    },

    // GROCERY - DAIRY PRODUCTS (40 products)
    {
      id: "dairy_001",
      name: "Whole Milk Gallons (12-pack)",
      description: "Fresh whole milk in gallon containers",
      image: "/placeholder.svg?height=200&width=200",
      price: 36.99,
      moq: 5,
      category: "dairy-products",
      brand: "DairyFresh",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "dairy_002",
      name: "Cheddar Cheese Blocks (20lb)",
      description: "Sharp cheddar cheese in bulk blocks",
      image: "/placeholder.svg?height=200&width=200",
      price: 89.99,
      moq: 4,
      category: "dairy-products",
      brand: "CheeseWorks",
      rating: 4.6,
      inStock: false,
    },
    {
      id: "dairy_003",
      name: "Greek Yogurt (48 Cups)",
      description: "Plain Greek yogurt in individual serving cups",
      image: "/placeholder.svg?height=200&width=200",
      price: 65.99,
      moq: 8,
      category: "dairy-products",
      brand: "YogurtPlus",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "dairy_004",
      name: "Butter Sticks (50lb Case)",
      description: "Unsalted butter sticks for baking and cooking",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 6,
      category: "dairy-products",
      brand: "CreamyBest",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "dairy_005",
      name: "Mozzarella Cheese (15lb)",
      description: "Fresh mozzarella cheese for pizza and cooking",
      image: "/placeholder.svg?height=200&width=200",
      price: 78.99,
      moq: 5,
      category: "dairy-products",
      brand: "ItalianCheese",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "dairy_006",
      name: "Heavy Cream (12 Quarts)",
      description: "Heavy whipping cream for cooking and baking",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 8,
      category: "dairy-products",
      brand: "CreamyBest",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "dairy_007",
      name: "Cream Cheese (24 Blocks)",
      description: "Philadelphia-style cream cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 10,
      category: "dairy-products",
      brand: "SoftCheese",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "dairy_008",
      name: "Sour Cream (24 Containers)",
      description: "Fresh sour cream for cooking and garnish",
      image: "/placeholder.svg?height=200&width=200",
      price: 38.99,
      moq: 12,
      category: "dairy-products",
      brand: "TangyFresh",
      rating: 4.1,
      inStock: false,
    },
    {
      id: "dairy_009",
      name: "Swiss Cheese Slices (10lb)",
      description: "Deli-style Swiss cheese slices",
      image: "/placeholder.svg?height=200&width=200",
      price: 85.99,
      moq: 6,
      category: "dairy-products",
      brand: "AlpineCheese",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "dairy_010",
      name: "Cottage Cheese (24 Containers)",
      description: "Low-fat cottage cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 8,
      category: "dairy-products",
      brand: "CurdFresh",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "dairy_011",
      name: "2% Milk Gallons (12-pack)",
      description: "Reduced fat milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 34.99,
      moq: 5,
      category: "dairy-products",
      brand: "DairyFresh",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "dairy_012",
      name: "Skim Milk Gallons (12-pack)",
      description: "Fat-free skim milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 32.99,
      moq: 5,
      category: "dairy-products",
      brand: "LeanDairy",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "dairy_013",
      name: "Buttermilk (12 Quarts)",
      description: "Cultured buttermilk for baking",
      image: "/placeholder.svg?height=200&width=200",
      price: 28.99,
      moq: 8,
      category: "dairy-products",
      brand: "TangyMilk",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "dairy_014",
      name: "Half & Half (24 Pints)",
      description: "Coffee cream",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 10,
      category: "dairy-products",
      brand: "CreamyBest",
      rating: 4.3,
      inStock: false,
    },
    {
      id: "dairy_015",
      name: "Parmesan Cheese (8lb Wheel)",
      description: "Aged Parmesan cheese wheel",
      image: "/placeholder.svg?height=200&width=200",
      price: 145.99,
      moq: 3,
      category: "dairy-products",
      brand: "ItalianCheese",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "dairy_016",
      name: "Blue Cheese (5lb Block)",
      description: "Creamy blue cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 68.99,
      moq: 6,
      category: "dairy-products",
      brand: "GourmetCheese",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "dairy_017",
      name: "Goat Cheese (3lb Pack)",
      description: "Soft goat cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 8,
      category: "dairy-products",
      brand: "GoatFarm",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "dairy_018",
      name: "Feta Cheese (5lb Container)",
      description: "Crumbled feta cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 6,
      category: "dairy-products",
      brand: "GreekCheese",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "dairy_019",
      name: "Ricotta Cheese (12 Containers)",
      description: "Fresh ricotta cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 8,
      category: "dairy-products",
      brand: "ItalianCheese",
      rating: 4.2,
      inStock: false,
    },
    {
      id: "dairy_020",
      name: "Provolone Cheese (8lb)",
      description: "Sliced provolone cheese",
      image: "/placeholder.svg?height=200&width=200",
      price: 72.99,
      moq: 5,
      category: "dairy-products",
      brand: "ItalianCheese",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "dairy_021",
      name: "Vanilla Yogurt (48 Cups)",
      description: "Vanilla flavored yogurt",
      image: "/placeholder.svg?height=200&width=200",
      price: 58.99,
      moq: 8,
      category: "dairy-products",
      brand: "YogurtPlus",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "dairy_022",
      name: "Strawberry Yogurt (48 Cups)",
      description: "Strawberry flavored yogurt",
      image: "/placeholder.svg?height=200&width=200",
      price: 58.99,
      moq: 8,
      category: "dairy-products",
      brand: "FruitYogurt",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "dairy_023",
      name: "Chocolate Milk (24 Quarts)",
      description: "Chocolate flavored milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 6,
      category: "dairy-products",
      brand: "SweetMilk",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "dairy_024",
      name: "Almond Milk (24 Cartons)",
      description: "Unsweetened almond milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 8,
      category: "dairy-products",
      brand: "NutMilk",
      rating: 4.0,
      inStock: false,
    },
    {
      id: "dairy_025",
      name: "Oat Milk (24 Cartons)",
      description: "Creamy oat milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 8,
      category: "dairy-products",
      brand: "OatFresh",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "dairy_026",
      name: "Soy Milk (24 Cartons)",
      description: "Original soy milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 8,
      category: "dairy-products",
      brand: "SoyFresh",
      rating: 3.9,
      inStock: true,
    },
    {
      id: "dairy_027",
      name: "Coconut Milk (24 Cans)",
      description: "Full-fat coconut milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 38.99,
      moq: 10,
      category: "dairy-products",
      brand: "TropicalMilk",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "dairy_028",
      name: "Whipped Cream (24 Cans)",
      description: "Aerosol whipped cream",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 8,
      category: "dairy-products",
      brand: "FluffyCream",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "dairy_029",
      name: "Eggs Large (30 Dozen)",
      description: "Grade A large eggs",
      image: "/placeholder.svg?height=200&width=200",
      price: 89.99,
      moq: 5,
      category: "dairy-products",
      brand: "FarmFresh",
      rating: 4.5,
      inStock: false,
    },
    {
      id: "dairy_030",
      name: "Organic Eggs (24 Dozen)",
      description: "Organic free-range eggs",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 4,
      category: "dairy-products",
      brand: "OrganicFarm",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "dairy_031",
      name: "Egg Whites (24 Cartons)",
      description: "Liquid egg whites",
      image: "/placeholder.svg?height=200&width=200",
      price: 68.99,
      moq: 6,
      category: "dairy-products",
      brand: "PureEgg",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "dairy_032",
      name: "Whole Eggs Liquid (12 Cartons)",
      description: "Liquid whole eggs",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 8,
      category: "dairy-products",
      brand: "LiquidEgg",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "dairy_033",
      name: "Salted Butter (25lb Case)",
      description: "Salted butter sticks",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 6,
      category: "dairy-products",
      brand: "SaltyButter",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "dairy_034",
      name: "European Butter (10lb)",
      description: "High-fat European style butter",
      image: "/placeholder.svg?height=200&width=200",
      price: 85.99,
      moq: 8,
      category: "dairy-products",
      brand: "EuroButter",
      rating: 4.6,
      inStock: false,
    },
    {
      id: "dairy_035",
      name: "Margarine (20lb Case)",
      description: "Vegetable oil margarine",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 10,
      category: "dairy-products",
      brand: "PlantSpread",
      rating: 3.8,
      inStock: true,
    },
    {
      id: "dairy_036",
      name: "Ghee (12 Jars)",
      description: "Clarified butter",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 6,
      category: "dairy-products",
      brand: "PureButter",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "dairy_037",
      name: "Kefir (24 Bottles)",
      description: "Probiotic kefir drink",
      image: "/placeholder.svg?height=200&width=200",
      price: 58.99,
      moq: 8,
      category: "dairy-products",
      brand: "ProbioticPlus",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "dairy_038",
      name: "Lactose-Free Milk (12 Gallons)",
      description: "Lactose-free whole milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 5,
      category: "dairy-products",
      brand: "DigestEasy",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "dairy_039",
      name: "Protein Milk (24 Bottles)",
      description: "High-protein milk",
      image: "/placeholder.svg?height=200&width=200",
      price: 65.99,
      moq: 6,
      category: "dairy-products",
      brand: "ProteinPlus",
      rating: 4.3,
      inStock: false,
    },
    {
      id: "dairy_040",
      name: "Aged Cheddar (12lb Wheel)",
      description: "2-year aged cheddar wheel",
      image: "/placeholder.svg?height=200&width=200",
      price: 165.99,
      moq: 3,
      category: "dairy-products",
      brand: "AgedCheese",
      rating: 4.7,
      inStock: true,
    },

    // GROCERY - MEAT AND POULTRY (40 products)
    {
      id: "meat_001",
      name: "Ground Beef 80/20 (40lb Case)",
      description: "Fresh ground beef, 80% lean",
      image: "/placeholder.svg?height=200&width=200",
      price: 189.99,
      moq: 5,
      category: "meat-poultry",
      brand: "PrimeMeat",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "meat_002",
      name: "Chicken Breasts (30lb Case)",
      description: "Boneless skinless chicken breasts",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 6,
      category: "meat-poultry",
      brand: "FreshPoultry",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "meat_003",
      name: "Pork Chops (25lb Case)",
      description: "Center cut pork chops",
      image: "/placeholder.svg?height=200&width=200",
      price: 98.99,
      moq: 8,
      category: "meat-poultry",
      brand: "PorkPro",
      rating: 4.2,
      inStock: false,
    },
    {
      id: "meat_004",
      name: "Ribeye Steaks (20lb Case)",
      description: "Premium ribeye steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 285.99,
      moq: 4,
      category: "meat-poultry",
      brand: "SteakHouse",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "meat_005",
      name: "Whole Chickens (24 Count)",
      description: "Fresh whole chickens",
      image: "/placeholder.svg?height=200&width=200",
      price: 89.99,
      moq: 6,
      category: "meat-poultry",
      brand: "FarmFresh",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "meat_006",
      name: "Ground Turkey (30lb Case)",
      description: "Lean ground turkey",
      image: "/placeholder.svg?height=200&width=200",
      price: 145.99,
      moq: 5,
      category: "meat-poultry",
      brand: "TurkeyFresh",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "meat_007",
      name: "Bacon Strips (20lb Case)",
      description: "Thick cut bacon strips",
      image: "/placeholder.svg?height=200&width=200",
      price: 165.99,
      moq: 6,
      category: "meat-poultry",
      brand: "SmokyBacon",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "meat_008",
      name: "Italian Sausage (25lb Case)",
      description: "Sweet Italian sausage links",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 8,
      category: "meat-poultry",
      brand: "SausageMaster",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "meat_009",
      name: "Lamb Chops (15lb Case)",
      description: "Premium lamb chops",
      image: "/placeholder.svg?height=200&width=200",
      price: 225.99,
      moq: 4,
      category: "meat-poultry",
      brand: "LambSelect",
      rating: 4.4,
      inStock: false,
    },
    {
      id: "meat_010",
      name: "Chicken Wings (30lb Case)",
      description: "Fresh chicken wings",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 8,
      category: "meat-poultry",
      brand: "WingMaster",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "meat_011",
      name: "Beef Brisket (20lb Case)",
      description: "Whole beef brisket",
      image: "/placeholder.svg?height=200&width=200",
      price: 185.99,
      moq: 5,
      category: "meat-poultry",
      brand: "BBQMeat",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "meat_012",
      name: "Pork Shoulder (25lb Case)",
      description: "Boston butt pork shoulder",
      image: "/placeholder.svg?height=200&width=200",
      price: 89.99,
      moq: 6,
      category: "meat-poultry",
      brand: "PorkPro",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "meat_013",
      name: "Chicken Thighs (25lb Case)",
      description: "Bone-in chicken thighs",
      image: "/placeholder.svg?height=200&width=200",
      price: 75.99,
      moq: 8,
      category: "meat-poultry",
      brand: "ThighMaster",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "meat_014",
      name: "Ground Pork (20lb Case)",
      description: "Fresh ground pork",
      image: "/placeholder.svg?height=200&width=200",
      price: 85.99,
      moq: 8,
      category: "meat-poultry",
      brand: "PorkFresh",
      rating: 4.2,
      inStock: false,
    },
    {
      id: "meat_015",
      name: "Sirloin Steaks (18lb Case)",
      description: "Top sirloin steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 165.99,
      moq: 5,
      category: "meat-poultry",
      brand: "SteakSelect",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "meat_016",
      name: "Turkey Breast (12lb Case)",
      description: "Boneless turkey breast",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 6,
      category: "meat-poultry",
      brand: "TurkeyPrime",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "meat_017",
      name: "Ham Steaks (15lb Case)",
      description: "Thick cut ham steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 8,
      category: "meat-poultry",
      brand: "HamMaster",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "meat_018",
      name: "Beef Short Ribs (20lb Case)",
      description: "Bone-in beef short ribs",
      image: "/placeholder.svg?height=200&width=200",
      price: 155.99,
      moq: 5,
      category: "meat-poultry",
      brand: "RibMaster",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "meat_019",
      name: "Chicken Drumsticks (30lb Case)",
      description: "Fresh chicken drumsticks",
      image: "/placeholder.svg?height=200&width=200",
      price: 65.99,
      moq: 10,
      category: "meat-poultry",
      brand: "DrumMaster",
      rating: 3.9,
      inStock: false,
    },
    {
      id: "meat_020",
      name: "Pork Ribs (20lb Case)",
      description: "Baby back pork ribs",
      image: "/placeholder.svg?height=200&width=200",
      price: 135.99,
      moq: 6,
      category: "meat-poultry",
      brand: "RibKing",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "meat_021",
      name: "Filet Mignon (10lb Case)",
      description: "Premium filet mignon steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 385.99,
      moq: 3,
      category: "meat-poultry",
      brand: "PremiumCuts",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "meat_022",
      name: "Chicken Tenders (20lb Case)",
      description: "Chicken breast tenderloins",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 6,
      category: "meat-poultry",
      brand: "TenderSelect",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "meat_023",
      name: "Bratwurst (15lb Case)",
      description: "German bratwurst sausages",
      image: "/placeholder.svg?height=200&width=200",
      price: 89.99,
      moq: 8,
      category: "meat-poultry",
      brand: "GermanMeat",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "meat_024",
      name: "Veal Cutlets (12lb Case)",
      description: "Tender veal cutlets",
      image: "/placeholder.svg?height=200&width=200",
      price: 245.99,
      moq: 4,
      category: "meat-poultry",
      brand: "VealPrime",
      rating: 4.4,
      inStock: false,
    },
    {
      id: "meat_025",
      name: "Duck Breasts (8lb Case)",
      description: "Boneless duck breasts",
      image: "/placeholder.svg?height=200&width=200",
      price: 185.99,
      moq: 5,
      category: "meat-poultry",
      brand: "DuckSelect",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "meat_026",
      name: "Cornish Hens (24 Count)",
      description: "Whole Cornish game hens",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 4,
      category: "meat-poultry",
      brand: "GameBird",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "meat_027",
      name: "Beef Tenderloin (15lb Case)",
      description: "Whole beef tenderloin",
      image: "/placeholder.svg?height=200&width=200",
      price: 325.99,
      moq: 3,
      category: "meat-poultry",
      brand: "TenderloinPro",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "meat_028",
      name: "Chorizo Sausage (12lb Case)",
      description: "Spicy chorizo sausage",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 6,
      category: "meat-poultry",
      brand: "SpicyMeat",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "meat_029",
      name: "Turkey Legs (20lb Case)",
      description: "Smoked turkey legs",
      image: "/placeholder.svg?height=200&width=200",
      price: 85.99,
      moq: 8,
      category: "meat-poultry",
      brand: "SmokedTurkey",
      rating: 4.0,
      inStock: false,
    },
    {
      id: "meat_030",
      name: "Beef Chuck Roast (25lb Case)",
      description: "Bone-in chuck roast",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 5,
      category: "meat-poultry",
      brand: "RoastMaster",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "meat_031",
      name: "Chicken Livers (10lb Case)",
      description: "Fresh chicken livers",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 12,
      category: "meat-poultry",
      brand: "OrganMeat",
      rating: 3.8,
      inStock: true,
    },
    {
      id: "meat_032",
      name: "Beef Liver (8lb Case)",
      description: "Fresh beef liver",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 10,
      category: "meat-poultry",
      brand: "OrganSelect",
      rating: 3.7,
      inStock: true,
    },
    {
      id: "meat_033",
      name: "Pork Belly (15lb Case)",
      description: "Fresh pork belly",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 6,
      category: "meat-poultry",
      brand: "BellyGood",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "meat_034",
      name: "Goose (6 Count)",
      description: "Whole geese",
      image: "/placeholder.svg?height=200&width=200",
      price: 185.99,
      moq: 3,
      category: "meat-poultry",
      brand: "WildBird",
      rating: 4.1,
      inStock: false,
    },
    {
      id: "meat_035",
      name: "Beef Oxtail (12lb Case)",
      description: "Fresh beef oxtail",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 8,
      category: "meat-poultry",
      brand: "TailMeat",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "meat_036",
      name: "Rabbit (12 Count)",
      description: "Whole rabbits",
      image: "/placeholder.svg?height=200&width=200",
      price: 165.99,
      moq: 4,
      category: "meat-poultry",
      brand: "GameMeat",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "meat_037",
      name: "Venison Steaks (10lb Case)",
      description: "Wild venison steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 225.99,
      moq: 4,
      category: "meat-poultry",
      brand: "WildGame",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "meat_038",
      name: "Quail (24 Count)",
      description: "Whole quail",
      image: "/placeholder.svg?height=200&width=200",
      price: 145.99,
      moq: 5,
      category: "meat-poultry",
      brand: "SmallGame",
      rating: 4.1,
      inStock: false,
    },
    {
      id: "meat_039",
      name: "Elk Steaks (8lb Case)",
      description: "Premium elk steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 285.99,
      moq: 3,
      category: "meat-poultry",
      brand: "WildElk",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "meat_040",
      name: "Bison Burgers (15lb Case)",
      description: "Ground bison patties",
      image: "/placeholder.svg?height=200&width=200",
      price: 195.99,
      moq: 4,
      category: "meat-poultry",
      brand: "BisonMeat",
      rating: 4.3,
      inStock: true,
    },

    // GROCERY - FROZEN FOODS (40 products)
    {
      id: "frozen_001",
      name: "Frozen French Fries (30lb Case)",
      description: "Crispy frozen french fries",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 8,
      category: "frozen-foods",
      brand: "FrozenFries",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_002",
      name: "Frozen Pizza (24 Count)",
      description: "Assorted frozen pizzas",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 6,
      category: "frozen-foods",
      brand: "PizzaFrozen",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_003",
      name: "Frozen Vegetables Mix (20lb Case)",
      description: "Mixed frozen vegetables",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 10,
      category: "frozen-foods",
      brand: "VeggieFrozen",
      rating: 4.0,
      inStock: false,
    },
    {
      id: "frozen_004",
      name: "Frozen Chicken Nuggets (25lb Case)",
      description: "Breaded chicken nuggets",
      image: "/placeholder.svg?height=200&width=200",
      price: 89.99,
      moq: 8,
      category: "frozen-foods",
      brand: "NuggetMaster",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "frozen_005",
      name: "Frozen Berries Mix (15lb Case)",
      description: "Mixed frozen berries",
      image: "/placeholder.svg?height=200&width=200",
      price: 68.99,
      moq: 6,
      category: "frozen-foods",
      brand: "BerryFrozen",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "frozen_006",
      name: "Frozen Fish Fillets (20lb Case)",
      description: "Frozen white fish fillets",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 5,
      category: "frozen-foods",
      brand: "SeaFrozen",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_007",
      name: "Frozen Shrimp (10lb Case)",
      description: "Large frozen shrimp",
      image: "/placeholder.svg?height=200&width=200",
      price: 145.99,
      moq: 4,
      category: "frozen-foods",
      brand: "ShrimpFrozen",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "frozen_008",
      name: "Frozen Waffles (48 Count)",
      description: "Frozen breakfast waffles",
      image: "/placeholder.svg?height=200&width=200",
      price: 52.99,
      moq: 8,
      category: "frozen-foods",
      brand: "WaffleFrozen",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_009",
      name: "Frozen Burritos (36 Count)",
      description: "Assorted frozen burritos",
      image: "/placeholder.svg?height=200&width=200",
      price: 85.99,
      moq: 6,
      category: "frozen-foods",
      brand: "BurritoFrozen",
      rating: 4.0,
      inStock: false,
    },
    {
      id: "frozen_010",
      name: "Frozen Ice Cream (12 Gallons)",
      description: "Vanilla ice cream",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 5,
      category: "frozen-foods",
      brand: "CreamyFrozen",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "frozen_011",
      name: "Frozen Corn (25lb Case)",
      description: "Sweet corn kernels",
      image: "/placeholder.svg?height=200&width=200",
      price: 32.99,
      moq: 10,
      category: "frozen-foods",
      brand: "CornFrozen",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_012",
      name: "Frozen Peas (20lb Case)",
      description: "Green peas",
      image: "/placeholder.svg?height=200&width=200",
      price: 38.99,
      moq: 8,
      category: "frozen-foods",
      brand: "PeaFrozen",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "frozen_013",
      name: "Frozen Broccoli (18lb Case)",
      description: "Broccoli florets",
      image: "/placeholder.svg?height=200&width=200",
      price: 42.99,
      moq: 8,
      category: "frozen-foods",
      brand: "BroccoliFrozen",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_014",
      name: "Frozen Spinach (15lb Case)",
      description: "Chopped frozen spinach",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 10,
      category: "frozen-foods",
      brand: "SpinachFrozen",
      rating: 3.9,
      inStock: false,
    },
    {
      id: "frozen_015",
      name: "Frozen Meatballs (20lb Case)",
      description: "Italian style meatballs",
      image: "/placeholder.svg?height=200&width=200",
      price: 78.99,
      moq: 6,
      category: "frozen-foods",
      brand: "MeatballFrozen",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_016",
      name: "Frozen Salmon (12lb Case)",
      description: "Atlantic salmon fillets",
      image: "/placeholder.svg?height=200&width=200",
      price: 185.99,
      moq: 4,
      category: "frozen-foods",
      brand: "SalmonFrozen",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "frozen_017",
      name: "Frozen Onion Rings (15lb Case)",
      description: "Breaded onion rings",
      image: "/placeholder.svg?height=200&width=200",
      price: 48.99,
      moq: 8,
      category: "frozen-foods",
      brand: "OnionFrozen",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_018",
      name: "Frozen Herbs Mix (5lb Case)",
      description: "Mixed fresh herbs - basil, parsley, cilantro",
      image: "/placeholder.svg?height=200&width=200",
      price: 68.99,
      moq: 12,
      category: "frozen-foods",
      brand: "HerbGarden",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "frozen_019",
      name: "Frozen Chicken Tenders (20lb Case)",
      description: "Chicken breast tenderloins",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 6,
      category: "frozen-foods",
      brand: "TenderSelect",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_020",
      name: "Frozen Beef Short Ribs (20lb Case)",
      description: "Bone-in beef short ribs",
      image: "/placeholder.svg?height=200&width=200",
      price: 155.99,
      moq: 4,
      category: "frozen-foods",
      brand: "RibMaster",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "frozen_021",
      name: "Frozen Duck Breasts (8lb Case)",
      description: "Boneless duck breasts",
      image: "/placeholder.svg?height=200&width=200",
      price: 185.99,
      moq: 5,
      category: "frozen-foods",
      brand: "DuckSelect",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "frozen_022",
      name: "Frozen Cornish Hens (24 Count)",
      description: "Whole Cornish game hens",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 4,
      category: "frozen-foods",
      brand: "GameBird",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_023",
      name: "Frozen Beef Tenderloin (15lb Case)",
      description: "Whole beef tenderloin",
      image: "/placeholder.svg?height=200&width=200",
      price: 325.99,
      moq: 3,
      category: "frozen-foods",
      brand: "TenderloinPro",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "frozen_024",
      name: "Frozen Chorizo Sausage (12lb Case)",
      description: "Spicy chorizo sausage",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 6,
      category: "frozen-foods",
      brand: "SpicyMeat",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_025",
      name: "Frozen Turkey Legs (20lb Case)",
      description: "Smoked turkey legs",
      image: "/placeholder.svg?height=200&width=200",
      price: 85.99,
      moq: 8,
      category: "frozen-foods",
      brand: "SmokedTurkey",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "frozen_026",
      name: "Frozen Beef Chuck Roast (25lb Case)",
      description: "Bone-in chuck roast",
      image: "/placeholder.svg?height=200&width=200",
      price: 125.99,
      moq: 5,
      category: "frozen-foods",
      brand: "RoastMaster",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_027",
      name: "Frozen Chicken Livers (10lb Case)",
      description: "Fresh chicken livers",
      image: "/placeholder.svg?height=200&width=200",
      price: 35.99,
      moq: 12,
      category: "frozen-foods",
      brand: "OrganMeat",
      rating: 3.8,
      inStock: true,
    },
    {
      id: "frozen_028",
      name: "Frozen Beef Liver (8lb Case)",
      description: "Fresh beef liver",
      image: "/placeholder.svg?height=200&width=200",
      price: 45.99,
      moq: 10,
      category: "frozen-foods",
      brand: "OrganSelect",
      rating: 3.7,
      inStock: true,
    },
    {
      id: "frozen_029",
      name: "Frozen Pork Belly (15lb Case)",
      description: "Fresh pork belly",
      image: "/placeholder.svg?height=200&width=200",
      price: 115.99,
      moq: 6,
      category: "frozen-foods",
      brand: "BellyGood",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "frozen_030",
      name: "Frozen Goose (6 Count)",
      description: "Whole geese",
      image: "/placeholder.svg?height=200&width=200",
      price: 185.99,
      moq: 3,
      category: "frozen-foods",
      brand: "WildBird",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_031",
      name: "Frozen Beef Oxtail (12lb Case)",
      description: "Fresh beef oxtail",
      image: "/placeholder.svg?height=200&width=200",
      price: 95.99,
      moq: 8,
      category: "frozen-foods",
      brand: "TailMeat",
      rating: 4.0,
      inStock: true,
    },
    {
      id: "frozen_032",
      name: "Frozen Rabbit (12 Count)",
      description: "Whole rabbits",
      image: "/placeholder.svg?height=200&width=200",
      price: 165.99,
      moq: 4,
      category: "frozen-foods",
      brand: "GameMeat",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_033",
      name: "Frozen Venison Steaks (10lb Case)",
      description: "Wild venison steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 225.99,
      moq: 4,
      category: "frozen-foods",
      brand: "WildGame",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "frozen_034",
      name: "Frozen Quail (24 Count)",
      description: "Whole quail",
      image: "/placeholder.svg?height=200&width=200",
      price: 145.99,
      moq: 5,
      category: "frozen-foods",
      brand: "SmallGame",
      rating: 4.1,
      inStock: true,
    },
    {
      id: "frozen_035",
      name: "Frozen Elk Steaks (8lb Case)",
      description: "Premium elk steaks",
      image: "/placeholder.svg?height=200&width=200",
      price: 285.99,
      moq: 3,
      category: "frozen-foods",
      brand: "WildElk",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "frozen_036",
      name: "Frozen Bison Burgers (15lb Case)",
      description: "Ground bison patties",
      image: "/placeholder.svg?height=200&width=200",
      price: 195.99,
      moq: 4,
      category: "frozen-foods",
      brand: "BisonMeat",
      rating: 4.3,
      inStock: true,
    },
    {
      id: "frozen_037",
      name: "Frozen Chicken Drumsticks (30lb Case)",
      description: "Fresh chicken drumsticks",
      image: "/placeholder.svg?height=200&width=200",
      price: 65.99,
      moq: 10,
      category: "frozen-foods",
      brand: "DrumMaster",
      rating: 3.9,
      inStock: true,
    },
    {
      id: "frozen_038",
      name: "Frozen Pork Chops (25lb Case)",
      description: "Center cut pork chops",
      image: "/placeholder.svg?height=200&width=200",
      price: 98.99,
      moq: 8,
      category: "frozen-foods",
      brand: "PorkPro",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "frozen_039",
      name: "Frozen Lamb Chops (15lb Case)",
      description: "Premium lamb chops",
      image: "/placeholder.svg?height=200&width=200",
      price: 225.99,
      moq: 4,
      category: "frozen-foods",
      brand: "LambSelect",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "frozen_040",
      name: "Frozen Ground Turkey (30lb Case)",
      description: "Lean ground turkey",
      image: "/placeholder.svg?height=200&width=200",
      price: 145.99,
      moq: 5,
      category: "frozen-foods",
      brand: "TurkeyFresh",
      rating: 4.0,
      inStock: true,
    },
  ]

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if (
          !product.name.toLowerCase().includes(searchLower) &&
          !product.description.toLowerCase().includes(searchLower) &&
          !product.brand.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false
        }
      }

      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) {
          return false
        }
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      if (showInStockOnly && !product.inStock) {
        return false
      }
      if (showPreOrderOnly && product.inStock) {
        return false
      }

      return true
    })

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, sortBy, showInStockOnly, showPreOrderOnly])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-primary">
                Linka
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/wholesale" className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Wholesale
                </Link>
                <Link href="/wholesale/products" className="text-sm font-medium text-primary">
                  Browse Products
                </Link>
                <Link
                  href="/wholesale/account"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  My Account
                </Link>
              </nav>
            </div>
            <Link href="/cart" className="flex items-center space-x-2 text-primary hover:text-primary/80">
              <span className="text-sm font-medium">Cart ({getTotalCartItems()})</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Wholesale Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search Products</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Categories */}
                <div>
                  <Label className="text-base font-semibold">Categories</Label>
                  <div className="space-y-3 mt-3 max-h-80 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category.value} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category.value}
                            checked={selectedCategories.includes(category.value)}
                            onCheckedChange={(checked) => handleCategoryChange(category.value, checked as boolean)}
                          />
                          <Label htmlFor={category.value} className="text-sm font-medium cursor-pointer">
                            {category.label}
                          </Label>
                        </div>
                        {category.subcategories && (
                          <div className="ml-6 space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <div key={subcategory.value} className="flex items-center space-x-2">
                                <Checkbox
                                  id={subcategory.value}
                                  checked={selectedCategories.includes(subcategory.value)}
                                  onCheckedChange={(checked) =>
                                    handleCategoryChange(subcategory.value, checked as boolean)
                                  }
                                />
                                <Label
                                  htmlFor={subcategory.value}
                                  className="text-xs text-muted-foreground cursor-pointer"
                                >
                                  {subcategory.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <Label className="text-base font-semibold">Brands</Label>
                  <div className="space-y-2 mt-3 max-h-64 overflow-y-auto">
                    {brands.slice(0, 20).map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
                        <Label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Filters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStockOnly"
                      checked={showInStockOnly}
                      onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                    />
                    <Label htmlFor="inStockOnly" className="text-sm cursor-pointer">
                      In Stock Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="preOrderOnly"
                      checked={showPreOrderOnly}
                      onCheckedChange={(checked) => setShowPreOrderOnly(checked as boolean)}
                    />
                    <Label htmlFor="preOrderOnly" className="text-sm cursor-pointer">
                      Pre-Order Only
                    </Label>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedBrands([])
                    setSearchTerm("")
                    setShowInStockOnly(false)
                    setShowPreOrderOnly(false)
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedProducts.length} of {allProducts.length} products
                </p>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((category) => {
                      const categoryLabel =
                        categories.find((c) => c.value === category)?.label ||
                        categories.flatMap((c) => c.subcategories || []).find((sc) => sc.value === category)?.label ||
                        category
                      return (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleCategoryChange(category, false)}
                        >
                          {categoryLabel} ×
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedBrands([])
                      setSearchTerm("")
                      setShowInStockOnly(false)
                      setShowPreOrderOnly(false)
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredAndSortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        {product.inStock ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Out of Stock</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">{product.brand}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">MOQ: {product.moq} units</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" disabled={!product.inStock} onClick={() => addToCart(product)}>
                          {getCartQuantity(product.id) > 0 ? `In Cart (${getCartQuantity(product.id)})` : "Add to Cart"}
                        </Button>
                        <Button variant="outline" size="sm">
                          Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
