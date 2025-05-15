import InitialRender from './InitialRender';
import { Outlet } from 'react-router-dom';
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
                  <Outlet />
        </>
      )}
    </>
  );
};

export default RootComponent;
