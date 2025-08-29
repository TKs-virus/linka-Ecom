export const demoOrders = [
  {
    id: "order-1",
    customer_name: "John Smith",
    customer_email: "john@example.com",
    status: "delivered" as const,
    total_amount: 89.99,
    created_at: "2024-01-15T10:30:00Z",
    items: [
      { name: "Organic Coffee Beans", quantity: 2, price: 24.99 },
      { name: "Artisan Bread", quantity: 1, price: 12.5 },
      { name: "Local Honey", quantity: 1, price: 18.0 },
    ],
  },
  {
    id: "order-2",
    customer_name: "Sarah Johnson",
    customer_email: "sarah@example.com",
    status: "preparing" as const,
    total_amount: 156.75,
    created_at: "2024-01-14T14:20:00Z",
    items: [
      { name: "Handmade Soap Set", quantity: 3, price: 35.0 },
      { name: "Organic Vegetables", quantity: 1, price: 28.25 },
      { name: "Fresh Flowers", quantity: 2, price: 22.5 },
    ],
  },
  {
    id: "order-3",
    customer_name: "Mike Wilson",
    customer_email: "mike@example.com",
    status: "confirmed" as const,
    total_amount: 67.5,
    created_at: "2024-01-13T09:15:00Z",
    items: [
      { name: "Local Cheese", quantity: 2, price: 18.75 },
      { name: "Craft Beer", quantity: 4, price: 12.5 },
    ],
  },
]

export const demoProducts = [
  {
    id: "prod-1",
    name: "Organic Coffee Beans",
    price: 24.99,
    inventory_count: 45,
    category: "Food & Beverage",
    is_active: true,
  },
  {
    id: "prod-2",
    name: "Handmade Soap Set",
    price: 35.0,
    inventory_count: 23,
    category: "Health & Beauty",
    is_active: true,
  },
  {
    id: "prod-3",
    name: "Artisan Bread",
    price: 12.5,
    inventory_count: 8,
    category: "Food & Beverage",
    is_active: true,
  },
  {
    id: "prod-4",
    name: "Local Honey",
    price: 18.0,
    inventory_count: 67,
    category: "Food & Beverage",
    is_active: true,
  },
]

export const demoStats = {
  totalRevenue: 2847.5,
  totalOrders: 156,
  activeProducts: 24,
  pendingOrders: 8,
}
