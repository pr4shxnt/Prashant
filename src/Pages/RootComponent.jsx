import InitialRender from './InitialRender';
import { Outlet } from 'react-router-dom';
import { useContent } from '../Utils/ContextProvider';
import ProdBuild from './ProdBuild';

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();

  return (
    <>
       <div className=" ">
        <InitialRender setShowContent={setShowContent} />
      </div>

       {showContent && (
        <>
          <ProdBuild/>
          <Outlet />
        </>
      )}
    </>
  );
};

export default RootComponent;
