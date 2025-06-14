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
import LoadingPage from '../../Utils/loadingpage';
import Waves from '../../Components/Waves';

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

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShowSidebar(location.pathname !== '/projects');
  }, [location.pathname]);

  useEffect(() => {
    if (showSidebar && name) {
      dispatch(fetchByProjectName(name));
    }
  }, [dispatch, name, showSidebar]);

  useGSAP(
    () => {
      if (loading || showLoading) return;
      if (!project?.name) return;

      const sidebarAnim =
        sidebarRef.current && showSidebar
          ? gsap.fromTo(
              sidebarRef.current,
              { autoAlpha: 0,},
              {
                autoAlpha: 1,
                duration: 3,
                ease: 'expo.out',
                delay: 0.2,
                scrollTrigger: {
                  trigger: sidebarRef.current,
                  start: 'top 90%',
                  
                  once: true,
                },
              }
            )
          : null;
      const titleAnim =
        titleRef.current
          ? gsap.fromTo(
              titleRef.current,
              { autoAlpha: 0,},
              {
                autoAlpha: 1,
                duration: 3,
                ease: 'expo.out',
                delay: 0.2,
                scrollTrigger: {
                  trigger: titleRef.current,
                  start: 'top 90%',
                  
                  once: true,
                },
              }
            )
          : null;

      const outletAnim = outletRef.current
        ? gsap.fromTo(
            outletRef.current,
            { opacity: 0, },
            {
              opacity: 1,
              duration: 3,
              ease: 'expo.out',
              delay: 0.9,
              scrollTrigger: {
                trigger: outletRef.current,
                start: 'top 90%',
                
                once: true,
              },
            }
          )
        : null;

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [loading, showLoading, project?.name, showSidebar] }
  );

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">Error: {error}</div>
    );
  }

  if (loading || showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-charcoal">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div>
      {showSidebar && (
        <header ref={titleRef}
          className="min-h-screen p-5 relative flex flex-col gap-0.5 items-center justify-center"
        >
          <div className="h-full w-full absolute">
            <Waves/>
          </div>
          <p className="text-black">
            {project.updatedAt &&
              new Date(project.updatedAt).toLocaleString('en-US')}
          </p>

          <h1 className="text-black text-center font-bold text-5xl">{project.name}</h1>
          <p className="mt-1">Home/Projects/{project?.name}</p>
        </header>
      )}

      <div className="fixed bottom-2 left-2 z-[10000]">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      <div
        className={`relative  flex gap-3 ${
          showSidebar ? 'w-[90%]' : 'w-[100%]'
        } mx-auto pb-5`}
      >
        {showSidebar && (
          <ProjectsSidebar
            sidebarRef={sidebarRef}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        )}
        <div ref={outletRef} className="h-full w-full flex">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDisplay;
