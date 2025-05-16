import Home from "../Components/Home";
import React, { use, useState } from "react";
import HomeResponsive from "../Components/HomeResponsive";
import HomeMD from "../Components/HomeMD";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import AboutMeLandingpage from "../Components/Sections/AboutSection/AboutMeLandingpage";
import { useContent } from "../Utils/ContextProvider";

const Homepage = () => {
  const { setShowParagraph, showParagraph } = useContent();

  if (showParagraph) {
    useGSAP(() => {
      gsap.to(".para", {
        rotate: 0,
        left: "12px",
        duration: 2,
        delay: -0.7,
        ease: "Expo.easeInOut",
      });

      gsap.to(".para2", {
        rotate: 0,
        right: "12px",
        duration: 2,
        delay: -0.7,
        ease: "Expo.easeInOut",
      });
    }, [showParagraph]);
  }

  console.log(showParagraph);

  return (
    <div>
      {/* Metadata for homepage.jsx starts */}
      <div className="">
        <title>Home | Prashant Adhikari</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Prashant Adhikari's Portfolio" />
        <meta
          name="keywords"
          content="Portfolio, Prashant Adhikari, Web Developer, Software Engineer, Student, Penetration tester, website development, React Developer from Nepal, "
        />
        <meta name="author" content="Prashant Adhikari" />
      </div>
      {/* Metadata for homepage.jsx ends */}

      <div className="relative overflow-hidden">
        <div className="showcontent hidden md:block absolute top-3 right-4 z-[999]  items-center justify-center">
          <button
            className="text-xs text-white cursor-pointer uppercase tracking-widest font-semibold"
            onClick={() => setShowParagraph(!showParagraph)}
          >
            {showParagraph === true ? (
              <h1 className="flex gap-1">
                Hide Content <EyeClosed size={18} />
              </h1>
            ) : (
              <h1 className="flex gap-1">
                Show Content <Eye size={18} />
              </h1>
            )}
          </button>
        </div>
        <a
          target="_blank"
          href="https://www.youtube.com/@lynxplays6702"
          className=""
        >
          <div className="roadrage text-white flex flex-col font-roadrage text-xl absolute left-4 top-6 z-[999]">
            <h1 className="relative">
              <div className="absolute font-mono -top-[18px] rotate-[70deg]">
                :)
              </div>
              <span className="text-[brown]">L</span>YN
              <span className="text-[brown]">X</span>
            </h1>
          </div>
        </a>
        <div className="md:hidden">
          <HomeResponsive />
        </div>
        <div className="hidden md:block lg:hidden">
          <HomeMD />
        </div>
        <div className="hidden lg:block">
          <Home />
        </div>
        <div className="hidden md:block">
          <div className="absolute social-links  bottom-0 right-0 flex items-center z-[200] px-3 py-1">
            <a
              target="_blank"
              title="email"
              href="mailto:prashantadhikareeey.dev@gmail.com"
              className=""
            >
              <img src="./email.png" alt="" className="w-6 m-2" />
            </a>
            <a
              target="_blank"
              title="whatsapp"
              href="https://wa.me/+9779742433049?text=Hello%20Prashant!"
              className=""
            >
              <img src="./whatsapp.png" alt="" className="w-5 m-2" />
            </a>
            <a
              target="_blank"
              title="instagram"
              href="https://www.instagram.com/pr4xnt"
              className=""
            >
              <img src="./instagram.png" alt="" className="w-8 m-1.5" />
            </a>
            <a
              target="_blank"
              title="github"
              href="https://www.github.com/pr4shxnt"
              className=""
            >
              <img src="./github.png" alt="" className="w-6 m-2" />
            </a>
          </div>
          {showParagraph && (
            <div className="para absolute bottom-30 text-sm z-[999] text-gray-300 w-[25%] flex flex-col  gap-4 -left-200">
              <p>
                Hi!! I am Prashant. Nice to meet you folk!! If you have been
                here maybe it's because we both share same kind of passion. I'm
                deeply interested in new and updating technologies. But
                recently, I've been actively improving my skills of website
                development. Join me through the links given in this website and
                hope to build something great together.
              </p>
              <p>
                Feel free to contact me from the links given in the bottom-right
                of the screen or from the contact form below.
              </p>
            </div>
          )}
          {showParagraph && (
            <div className="para2 absolute top-20 text-sm z-[999] text-gray-300 w-[20%] flex flex-col  gap-4 -right-200">
              <p>
                I'm also a gamer and a content creator. I create content on
                Youtube and Twitch. You can check out my Youtube channel from
                the link given in the top-left of the screen.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
                debitis illum perspiciatis? Quia doloribus nostrum doloremque
                accusantium at vel aspernatur vero natus aut debitis, sit
                consectetur id quo repudiandae in illum nisi possimus quod
                similique.
              </p>
            </div>
          )}
          <div className="absolute links pb-2 bottom-0 left-0 flex  items-center z-[200] px-3 py-1 gap-3 font-semibold text-[white]">
            <NavLink
              to={`/projects`}
              className="group flex flex-col rounded-full"
            >
              Projects
              <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
            <NavLink
              to={`/dashboard`}
              className="group flex flex-col rounded-full"
            >
              Dashboard
              <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
            <NavLink
              to={`/curriculum-vitae`}
              className="group flex flex-col rounded-full"
            >
              CV
              <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300  group-hover:block"></div>
            </NavLink>
          </div>
        </div>
      </div>
      <AboutMeLandingpage />
    </div>
  );
};

export default Homepage;
