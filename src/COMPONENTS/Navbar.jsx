import { useState } from "react";
import {Button} from '@mui/material'
import {FiMenu} from 'react-icons/fi'
import "./Navbar.css";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
       <span>V</span>FashionHome
      </div>


      {/* MENUES */}
      <div className="menue">
       <ul>
          <li>MEN</li>
          <li>WOMEN</li>
          
          
          <Button>LOGIN</Button>
       </ul>
      </div>

      {/* MENUE HAM */}
      <div className="hambugger" onClick={() => setOpen(!open)}>
        
       <FiMenu size={30} />
      </div>


      {/* HAM MENUE */}
      <div className={`ham-menue ${ open ? "show" : ""}`}>
        <ul onClick={() => setOpen(false)}>
          <li>MEN</li>
          <li>WOMEN</li>
           <Button>LOGIN</Button>
        </ul>
      </div>

    </nav>

    
  );
}

export default App;