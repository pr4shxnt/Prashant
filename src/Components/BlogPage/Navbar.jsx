import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isScroller, setIsScroller] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll Y position:", window.scrollY);
      if (window.scrollY >= 180) {
        setIsScroller(true);
      } else {
        setIsScroller(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  console.log(isScroller);
  

  return (
    <>
      <nav
        className={`flex z-[9999] fixed w-full h-max transition-all duration-300 items-center justify-between px-8 py-2 text-charcoal  ${
          isScroller ? "shadow-sm bg-beige/40 backdrop-blur-2xl " : ""
        }`}
      >
        <div className="font-bold text-2xl">Prashant</div>
        <ul className="flex gap-6 list-none m-0 p-0">
          <li>
            <NavLink
              to="/blogs"
              className=" no-underline  hover:text-beige transition"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs/all-blogs"
              className=" no-underline  hover:text-beige transition"
            >
              All Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/curriculum-vitae"
              className=" no-underline  hover:text-beige transition"
            >
              About
            </NavLink>
          </li>
        </ul>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative py-3 w-full px-10 bg-gray-200/50 backdrop-blur-3xl  rounded-full">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-96"
            />
            <button
              type="submit"
              className=" absolute right-0 top-0 flex rounded-r-full gap-2 bg-beige/50 py-3 px-5 text-purple-500 w-max"
            >
              <Search />
            </button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
