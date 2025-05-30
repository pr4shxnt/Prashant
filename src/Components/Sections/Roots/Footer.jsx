import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
    const {projects} = useSelector((state)=> state.projects)

    console.log(projects);
    
  return (
    <>
    <footer>
        <div className="relative w-full bg-black/20 flex items-center justify-center  py-28 min-h-[80vh] text-white">
            <div className="main h-full w-[85%] container mx-auto">
                <div className="flex flex-col gap-24 md:flex-row w-full  justify-between md:px-28 items-center h-full">
                    <div className="item-1 h-full">
                        <div className="image-container h-72 md:h-96">
                            <img src="https://res.cloudinary.com/drddkl4on/image/upload/v1748102698/side-avatar_tplpd0.png" alt="" className="h-full" />
                        </div>
                    </div>
                    <div className="item-2 flex gap-10">
                        <div className="flex lg:flex-row flex-col gap-10">
                            <div className="">
                                <h1 className='font-bold text-2xl'>QuickLinks</h1>
                            <ul className='font-light  pt-2 pl-2'>
                                <li className='hover:underline cursor-pointer'>Home</li>
                                <li className='hover:underline cursor-pointer'>Projects</li>
                                <li className='hover:underline cursor-pointer'>Resume</li>
                                <li className='hover:underline cursor-pointer'>Hire</li>
                            </ul>
                            </div>

                            <div className="">
                                <h1 className='font-bold text-2xl'>Redirect</h1>
                            <ul className='font-light  pt-2 pl-2'>
                                <li className='hover:underline cursor-pointer'>Instagram</li>
                                <li className='hover:underline cursor-pointer'>Github</li>
                                <li className='hover:underline cursor-pointer'>Linked-in</li>
                                <li className='hover:underline cursor-pointer'>X</li>
                            </ul>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-10">
                             <div className="">
                                <h1 className='font-bold text-2xl'>Projects</h1>
                                     <ul className='font-light  pt-2 pl-2'>
                                <li className='hover:underline cursor-pointer'>Instagram</li>
                                <li className='hover:underline cursor-pointer'>Github</li>
                                <li className='hover:underline cursor-pointer'>Linked-in</li>
                                <li className='hover:underline cursor-pointer'>X</li>
                            </ul>
                            </div>

                            <div className="">
                                <h1 className='font-bold text-2xl'>Projects</h1>
                           
                             <ul className='font-light  pt-2 pl-2'>
                                {
                                    projects.map((item, i)=>{
                                        return <li key={i} className="hover:underline cursor-pointer">{item.name}</li>
                                    })
                                }
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-3 absolute w-full bottom-0 bg-black/35 justify-center items-center  text-white">
                <p className="">Prashant Adhikari © 2023 | All rights reserved.</p>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer