import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContent } from '../Utils/ContextProvider';
import { ChevronDown } from 'lucide-react';

const HomeResponsive = () => {
  const { showContent } = useContent();

  useGSAP(() => {
    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character2", {
      scale: 1.1,
      bottom: "0",
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text2", {
      scale: 1,
      rotate: 0,
      top: "25%",
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
  }, [showContent]);

  return (
    <div>
      <div className="landing overflow-hidden relative w-full h-screen bg-black">
      

        <div className="imagesdiv relative overflow-hidden w-full h-screen">
          <img
            className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/drddkl4on/image/upload/v1748102691/sky_xuqj8i.png"
            alt=""
          />
          <img
            className="absolute bg scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/drddkl4on/image/upload/v1748102689/bg_catc9m.png"
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[1]"></div>

          {/* TEXT */}
          <div className="text2 absolute -top-[200%] left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg] z-[2] flex flex-col gap-2 text-center">
            <h1 className="text-[5rem] font-bold text-[#DDB884] leading-none [-webkit-text-stroke:1.5px_#242528]">
              Prashant
            </h1>
            <h1 className="text-[5rem] font-bold text-[#DDB884] leading-none [-webkit-text-stroke:1.5px_#242528] ">
              Adhikari
            </h1>
          </div>

          {/* CHARACTER IMAGE */}
          <img
            className="absolute character2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] w-[110%] -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] md:scale-[2] rotate-[-20deg] z-[2]"
            src="https://res.cloudinary.com/drddkl4on/image/upload/v1748102693/photo1_qovkxz.png"
            alt=""
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="btmbar text-white absolute bottom-0 left-0 w-full py-6 px-6 md:py-10 md:px-10 bg-gradient-to-t from-black to-transparent z-[2]">
      

        </div>
      </div>
    </div>
  );
};

export default HomeResponsive;