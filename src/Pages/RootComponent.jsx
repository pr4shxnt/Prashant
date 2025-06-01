import InitialRender from './InitialRender';
import { Outlet, useLocation } from 'react-router-dom';
import { useContent } from '../Utils/ContextProvider';
import Footer from '../Components/Sections/Roots/Footer';
import { useEffect, useState } from 'react';

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();
  const [render, setRender] = useState(false);
  const location = useLocation();
  

useEffect(() => {
  if (location.pathname === '/') {
    setRender(true);
  } else {
    setRender(false);
    setShowContent(true);
  }
}
, [location.pathname, setShowContent]);


  return (
    <>
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
