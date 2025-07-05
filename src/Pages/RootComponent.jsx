import InitialRender from './InitialRender';
import { Outlet, useLocation } from 'react-router-dom';
import { useContent } from '../Utils/ContextProvider';
import Footer from '../Components/Sections/Roots/Footer';
import { useEffect, useState } from 'react';
import ScrollToTop from '../Utils/ScrollToTop';

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();
  const [render, setRender] = useState(false);
  const location = useLocation();
  

useEffect(() => {
  if (location.pathname === '/') {
    setRender(true);
    setShowContent(false);
  } else {
    setRender(false);
    setShowContent(true);
  }
}
, [location.pathname, setShowContent]);


  return (
    <>
    <ScrollToTop/>
       <div className=" ">{ render && 
                <InitialRender setShowContent={setShowContent} />
                }      
                </div>

       {showContent && (
        <>
                  <Outlet />
                  <div className="container mx-auto">                  <Footer/>
</div>
        </>
      )}
      
    </>
  );
};

export default RootComponent;
