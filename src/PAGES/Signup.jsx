import { FaLock } from 'react-icons/fa'
import '../COMPONENTS/Signup.css'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="signup">
    <motion.div className='signup-box'
    initial={{opacity:0, y: 50}}
     animate={{opacity:1, y:0}}
      transition={{delay:0.5,type:"spring", stiffness:25 }}
    >
      <h1> <span>V</span>FashionHome </h1>
      <br />
      <p>Name </p>
      <input type="text" placeholder='enter name'/>
      <br />
      <p>Email</p> 
      <input type="text" placeholder='enter email'/>
      <br />
      <p>Phone Number</p> 
      <input type="text" placeholder='enter phone number'/>
      <br />
      <p>Password</p> 
      <input type="number" placeholder='enter password'/>
      <br />
      <p>State</p> 
      <input type="text" placeholder='enter State'/>
      <br />
      <p>Country</p> 
      <input type="text" placeholder='enter Country'/>
      <br />
      <Button>SIGN UP</Button>
      <br />
      <Link to='/Login'>Back to login</Link>
    </motion.div>
    </div>
  )
}

export default Login