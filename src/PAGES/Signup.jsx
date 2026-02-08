import '../COMPONENTS/Signup.css'
import { Button, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Signup = () => {

  const navigate = useNavigate()
  const [name, setName] = useState ('')
  const [email, setEmail ] = useState ('')
  const [phoneNumber, setPhoneNumber ] = useState ('')
  const [password, setPassword ] = useState ('')
  const [state, setState ] = useState ('')
  const [country, setCountry] = useState ('')
  const [loading, setLoading] = useState (false)
  const [error, setError] = useState()
  const payload = {name, email, phoneNumber, password, state, country}

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await
      axios.post("https://backend-api-0y7h.onrender.com/api/users/register", payload)
        console.log(data)
        navigate('/Login')
      
    } catch (error) {
      console.error(error)
      setError(error)
    }finally{
      setLoading(false)
    }

  }


  return (
    <div className="signup">
    <motion.div className='signup-box'
    initial={{opacity:0, y: 50}}
     animate={{opacity:1, y:0}}
      transition={{delay:0.5,type:"spring", stiffness:25 }}
    >
      <h1> <span>V</span>FashionHome </h1>
      <br />
      <h2>{error ? error : "Signup"}</h2>

      <form onSubmit={(e) => {e.preventDefault(); handleSignup();}}>
      <p>Name </p>
          <input type="text" placeholder='enter name'
            value={name}
          onChange={(e) => setName(e.target.value)}/>
          <br />

          <p>Email</p> 
          <input type="text" placeholder='enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <br />

          <p>Phone Number</p> 
          <input type="number" placeholder='enter phone number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}/>
          <br />

          <p>Password</p> 
          <input type="password" placeholder='enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <br />

          <p>State</p> 
          <input type="text" placeholder='enter State'
          value={state}
          onChange={(e) => setState(e.target.value)}/>
          <br />
          <p>country</p> 
          <input type="text" placeholder='enter Country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}/>
          <br />

          <Button type='submit' disabled={loading} >{ loading ? <CircularProgress size={20}/> : "SIGNUP"}</Button>
          <br />
      </form>
      <Link to='/Login'>Back to login</Link>
    </motion.div>
    </div>
  )
}

export default Signup