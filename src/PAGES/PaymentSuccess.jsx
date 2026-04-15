import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CONTEXT/CartContext'
import './PaymentSuccess.css'

const API = import.meta.env.VITE_PRODUCT_API || 'https://vfhome-backend2-3.onrender.com'

const PaymentSuccess = () => {
  const { clearCart } = useContext(CartContext)
  const [message, setMessage] = useState("Verifying payment...")
  const hasVerified = useRef(false)

  const reference = useMemo(() => {
    const normalParams = new URLSearchParams(window.location.search)
    const normalReference = normalParams.get("reference")
    if (normalReference) return normalReference

    const hash = window.location.hash || ""
    const hashQuery = hash.includes("?") ? hash.split("?")[1] : ""
    const hashParams = new URLSearchParams(hashQuery)
    return hashParams.get("reference")
  }, [])

  useEffect(() => {
    if (!reference) {
      setMessage("Payment reference not found")
      return
    }

    if (hasVerified.current) {
      return
    }

    hasVerified.current = true

    const verifyAndSaveOrder = async () => {
      const controller = new AbortController()
      const timeout = setTimeout(() => {
        controller.abort()
      }, 20000)

      try {
        setMessage("Verifying payment...")

        const verifyRes = await fetch(
          `${API}/api/paystack/verify/${reference}`,
          { signal: controller.signal }
        )

        clearTimeout(timeout)

        if (!verifyRes.ok) {
          setMessage("Payment verification failed")
          return
        }

        const verifyData = await verifyRes.json()

        if (verifyData.success) {
          setMessage("Payment successful!")
          await clearCart()
        } else {
          setMessage("Payment verification failed")
        }
      } catch (error) {
        clearTimeout(timeout)
        console.error(error)

        if (error.name === "AbortError") {
          setMessage("Verification is taking too long. Please refresh this page in a moment.")
          return
        }

        setMessage("Something went wrong")
      }
    }

    verifyAndSaveOrder()
  }, [reference, clearCart])

  return (
    <div style={{ padding: "60px", textAlign: "center" }} className="payment_success">
      <h1>{message}</h1>
      <p>Reference: {reference || "No reference found"}</p>
      <Link to="/customer/shop">
        <button style={{ padding: "12px 24px", marginTop: "20px" }}>
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}

export default PaymentSuccess
