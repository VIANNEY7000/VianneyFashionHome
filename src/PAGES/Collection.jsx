import React from 'react'
import { Link } from 'react-router-dom'

const Collection = () => {
  return (
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
        Collections Coming Soon 
        <div>
           <Link to='/'> <button style={{padding:'10px 50px',
                 fontSize:'0.8rem',
                  background:'blue',
                   color:'white',
                   border:'none'
                   }}>back</button></Link>
        </div>
        </div>
  )
}

export default Collection