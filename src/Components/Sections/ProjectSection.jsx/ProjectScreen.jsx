import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../../Features/Project/projectSlice";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import LoadingPage from "../../../Utils/loadingpage";

const SLIDE_INTERVAL = 5000;

const getShortDescription = (html, maxLength = 250) => {
  if (typeof document !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.length > maxLength
      ? textContent.slice(0, maxLength) + "..."
      : textContent;
  }
  return "";
};

const ProjectCard = ({ project, i }) => {
  return (
    <div key={i} className="h-full w-full flex-shrink-0 flex flex-col">
      <div className="w-full h-[300px] overflow-hidden relative">
        <img
          src={project.images[0]}
          alt={project.name}
          loading="lazy"
          className="w-[100%] h-[100%] object-cover rounded-t-lg"
        />
        <div className="absolute hidden md:block bottom-0 rounded-tl-2xl text-beige p-2 right-0 bg-brown/50"><NavLink to={`/projects/${project.name}`}><ExternalLink/></NavLink></div>
                <div className="absolute md:hidden top-0 rounded-bl-2xl text-beige p-2 right-0 bg-brown/50"><NavLink to={`/projects/${project.name}`}><ExternalLink/></NavLink></div>

      </div>
      <div className="bg-bronze w-[100%] text-cream px-3 py-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">{project.name}</h1>
          <div className="text-sm opacity-80">
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
        <p className="text-sm">{getShortDescription(project.description)}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies?.[0]
            ?.split(",")
            .slice(0, 7)
            .map((tech, index) => (
              <span
                key={index}
                className="bg-beige/20 px-2 py-1 text-xs rounded mr-2"
              >
                {tech.trim()}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

const ProjectScreen = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const topRef = useRef(null);
  const hasAnimated = useRef(false);

  const startSlideInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (
      !containerRef.current ||
      !leftRef.current ||
      !rightRef.current ||
      !topRef.current ||
      hasAnimated.current
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          const tl = gsap.timeline();

          tl.fromTo(
            leftRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
          )
            .fromTo(
            rightRef.current,
            { opacity: 0, x: 100 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out"
            },
            "-=0.5"
          )
            .fromTo(
              topRef.current,
             { opacity: 0, y: -100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            },
            "-=0.5"
            );

          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [projects]);

  useEffect(() => {
    if (projects.length > 0) startSlideInterval();
    return () => clearInterval(intervalRef.current);
  }, [projects]);

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    startSlideInterval();
  };

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    startSlideInterval();
  };

  if (!projects.length)
    return (
              <div className="h-[50vh] flex items-center justify-center"><LoadingPage/></div>

    );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-sand pt-20"
      style={{ paddingBottom: "5rem" }}
    >
      <div className="w-[85%] container mx-auto flex flex-col lg:flex-row items-start gap-12">
        <div
          ref={topRef}
          className="w-full opacity-0 md:hidden lg:w-1/2 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-7xl  lg:text-8xl text-charcoal font-bold uppercase">
            Projects?
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
            Take a look at the craftmanship of Prashant. All the crafts are
            built with love and honor.
          </p>
          <button className="bg-beige py-3 px-6 text-bronze font-semibold rounded-bl-4xl rounded-tr-4xl rounded-br-2xl rounded-tl-2xl hover:bg-beige/40 transition-all duration-500 w-max">
            <NavLink to={"/projects"} className="text-bronze">
              All Projects
            </NavLink>
          </button>
        </div>
        <div ref={leftRef} className="w-full opacity-0 lg:w-1/2">
          <div className="relative overflow-hidden rounded-lg ">
            <div
              className="flex transition-transform bg-bronze duration-700 rounded-lg ease-in-out will-change-transform"
              style={{
                transform: `translateX(${-currentIndex * 100}%)`,
                width: `${projects.length * (100/projects.length)}%`,
              }}
            >
              {projects.slice(0, 6).map((project, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <ProjectCard project={project} i={i} />
                </div>
              ))}
            </div>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-1 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full z-10"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full z-10"
            >
              <ChevronRight size={28} />
            </button>
          </div>
          <div className="mt-7 pb-2 items-center justify-center flex space-x-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === currentIndex ? "bg-charcoal" : "bg-beige hover:bg-brown"
                }`}
              />
            ))}
          </div>
        </div>
        <div
          ref={rightRef}
          className="w-full hidden opacity-0 lg:w-1/2 md:flex flex-col items-end justify-center text-end"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-charcoal font-bold uppercase">
            Projects?
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
            Take a look at the craftmanship of Prashant. All the crafts are
            built with love and honor.
          </p>
          <button className="bg-beige py-3 px-6 text-bronze font-semibold rounded-bl-4xl rounded-tr-4xl rounded-br-2xl rounded-tl-2xl hover:bg-beige/40 transition-all duration-500 w-max">
            <NavLink to={"/projects"} className="text-charcoal">
              All Projects
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
