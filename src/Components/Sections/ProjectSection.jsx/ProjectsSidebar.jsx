import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllProjects } from '../../../Features/Project/projectSlice';
import { ChevronRight } from 'lucide-react';

const ProjectsSidebar = ({ sidebarRef }) => {
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchAllProjects());
    }
  }, [dispatch, projects]);

  return (
    <div ref={sidebarRef} className="bg-charcoal rounded-md fixed md:relative">
      <div>
        <h1 className="text-beige font-bold text-xl px-4 py-6">Prashant's Projects</h1>
      </div>
      <div className="h-full px-8 w-72 flex flex-col items-start gap-2">
        <button className="text-beige cursor-pointer flex items-center gap-2 p-2 py-2 hover:bg-brown/50 rounded-md w-full">
          <NavLink to={`/projects`}>All Projects</NavLink>
          <ChevronRight />
        </button>
        {projects?.map((project) => (
          <button
            key={project._id}
            className="text-beige cursor-pointer flex items-center gap-1 hover:bg-brown/50 px-2 py-2 rounded-md w-full"
          >
            <NavLink to={`/projects/${project.name}`}>{project.name}</NavLink>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSidebar;
