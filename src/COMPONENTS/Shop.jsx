import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import './Shop.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { CartContext } from '../CONTEXT/CartContext';

const API = import.meta.env.VITE_PRODUCT_API || "https://vfhome-backend2-3.onrender.com";

const Shop = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [wishlistIds, setWishlistIds] = useState([])
  const [wishlistLoadingId, setWishlistLoadingId] = useState("")

  const { addToCart, cartCount, cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const isInCart = (id) => {
    return cartItems.some((item) => {
      const pid = item.productId?._id || item.productId
      return pid === id
    })
  }

  const isInWishlist = (id) => wishlistIds.includes(id)

  const filteredProducts = data.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === "all" ||
      product.category?.toLowerCase() === category.toLowerCase()

    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    setLoading(true)

    axios.get(`${API}/api/products`)
      .then((res) => {
        setData(res.data.products || [])
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || "Request failed")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token")
      const role = localStorage.getItem("role")

      if (!token || role?.toLowerCase() !== "customer") {
        setWishlistIds([])
        return
      }

      try {
        const res = await axios.get(`${API}/api/auth/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const wishlist = res.data.wishlist || []
        setWishlistIds(wishlist.map((item) => item._id))
      } catch (error) {
        console.error(error?.response?.data?.message || "Failed to fetch wishlist")
      }
    }

    fetchWishlist()
  }, [])

  const handleWishlistToggle = async (productId) => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role?.toLowerCase() !== "customer") {
      alert("Please log in as a customer to use wishlist.")
      navigate('/login')
      return
    }

    try {
      setWishlistLoadingId(productId)

      if (isInWishlist(productId)) {
        await axios.delete(`${API}/api/auth/wishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setWishlistIds((prev) => prev.filter((id) => id !== productId))
      } else {
        await axios.post(
          `${API}/api/auth/wishlist`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setWishlistIds((prev) => [...prev, productId])
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Wishlist action failed")
      alert(error?.response?.data?.message || "Wishlist action failed")
    } finally {
      setWishlistLoadingId("")
    }
  }

  if (loading) {
    return (
      <div className="shop-loading">
        <div className="loader">Loading Shop...</div>
      </div>
    )
  }

  return (
    <div className="menshop_body">
      <div className="shop-controls">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/cart" style={{ position: "relative", color: "black" }}>
          <MdOutlineShoppingBag style={{ fontSize: "30px" }} />
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "blue",
              color: "white",
              borderRadius: "50%",
              padding: "2px 8px",
              fontSize: "12px"
            }}
          >
            {cartCount}
          </span>
        </Link>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="menshop">
        {filteredProducts?.map((info) => (
          <div key={info._id} className="menshop-container">
            <div className="shop-box">
              <button
                type="button"
                className={`wishlist-btn ${isInWishlist(info._id) ? "active" : ""}`}
                onClick={() => handleWishlistToggle(info._id)}
                disabled={wishlistLoadingId === info._id}
                aria-label="Toggle wishlist"
              >
                <FiHeart />
              </button>

              <Link
                to={`/product/${info._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="shop-image-wrapper">
                  <img src={info.image} alt={info.name} className="shop-img" />
                </div>

                <div className="shop-text">
                  <h4 className="product-title">{info.name}</h4>

                  <p className="product-desc">
                    {info.description?.length > 60
                      ? `${info.description.slice(0, 60)}...`
                      : info.description}
                  </p>

                  <h4 className="product-price">N{info.price}</h4>
                </div>
              </Link>

              <div className="shop-actions">
                <Button
                  className="add-cart-btn"
                  onClick={() => addToCart(info._id)}
                  disabled={isInCart(info._id)}
                >
                  {isInCart(info._id) ? "Added to Cart" : "ADD TO CART"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
