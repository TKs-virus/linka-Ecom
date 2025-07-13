"use client"

import type React from "react"
import { useState } from "react"

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "creditCard",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process the form data here (e.g., send to server)
    console.log("Form Data:", formData)
    alert("Checkout submitted!")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
            Zip Code:
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Checkout
        </button>
      </form>
      <div>
        <p>Price: ZMW100</p>
      </div>
    </div>
  )
}

export default CheckoutPage
