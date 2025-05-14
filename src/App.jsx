import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootComponent from "./Pages/RootComponent";
import Homepage from "./Pages/Homepage";
import ContentProvider from "./Utils/ContextProvider";
 

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
]);

export default function App() {
  return (
  <>
       <ContentProvider>
      <RouterProvider router={router} />
    </ContentProvider>
   </> 
  );
}