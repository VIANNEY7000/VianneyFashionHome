import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../STYLES/CustomerWishlist.css'

const API = import.meta.env.VITE_PRODUCT_API || "https://vfhome-backend2-3.onrender.com";

const CustomerWishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removingId, setRemovingId] = useState('')
  const navigate = useNavigate()

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      navigate('/login')
      return
    }

    try {
      setLoading(true)
      const res = await axios.get(`${API}/api/auth/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setWishlist(res.data.wishlist || [])
      setError('')
    } catch (err) {
      console.error(err?.response?.data || err.message)
      setError('Failed to fetch wishlist')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const handleRemove = async (productId) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      setRemovingId(productId)
      await axios.delete(`${API}/api/auth/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setWishlist((prev) => prev.filter((item) => item._id !== productId))
    } catch (err) {
      console.error(err?.response?.data || err.message)
      alert('Failed to remove item from wishlist')
    } finally {
      setRemovingId('')
    }
  }

  if (loading) return <h2 className="wishlist-state">Loading wishlist...</h2>
  if (error) return <h2 className="wishlist-state error">{error}</h2>

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <span className="wishlist-badge">Saved Favorites</span>
        <h1>My Wishlist</h1>
        <p>Keep track of the pieces you love and come back to them anytime.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart icon in the shop to save products here.</p>
          <Link to="/customer/shop" className="wishlist-link">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item._id}>
              <Link to={`/product/${item._id}`} className="wishlist-image-link">
                <div className="wishlist-image-wrap">
                  <img src={item.image} alt={item.name} className="wishlist-image" />
                </div>
              </Link>

              <div className="wishlist-card-body">
                <h3>{item.name}</h3>
                <p>
                  {item.description?.length > 80
                    ? `${item.description.slice(0, 80)}...`
                    : item.description}
                </p>
                <h4>N{item.price}</h4>
              </div>

              <div className="wishlist-actions">
                <Link to={`/product/${item._id}`} className="wishlist-view-btn">
                  View Product
                </Link>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => handleRemove(item._id)}
                  disabled={removingId === item._id}
                >
                  {removingId === item._id ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomerWishlist
