import React, { useEffect, useState } from 'react'
import { fetchAllProjects } from '../../../Features/Project/projectSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MenuBar from '../../MenuBar';

const Projects = () => {
  const dispatch = useDispatch();
  const {projects} = useSelector((state)=> state.projects)
  const [showMenu, setShowMenu] = useState(false);
  useEffect(()=>{
    dispatch(fetchAllProjects())
  },[])


  console.log(projects);
  
  
const getShortDescription = (html, maxLength = 275) => {
  if (typeof document !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.length > maxLength
      ? textContent.slice(0, maxLength) + "..."
      : textContent;
  }
  return "";
};

const ProjectCard = ({ project, i }) => {
  return (
    <div
      key={i}
      className="h-full bg-sand w-full flex-shrink-0 flex flex-col"
    >
    <div className="meta-tags">
    </div>
      <div className="w-full relative h-[300px] overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.name}
          loading="lazy"
          className="w-full h-[100%] object-cover rounded-t-lg"
        />
                <div className="absolute bottom-0 rounded-tl-2xl text-beige p-2 right-0 bg-brown/50"><NavLink to={`/projects/${project.name}`}><ExternalLink/></NavLink></div>

      </div>
      <div className="bg-bronze w-full rounded-b-lg text-cream px-3 py-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">{project.name}</h1>
          <div className="text-sm opacity-80">
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
        <p className="text-sm">
          {getShortDescription(project.description)}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies?.[0]
            ?.split(",")
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
};


  return (
    <div className='bg-sand'>
      <header>
        <title>Projects | Prashant Adhikari</title>
        <div className="h-screen  flex flex-col items-center gap-1.5 justify-center w-full">
          <h1 className="text-charcoal font-bold text-5xl">Personal projects</h1>
          <p className="text-charcoal font-light ">Home / Projects</p>

        </div>
      </header>
      <div className="w-full ">
      <div className="w-[85%] mx-auto grid pb-10 gap-4 grid-cols-1 md:grid-cols-2 ">
      {
        projects.map((project, index)=>{
          return <div className="">
            <ProjectCard project={project} index={index} />
          </div>
        })
      }</div>
      </div>
    </div>
  )
}

export default Projects