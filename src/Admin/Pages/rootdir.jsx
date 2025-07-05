import React, { use, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import ScrollToTop from "../../Utils/ScrollToTop";

const Rootdir = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true)

  const { isAdminAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAdminAuthenticated === false) {
      navigate("/admin/login");
    }
  }, [isAdminAuthenticated, navigate]);

  

  return (
    <div>
      <ScrollToTop/>
      <div className="flex w-full min-h-screen">
        <div className="w-[60%] fixed md:relative z-[100] md:block md:w-[20%]  min-h-full">
          {
            showSidebar && <Sidebar setShowSidebar={setShowSidebar} />
          }
          {
            !showSidebar && <button onClick={()=>setShowSidebar(true)} className="md:hidden fixed top-[50%]"><ChevronRight/></button>
          }
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Rootdir;
