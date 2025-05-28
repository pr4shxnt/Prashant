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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "projects/:name",
        element: <ProjectIndividual />,
      }
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
      }
    ]
  }
]);

export default function App() {
  return (
  <>
  {
    import.meta.env.PROD ? <ProdBuild/> :
    <Provider store={store}>
       <ContentProvider>
      <RouterProvider router={router} />
    </ContentProvider></Provider>}
   </> 
  );
}