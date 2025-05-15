import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

const Rootdir = () => {
  return (
    <div>
      <div className="flex w-full min-h-screen">
        <div className="w-[20%] min-h-screen">
        <Sidebar/></div>
        <div className="w-full">
        <Outlet/></div>
      </div>
    </div>
  )
}

export default Rootdir