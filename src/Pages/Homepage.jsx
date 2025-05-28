import { useEffect, useRef, useState } from "react";
import Home from "../Components/Home";
import HomeResponsive from "../Components/HomeResponsive";
import HomeMD from "../Components/HomeMD";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp, Eye, EyeClosed } from "lucide-react";
import { useContent } from "../Utils/ContextProvider";
import MenuBar from "../Components/MenuBar";
import MarqueeComp from "../Components/MarqueeComp";
import Accomplishments from "../Components/Sections/Accomplishments/Accomplishments";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useDispatch, useSelector } from "react-redux";
import ProjectScreen from "../Components/Sections/ProjectSection.jsx/ProjectScreen";

const Homepage = () => {
  const dispatch = useDispatch();
  const { setShowParagraph, showParagraph } = useContent();
  const [showMenu, setShowMenu] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const menuRef = useRef();
  useEffect(() => {
    console.log(
      `%cDo not even try to change a single line through the console.
Your efforts are useless; each and every route is secured and tested properly.
Thank you for your concern.`,
      `color: red;
     font-size: 12px;
     font-family: monospace;
     white-space: pre-line;
     border-radius: 5px;`
    );

    console.log(
      `%c
- Prashant Adhikari
github: pr4shxnt
instagram: pr4xnt
x: pr4xnt`,
      `color: black;
     font-size: 12px;
     font-family: monospace;
     white-space: pre-line;
     border-radius: 5px;`
    );
  }, []);

  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowHam(scrollY >= 700);
      setScrolled(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (showParagraph) {
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
    }
  }, [showParagraph]);

  useGSAP(() => {
    gsap.to(menuRef.current, {
      rotate: 0,
      scale: showHam ? 1 : 0,
      duration: 2,
      delay: -0.7,
      ease: "Expo.easeInOut",
    });
  }, [showHam]);

  const scrollDownHandler = () => {
    console.log("Scrolling down..."); // Debug log
    window.scrollTo(0, 735);
  };

  const scrollHandler = (arg) => {
    window.scrollTo(0, arg);
  };

  return (
    <>
      <div
        ref={menuRef}
        className="fixed bottom-2 left-2 z-[10000] hidden md:block scale-0"
      >
        {showHam && <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />}
      </div>

      <div className="fixed bottom-2 left-2 z-[10000] md:hidden">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      {showHam && (
        <div className="hidden md:block fixed bottom-2 right-2 z-[10000]">
          <button
            onClick={() => scrollHandler(scrolled + 735)}
            className="text-white"
          >
            <ChevronDown className="text-white animate-bounce" size={18} />
          </button>
        </div>
      )}
      {showHam && (
        <div className="hidden md:block fixed top-2 right-2 z-[10000]">
          <button
            onClick={() => scrollHandler(scrolled - 735)}
            className="text-white"
          >
            <ChevronUp className="text-white animate-bounce" size={18} />
          </button>
        </div>
      )}

      <main>
        <div className="metatags-container">
          <title>Home | Prashant Adhikari</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Prashant Adhikari's Portfolio" />
          <meta
            name="keywords"
            content="Portfolio, Prashant Adhikari, Web Developer, Software Engineer, Student, Penetration tester, website development, React Developer from Nepal"
          />
          <meta name="author" content="Prashant Adhikari" />
        </div>

        <div className="relative h-screen container mx-auto overflow-hidden">
          <div className="showcontent hidden md:block absolute top-3 right-4 z-[800] items-center justify-center">
            <button
              className="text-xs text-white cursor-pointer uppercase tracking-widest font-semibold"
              onClick={() => setShowParagraph(!showParagraph)}
            >
              {showParagraph ? (
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
            <div className="absolute social-links bottom-0 right-0 flex items-center z-[200] px-3 py-1">
              <a
                target="_blank"
                title="email"
                href="mailto:prashantadhikareeey.dev@gmail.com"
              >
                <img src="./email.png" alt="" className="w-6 m-2" />
              </a>
              <a
                target="_blank"
                title="whatsapp"
                href="https://wa.me/+9779742433049?text=Hello%20Prashant!"
              >
                <img src="./whatsapp.png" alt="" className="w-5 m-2" />
              </a>
              <a
                target="_blank"
                title="instagram"
                href="https://www.instagram.com/pr4xnt"
              >
                <img src="./instagram.png" alt="" className="w-8 m-1.5" />
              </a>
              <a
                target="_blank"
                title="github"
                href="https://www.github.com/pr4shxnt"
              >
                <img src="./github.png" alt="" className="w-6 m-2" />
              </a>
            </div>

            {showParagraph && (
              <div className="para absolute bottom-30 text-sm z-[999] text-gray-300 w-[25%] flex flex-col gap-4 -left-200">
                <p>
                  Hi!! I am Prashant. Nice to meet you folk!! If you have been
                  here maybe it's because we both share same kind of passion.
                  I'm deeply interested in new and updating technologies. But
                  recently, I've been actively improving my skills of website
                  development. Join me through the links given in this website
                  and hope to build something great together.
                </p>
                <p>
                  Feel free to contact me from the links given in the
                  bottom-right of the screen or from the contact form below.
                </p>
              </div>
            )}

            {showParagraph && (
              <div className="para2 absolute top-20 text-sm z-[999] text-gray-300 w-[20%] flex flex-col gap-4 -right-200">
                <p>
                  I'm also a gamer and a content creator. You can check out my
                  Youtube channel from the link given in the top-left of the
                  screen.
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

            <div className="btmbar text-white absolute bottom-0 left-0 w-full pt-18 pb-2 px-16 bg-gradient-to-t from-black to-transparent z-[10]">
              <button
                onClick={scrollDownHandler}
                className="flex cursor-pointer flex-col  absolute bottom-0 left-0 w-full justify-center items-center"
              >
                <h3 className="text-sm  flex text-center ">Scroll Down</h3>
                <ChevronDown className="text-white animate-bounce" size={18} />
              </button>
            </div>

            <div className="absolute text-xs uppercase tracking-widest links pb-2 bottom-0 left-0 flex items-center z-[200] px-3 py-1 gap-3 font-semibold text-[white]">
              <NavLink
                to="/projects"
                className="group flex flex-col rounded-full"
              >
                Projects
                <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300 group-hover:block"></div>
              </NavLink>
              <NavLink
                to="/dashboard"
                className="group flex flex-col rounded-full"
              >
                Dashboard
                <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300 group-hover:block"></div>
              </NavLink>
              <NavLink
                to="/curriculum-vitae"
                className="group flex flex-col rounded-full"
              >
                CV
                <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300 group-hover:block"></div>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="relative bg-[#011e24] w-full">
          <div className="btmbar text-white absolute top-0 left-0 w-full py-10 bg-gradient-to-b from-black to-transparent z-[10]"></div>

          <div className="w-[85%] mx-auto h-screen"></div>
        </div>
         
        <div className=" w-full relative bg-[#011e24] ">
          <div className="flex items-center container w-[85%] mx-auto pt-28">
            <div className="h-[0.004rem] w-full bg-white"></div>
            <h1 className="px-6 text-white flex gap-1.5 font-light">
              <span className="">Personal</span>
              <span className="">Projects</span>
            </h1>
            <div className="h-[0.1px] w-full bg-white"></div>
          </div>
          <div className="w-[85%] mx-auto text-white">
            <ProjectScreen />
          </div>
        </div>
          <div className=" relative  bg-[#011e24] w-full">
          <div className="flex container items-center w-[85%] mx-auto pt-28 justify-center">
            <div className="h-[0.004rem] w-full bg-white"></div>
            <h1 className="px-6 text-white flex gap-1.5 font-light">
              <span className="">Skills </span>
              <span className="">&</span>
              <span className="">Accomplishments</span>
            </h1>
            <div className="h-[0.1px] w-full bg-white"></div>
          </div>
          <Accomplishments />
          <div className="w-[85%] container mx-auto pt-3">
            <MarqueeComp direction="left" />
          </div>
        </div>
        <div className=" w-full relative bg-[#011e24] ">
          <div className="flex items-center container w-[85%] mx-auto pt-28">
            <div className="h-[0.004rem] w-full bg-white"></div>
            <h1 className="px-6 text-white flex gap-1.5 font-light">
              <span className="">Testimonials</span>
            </h1>
            <div className="h-[0.1px] w-full bg-white"></div>
          </div>
          <div className="w-[85%] mx-auto text-white">
            <ProjectScreen />
          </div>
        </div>
     
      </main>
    </>
  );
};

export default Homepage;
