import React from 'react'
import Navbar from '../COMPONENTS/Navbar'
import Hero from '../COMPONENTS/Hero'
import Footer from '../COMPONENTS/Footer'
import FeaturedCategories from '../COMPONENTS/FeaturedCategories'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <FeaturedCategories/>
        <Footer/>
    </div>
  )
}

export default Home