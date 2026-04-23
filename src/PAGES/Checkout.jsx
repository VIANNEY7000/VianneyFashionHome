import React, { useContext, useState } from 'react'
import { CartContext } from '../CONTEXT/CartContext'
import { Link } from 'react-router-dom'
import './Checkout.css'

const API = import.meta.env.VITE_PRODUCT_API || "https://vfhome-backend2-3.onrender.com";

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
      const cleanCartItems = cartItems.map((item) => {
        const product = item.productId

        return {
          productId: product?._id || product,
          name: product?.name,
          price: product?.price,
          image: product?.image,
          quantity: item.quantity
        }
      })

      const payload = {
        email: formData.email,
        amount: Math.round(totalPrice * 100),
        metadata: {
          userId: localStorage.getItem("userId"),
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          totalPrice,
          items: cleanCartItems
        }
      }

      const response = await fetch(`${API}/api/paystack/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

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
          <Link to="/customer/shop">Go Shopping</Link>
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

            {cartItems.map((item) => {
              const product = item.productId

              if (!product) return null

              return (
                <div className="summary-item" key={product._id}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p>N{product.price}</p>
                  </div>
                </div>
              )
            })}

            <div className="summary-total">
              <h2>Total: N{totalPrice.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
