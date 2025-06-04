import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Instagram } from "lucide-react";
import gsap from "gsap";
import Poemcard from "./Poemcard";
import { fetchAllPoems } from "../../../Features/Art/poemSlice";

const Poem = () => {
  const dispatch = useDispatch();
  const { loading, error, poems } = useSelector((state) => state.poems);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const topRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    dispatch(fetchAllPoems());
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
              { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
              "-=0.5"
            )
            .fromTo(
              topRef.current,
              { opacity: 0, y: -100 },
              { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
              "-=0.5"
            );

          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.6 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [poems]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? poems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === poems.length - 1 ? 0 : prev + 1));
  };

  if (loading)
    return (
      <div className="text-center bg-sand h-screen w-full text-brown">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center bg-sand h-screen w-full text-brown">
        Error: {error}
      </div>
    );
  if (!poems.length)
    return (
      <div className="text-center bg-sand h-screen w-full text-brown">
        No poems found
      </div>
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-charcoal font-bold uppercase">
            Creations?
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
            Hey folk, I hope you enjoy these poems if you're bored with
            intellectual things all day.
          </p>
          <button className="bg-beige py-3 px-6 text-bronze font-semibold rounded-bl-4xl rounded-tr-4xl rounded-br-2xl rounded-tl-2xl hover:bg-beige/40 transition-all duration-500 w-max">
            <a href="https://www.instagram.com/pr4xnt" target="_blank" className="flex items-center justify-center gap-2">
              <Instagram /> Follow
            </a>
          </button>
        </div>
        <div
          ref={leftRef}
          className="w-full hidden opacity-0 lg:w-1/2 md:flex flex-col items-start justify-center text-start"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-charcoal font-bold uppercase">
            Creations?
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
            Hey folk, I hope you enjoy these poems if you're bored with
            intellectual things all day.
          </p>
          <button className="bg-beige py-3 px-6 text-bronze font-semibold rounded-bl-4xl rounded-tr-4xl rounded-br-2xl rounded-tl-2xl hover:bg-beige/40 transition-all duration-500 w-max">
            <a href="https://www.instagram.com/pr4xnt" target="_blank" className="flex items-center justify-center gap-2">
              <Instagram /> Follow
            </a>
          </button>
        </div>
        <div ref={rightRef} className="w-full opacity-0 lg:w-1/2">
          <div className="relative overflow-hidden rounded-lg">
            <>
              <Poemcard
                poem={poems[currentIndex]}
                currentIndex={currentIndex}
                total={poems.length}
                onPrev={handlePrev}
                onNext={handleNext}
                setIndex={setCurrentIndex}
              />
              <div className="mt-6 flex overflow-x-auto gap-4 px-1">
                {poems?.map((poem, index) => (
                  <div
                    key={poem._id}
                    className={`min-w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer ${
                      index === currentIndex
                        ? "border-beige"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={poem.imageUrl}
                      alt={poem.title}
                      className="w-12 h-12 object-cover rounded-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poem;
