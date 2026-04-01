import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../CONTEXT/CartContext'
import './PaymentSuccess.css'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get("reference")
  const { cartItems, totalPrice, clearCart } = useContext(CartContext)
  const [message, setMessage] = useState("Verifying payment...")
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAndSaveOrder = async () => {
      try {
        const verifyRes = await fetch(`https://vfhome-backend2-3.onrender.com/api/paystack/verify/${reference}`)
        const verifyData = await verifyRes.json()

        if (verifyData.success && verifyData.data.status === "success") {
          setMessage("Payment successful!")

          clearCart()
        } else {
          setMessage("Payment verification failed")
        }
      } catch (error) {
        console.error(error)
        setMessage("Something went wrong")
      }
    }

    if (reference) {
      verifyAndSaveOrder()
    }
  }, [reference, clearCart])

  return (
    <div style={{ padding: "60px", textAlign: "center" }} className='payment_success'>
      <h1>{message}</h1>
      <p>Reference: {reference}</p>
      <Link to="/shop">
        <button style={{ padding: "12px 24px", marginTop: "20px" }}>
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}

export default PaymentSuccess