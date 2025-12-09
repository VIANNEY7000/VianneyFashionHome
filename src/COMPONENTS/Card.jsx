import { Button } from "@mui/material"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import jeanmodel from '../assets/IMAGES/girlonjeancloth.webp'
import malemodel2 from '../assets/IMAGES/malemodel2.jpg'
import { motion } from 'framer-motion'
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


              <div className="container-1">
                
                <div className="img-1">
                    <img src={malemodel2} alt="" />
               </div>

                 <div className="write-up">
                    Highlighting Quality and Confidence <Button> <FiArrowLeft/> </Button>
               </div>

            </div>
    </div>
  )
}

export default Card