import {
  BookAudio,
  BookTypeIcon,
  Code2,
  Copyright,
  Grid2X2Check,
  Home,
  InfoIcon,
  LogOut,
  LucideComputer,
  MapPlusIcon,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContent } from "../../Utils/ContextProvider";
import { logoutAdmin } from "../../Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({setShowSidebar}) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutAdmin());
  };

  const [logoutModal, setLogoutModal] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Grid2X2Check size={18} />,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <LucideComputer size={18} />,
    },
    {
      name: "Create Project",
      path: "/admin/projects-create",
      icon: <MapPlusIcon size={18} />,
    },
    {
      name: "Skills",
      path: "/admin/skills-management",
      icon: <Code2 size={18} />,
    },
    {
      name: "Panel Settings",
      path: "/admin/Certificates",
      icon: <BookAudio size={18} />,
    },
    {
      name: "Poems manager",
      path: "/admin/poems",
      icon: <BookAudio size={18}/>
    },
    {
      name: "Personal Resume",
      path: "/admin/resume",
      icon: <InfoIcon size={18} />,
    },
    { name: "Blogs manager", path: "/admin/blogs", icon: <Users size={18} /> },
    {
      name: "Contacts",
      path: "/admin/contacts",
      icon: <BookTypeIcon size={18} />,
    },
    
    { name: "Home", path: "/", icon: <Home size={18} /> },
  ];
  return (
    <div className="w-full h-screen md:h-full">
      <div className="w-full relative bg-brown h-full">
        <div className="absolute text-center text-xs w-full bottom-0 left-0  bg-charcoal text-white p-4">
          <h1 className="flex gap-1 justify-center">
            Copyright{" "}
            <sup>
              {" "}
              <Copyright size={8} />{" "}
            </sup>{" "}
            2025
          </h1>
          <h1>Prashant Adhikari {`<3`}</h1>
        </div>
        <div className="flex px-3  border-b border-gray-400 pt-4 pb-6 justify-between">
          <h1 className="tracking-widest uppercase font-bold items-center text-sm text-white">
            prashant
          </h1>
          <button className="hidden md:block" onClick={() => setLogoutModal(true)}>
            <LogOut size={18} stroke="red" />
          </button>
          <button className="md:hidden" onClick={()=>{setShowSidebar(false)}}><X/></button>
        </div>
        {navLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={({ isActive }) => (isActive ? "bg-gray-800" : "")}
          >
            <div
              key={index}
              className="p-4 text-sm text-white hover:bg-bronze/30"
            >
              <div className="flex pl-2 items-center">
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </div>
            </div>
          </NavLink>
        ))}
        <button
          onClick={() => setLogoutModal(true)}
          className="flex p-4 pl-6 w-full text-sm text-white hover:bg-gray-800 hover:text-red-500 items-center"
        >
          <LogOut size={18} />
          <span className="ml-2">Logout</span>
        </button>
      </div>
      {logoutModal && (
        <div className="fixed top-0 left-0 w-full h-full font-light bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 w-[90%] md:w-[23%] rounded shadow-lg">
            <h2 className="text-lg text-center mx-auto ">
              Hello there admin ! <br /> Are you sure you want to leave the
              admin panel??
            </h2>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setLogoutModal(false)}
                className="bg-gray-800 text-white border border-gray-800 px-4 py-1.5 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logOut();
                }}
                className="border-red-500 border text-red-500 hover:border-red-800 duration-500 hover:bg-red-800 hover:text-white px-4 py-1.5 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
