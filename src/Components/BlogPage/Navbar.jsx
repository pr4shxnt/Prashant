import { Menu, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isScroller, setIsScroller] = useState(null);
  const [menuShow, setMenuShow] = useState(false);
  const [shadow, setShadow]  = useState(false);

  const {pathname} = useLocation();

  useEffect(()=>{
    setShadow(pathname !== "/blogs")
  })

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/blogs/s?query=${encodeURIComponent(search.trim())}`);
    setMenuShow(false)
    setSearch("")
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsScroller(true);
      } else {
        setIsScroller(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`flex z-[9999] ${shadow ? " md:border-b-[1px]  border-charcoal/20" : ""} fixed w-full bg-beige/50 backdrop-blur-sm  py-5 h-max transition-all duration-300 items-center justify-between px-8 md:py-3 text-charcoal  ${
          isScroller
            ? "shadow-sm md:bg-beige/50 backdrop-blur-2xl border-none"
            : "md:bg-transparent md:backdrop-blur-none"
        }`}
      >
        <div className="flex items flex-col w-full ">
          <div className="flex items-center justify-between w-full">
            <div className="font-bold text-2xl ">Prashant</div>
            <div className="hidden md:flex justify-between items-center w-[65%]">
              <ul className="flex gap-6 list-none m-0 p-0">
                <li>
                  <NavLink
                    to="/blogs"
                    onClick={()=> setMenuShow(false)}
                    className=" no-underline  hover:text-beige transition"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs/all-blogs"
                    onClick={()=> setMenuShow(false)}
                    className=" no-underline  hover:text-beige transition"
                  >
                    All Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/curriculum-vitae"
                    onClick={()=> setMenuShow(false)}
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
            </div>

            <button
              onClick={() => setMenuShow(!menuShow)}
              className="md:hidden"
            >
              {menuShow ? <X /> : <Menu />}
            </button>
          </div>

          <div
            className={`w-full h-0 md:hidden overflow-hidden ${
              menuShow ? "h-full py-10 " : ""
            }`}
          >
            <div className="w-full ">
              <ul className="flex w-full mt-10 items-center flex-col gap-7 list-none m-0 p-0">
                <li>
                  <NavLink
                    to="/blogs"
                    onClick={()=> setMenuShow(false)}
                    className=" no-underline  hover:text-beige transition"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs/all-blogs"
                    onClick={()=> setMenuShow(false)}
                    className=" no-underline  hover:text-beige transition"
                  >
                    All Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/curriculum-vitae"
                    onClick={()=> setMenuShow(false)}
                    className=" no-underline  hover:text-beige transition"
                  >
                    About
                  </NavLink>
                </li>
                <li className="w-full mt-20">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <div className="relative py-3 w-full px-10 bg-gray-200 backdrop-blur-3xl  rounded-full">
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none w-96"
                      />
                      <button
                        type="submit"
                        className=" absolute right-0 top-0 flex rounded-r-full gap-2 bg-black py-3 px-5 text-gray-500 w-max"
                      >
                        <Search />
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
