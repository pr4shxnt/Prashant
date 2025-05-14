// src/context/ContentProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const ContentProvider = ({ children }) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <ContentContext.Provider value={{ showContent, setShowContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
