import React from 'react'
import { Link } from 'react-router-dom'

const NewArrival = () => {
  return (
    <div>
         <div
    style={{
        background:'aliceblue',
        height:'100vh',
        textAlign:'center',
        paddingTop:'70px',
        fontSize:'2rem',
        fontFamily:'arial'

    }} 
    >
        No New Arrival  
        <div>
           <Link to='/'> <button style={{padding:'10px 50px',
                 fontSize:'0.8rem',
                  background:'blue',
                   color:'white',
                   border:'none'
                   }}>back</button></Link>
        </div>
        </div>
    </div>
  )
}

export default NewArrival