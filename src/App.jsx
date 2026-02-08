import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './PAGES/Home'
import Login from './PAGES/Login'
import Signup from './PAGES/Signup'
import Menshop from './COMPONENTS/Menshop'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}  />
    <Route path='/Login' element={<Login/>}  />
    <Route path='/Signup' element={<Signup/>}  />
    <Route path='/Menshop' element={<Menshop/>}  />

   </Routes>
   </>
  )
}

export default App