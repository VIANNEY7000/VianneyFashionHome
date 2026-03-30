import React, { useContext, useState } from 'react'
import { CartContext } from '../CONTEXT/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { PaystackButton } from 'react-paystack'
import './Checkout.css'

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria'
  })

  const publicKey = "YOUR_PAYSTACK_PUBLIC_KEY" 

  const amount = totalPrice * 100 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const saveOrderToBackend = async (reference) => {
    try {
      const orderData = {
        ...formData,
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity
        })),
        totalPrice,
        paymentStatus: "Paid",
        paymentReference: reference.reference
      }

      const response = await fetch("https://vfhome-backend2-3.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()

      if (data.success) {
        alert("Payment successful! Order placed successfully.")
        clearCart()
        navigate('/shop')
      } else {
        alert(data.message || "Failed to save order")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong while saving order")
    }
  }

  const componentProps = {
    email: formData.email,
    amount: amount,
    metadata: {
      name: formData.fullName,
      phone: formData.phone
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
      saveOrderToBackend(reference)
    },
    onClose: () => alert("Payment window closed")
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
          {/* LEFT SIDE - FORM */}
          <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Customer Information</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <h2>Delivery Information</h2>

            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />

            <PaystackButton className="place-order-btn" {...componentProps} />
          </form>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div className="summary-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>${item.price} each</p>
                </div>
              </div>
            ))}

            <div className="summary-total">
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout