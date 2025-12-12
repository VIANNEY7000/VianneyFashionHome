import { FaLock } from 'react-icons/fa'
import '../COMPONENTS/Login.css'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Login = () => {
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
      <br />
      <input type="text" placeholder='Email'/>
      <br /><br />
      <input type="text" placeholder='Password'/>
      <br />
      <Button>LOGIN</Button>
      <p>i don't have an account? <Link to='/Signup'>Sign up</Link></p>
          <Link to='/' className='home-link'>Back to home</Link>      
    </motion.div>
    </div>
    </>
  )
}

export default Login