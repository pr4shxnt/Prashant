import InitialRender from './InitialRender';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useContent } from '../Utils/ContextProvider';

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();

  return (
    <>
       <div className=" ">
        <InitialRender setShowContent={setShowContent} />
      </div>

       {showContent && (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default RootComponent;
