"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface CartItem {
  id: string
  title: string
  instructor: string
  price: number
  originalPrice?: number
  image: string
  category: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (course: CartItem) => void
  removeFromCart: (courseId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isInCart: (courseId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("linka-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("linka-cart", JSON.stringify(items))
  }, [items])

  const addToCart = (course: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === course.id)
      if (exists) {
        return prev // Don't add duplicates
      }
      return [...prev, course]
    })
  }

  const removeFromCart = (courseId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== courseId))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  const getTotalItems = () => {
    return items.length
  }

  const isInCart = (courseId: string) => {
    return items.some((item) => item.id === courseId)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
