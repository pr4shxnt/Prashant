import React from 'react'
import Marquee from 'react-fast-marquee'
import { useContent } from '../Utils/ContextProvider'

const MarqueeComp = () => {
  const {allSkills} = useContent();
  console.log(allSkills);
  
  return (
    <div className='text-white  mx-auto h-full pt-5'>
      <h1 className="text-lg  uppercase font-bold tracking-widest pb-3">Learnt <span className="text-lg  uppercase font-bold tracking-widest text-[#5E4C2C]">Technologies</span></h1>
        <Marquee  pauseOnHover={true} >
          <div className="flex gap-8 text-3xl mx-5 overflow-hidden">
            {
              allSkills.map((item)=>{
                return <div className="flex items-center gap-2  rounded-lg"><img src={item.image} alt="" className="w-8 h-8 rounded-md" /><h1 className="text-sm tracking-wider">{item.name}</h1></div>
              })
            }
            </div>
        </Marquee>
    </div>
  )
}

export default MarqueeComp