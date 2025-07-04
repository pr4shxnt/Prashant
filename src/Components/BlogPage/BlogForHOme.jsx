import { BookCopy } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import CardSwap, { Card } from "./BlogsViewer";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../Features/Blogs/blogSlice";
import gsap from "gsap";

const BlogForHome = () => {
  const dispatch = useDispatch();

  // Refs for animation and observer
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const hasAnimated = useRef(false); // ✅ This was missing earlier

  // Redux state
  const { blogs } = useSelector((state) => state.blog);

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // GSAP animation with IntersectionObserver
  useEffect(() => {
    if (
      !containerRef.current ||
      !leftRef.current ||
      !rightRef.current ||
      hasAnimated.current
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
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

    return () => observer.disconnect();
  }, [blogs]);

  return (
    <div
      className="hidden md:block"
      ref={containerRef}
      style={{
        height: "300px",
        position: "relative",
        width: "80%",
        margin: "200px auto 300px auto",
      }}
    >
      {/* Left Side (Text) */}
      <div
        ref={leftRef}
        className="w-full opacity-0 lg:w-1/2 flex-col items-start justify-center text-start"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-charcoal font-bold uppercase">
          Researchs?
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-brown leading-relaxed mt-2 mb-6">
          Here are Prashant's Recent Blogs. Make sure to go and read the
          latest blog.
        </p>
        <button className="bg-beige py-3 px-6 text-bronze font-semibold rounded-bl-4xl rounded-tr-4xl rounded-br-2xl rounded-tl-2xl hover:bg-beige/40 transition-all duration-500 w-max">
          <NavLink
            to={`/blogs`}
            className="flex items-center justify-center gap-2"
          >
            <BookCopy /> Read
          </NavLink>
        </button>
      </div>

      {/* Right Side (Card Swiper) */}
      <div ref={rightRef} className="relative opacity-0">
    <CardSwap
          cardDistance={70}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={true}
        >
          <Card>
            <div className="h-full w-full relative">
              <div className="bg-gradient-to-t from-black to-transparent w-full h-full absolute rounded-xl z-20"></div>
              <img
                src={blogs?.[0]?.coverImage}
                alt=""
                className="absolute h-full w-full object-cover rounded-xl z-10"
              />
            </div>
          </Card>
          <Card>
            <div className="h-full w-full relative">
              <div className="bg-gradient-to-t from-black to-transparent w-full h-full absolute rounded-xl z-20"></div>
              <img
                src={blogs?.[1]?.coverImage}
                alt=""
                className="absolute h-full w-full object-cover rounded-xl z-10"
              />
            </div>
          </Card>
          <Card>
            <div className="h-full w-full relative">
              <div className="bg-gradient-to-t from-black to-transparent w-full h-full absolute rounded-xl z-20"></div>
              <img
                src={blogs?.[2]?.coverImage}
                alt=""
                className="absolute h-full w-full object-cover rounded-xl z-10"
              />
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
};

export default BlogForHome;
