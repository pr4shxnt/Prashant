import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useContent } from '../Utils/ContextProvider'
import { ChevronDown } from 'lucide-react'

const Home = () => {
    const { showContent } = useContent();
    const landingRef = useRef(null);


    useGSAP(() => {
        gsap.to(".sky", {
          scale: 1.1,
          rotate: 0,
          duration: 2,
          delay: "-.8",
          ease: "Expo.easeInOut",
        });
    
        gsap.to(".bg", {
          scale: 1.1,
          rotate: 0,
          duration: 2,
          delay: "-.8",
          ease: "Expo.easeInOut",
        });
    
        gsap.to(".character", {
          scale: 1,
          bottom: "-25%",
          rotate: 0,
          duration: 2,
          delay: "-.8",
          ease: "Expo.easeInOut",
        });
    
        gsap.to(".text", {
          scale: 1,
          rotate: 0,
          top: "15%",
          duration: 2,
          delay: "-.8",
          ease: "Expo.easeInOut",
        });

        const main = landingRef.current;

   main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove,
      });
        gsap.to(".text", {
            y: -xMove * 1.1,
        });
        gsap.to(".character", {
            y: xMove * 1.1,
        });
    });

    }, [showContent])


  return (
    <div className='main' ref={landingRef}>
        <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
             
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[2.8] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[3]  bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[1]"></div>
              <div className="text text-[#DDB884] flex flex-col gap-3 absolute -top-[200%] font-bold left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg] z-[2]">
                <h1 className="text-[10rem] leading-none [-webkit-text-stroke:1.5px_#242528]">Prashant</h1>
                <h1 className="text-[10rem] leading-none ml-40 [-webkit-text-stroke:1.5px_#242528]">Adhikari</h1>
              </div>
              <img
                className="absolute character drop-shadow-[0_15px_25px_rgba(0,0,0,5)] w-[35%] -bottom-[200%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg] z-[2]"
                src="./photo1.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full pt-18  px-10 bg-gradient-to-t from-black to-transparent z-[10]">
              <div className="flex flex-col  absolute bottom-0 left-0 w-full justify-center items-center">
                <h3 className="text-sm  flex text-center ">
                  Scroll Down
                </h3>
                <ChevronDown className='text-white animate-bounce' size={18} />
              </div>
              
            </div>
          </div>
    </div>
  )
}

export default Home