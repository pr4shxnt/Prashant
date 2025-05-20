import React from 'react'
import Marquee from 'react-fast-marquee'

const MarqueeComp = () => {
  return (
    <div className='text-white px-12'>
        <Marquee pauseOnClick={true} pauseOnHover={true} >
          <div className="flex gap-10 text-3xl mx-5 overflow-hidden">
            <div className="">MongoDB</div>
            <div className="">ExpressJS</div>
            <div className="">ReactJS</div>
            <div className="">NodeJS</div>
            <div className="">TailwindCSS</div>
            <div className="">Cloudinary</div>
            <div className="">Cloudinary</div>
            <div className="">Cloudinary</div>
            <div className="">Cloudinary</div>
            </div>
        </Marquee>
    </div>
  )
}

export default MarqueeComp