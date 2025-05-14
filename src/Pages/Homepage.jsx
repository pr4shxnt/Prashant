import Home from '../Components/Home'
import React from 'react'
import HomeResponsive from '../Components/HomeResponsive'

const Homepage = () => {
  return (
    <div>
      <div className="md:hidden"><HomeResponsive/></div>
      <div className="hidden md:block"><Home/></div>
    </div>
  )
}

export default Homepage