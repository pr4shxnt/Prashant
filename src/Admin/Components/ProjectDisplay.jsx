import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Sections/Roots/Footer'
import MenuBar from '../../Components/MenuBar'

const ProjectDisplay = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (

    <div>
       <div className="fixed bottom-2 left-2 z-[10000] ">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default ProjectDisplay