import { Home } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NoDirectory = () => {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-white'>
        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhkMDhydjg0dXBka2M5YmZoaTh4bnZqY2ZwbmxuNmt2dDF4b3l2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VwoJkTfZAUBSU/giphy.gif" alt="" className="" />
        <NavLink className={``} to={`/`} title='Return to Home.'><Home size={40} stroke='black'/></NavLink>
    </div>
  )
}

export default NoDirectory