import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ContentContext = createContext();
export const useContent = () => useContext(ContentContext);

const ContentProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("admin_session") || "");
  const [showContent, setShowContent] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [adminData, setAdminData] = useState({
    cred: "",
    password: "",
  });

  const [projectData, setProjectData] = useState({
    name: "",
    images: [],
    technologies: "",
    github: "",
    live: "",
    date: "",
    status: "",
    description: "", // ✅ raw HTML here
    token: token,
  });

  const handleCreateProject = async (projectData) => {
    try {
      const formData = new FormData();

      console.log("token: ", token)
      // Append text fields
      formData.append("name", projectData.name);
      formData.append("technologies", projectData.technologies);
      formData.append("github", projectData.github);
      formData.append("live", projectData.live);
      formData.append("date", projectData.date);
      formData.append("status", projectData.status);
      formData.append("description", projectData.description);
      formData.append("token", projectData.token);

      // Append images
      projectData.images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/projects/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${token}`
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
          token: token,
        });
        alert("Project created successfully!");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const isTokenExpired = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  };

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
    setIsLoading(false);
  }, []);

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
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/login`,
        adminData
      );
      if (response.status === 200) {
        setToken(response.data.token);
        setIsAdminAuthenticated(true);
        setAdminData({ cred: "", password: "" });
      } else {
        setIsAdminAuthenticated(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      setIsAdminAuthenticated(false);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setToken(null);
    setIsAdminAuthenticated(false);
    setAdminData({ cred: "", password: "" });
    localStorage.removeItem("admin_session");
    window.location.href = "/";
  };

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
        setProjectData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
