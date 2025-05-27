import React, { use, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const Rootdir = () => {
  const navigate = useNavigate();

  const { isAdminAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAdminAuthenticated === false) {
      navigate("/admin/login");
    }
  }, [isAdminAuthenticated, navigate]);

  

  return (
    <div>
      <div className="flex w-full min-h-screen">
        <div className="w-[20%] min-h-screen">
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Rootdir;
