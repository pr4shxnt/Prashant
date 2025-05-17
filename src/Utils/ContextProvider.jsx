import React, { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const ContentProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('admin_session' || ""));
  const [showContent, setShowContent] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState(
    {
      cred: "",
      password: "",
    }
  );
  const [projectData, setProjectData] = useState(
    {
      name: "",
      images: [],
      technologies: "",
      github: "",
      live: "",
      date: "",
      status: "",
      token: token
    }
  )
const handleCreateProject = async (projectData) => {
  try {
    const formData = new FormData();

    // Append text fields
    formData.append('name', projectData.name);
    formData.append('technologies', projectData.technologies);
    formData.append('github', projectData.github);
    formData.append('live', projectData.live);
    formData.append('date', projectData.date);
    formData.append('status', projectData.status);
    formData.append('description', projectData.description);
    formData.append('token', projectData.token); // include token here

    // Append images
    projectData.images.forEach((file) => {
      formData.append('images', file);
    });

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/projects/create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 201) {
      setProjectData({
        name: "",
        images: [],
        technologies: "",
        github: "",
        live: "",
        date: "",
        status: "",
        description: "",
        token: ""
      });
      alert("Project created successfully!");
    }
  } catch (error) {
    console.error("Error creating project:", error);
  }
};




  // Helper to check if JWT expired
  const isTokenExpired = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
      setIsAdminAuthenticated(false)
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
        setIsLoading(false)
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
    setError(null);
    try {
      setIsLoading(true)
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
      setError(err.response.data.message);
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

  console.log(token)






  
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
        handleCreateProject,
        projectData,
        setProjectData
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
