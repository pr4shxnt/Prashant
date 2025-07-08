import React, { useEffect } from "react";
import SpotlightCard from "./SpotLightCard";
import { Code2, Laptop2, Lock, Settings, Youtube } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMeLandingpage = () => {
  useEffect(() => {
    const topCards = gsap.utils.toArray(".top-card");
    const bottomCards = gsap.utils.toArray(".bottom-card");
    const title = gsap.utils.toArray(".title");
    const iframeTag = gsap.utils.toArray(".video-frame");


    gsap.set(title, {opacity: 0, autoAlpha: 0})

    gsap.to(title, {
      opacity: 1,
      autoAlpha: 1,
      duration: 1.6,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: ".AB-container",
        start: "top 80%",
      },
    })

    gsap.set(topCards, { opacity:0, y: 15 });

    gsap.to(topCards, {
      stagger: 0.2,
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "expo.in",
      scrollTrigger: {
        trigger: ".top-cards-container",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
    gsap.set(bottomCards, { opacity:0, y: 15 });

    gsap.to(bottomCards, {
      stagger: 0.2,
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "expo.in",
      scrollTrigger: {
        trigger: ".bottom-cards-container",
        start: "top 100%",
        toggleActions: "play none none none",
      },
    });

    gsap.set(iframeTag, {opacity: 0, scale: 0.7, y: 10})

    gsap.to(iframeTag,{
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger:{
        trigger: ".frame-container",
        start: "top 80%",
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-[85%] mx-auto mb-30 z-[999999] ">
      <div className="flex flex-col w-full h-max relative AB-container">
        <h1 className="text-5xl opacity-0 title md:text-7xl lg:text-8xl text-center text-charcoal font-bold">Why me ?</h1>
        <p className="text-lg md:text-xl text-center lg:text-2xl text-brown leading-relaxed mt-2 mb-6"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 top-cards-container">
        <SpotlightCard className="top-card  opacity-0 custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="text-white">
            <Laptop2 size={30} stroke="purple" />
            <p className="mt-2 text-xl font-semibold text-gray-300">Client Portal</p>
            <p className="text-gray-300/50">
              You can log into the client portal & see progress or request changes. Register in{" "}
              <a href="https://www.clientportal.prashantadhikari7.com.np/register" target="_blank" className="text-purple-500 hover:underline" rel="noreferrer">
                client portal
              </a>.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard className="top-card  opacity-0 custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="text-white">
            <Settings size={30} stroke="purple" />
            <p className="mt-2 text-xl font-semibold text-gray-300">SEO Optimization</p>
            <p className="text-gray-300/50">
              Your website will be optimized for search engines to help users find you easily.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard className="top-card  opacity-0 custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="text-white">
            <Youtube size={30} stroke="purple" />
            <p className="mt-2 text-xl font-semibold text-gray-300">Live Coding</p>
            <p className="text-gray-300/50">
              I stream my coding on YouTube, helping with transparency and easier maintenance.
            </p>
          </div>
        </SpotlightCard>
      </div>

<div className="frame-container  w-full h-full">
      <iframe
        className="video-frame scale-50 opacity-0 my-10 h-0 rounded-2xl mx-auto md:w-[80%] md:h-[500px]"
        src="https://www.youtube.com/embed/8BkravMhqtg?si=ZPxxgl1NLYBX99Un&amp;start=5100"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bottom-cards-container">
        <SpotlightCard className="bottom-card custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="text-white">
            <Lock size={30} stroke="purple" />
            <p className="mt-2 text-xl font-semibold text-gray-300">Secured App</p>
            <p className="text-gray-300/50">
              I implement strong security practices to protect your application from tampering and vulnerabilities.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard className="bottom-card custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="text-white">
            <Code2 size={30} stroke="purple" />
            <p className="mt-2 text-xl font-semibold text-gray-300">Modern Stack</p>
            <p className="text-gray-300/50">
              I work with modern tools like ReactJS, Node.js, MongoDB, and TailwindCSS to deliver high-quality apps.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard className="bottom-card custom-spotlight-card hover:scale-105 hover:shadow-2xl transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="text-white">
            <Laptop2 size={30} stroke="purple" />
            <p className="mt-2 text-xl font-semibold text-gray-300">Flexible Timing</p>
            <p className="text-gray-300/50">
              I can adapt to both local and international time zones for smooth communication.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default AboutMeLandingpage;
