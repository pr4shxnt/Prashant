import InitialRender from './InitialRender';
import { Outlet } from 'react-router-dom';
import { useContent } from '../Utils/ContextProvider';
import Footer from '../Components/Sections/Roots/Footer';

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();



  return (
    <>
       <div className=" ">
        <InitialRender setShowContent={setShowContent} />
      </div>

       {showContent && (
        <>
                  <Outlet />
                  <Footer/>
        </>
      )}
      
    </>
  );
};

export default RootComponent;
