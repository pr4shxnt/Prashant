import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/store";
import RootComponent from "./Pages/RootComponent";
import Homepage from "./Pages/Homepage";
import ContentProvider from "./Utils/ContextProvider";
import ProdBuild from "./Pages/ProdBuild";
import AdminLogin from "./Admin/Auth/AdminLogin";
import Rootdir from "./Admin/Pages/rootdir";
import ProjectDisplay from "./Admin/Components/ProjectDisplay";
import CreateProject from "./Admin/Forms/CreateProject";
import SkillsManager from "./Admin/Forms/SkillsManager";
import ProjectIndividual from "./Components/Sections/ProjectSection.jsx/ProjectIndividual"; 
import ManagePoems from "./Admin/Forms/ManagePoems";
import Projects from "./Components/Sections/ProjectSection.jsx/Projects";
import LoadingPage from "./Utils/loadingpage";
import ResumeManager from "./Admin/Components/ResumeManager";
import Resume from "./Pages/Resume";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
       
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin/>,
  },
  {
    path: "/admin",
    element: <Rootdir />,
    children: [
      {
        path: "projects",
        element: <ProjectDisplay/>
      },
      {
        path: "projects-create",
        element: <CreateProject/>
      },
      {
        path: "skills-management",
        element: <SkillsManager/>
      },
      {
        path: "poems",
        element: <ManagePoems/>
      },
      {
        path: "resume",
        element: <ResumeManager/>
      }

    ]
  },
  {
    path: '/projects',
    element: <ProjectDisplay />,
    children: [
      {
        path: '',
        element: <Projects/>
      },
      {
        path: ':name',
        element: <ProjectIndividual />
      },
      
    ],
    
  },
  {path: "/curriculum-vitae",
  element: <Resume />,}
]);

export default function App() {
  return (
  <>
  
    <Provider store={store}>
       <ContentProvider>
      <RouterProvider router={router} />
    </ContentProvider></Provider>
   </> 
  );
}