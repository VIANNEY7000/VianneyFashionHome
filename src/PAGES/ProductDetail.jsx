import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import './ProductDetail.css'
import { CartContext } from '../CONTEXT/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    window.scrollTo(0, 0)

    axios.get(`https://vfhome-backend2-3.onrender.com/api/products/${id}`)
      .then((res) => {
        console.log(res.data)
        setProduct(res.data.product || res.data.Product || res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || "Request failed")
        setError("Failed to load product details")
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    alert(`${product.name} added to cart`)
  }

  if (loading) return <h2 style={{ padding: "40px" }}>Loading product...</h2>
  if (error) return <h2 style={{ padding: "40px" }}>{error}</h2>
  if (!product) return <h2 style={{ padding: "40px" }}>Product not found</h2>

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p>{product.discription}</p>

          <div className="product-detail-buttons">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <Link to="/cart">
              <button className="go-cart-btn">View Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail