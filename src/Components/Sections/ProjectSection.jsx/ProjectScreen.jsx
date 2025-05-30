import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../../Features/Project/projectSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL = 10000;

const getShortDescription = (html, maxLength = 200) => {
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

const ProjectScreen = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      }, SLIDE_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [projects]);

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // ScrollTrigger animation setup
  useEffect(() => {
    if (!leftRef.current || !rightRef.current || !containerRef.current) return;

    // Initial state: hidden and offset horizontally
    gsap.set(leftRef.current, { opacity: 0, x: -100 });
    gsap.set(rightRef.current, { opacity: 0, x: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", // triggers when top of container hits 90% viewport height
        toggleActions: "play none none none",
        // markers: true, // uncomment to debug positions
      },
    });

    tl.to(leftRef.current, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }).to(
      rightRef.current,
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      ">0.3"
    );

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  if (!projects.length)
    return <div className="text-center text-white">Loading...</div>;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-sand min-h-[100vh] pt-28"
      style={{ paddingBottom: "5rem" }} // ensure enough space below to scroll
    >
      <div className="w-[85%] mx-auto flex flex-col lg:flex-row items-start gap-12">
        <div ref={leftRef} className="w-full lg:w-1/2">
          {/* Project Showcase */}
          <div className="relative max-w-4xl overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              {projects.slice(0, 6).map((project, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full flex flex-col items-center justify-center"
                >
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="bg-bronze text-cream px-3 py-3 w-full">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-lg">{project.name}</h1>
                      <div className="text-sm opacity-80">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      {getShortDescription(project.description)}
                    </p>
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
              ))}
            </div>

            {/* Chevron Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-1 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-7 pb-2 flex space-x-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === currentIndex
                    ? "bg-white"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Description & CTA */}
        <div
          ref={rightRef}
          className="w-full lg:w-1/2 flex flex-col items-end justify-center text-end"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-charcoal font-bold uppercase">
            Projects?
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
            Take a look at the craftmanship of Prashant. All the crafts are
            built with love and honor.
          </p>
          <button className="bg-beige py-3 px-6 text-bronze font-semibold rounded-bl-4xl rounded-tr-4xl rounded-br-2xl rounded-tl-2xl hover:bg-cream transition-all duration-500 w-max">
            All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
