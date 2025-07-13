"use client"

import { useState, useEffect } from "react"

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Retrieve cart items from local storage or context
    const storedCartItems = localStorage.getItem("cartItems")
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [])

  useEffect(() => {
    // Calculate total whenever cartItems change
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    setCartItems(updatedCartItems)
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
  }

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCartItems)
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span>{item.name}</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        +
                      </button>
                      <span className="ml-4">ZMW{item.price * item.quantity}</span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-bold">Total: ZMW{total}</div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
              {/* Shipping form or address details here */}
              <p>Shipping form will be implemented here.</p>
            </div>
          </div>

          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Place Order</button>
        </>
      )}
    </div>
  )
}

export default CheckoutPage
