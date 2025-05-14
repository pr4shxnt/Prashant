import Home from '../Components/Home'
import React, { use } from 'react'
import HomeResponsive from '../Components/HomeResponsive'
import HomeMD from '../Components/HomeMD'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContent } from '../Utils/ContextProvider'
import { NavLink } from 'react-router-dom'

const Homepage = () => {
    


  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="md:hidden"><HomeResponsive /></div>
        <div className="hidden md:block lg:hidden"><HomeMD /></div>
        <div className="hidden lg:block"><Home /></div>
        <div className="hidden md:block">
        <div className="absolute social-links  bottom-0 right-0 flex items-center z-[200] px-3 py-1">

          <a target='_blank' title='email' href="mailto:prashantadhikareeey.dev@gmail.com" className="">
            <img src="./email.png" alt="" className="w-6 m-2" />
          </a>
          <a target='_blank' title='whatsapp' href="https://wa.me/+9779742433049?text=Hello%20Prashant!" className="">
            <img src="./whatsapp.png" alt="" className="w-5 m-2" />
          </a>
          <a target='_blank' title='instagram' href="https://www.instagram.com/pr4xnt" className="">
            <img src="./instagram.png" alt="" className="w-8 m-1.5" />
          </a>
          <a target='_blank' title='github' href="https://www.github.com/pr4shxnt" className="">
            <img src="./github.png" alt="" className="w-6 m-2"/>
          </a>
           </div>
          <div className="absolute links pb-2 bottom-0 left-0 flex  items-center z-[200] px-3 py-1 gap-3 font-semibold text-white">
            <NavLink to={`/about`} className="group flex flex-col rounded-full">About
            <div className="h-0.5 group-hover:w-full bg-white rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
            <NavLink to={`/projects`} className="group flex flex-col rounded-full">Projects
            <div className="h-0.5 group-hover:w-full bg-white rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
            <NavLink to={`/about`} className="group flex flex-col rounded-full">CV 
            <div className="h-0.5 group-hover:w-full bg-white rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage