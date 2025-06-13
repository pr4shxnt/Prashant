import React, { useEffect, useState } from 'react'
import PersonalInformation from '../Components/ResumePage/PersonalInformation'
import ExperienceBlock from '../Components/ResumePage/ExperienceBlock'
import ProjectsBlock from '../Components/ResumePage/ProjectsBlock'
import EducationBlock from '../Components/ResumePage/EducationBlock'
import CertificateBlock from '../Components/ResumePage/CertificateBlock'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "../Components/ResumePage/ResumeViewerNavLink.css"
import { Home } from 'lucide-react'
import MenuBar from '../Components/MenuBar'

const ResumeViewer = () => {
    const [isScrolled, setIsScrolled] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

     useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);


      console.log(isScrolled);
      
      const {pathname} = useLocation();
      const navigate = useNavigate();

      useEffect(()=>{
        if (pathname === "/curriculum-vitae"){
            navigate("/curriculum-vitae/overview")
        }
      })
    
  return (
    <div>
          <div className="fixed bottom-2 left-2 z-[10000] ">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
        <div className="">
        <nav className={`fixed  left-1/2 transform -translate-x-1/2  py-6 w-[95%] md:w-[45%] h-10 ${isScrolled > 40 ? " top-3" : " top-7"} transition-all duration-100 ease-in-out bg-white   rounded-full  shadow-2xl shadow-black`}>
        <div className={` flex items-center h-full justify-between px-5 text-charcoal `}>
         <div className="damndumn flex items-center gap-6">
          <NavLink  className='group' to="/curriculum-vitae/overview">Overview <div className="w-0 underl group-hover:w-full h-[1.7px]   rounded-2xl transition-all ease-in-out duration-300 bg-beige "></div> </NavLink>
          <NavLink className='group' to="/curriculum-vitae/experience">Experience <div className="w-0 underl group-hover:w-full h-[1.7px]   rounded-2xl transition-all ease-in-out duration-300 bg-beige "></div> </NavLink>
          <NavLink className='group' to="/curriculum-vitae/education">Education <div className="w-0 group-hover:w-full h-[1.7px] underl  rounded-2xl transition-all ease-in-out duration-300 bg-beige "></div> </NavLink>
          <NavLink className='group hidden md:block' to="/projects">Projects <div className="w-0 group-hover:w-full h-[1.7px] underl  rounded-2xl transition-all ease-in-out duration-300 bg-beige "></div> </NavLink>
          <NavLink className='group' to="/curriculum-vitae/certificates">Certificates <div className="w-0 group-hover:w-full h-[1.7px] underl  rounded-2xl transition-all ease-in-out duration-300 bg-beige "></div> </NavLink>
        </div>
          <div className="hidden md:block">
            <NavLink>
                <Home size={20}/>
            </NavLink>
          </div>
          </div>
        </nav>
        <div className="md:w-[45%] w-[90%] mx-auto pt-40">
        <Outlet/></div>
        </div>
    </div>
  )
}

export default ResumeViewer