"use client"

const CheckoutPage = () => {
  // Dummy data for demonstration
  const cartItems = [
    { id: 1, name: "Product A", price: 25, quantity: 2 },
    { id: 2, name: "Product B", price: 50, quantity: 1 },
  ]

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const total = calculateTotal()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart Items */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center py-2 border-b">
              <span>
                {item.name} ({item.quantity})
              </span>
              <span>ZMW{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">ZMW{total}</span>
        </div>
      </div>

      {/* Checkout Form (Placeholder) */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Address"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
