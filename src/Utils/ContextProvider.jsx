import React, { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const ContentProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState({
    cred: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to check if JWT expired
  const isTokenExpired = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  };

  // Run only once after component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_session");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem("admin_session");
        setToken(null);
        setIsAdminAuthenticated(false);
      } else {
        setToken(storedToken);
        setIsAdminAuthenticated(true);
      }
    }
  }, []);

  // Keep localStorage in sync with token state
  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_session", token);
    } else {
      localStorage.removeItem("admin_session");
    }
  }, [token]);

  const handleAdminLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/login`,
        adminData
      );
      if (response.status === 200) {
        setToken(response.data.token);
        setIsAdminAuthenticated(true);
        setAdminData({ username: "", email: "", password: "" });
      } else {
        setIsAdminAuthenticated(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      setIsAdminAuthenticated(false);
      setError("Internal Server Error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setToken(null);
    setIsAdminAuthenticated(false);
    setAdminData(null);
    localStorage.removeItem("admin_session");
    window.location.href = '/';
  }

  
  return (
    <ContentContext.Provider
      value={{
        isAdminAuthenticated,
        token,
        adminData,
        setAdminData,
        error,
        isLoading,
        handleAdminLogin,
        handleAdminLogout,
        showContent,
        setShowContent,
        showParagraph,
        setShowParagraph,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
