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
import Testimonials from "../Components/Sections/Testimonials/Testimonials";
import Marquee from "react-fast-marquee";
import Poem from "../Components/Sections/ArtSection/Poems";

const Homepage = () => {
  const dispatch = useDispatch();
  const { setShowParagraph, showParagraph, scrolled, setScrolled } = useContent();

  const [showMenu, setShowMenu] = useState(false);
  const [showHam, setShowHam] = useState(false);

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

    alert("This website is still under development. Please be patient.");

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
          <meta name="theme-color" content="#011e24" />
          <meta property="og:title" content="Prashant Adhikari's Portfolio" />
          <meta
            property="og:description"
            content="Portfolio of Prashant Adhikari, a Web Developer and Software Engineer from Nepal."
          />
          <meta
            property="og:image"
            content="./icons/android-chrome-512x512.png"
          />
          <meta property="og:url" content="https://prashantadhikari7.com.np" />
          <meta property="og:type" content="website" />
          <meta
            property="og:site_name"
            content="Prashant Adhikari's Portfolio"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Prashant Adhikari's Portfolio" />
          <meta
            name="twitter:description"
            content="Portfolio of Prashant Adhikari, a Web Developer and Software Engineer from Nepal."
          />
          <meta
            name="twitter:image"
            content="./icons/android-chrome-512x512.png"
          />
          <meta name="twitter:site" content="@pr4xnt" />
          <meta name="twitter:creator" content="@pr4xnt" />
          <link rel="icon" href="./favicon.ico" />
          <link rel="apple-touch-icon" href="./icons/apple-touch-icon.png" />
          <link rel="manifest" href="./site.webmanifest" />
          <link rel="canonical" href="https://prashantadhikari7.com.np" />
        </div>

        <div className="relative h-screen container mx-auto overflow-hidden">
          <div className="showcontent hidden md:block absolute top-3 right-4 z-[800] items-center justify-center">
            <button
              className="text-xs text-cream cursor-pointer uppercase tracking-widest font-semibold"
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
            <div className="roadrage text-cream flex flex-col font-roadrage text-xl absolute left-4 top-6 z-[999]">
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

                      <div className="w-full absolute bottom-0 h-20 bg-gradient-to-b from-transparent to-black z-50"></div>


            {showParagraph && (
              <div className="para absolute bottom-30 text-sm z-[999] text-cream w-[25%] flex flex-col gap-4 -left-200">
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
              <div className="para2 absolute top-20 text-sm z-[999] text-cream w-[20%] flex flex-col gap-4 -right-200">
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

            <div className="absolute nunito text-xs uppercase tracking-widest links pb-2 bottom-0 left-0 flex items-center z-[200] px-3 py-1 gap-3 font-semibold text-cream">
              <NavLink
                to="/projects"
                className="group flex flex-col rounded-full"
              >
                Projects
                <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300 group-hover:block"></div>
              </NavLink>
              <NavLink to="/" className="group flex flex-col rounded-full">
                Home
                <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300 group-hover:block"></div>
              </NavLink>
              <NavLink
                to="/curriculum-vitae"
                className="group flex flex-col rounded-full"
              >
                Resume
                <div className="h-0.5 group-hover:w-full bg-[brown] rounded-full w-0 transition-all duration-300 group-hover:block"></div>
              </NavLink>
            </div>
          </div>
        </div>

       <div className="bg-sand ">      <Accomplishments/></div>
        <ProjectScreen/>
        <div className="bg-sand "><MarqueeComp/></div>
        <Poem/>

        
      </main>
    </>
  );
};

export default Homepage;
