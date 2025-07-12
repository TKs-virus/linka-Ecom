// Simple demo data so unauthenticated visitors can preview the dashboard.
// Numbers are intentionally small for quick comprehension.

import type { Order } from "@/app/actions/order-actions"

// Five recent orders
export const demoOrders: Order[] = [
  {
    id: "demo-ord-01",
    customer_id: "demo-cust-01",
    retailer_id: "demo-ret-01",
    status: "delivered",
    total_amount: 520,
    delivery_fee: 25,
    tax_amount: 65,
    discount_amount: 0,
    delivery_address: {},
    payment_method: "card",
    payment_status: "paid",
    notes: "",
    estimated_delivery: "",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    order_items: [],
  },
  {
    id: "demo-ord-02",
    customer_id: "demo-cust-02",
    retailer_id: "demo-ret-01",
    status: "pending",
    total_amount: 310,
    delivery_fee: 25,
    tax_amount: 43.5,
    discount_amount: 0,
    delivery_address: {},
    payment_method: "card",
    payment_status: "pending",
    notes: "",
    estimated_delivery: "",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    order_items: [],
  },
  {
    id: "demo-ord-03",
    customer_id: "demo-cust-03",
    retailer_id: "demo-ret-01",
    status: "confirmed",
    total_amount: 880,
    delivery_fee: 25,
    tax_amount: 132,
    discount_amount: 0,
    delivery_address: {},
    payment_method: "mobile-money",
    payment_status: "paid",
    notes: "",
    estimated_delivery: "",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    order_items: [],
  },
]

// Three currently-running promotions
export const demoPromotions = [
  { id: "promo-01", status: "active" },
  { id: "promo-02", status: "active" },
  { id: "promo-03", status: "draft" },
]

// Eight products in catalogue
export const demoProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: `prod-0${i + 1}`,
}))
