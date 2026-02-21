import { Button } from "@mui/material"
import { FiArrowRight } from "react-icons/fi"
import jeanmodel from '../assets/IMAGES/girlonjeancloth.webp'
import heroimg2 from '../assets/IMAGEs/fashionimage3.avif'
import './Card.css'


const Card = () => {
  return (
    <div className='card'>

      <div className="container-1">
         <div className="write-up">
            Quality jean jaket designed to sute your style <Button> <FiArrowRight/> </Button>
         </div>

        <div className="img-1">
          <img src={jeanmodel} alt="" />
        </div>
      </div>

      <div className="hero_image_display2">
        <img src={heroimg2} alt="" />
      </div>

      <div className="image-text2">
          <h1>Style Your Dream</h1>
      </div>


             
    </div>
  )
}

export default Card