"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronRight, Star, Clock, Truck, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import Link from "next/link"

const restaurantData = {
  1: {
    id: 1,
    name: "Pizzeria Del Sol",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes.",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
  },
  2: {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 1.99,
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Authentic Chinese cuisine with traditional flavors and modern presentation.",
    address: "456 Oak Avenue, Chinatown",
    phone: "(555) 234-5678",
  },
  3: {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Traditional Indian spices and flavors in every dish.",
    address: "789 Curry Lane, Little India",
    phone: "(555) 345-6789",
  },
  4: {
    id: 4,
    name: "Burger Junction",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Classic American burgers and comfort food.",
    address: "321 Burger Street, Downtown",
    phone: "(555) 456-7890",
  },
  5: {
    id: 5,
    name: "Thai Basil",
    cuisine: "Thai",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Authentic Thai cuisine with fresh herbs and bold flavors.",
    address: "654 Thai Street, Asian District",
    phone: "(555) 567-8901",
  },
  6: {
    id: 6,
    name: "Casa Mexico",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 2.29,
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Traditional Mexican dishes with authentic flavors and fresh ingredients.",
    address: "987 Taco Avenue, Mexican Quarter",
    phone: "(555) 678-9012",
  },
}

const menuCategories = [
  { id: "pizzas", name: "Pizzas", count: 8 },
  { id: "pastas", name: "Pastas", count: 6 },
  { id: "appetizers", name: "Appetizers", count: 8 },
  { id: "salads", name: "Salads", count: 6 },
  { id: "mains", name: "Main Dishes", count: 10 },
  { id: "desserts", name: "Desserts", count: 5 },
  { id: "drinks", name: "Drinks", count: 12 },
]

const menuItems = {
  pizzas: [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, basil, olive oil",
      price: 14.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: 'Small (10")', price: 0 },
          { name: 'Medium (12")', price: 3 },
          { name: 'Large (14")', price: 6 },
        ],
        toppings: [
          { name: "Extra Cheese", price: 2 },
          { name: "Pepperoni", price: 2.5 },
          { name: "Mushrooms", price: 1.5 },
          { name: "Bell Peppers", price: 1.5 },
          { name: "Olives", price: 1.5 },
        ],
      },
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Pepperoni, mozzarella cheese, tomato sauce",
      price: 16.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: 'Small (10")', price: 0 },
          { name: 'Medium (12")', price: 3 },
          { name: 'Large (14")', price: 6 },
        ],
        toppings: [
          { name: "Extra Cheese", price: 2 },
          { name: "Extra Pepperoni", price: 3 },
          { name: "Mushrooms", price: 1.5 },
          { name: "Bell Peppers", price: 1.5 },
        ],
      },
    },
    {
      id: 21,
      name: "Supreme Pizza",
      description: "Pepperoni, sausage, mushrooms, bell peppers, onions, olives",
      price: 19.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: 'Small (10")', price: 0 },
          { name: 'Medium (12")', price: 3 },
          { name: 'Large (14")', price: 6 },
        ],
      },
    },
    {
      id: 22,
      name: "Hawaiian Pizza",
      description: "Ham, pineapple, mozzarella cheese, tomato sauce",
      price: 17.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: 'Small (10")', price: 0 },
          { name: 'Medium (12")', price: 3 },
          { name: 'Large (14")', price: 6 },
        ],
      },
    },
  ],
  pastas: [
    {
      id: 3,
      name: "Spaghetti Carbonara",
      description: "Spaghetti with eggs, cheese, pancetta, and black pepper",
      price: 13.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        spiceLevel: [
          { name: "Mild", price: 0 },
          { name: "Medium", price: 0 },
          { name: "Spicy", price: 0 },
        ],
      },
    },
    {
      id: 23,
      name: "Fettuccine Alfredo",
      description: "Creamy alfredo sauce with fettuccine pasta and parmesan",
      price: 15.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        addOns: [
          { name: "Grilled Chicken", price: 4 },
          { name: "Shrimp", price: 6 },
          { name: "Broccoli", price: 2 },
        ],
      },
    },
    {
      id: 24,
      name: "Penne Arrabbiata",
      description: "Spicy tomato sauce with garlic, red peppers, and herbs",
      price: 12.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        spiceLevel: [
          { name: "Mild", price: 0 },
          { name: "Medium", price: 0 },
          { name: "Spicy", price: 0 },
          { name: "Extra Spicy", price: 0 },
        ],
      },
    },
  ],
  appetizers: [
    {
      id: 4,
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 6.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 25,
      name: "Mozzarella Sticks",
      description: "Crispy breaded mozzarella with marinara sauce",
      price: 8.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 26,
      name: "Buffalo Wings",
      description: "Spicy chicken wings with blue cheese dip",
      price: 11.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        spiceLevel: [
          { name: "Mild", price: 0 },
          { name: "Medium", price: 0 },
          { name: "Hot", price: 0 },
          { name: "Extra Hot", price: 0 },
        ],
      },
    },
    {
      id: 27,
      name: "Calamari Rings",
      description: "Crispy fried squid rings with marinara sauce",
      price: 9.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 28,
      name: "Bruschetta",
      description: "Toasted bread with tomatoes, basil, and balsamic glaze",
      price: 7.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
  ],
  salads: [
    {
      id: 5,
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan cheese, caesar dressing",
      price: 9.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        addOns: [
          { name: "Grilled Chicken", price: 4 },
          { name: "Shrimp", price: 6 },
          { name: "Salmon", price: 8 },
        ],
      },
    },
    {
      id: 29,
      name: "Greek Salad",
      description: "Mixed greens, feta cheese, olives, tomatoes, cucumber",
      price: 10.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 30,
      name: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, basil, balsamic reduction",
      price: 11.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 31,
      name: "Garden Salad",
      description: "Mixed greens, tomatoes, cucumbers, carrots, choice of dressing",
      price: 8.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        dressing: [
          { name: "Ranch", price: 0 },
          { name: "Italian", price: 0 },
          { name: "Balsamic", price: 0 },
          { name: "Caesar", price: 0 },
        ],
      },
    },
  ],
  mains: [
    {
      id: 32,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with lemon herb butter",
      price: 22.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        sides: [
          { name: "Rice Pilaf", price: 0 },
          { name: "Mashed Potatoes", price: 0 },
          { name: "Steamed Vegetables", price: 0 },
          { name: "French Fries", price: 2 },
        ],
      },
    },
    {
      id: 33,
      name: "Chicken Parmesan",
      description: "Breaded chicken breast with marinara and mozzarella",
      price: 18.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 34,
      name: "Beef Steak",
      description: "8oz ribeye steak cooked to your preference",
      price: 26.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        temperature: [
          { name: "Rare", price: 0 },
          { name: "Medium Rare", price: 0 },
          { name: "Medium", price: 0 },
          { name: "Medium Well", price: 0 },
          { name: "Well Done", price: 0 },
        ],
        sides: [
          { name: "Baked Potato", price: 0 },
          { name: "Mashed Potatoes", price: 0 },
          { name: "Rice Pilaf", price: 0 },
          { name: "Steamed Vegetables", price: 0 },
        ],
      },
    },
    {
      id: 35,
      name: "Pad Thai",
      description: "Traditional Thai stir-fried noodles with shrimp or chicken",
      price: 16.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        protein: [
          { name: "Chicken", price: 0 },
          { name: "Shrimp", price: 2 },
          { name: "Tofu", price: 0 },
        ],
        spiceLevel: [
          { name: "Mild", price: 0 },
          { name: "Medium", price: 0 },
          { name: "Spicy", price: 0 },
          { name: "Thai Hot", price: 0 },
        ],
      },
    },
    {
      id: 36,
      name: "Chicken Tacos",
      description: "Three soft tacos with grilled chicken, salsa, and cilantro",
      price: 13.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        tortilla: [
          { name: "Soft Flour", price: 0 },
          { name: "Soft Corn", price: 0 },
          { name: "Hard Shell", price: 0 },
        ],
        toppings: [
          { name: "Extra Cheese", price: 1 },
          { name: "Guacamole", price: 2 },
          { name: "Sour Cream", price: 1 },
          { name: "Jalapeños", price: 0.5 },
        ],
      },
    },
  ],
  desserts: [
    {
      id: 37,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers",
      price: 7.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 38,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center and vanilla ice cream",
      price: 8.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 39,
      name: "Cheesecake",
      description: "New York style cheesecake with berry compote",
      price: 6.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        topping: [
          { name: "Strawberry", price: 0 },
          { name: "Blueberry", price: 0 },
          { name: "Chocolate", price: 1 },
          { name: "Caramel", price: 1 },
        ],
      },
    },
    {
      id: 40,
      name: "Ice Cream Sundae",
      description: "Three scoops of ice cream with toppings",
      price: 5.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        flavors: [
          { name: "Vanilla", price: 0 },
          { name: "Chocolate", price: 0 },
          { name: "Strawberry", price: 0 },
          { name: "Mint Chip", price: 0 },
        ],
        toppings: [
          { name: "Hot Fudge", price: 1 },
          { name: "Caramel", price: 1 },
          { name: "Whipped Cream", price: 0.5 },
          { name: "Sprinkles", price: 0.5 },
          { name: "Nuts", price: 1 },
        ],
      },
    },
  ],
  drinks: [
    {
      id: 6,
      name: "Coca Cola",
      description: "Classic soft drink",
      price: 2.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: "Small", price: 0 },
          { name: "Medium", price: 0.5 },
          { name: "Large", price: 1 },
        ],
      },
    },
    {
      id: 41,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: "Small", price: 0 },
          { name: "Large", price: 1.5 },
        ],
      },
    },
    {
      id: 42,
      name: "Iced Tea",
      description: "Refreshing iced tea with lemon",
      price: 2.49,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        sweetness: [
          { name: "Unsweetened", price: 0 },
          { name: "Lightly Sweet", price: 0 },
          { name: "Sweet", price: 0 },
        ],
      },
    },
    {
      id: 43,
      name: "Coffee",
      description: "Freshly brewed coffee",
      price: 3.49,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: "Small", price: 0 },
          { name: "Medium", price: 0.5 },
          { name: "Large", price: 1 },
        ],
        additions: [
          { name: "Cream", price: 0 },
          { name: "Sugar", price: 0 },
          { name: "Extra Shot", price: 1 },
        ],
      },
    },
    {
      id: 44,
      name: "Thai Iced Tea",
      description: "Sweet and creamy Thai-style iced tea",
      price: 4.49,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {},
    },
    {
      id: 45,
      name: "Horchata",
      description: "Traditional Mexican rice drink with cinnamon",
      price: 3.99,
      image: "/placeholder.svg?height=150&width=200",
      customizations: {
        size: [
          { name: "Small", price: 0 },
          { name: "Large", price: 1 },
        ],
      },
    },
  ],
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  customizations: Record<string, any>
  notes?: string
}

export default function RestaurantMenuPage() {
  const router = useRouter()
  const params = useParams()
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart()
  const [activeCategory, setActiveCategory] = useState("pizzas")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [customizations, setCustomizations] = useState<Record<string, any>>({})
  const [specialNotes, setSpecialNotes] = useState("")
  const [quantity, setQuantity] = useState(1)

  const restaurantId = Number.parseInt(params.id as string)
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const handleAddToCart = (item: any, customizations: Record<string, any>, quantity: number, notes?: string) => {
    const customizationPrice = Object.values(customizations).reduce((total: number, customization: any) => {
      if (Array.isArray(customization)) {
        return total + customization.reduce((sum: number, c: any) => sum + (c.price || 0), 0)
      }
      return total + (customization.price || 0)
    }, 0)

    const totalPrice = item.price + customizationPrice

    addToCart({
      id: item.id,
      name: item.name,
      price: totalPrice,
      quantity,
      customizations,
      notes,
      restaurantId,
    })
  }

  const openCustomizationModal = (item: any) => {
    setSelectedItem(item)
    setCustomizations({})
    setSpecialNotes("")
    setQuantity(1)
  }

  const handleCustomizationChange = (category: string, option: any, checked?: boolean) => {
    setCustomizations((prev) => {
      const newCustomizations = { ...prev }

      if (checked !== undefined) {
        // Checkbox (toppings)
        if (!newCustomizations[category]) {
          newCustomizations[category] = []
        }
        if (checked) {
          newCustomizations[category] = [...newCustomizations[category], option]
        } else {
          newCustomizations[category] = newCustomizations[category].filter((item: any) => item.name !== option.name)
        }
      } else {
        // Radio button (size, spice level)
        newCustomizations[category] = option
      }

      return newCustomizations
    })
  }

  const calculateItemPrice = () => {
    if (!selectedItem) return 0

    const customizationPrice = Object.values(customizations).reduce((total: number, customization: any) => {
      if (Array.isArray(customization)) {
        return total + customization.reduce((sum: number, c: any) => sum + (c.price || 0), 0)
      }
      return total + (customization.price || 0)
    }, 0)

    return (selectedItem.price + customizationPrice) * quantity
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Linka</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/restaurants" className="hover:text-gray-700">
              Restaurants
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{restaurant.name}</span>
          </div>
        </div>
      </div>

      {/* Restaurant Banner */}
      <div className="relative">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          width={800}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end space-x-4">
              <Image
                src={restaurant.logo || "/placeholder.svg"}
                alt={`${restaurant.name} logo`}
                width={80}
                height={80}
                className="rounded-lg bg-white p-2"
              />
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-lg opacity-90">{restaurant.cuisine}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-1" />
                    <span>${restaurant.deliveryFee} delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Categories Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Menu Categories</h3>
              <nav className="space-y-2">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === category.id ? "bg-orange-100 text-orange-700 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold capitalize">{activeCategory}</h2>
              </div>

              <div className="p-6">
                <div className="grid gap-6">
                  {menuItems[activeCategory as keyof typeof menuItems]?.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="flex-1 p-6">
                            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</span>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    onClick={() => openCustomizationModal(item)}
                                    className="bg-orange-600 hover:bg-orange-700"
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>{selectedItem?.name}</DialogTitle>
                                  </DialogHeader>

                                  {selectedItem && (
                                    <div className="space-y-6">
                                      <div className="flex">
                                        <Image
                                          src={selectedItem.image || "/placeholder.svg"}
                                          alt={selectedItem.name}
                                          width={200}
                                          height={150}
                                          className="rounded-lg object-cover"
                                        />
                                        <div className="ml-4 flex-1">
                                          <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                                          <p className="text-xl font-bold text-green-600">
                                            ${selectedItem.price.toFixed(2)}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Customizations */}
                                      {Object.entries(selectedItem.customizations || {}).map(([category, options]) => (
                                        <div key={category}>
                                          <h4 className="font-semibold text-lg mb-3 capitalize">
                                            {category.replace(/([A-Z])/g, " $1").trim()}
                                          </h4>

                                          {category === "toppings" ||
                                          category === "addOns" ||
                                          category === "flavors" ? (
                                            <div className="space-y-2">
                                              {(options as any[]).map((option) => (
                                                <div key={option.name} className="flex items-center justify-between">
                                                  <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                      id={option.name}
                                                      onCheckedChange={(checked) =>
                                                        handleCustomizationChange(category, option, checked as boolean)
                                                      }
                                                    />
                                                    <Label htmlFor={option.name}>{option.name}</Label>
                                                  </div>
                                                  {option.price > 0 && (
                                                    <span className="text-sm text-gray-500">
                                                      +${option.price.toFixed(2)}
                                                    </span>
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <RadioGroup
                                              onValueChange={(value) => {
                                                const option = (options as any[]).find((o) => o.name === value)
                                                handleCustomizationChange(category, option)
                                              }}
                                            >
                                              {(options as any[]).map((option) => (
                                                <div key={option.name} className="flex items-center justify-between">
                                                  <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value={option.name} id={option.name} />
                                                    <Label htmlFor={option.name}>{option.name}</Label>
                                                  </div>
                                                  {option.price > 0 && (
                                                    <span className="text-sm text-gray-500">
                                                      +${option.price.toFixed(2)}
                                                    </span>
                                                  )}
                                                </div>
                                              ))}
                                            </RadioGroup>
                                          )}
                                        </div>
                                      ))}

                                      {/* Special Notes */}
                                      <div>
                                        <Label htmlFor="notes" className="text-base font-semibold">
                                          Special Instructions
                                        </Label>
                                        <Textarea
                                          id="notes"
                                          placeholder="Any special requests or dietary restrictions?"
                                          value={specialNotes}
                                          onChange={(e) => setSpecialNotes(e.target.value)}
                                          className="mt-2"
                                        />
                                      </div>

                                      {/* Quantity and Add to Cart */}
                                      <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="flex items-center space-x-3">
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <span className="text-lg font-semibold">{quantity}</span>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(quantity + 1)}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>

                                        <Button
                                          onClick={() => {
                                            handleAddToCart(selectedItem, customizations, quantity, specialNotes)
                                            setSelectedItem(null)
                                          }}
                                          className="bg-orange-600 hover:bg-orange-700"
                                        >
                                          Add to Cart - ${calculateItemPrice().toFixed(2)}
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          <div className="w-32 h-32 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Cart Summary */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {cartItemCount}
              </div>
              <div>
                <p className="font-semibold">Items in cart</p>
                <p className="text-sm text-gray-600">Total: ${cartTotal.toFixed(2)}</p>
              </div>
            </div>
            <Button onClick={() => router.push("/checkout")} className="bg-orange-600 hover:bg-orange-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
