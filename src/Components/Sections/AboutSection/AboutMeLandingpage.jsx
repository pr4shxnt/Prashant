import React from "react";
import SpotlightCard from "./SpotLightCard";
import { Code2, Laptop2, Lock, Settings, StarsIcon, Youtube } from "lucide-react";

const AboutMeLandingpage = () => {
  return (
    <div className="w-[85%]  mx-auto mb-30  z-[999999]">
      <div className="flex flex-col w-full h-max  relative">
      <h1 className="text-5xl md:text-7xl lg:text-8xl text-center font-bold">Why me ?</h1>
      <p className="text-lg md:text-xl text-center lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
          </p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard
          className="custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div class="text-white">
            <Laptop2 size={30} stroke="purple"/>
            <p class="css-v5mywq mt-2 text-xl font-semibold text-gray-300">Client Portal</p>
            <p class="css-14rovie text-gray-300/50">
              You can Login into client portal &amp; see progress &amp; request for the changes on the products.
            </p>
          </div>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div class="text-white">
            <Settings size={30} stroke="purple"/>
            <p class="css-v5mywq mt-2 text-xl font-semibold text-gray-300">Search Engine Optimization</p>
            <p class="css-14rovie text-gray-300/50">
              Your Wesbite will be optimized for Search Engine which will make the target audience to reach you website faster.
            </p>
          </div>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div class="text-white">
            <Youtube size={30} stroke="purple"/>
            <p class="css-v5mywq mt-2 text-xl font-semibold text-gray-300">Live Coding</p>
            <p class="css-14rovie text-gray-300/50">
              Prashant Also streams his coding in youtube, this would make maintenance of website easier.
            </p>
          </div>
        </SpotlightCard>
 
    
      </div>
      <iframe className="my-5 h-0 rounded-2xl mx-auto md:w-[80%] md:h-[500px]"  src="https://www.youtube.com/embed/8BkravMhqtg?si=ZPxxgl1NLYBX99Un&amp;start=5100" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard
          className="custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div class="text-white">
            <Lock size={30} stroke="purple"/>
            <p class="css-v5mywq mt-2 text-xl font-semibold text-gray-300">Secured app</p>
            <p class="css-14rovie text-gray-300/50">
              Me having a proper knowledge about website security, tampers and preventions, Your website will be secured.
            </p>
          </div>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div class="text-white">
            <Code2 size={30} stroke="purple"/>
            <p class="css-v5mywq mt-2 text-xl font-semibold text-gray-300">Modern Tools and frameworks</p>
            <p class="css-14rovie text-gray-300/50">
            I work with the modern frameworks and library such as ReactJS, Nodejs, MongoDB, TailwindCSS
                        </p>
          </div>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div class="text-white">
            <Laptop2 size={30} stroke="purple"/>
            <p class="css-v5mywq mt-2 text-xl font-semibold text-gray-300">Flexible timing</p>
            <p class="css-14rovie text-gray-300/50">
              I can work both on local as well as the US hours which would make communication with client stronger.
            </p>
          </div>
        </SpotlightCard>
 
    
      </div>
    </div>
  );
};

export default AboutMeLandingpage;
