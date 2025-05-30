import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Sections/Roots/Footer'

const ProjectDisplay = () => {
  return (
    <div><Outlet/>
    <Footer/>
    </div>
  )
}

export default ProjectDisplay