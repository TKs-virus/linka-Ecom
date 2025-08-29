export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: "CUSTOMER" | "RETAILER" | "DELIVERY"
          avatar_url: string | null
          email_verified: boolean
          verification_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: "CUSTOMER" | "RETAILER" | "DELIVERY"
          avatar_url?: string | null
          email_verified?: boolean
          verification_token?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: "CUSTOMER" | "RETAILER" | "DELIVERY"
          avatar_url?: string | null
          email_verified?: boolean
          verification_token?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      retailers: {
        Row: {
          id: string
          user_id: string
          business_name: string
          business_description: string | null
          business_address: string | null
          business_phone: string | null
          business_email: string | null
          company_name: string | null
          industry_type: string | null
          store_location: string | null
          logo_url: string | null
          is_verified: boolean
          inventory_file_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          business_description?: string | null
          business_address?: string | null
          business_phone?: string | null
          business_email?: string | null
          company_name?: string | null
          industry_type?: string | null
          store_location?: string | null
          logo_url?: string | null
          is_verified?: boolean
          inventory_file_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          business_description?: string | null
          business_address?: string | null
          business_phone?: string | null
          business_email?: string | null
          company_name?: string | null
          industry_type?: string | null
          store_location?: string | null
          logo_url?: string | null
          is_verified?: boolean
          inventory_file_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          retailer_id: string
          name: string
          description: string | null
          price: number
          compare_at_price: number | null
          category: string
          subcategory: string | null
          images: string[]
          inventory_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          retailer_id: string
          name: string
          description?: string | null
          price: number
          compare_at_price?: number | null
          category: string
          subcategory?: string | null
          images?: string[]
          inventory_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          retailer_id?: string
          name?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          category?: string
          subcategory?: string | null
          images?: string[]
          inventory_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      promotions: {
        Row: {
          id: string
          retailer_id: string
          name: string
          description: string | null
          type: "percentage" | "fixed_amount" | "free_shipping"
          value: number
          coupon_code: string | null
          start_date: string
          end_date: string
          status: "active" | "scheduled" | "expired" | "draft"
          applicable_to: "all_products" | "specific_products" | "specific_categories"
          product_ids: string[] | null
          category_ids: string[] | null
          usage_limit: number | null
          times_used: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          retailer_id: string
          name: string
          description?: string | null
          type: "percentage" | "fixed_amount" | "free_shipping"
          value: number
          coupon_code?: string | null
          start_date: string
          end_date: string
          status?: "active" | "scheduled" | "expired" | "draft"
          applicable_to: "all_products" | "specific_products" | "specific_categories"
          product_ids?: string[] | null
          category_ids?: string[] | null
          usage_limit?: number | null
          times_used?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          retailer_id?: string
          name?: string
          description?: string | null
          type?: "percentage" | "fixed_amount" | "free_shipping"
          value?: number
          coupon_code?: string | null
          start_date?: string
          end_date?: string
          status?: "active" | "scheduled" | "expired" | "draft"
          applicable_to?: "all_products" | "specific_products" | "specific_categories"
          product_ids?: string[] | null
          category_ids?: string[] | null
          usage_limit?: number | null
          times_used?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          retailer_id: string
          status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
          total_amount: number
          delivery_fee: number
          tax_amount: number
          discount_amount: number
          delivery_address: Json
          payment_method: string
          payment_status: "pending" | "paid" | "failed" | "refunded"
          notes: string | null
          estimated_delivery: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          retailer_id: string
          status?: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
          total_amount: number
          delivery_fee?: number
          tax_amount?: number
          discount_amount?: number
          delivery_address: Json
          payment_method: string
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          notes?: string | null
          estimated_delivery?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          retailer_id?: string
          status?: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
          total_amount?: number
          delivery_fee?: number
          tax_amount?: number
          discount_amount?: number
          delivery_address?: Json
          payment_method?: string
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          notes?: string | null
          estimated_delivery?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
