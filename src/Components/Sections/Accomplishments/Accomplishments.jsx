import React from 'react'
import AccomplishmentsData from './Data'

const Accomplishments = () => {
  return (

        <div className="h-[85vh]  flex justify-center items-center">
            <img src="/side-avatar.png" alt="" className="h-[80%]" />
            <div className="w-[50%] h-[70%]">
                <h1 className='text-xl uppercase text-white tracking-widest font-bold'>Accomplishments of Admin</h1>
            <div className="w-full h-full flex relative">
                <div className="bg-gray-600 w-[10%]"></div>
                <div className="bg-gray-400 w-[20%]"></div>
                <div className="bg-gray-200 w-[40%]"></div>
                <div className="bg-gray-400 w-[20%]"></div>
                <div className="bg-gray-600 w-[10%]"></div>
                <div className="absolute bottom-1 w-full justify-center flex gap-0.5">
                    <div className="bg-gray-900 h-3 w-3 rounded-full  "></div>
                    <div className="bg-gray-900 h-3 w-3 rounded-full  "></div>
                    <div className="bg-gray-900 h-3 w-5 rounded-full  "></div>
                    <div className="bg-gray-900 h-3 w-3 rounded-full  "></div>
                    <div className="bg-gray-900 h-3 w-3 rounded-full  "></div>
                </div>
            </div>
            </div>
        </div>

  )
}

export default Accomplishments