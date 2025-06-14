// Components/MenuContent.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";

const MenuContent = ({ isOpen, onCloseComplete }) => {
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      gsap.to(ref.current, {
        opacity: 100,
        left: "65%",
        display: "block",
        duration: 0.3,
      });
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        left: "-1000%",
        duration: 0.8,
        onComplete: onCloseComplete,
      });
    }
  }, [isOpen]);

  return (
    
    <div
      ref={ref}
      className="absolute nunito bottom-0 px-3 rounded-r-full shadow-2xl shadow-gray-200 -left-100 z-[200]  bg-charcoal  py-2.5 text-white  "
    >
      <div className=" w-full text-xs pb uppercase md:tracking-widest links bottom-0 left-0 flex  items-center z-[200] px-3 gap-3 font-semibold text-cream">
        <NavLink to={`/projects`} className="group flex flex-col rounded-full">
          Projects
          <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
        </NavLink>
        <NavLink to={`/`} className="group flex flex-col rounded-full">
          Home
          <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
        </NavLink>
        <NavLink
          to={`/curriculum-vitae`}
          className="group flex flex-col rounded-full"
        >
          Resume
          <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
        </NavLink>
      </div>
    </div>
  );
};

export default MenuContent;
