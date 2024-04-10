import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { SiBitcoinsv } from "react-icons/si";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav">
        <div className="left">
          <span className="name_icon">CRYPTO</span>
          <span className='icons_nav'><SiBitcoinsv /></span>
        </div>
        <div className="right">
          <span className='right_sec'><NavLink style={{textDecoration:"none",color:"white"}} to="./home">Home</NavLink></span>
          <span className='right_sec'><NavLink style={{textDecoration:"none",color:"white"}} to="./collection">Collection's</NavLink></span>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar
