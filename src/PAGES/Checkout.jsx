import React, { useContext, useState } from 'react'
import { CartContext } from '../CONTEXT/CartContext'
import { Link } from 'react-router-dom'
import './Checkout.css'

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria'
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      alert("Your cart is empty")
      return
    }

    setLoading(true)

    try {
      const cleanCartItems = cartItems.map((item) => ({
        productId: item._id || item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      }))

      const payload = {
        email: formData.email,
        amount: Math.round(totalPrice * 100),
        metadata: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          totalPrice,
          items: cleanCartItems
        }
      }

      console.log("Sending payment:", payload)

      const response = await fetch("https://vfhome-backend2-3.onrender.com/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const text = await response.text()

      let data
      try {
        data = JSON.parse(text)
      } catch (error) {
        console.error("Server returned non-JSON response:", text)
        throw new Error("Server did not return valid JSON")
      }

      if (data.success) {
        window.location.href = data.authorization_url
      } else {
        alert(data.message || "Failed to initialize payment")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong while initializing payment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="empty-checkout">
          <h2>No items in cart</h2>
          <Link to="/shop">Go Shopping</Link>
        </div>
      ) : (
        <div className="checkout-container">
          <form className="checkout-form" onSubmit={handlePayment}>
            <h2>Customer Information</h2>

            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

            <h2>Delivery Information</h2>

            <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? "Redirecting..." : "Pay Now"}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div className="summary-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>₦{item.price}</p>
                </div>
              </div>
            ))}

            <div className="summary-total">
              <h2>Total: ₦{totalPrice.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout