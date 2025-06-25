import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

const ContentContext = createContext();
export const useContent = () => useContext(ContentContext);

const ContentProvider = ({ children }) => {
  const [showContent, setShowContent] = useState(false);
  const [showParagraph, setShowParagraph] = useState(true);
   const [showMenu, setShowMenu] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const [scrolled, setScrolled] = useState(0);


  const contextValue = useMemo(
    () => ({
      showContent,
      setShowContent,
      showMenu,
      setShowMenu,
      showHam,
      setShowHam,
      showParagraph,
      setShowParagraph,
       scrolled,
      setScrolled,
    }),
    [
      showMenu,
      showHam,
      showContent,
      showParagraph,
      scrolled
    ]
  );

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
