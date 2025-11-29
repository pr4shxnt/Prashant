import InitialRender from "./InitialRender";
import { Outlet, useLocation } from "react-router-dom";
import { useContent } from "../Utils/ContextProvider";
import Footer from "../Components/Sections/Roots/Footer";
import { useEffect, useState } from "react";
import ScrollToTop from "../Utils/ScrollToTop";
import ProdBuild from "./ProdBuild";

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();
  const [render, setRender] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setRender(true);
      setShowContent(false);
    } else {
      setRender(false);
      setShowContent(true);
    }
  }, [location.pathname, setShowContent]);

    if (import.meta.env.MODE === 'production') {
 
  

  return (
    <>
      <title>Maintenance | Prashant Adhikari</title>
      <div className='fixed z-[9999999999999999] text-white flex flex-col items-center justify-center bg-black h-screen w-screen'>
        <h1 className='text-3xl text-center font-bold uppercase tracking-wide'>The website is under development phase.</h1>
        <p className='text-center'>Feel free to contact the developer of this website.</p>
        <div className=" social-links flex items-center z-[200] px-3 py-1">
          <a target='_blank' title='email' href="mailto:prashantadhikareeey.dev@gmail.com" className="">
            <img src="./email.png" alt="" className="w-6 m-2" />
          </a>
          <a target='_blank' title='whatsapp' href="https://wa.me/+9779742433049?text=Hello%20Prashant!" className="">
            <img src="./whatsapp.png" alt="" className="w-5 m-2" />
          </a>
          <a target='_blank' title='instagram' href="https://www.instagram.com/pr4xnt" className="">
            <img src="./instagram.png" alt="" className="w-8 m-1.5" />
          </a>
          <a target='_blank' title='github' href="https://www.github.com/pr4shxnt" className="">
            <img src="./github.png" alt="" className="w-6 m-2"/>
          </a>
        </div>
      </div>
    </>
  )
}

  return (
    <>
    <ProdBuild/>
      <ScrollToTop />
      <div className=" ">
        {render && <InitialRender setShowContent={setShowContent} />}
      </div>

      {showContent && (
        <>
          <Outlet />
          <div className="">
            {" "}
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default RootComponent;
