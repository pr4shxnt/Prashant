import React, { useEffect } from 'react';
import { fetchAllProjects } from '../../../Features/Project/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import FlowingMenu from './projectsFlow';
import Waves from '../../Waves';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!projects.length) {
      dispatch(fetchAllProjects());
    }
  }, [dispatch]);

  const items = projects.map((project) => ({
    link: `/projects/${project.name}`,
    text: project.name,
    image: project.images?.[0] || '',
  }));

  const getShortDescription = (html, maxLength = 100) => {
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      return textContent.length > maxLength
        ? textContent.slice(0, maxLength) + '...'
        : textContent;
    }
    return '';
  };

  const ProjectCard = ({ project }) => (
    <div className="h-full bg-sand w-full flex-shrink-0 flex flex-col">
      <div className="w-full relative h-[300px] overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 rounded-tl-2xl text-beige p-2 right-0 bg-brown/50">
          <NavLink to={`/projects/${project.name}`}>
            <ExternalLink />
          </NavLink>
        </div>
      </div>
      <div className="bg-bronze w-full rounded-b-lg text-cream px-3 py-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">{project.name}</h1>
          <div className="text-sm opacity-80">
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
        <p className="text-sm">{getShortDescription(project.description)}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies?.[0]
            ?.split(',')
            .slice(0, 7)
            .map((tech, index) => (
              <span
                key={index}
                className="bg-beige/20 px-2 py-1 text-xs rounded mr-2"
              >
                {tech.trim()}
              </span>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <title>Projects | Prashant Adhikari</title>
      <div className="bg-sand w-full ">
        <header className="w-full relative">
          <div className="absolute h-full w-full">
            <Waves/>
          </div>
          <div className="h-screen flex flex-col items-center gap-1.5 justify-center w-full">
            <h1 className="text-charcoal text-center font-bold text-5xl">Personal projects</h1>
            <p className="text-charcoal font-light">Home / Projects</p>
          </div>
        </header>

        <div className="w-full">
          <div className="w-full pb-10">
            {error && (
              <div className="text-center text-red-500">Failed to load projects.</div>
            )}

            {!error && projects.length > 0 && (
              <>
              <div className='relative pt-10 min-h-screen  items-center hidden md:flex'>
                <FlowingMenu items={items} />
              </div>
               <div className="w-[85%] mx-auto md:hidden grid pb-10 gap-4 grid-cols-1  ">
        {
          projects.map((project, index)=>{
            return <div key={index} className="mt-10">
              <ProjectCard project={project} index={index} />
            </div>
          })
        }</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
