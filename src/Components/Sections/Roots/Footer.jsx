import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" z-[9999999999]  py-20  mt-20 relative bg-charcoal w-full">
      <div className="flex w-[85%] mx-auto container flex-col md:flex-row gap-10 items-center default_m justify-center ">
        <div className="flex flex-wrap py-20 md:py-0 justify-around w-[80%] mx-auto gap-10 text-beige">
        

          <div className="">
            <h1 className="text-xl md:text-2xl font-bold mb-1">Take me to </h1>
            <ul className="ml-2">
              <NavLink to={`/`}>
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Home
                </li>
              </NavLink>
              <NavLink to={`/blogs`}>
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Blogs
                </li>
              </NavLink>
              <a href="https://www.clientportal.prashantadhikari7.com.np" target="_blank">
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Hire now
                </li>
              </a>
             
            </ul>
          </div>
          <div className=" rounded-4xl ">
            <div className="flex items-end gap-4 p-5">
              <a
                href="https://www.github.com/pr4shxnt"
                target="_blank"
                className="w-8"
              >
                {" "}
                <svg
                  className="fill-white group-hover:scale-90   transition-all duration-200 ease-in-out"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/prashant-adhikariii/"
                target="_blank"
                className="w-8"
              >
                <svg
                  className="fill-[#0A66C2] group-hover:scale-90   transition-all duration-200 ease-in-out"
                  viewBox="0 0 310 310"
                >
                  <path d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"></path>
                  <path d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"></path>
                  <path d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"></path>
                </svg>
              </a>
              <a
                href="mailto:prashantadhikareeey.dev@gmail.com"
                target="_blank"
                className="w-8"
              >
                <svg
                  className="fill-white group-hover:scale-90   transition-all duration-200 ease-in-out"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                </svg>
              </a>
              <a
                href="https://www.x.com/pr4xnt"
                target="_blank"
                className="w-7"
              >
                <svg
                  className="fill-white group-hover:scale-90   transition-all duration-200 ease-in-out"
                  viewBox="0 0 300 300"
                >
                  <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="">
            <h1 className="text-xl md:text-2xl font-bold mb-1">Redirect </h1>
            <ul className="ml-2">
              <a href="#">
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Youtube
                </li>
              </a>
              <a href="github.com/pr4shxnt/Prashant" target="_blank">
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Source Code
                </li>
              </a>
               <a href="https://www.clientportal.prashantadhikari7.com.np">
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Client Portal
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full justify-center flex bg-charcoal py-3">
        <p className="  text-center  text-white text-xs md:text-sm">
           <sup>MIT</sup> License 2025 | Design, Developed and
          Deployed by{" "}
          <a
            className="underline text-blue-500"
            target="_blank"
            href="https://www.instagram.com/pr4xnt"
          >
            Prashant Adhikari
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
