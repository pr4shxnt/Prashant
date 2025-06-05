import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import Footer from '../../Components/Sections/Roots/Footer'
import MenuBar from '../../Components/MenuBar'
import ProjectsSidebar from '../../Components/Sections/ProjectSection.jsx/ProjectsSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchByProjectName } from '../../Features/Project/projectSlice'

const ProjectDisplay = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const { project, loading, error } = useSelector((state) => state.projects);
  const [showMenu, setShowMenu] = useState(false);
console.log(name)
  useEffect(() => {
    dispatch(fetchByProjectName(name));
  }, [dispatch, name]);


const techStacks = project?.technologies?.[0]?.split(',') || []


 console.log(techStacks);


 const location = useLocation();

 useEffect(() => {
 if (location.pathname === '/projects') {
  setShowSidebar(false);
 } else {
  setShowSidebar(true);
 }}, [location.pathname]);

 console.log(loading);
 
 
  return (

    <div>
      { showSidebar && !loading ? <div className="h-screen p-5 flex flex-col items-center justify-center">

      <div className="text-brown font-bold text-5xl">{project.name}</div>
      <div className="text-brown">{new Date(project.updatedAt).toLocaleString('en-US')}</div>
    </div> : <div className="h-screen p-5 flex items-center justify-center">
      <div className="text-brown font-bold text-5xl">Loading...</div>
      </div>}
       <div className="fixed bottom-2 left-2 z-[10000] ">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
      <div className={`relative flex gap-3 ${showSidebar? "w-[90%]" : "w-[100%]"} mx-auto pb-5`}>
        {showSidebar && <ProjectsSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>}
        <Outlet/>
        </div>
    
    <Footer/>
    </div>
  )
}

export default ProjectDisplay