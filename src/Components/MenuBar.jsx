import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import MenuContent from "./MenuContent";
import clsx from "clsx"; // optional, for cleaner class toggling

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
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="z-[400] cursor-pointer relative w-10 h-10"
      >
        <div className="bg-gray-900 p-1.5 rounded-full border-2 border-white flex items-center justify-center relative w-full h-full overflow-hidden">
          <span
            className={clsx(
              "absolute transition-all duration-300 ease-in-out",
              showMenu ? "opacity-0 rotate-45 scale-75" : "opacity-100 rotate-0 scale-100"
            )}
          >
            <Menu stroke="white" />
          </span>

          <span
            className={clsx(
              " transition-all duration-300 ease-in-out",
              showMenu ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-75"
            )}
          >
            <X stroke="white" />
          </span>
        </div>
      </button>

      {shouldRender && (
        <div className="w-full">
          <MenuContent isOpen={showMenu} onCloseComplete={handleCloseComplete} />
        </div>
      )}
    </div>
  );
};

export default MenuBar;
