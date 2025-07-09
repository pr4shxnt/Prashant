import React, { useRef, useEffect } from "react";
import Navbar from "../Components/BlogPage/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Sections/Roots/Footer";
import ScrollToTop from "../Utils/ScrollToTop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BlogRoot = () => {
  
  useEffect(() => {
    document.title = "Blogs | Prashant Adhikari";
  }, []);

  return (
    <>
      <ScrollToTop />
      <div >
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BlogRoot;
