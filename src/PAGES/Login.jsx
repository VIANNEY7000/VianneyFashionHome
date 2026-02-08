import { FaLock } from 'react-icons/fa'
import '../COMPONENTS/Login.css'
import { Button, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

const navigate = useNavigate()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState()

const payload = {email, password}

const handleLogin = async () => {
  setLoading(true)
  setError('')
  try {
    const res = await
    axios.post(`${import.meta.env.VITE_PRODUCT_API}/api/users/login`, payload)
    console.log(res)
    navigate('/Menshop')
    
  } catch (error) {
    console.error(error)
    setError(error?.response?.data?.message)

  }finally{setLoading(false)}
  []}

  return (
    <>
    <div className="login">
    <motion.div className='login-box'
    initial={{opacity:0, y: 50}}
     animate={{opacity:1, y:0}}
      transition={{delay:0.5,type:"spring", stiffness:25 }}
    >
      <h1> <span>V</span>FashionHome </h1>
      <FaLock size={40} className='lock'/>
      <h3>{error ? error : "LOGIN"}</h3>
      <br />

        <form onSubmit={(e) => e.preventDefault()}>

          <input type="text" placeholder='Email'
          value={email} onChange={(e) => setEmail(e.target.value)}/>
          <br /><br />
          <input type="text" placeholder='Password'
          value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button onClick={handleLogin}>{loading ? <CircularProgress size={20} color='white'/> : "LOGIN"}</Button>

        </form>

      <p>i don't have an account? <Link to='/Signup'>Sign up</Link></p>
          <Link to='/' className='home-link'>Back to home</Link>      
    </motion.div>
    </div>
    </>
  )
}

export default Login