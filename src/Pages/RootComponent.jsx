import InitialRender from './InitialRender';
import { Outlet } from 'react-router-dom';
import { useContent } from '../Utils/ContextProvider';
import ProdBuild from './ProdBuild';
import { useState } from 'react';

const RootComponent = () => {
  const { showContent, setShowContent } = useContent();
const [showCont, setShowCont] = useState(false);

const production = import.meta.env.NODE_ENV;

if (production === 'production') {
      setShowCont(false);
}

  return (
    <>
       <div className=" ">
        <InitialRender setShowContent={setShowContent} />
      </div>

       {showContent && (
        <>

          <ProdBuild/>
          {!showCont && <Outlet />}
        </>
      )}
    </>
  );
};

export default RootComponent;
