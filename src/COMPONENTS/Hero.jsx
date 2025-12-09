import heroimg from '../assets/VIDEOS/HeroVideo2.mp4'
import {Button} from '@mui/material'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='video-container'>
        <video className='h-video' autoPlay loop src={heroimg} ></video>
      </div>

    <div className="image-text">
      <h1>Welcome To <br /> <span>Vianney</span> Fashion Home</h1>
      <p>Discover The Beauty of Premium Fashion</p>
      <Button>SHOP NOW</Button>
    </div>
    </div>
  )
}

export default Hero