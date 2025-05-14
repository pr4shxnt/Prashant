import Home from '../Components/Home'
import React, { use } from 'react'
import HomeResponsive from '../Components/HomeResponsive'
import HomeMD from '../Components/HomeMD'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContent } from '../Utils/ContextProvider'
import { NavLink } from 'react-router-dom'
import { YoutubeIcon } from 'lucide-react'

const Homepage = () => {
    
useGSAP(() => {
    gsap.to(".para", {
      rotate: 0,
      left: "12px",
      duration: 2,
      delay: -0.007,
      ease: "Expo.easeInOut",
    });


  })




  return (
    <div>
      <div className="relative overflow-hidden">
        <a target='_blank' href="https://www.youtube.com/@lynxplays6702" className=""><div className="roadrage text-white flex flex-col font-roadrage text-xl absolute left-4 top-6 z-[999]"><h1 className='relative'><div className="absolute font-mono -top-[18px] rotate-[70deg]">:)</div><span className="text-[brown]">L</span>YN<span className='text-[brown]'>X</span></h1></div>
</a>
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
           <div className="para absolute bottom-30 text-sm z-[999] text-gray-300 w-[25%] flex flex-col  gap-4 -left-200">
            <p>Hi!! I am Prashant. Nice to meet you folk!! If you have been here maybe it's because we both share same kind of passion. I'm deeply interested in new and updating technologies. But recently, I've been actively improving my skills of website development. Join me through the links given in this website and hope to build something great together.</p>
            <p>Feel free to contact me from the links given in the bottom-right of the screen or from the contact form below.</p>
           </div>

          <div className="absolute links pb-2 bottom-0 left-0 flex  items-center z-[200] px-3 py-1 gap-3 font-semibold text-[white]">
            <NavLink to={`/about`} className="group flex flex-col rounded-full">About
            <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
            <NavLink to={`/projects`} className="group flex flex-col rounded-full">Projects
            <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
            <NavLink to={`/about`} className="group flex flex-col rounded-full">CV 
            <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage