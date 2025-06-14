import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingPage = () => {
  const dotsRef = useRef([]);

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      gsap.to(dot, {
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1,
        duration: 0.5,
      });
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full gap-1">
        <title>Loading | Prashant Adhikari</title>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (dotsRef.current[index] = el)}
          className="w-2 h-2 rounded-full bg-brown"
        />
      ))}
    </div>
  );
};

export default LoadingPage;
