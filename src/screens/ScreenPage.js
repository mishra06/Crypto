import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ScreenPage = () => {
  return (
    <div className='screenPage'>
        <div className="pages"><Navbar/></div>
        <div className="outlet"><Outlet/></div>
    </div>
  )
}

export default ScreenPage
