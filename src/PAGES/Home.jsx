import React from 'react'
import Navbar from '../COMPONENTS/Navbar'
import Hero from '../COMPONENTS/Hero'
import Footer from '../COMPONENTS/Footer'
import FeaturedCategories from '../COMPONENTS/FeaturedCategories'
import Card2 from '../COMPONENTS/Card2'
import Card3 from '../COMPONENTS/Card3'
import Card4 from '../COMPONENTS/Card4'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <FeaturedCategories/>
        <Card2/>
        <Card3/>
        <Card4/>
        <Footer/>
    </div>
  )
}

export default Home