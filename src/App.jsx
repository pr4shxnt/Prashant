import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootComponent from "./Pages/RootComponent";
import Homepage from "./Pages/Homepage";
import ContentProvider from "./Utils/ContextProvider";
import ProdBuild from "./Pages/ProdBuild";
import AdminLogin from "./Admin/Auth/AdminLogin";
import Rootdir from "./Admin/Pages/rootdir";
import ProjectDisplay from "./Admin/Components/ProjectDisplay";
 

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
      }]
  }
]);

export default function App() {
  return (
  <>{ import.meta.env.PROD? <ProdBuild/> :
       <ContentProvider>
      <RouterProvider router={router} />
    </ContentProvider>}
   </> 
  );
}