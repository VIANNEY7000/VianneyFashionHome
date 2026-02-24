import React , {useEffect, useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import './Menshop.css'

const Menshop = () => {
  const [data, setData] = useState([])
  
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const filteredProducts = data.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase())

  const matchesCategory =
    category === "all" || product.category === category

  return matchesSearch && matchesCategory
})

    //Fetch all products
    useEffect(() => {
      axios.get("https://backend-api-0y7h.onrender.com/api/products")
      .then((res) => {
        setData(res.data.Products)
        console.log(res.data.Products)

      }).catch((error) => {
         console.error (error?.response?.data?.message || "Request failed")
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
        <div key ={info._id}>
            
          <div className='menshop-container'>

            <div className="shop-box">    
                <div>
                  <img src={info.image} className="shop-img"/>
                </div>

                <div >
                  <h3>{info.name}</h3>
                </div>

                 <p>{info.discription}</p>
              
                <h2>${info.price}</h2>
                <Button>Add to Cart</Button>
               
          </div>
           
          </div>

        </div>
      ))}
    </div>
     </div>
  )
}

export default Menshop