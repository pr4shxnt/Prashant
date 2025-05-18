// Components/MenuBar.jsx
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import MenuContent from "./MenuContent";

const MenuBar = ({ showMenu, setShowMenu }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (showMenu) setShouldRender(true);
  }, [showMenu]);

  const handleCloseComplete = () => {
    setShouldRender(false);
  };

  

  return (
    <div className="relative flex w-full">
      <button onClick={() => setShowMenu(!showMenu)} className="z-[400] cursor-pointer">
        <div className=" bg-black p-1.5 flex items-center justify-center  rounded-full border-2 border-white ">
          {showMenu ? <X stroke="white" /> : <Menu stroke="white" />}
        </div>
      </button>

      {shouldRender && (
        <div className="w-full">
          <MenuContent
            isOpen={showMenu}
            onCloseComplete={handleCloseComplete}
          />
        </div>
      )}
    </div>
  );
};

export default MenuBar;
