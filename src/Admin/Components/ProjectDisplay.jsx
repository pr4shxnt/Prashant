import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Footer from '../../Components/Sections/Roots/Footer';
import MenuBar from '../../Components/MenuBar';
import ProjectsSidebar from '../../Components/Sections/ProjectSection.jsx/ProjectsSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByProjectName } from '../../Features/Project/projectSlice';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectDisplay = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { project, loading, error } = useSelector((state) => state.projects);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sidebarRef = useRef(null);
  const outletRef = useRef(null);
  const titleRef = useRef(null);



  useEffect(() => {
    setShowSidebar(location.pathname !== '/projects');

  }, [location.pathname, ]);


    useEffect(() => {
      if (showSidebar){
        dispatch(fetchByProjectName(name));
      }
  }, [dispatch, name]);

useGSAP(
 
  () => {

     if(!project?.name || project.length === 0) return;

    const sidebarAnim = sidebarRef.current && showSidebar
      ? gsap.fromTo(
          sidebarRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,  
            },
          }
        )
      : null;

    const outletAnim = outletRef.current
      ? gsap.fromTo(
          outletRef.current,
          { autoAlpha: 0, x: 50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 2,
            ease: 'expo.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: outletRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true, 
            },
          }
        )
      : null;

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  },
  { dependencies: [project?.name, showSidebar] } 
);

  // Handle error
  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div>
      {showSidebar && (
        <div ref={titleRef} className="min-h-screen  p-5 flex flex-col gap-0.5 items-center justify-center">
          <p className="text-brown">
            {project.updatedAt && new Date(project.updatedAt).toLocaleString('en-US')}
          </p>
          
          <h1 className="text-brown font-bold text-5xl">{project.name}</h1>
          <p className="mt-1">Home/Projects/{project?.name}</p>
        </div>
      )}

      <div className="fixed bottom-2 left-2 z-[10000]">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

   <div className={`relative flex gap-3 ${showSidebar? "w-[90%]" : "w-[100%]"} mx-auto pb-5`}>
        {showSidebar &&  <ProjectsSidebar sidebarRef={sidebarRef} showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>}
        <div ref={outletRef} className="h-full flex">
        <Outlet/></div>
        </div>

      <Footer />
    </div>
  );
};

export default ProjectDisplay;
