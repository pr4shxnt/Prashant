import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="   py-20   relative bg-brown w-full">
      <div className="flex w-[85%] mx-auto container flex-col md:flex-row gap-10 items-center default_m justify-between ">
        <div className="">
          <img
            className="w-40 md:w-64"
            src="https://res.cloudinary.com/drddkl4on/image/upload/v1748102698/side-avatar_tplpd0.png"
            alt="logo"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-white">
          <div className="">
            <h1 className="text-xl md:text-2xl font-bold mb-1"> Links</h1>
            <ul>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Hire-me
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Projects
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Home
              </li>
            </ul>
          </div>

          <div className="">
            <h1 className="text-xl md:text-2xl font-bold mb-1">Quick Links</h1>
            <ul>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Home
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Contact
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Projects
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Arts Gallery
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Blogs
              </li>
            </ul>
          </div>

          <div className="">
            <h1 className="text-xl md:text-2xl font-bold mb-1">Redirect </h1>
            <ul>
              <NavLink>
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Youtube
                </li>
              </NavLink>
              <NavLink>
                {" "}
                <li className="text-xs md:text-sm   cursor-pointer hover:underline">
                  Source Code
                </li>
              </NavLink>

            </ul>
          </div>

          <div className="">
            <h1 className="text-xl md:text-2xl font-bold mb-1">Follow me</h1>
            <ul>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Instagram
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Facebook
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Twitter
              </li>
              <li className="text-xs md:text-sm hover:underline cursor-pointer ">
                Linkedin
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full justify-center flex bg-beige py-3">
        <p className="  text-center  text-gray-700 text-xs md:text-sm">
          PrashFolio <sup>©</sup> Copyright 2025 | Design and
          Developed by{" "}
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
