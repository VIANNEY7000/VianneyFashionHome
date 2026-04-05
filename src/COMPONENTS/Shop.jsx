import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import './Shop.css'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingBag } from "react-icons/md";
import { CartContext } from '../CONTEXT/CartContext';

const Shop = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const { addToCart, cartCount } = useContext(CartContext)

  const filteredProducts = data.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === "all" || product.category === category

    return matchesSearch && matchesCategory
  })

  // Fetch all products
  useEffect(() => {
    axios.get("https://vfhome-backend2-3.onrender.com/api/products")
      .then((res) => {
        setData(res.data.products || [])
        console.log(res.data.products)  
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || "Request failed")
      })
  }, [])

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
          <div key={info._id}>
            <div className='menshop-container'>
              <div className="shop-box">
                <Link to={`/product/${info._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div>
                    <img src={info.image} alt={info.name} className="shop-img" />
                  </div>
                  <div>
                    <h2>{info.name}</h2>
                  </div>
                  <p>{info.discription}</p>
                  <h2>${info.price}</h2>
                </Link>

                <Button onClick={() => addToCart(info)}>Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop