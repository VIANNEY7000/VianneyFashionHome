import React , {useEffect, useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import './Menshop.css'

const Menshop = () => {
  const [data, setData] = useState([])

    //Fetch all booking
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
    <div className="menshop">
      {data?.map((info) => (
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
  )
}

export default Menshop