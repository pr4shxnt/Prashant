import React, { useEffect } from "react";
import AccomplishmentData from "../Accomplishments/Data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Accomplishments = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray(".accomplishment-card");

    if (cards.length === 0) {
      console.warn("No cards found with class 'accomplishment-card'");
      return;
    }

    gsap.set(cards, { opacity: 0, y: 50 }); // Ensure start state

    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".accomplishment-container",
        start: "top 90%", // Adjust if needed
        toggleActions: "play none none none",
        // markers: true, // Uncomment to debug scroll trigger positions
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-[85%] container mx-auto pt-5 accomplishment-container">
      <div className="flex items-end justify-end gap-4 pb-5">
        <NavLink to={`curriculum-vitae`} className="text-brown text-sm hover:underline">Show in CV</NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-20 pt-2">
        {AccomplishmentData.map((item, i) => (
          <div key={i} className="accomplishment-card">
            <div
              title={item.description}
              className="text-gray-300 bg-bronze  rounded-lg hover:shadow-2xl shadow-black  p-6 flex items-center justify-center h-full hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <span className="text-[#dc964c]">{item.icon}</span>
                <span className="text-3xl font-bold pt-4">{item.count}</span>
                <h1 className="text-beige">{item.name}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accomplishments;
