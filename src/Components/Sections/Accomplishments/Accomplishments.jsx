import React, { useState, useEffect, useRef } from 'react';
import AccomplishmentsData from './Data';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Accomplishments = ({ scrolled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const imageRef = useRef(null); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % AccomplishmentsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimate(scrolled > 200);
  }, [scrolled]);

  useGSAP(() => {
    if (!animate) return;

    const tl = gsap.timeline();
    tl.fromTo(
      [ imageRef.current],
      { opacity: 0, x: -100, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'none', stagger: 0.1 }
    );
  }, [animate]);

  const handleDotClick = index => setCurrentIndex(index);
  const current = AccomplishmentsData[currentIndex];

  return (
    <div className="w-[90%] mx-auto relative h-[90%] md:h-[50%] lg:h-[85%] bg-transparent text-white px-10 py-4 flex items-center justify-center overflow-hidden">
      {animate && (
        <div>

          <div className=" relative z-10 grid lg:grid-cols-5  max-w-7xl h-full items-center gap-6">
            <div className="col-span-2 hidden lg:flex items-center justify-center">
              <motion.img
                ref={imageRef}
                src="/side-avatar.png"
                alt="Avatar"
                className="h-[75%] object-contain drop-shadow-xl"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1 }}
                className="col-span-2 bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center"
              >
                <h1 className="text-6xl font-extrabold text-white">{current.count}</h1>
                <h2 className="uppercase text-[#5E4C2C] tracking-widest text-sm font-semibold mt-2">
                  {current.name}
                </h2>
                <p className="text-sm text-gray-300 mt-4 text-center px-6">
                  {current.description}
                </p>
                <div className="mt-4 text-white text-3xl">{current.icon}</div>
                <NavLink to={current.link}>
                  <button className="mt-8 px-4 py-2 text-sm text-[#5E4C2C] border cursor-pointer border-[#5E4C2C] hover:bg-[#5E4C2C] hover:text-[white] transition-all rounded-md">
                    Explore More
                  </button>
                </NavLink>
              </motion.div>
            </AnimatePresence>

            <div className="col-span-1 flex lg:flex-col md:px-8 justify-center md:gap-6">
              {AccomplishmentsData.map((item, i) => (
                <motion.div
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`cursor-pointer px-4 py-3 rounded-xl flex flex-col items-center transition-all duration-600 ${
                    currentIndex === i ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <h1 className="text-xs hidden md:block text-white">{item.name}</h1>
                  <div className="text-xl text-white">{item.icon}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="dots absolute bottom-4 w-full flex justify-center space-x-3 z-10">
        {AccomplishmentsData.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`transition-all duration-200 rounded-full ${
              currentIndex === i ? 'bg-white h-2 w-4' : 'bg-white/20 h-2 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Accomplishments;
