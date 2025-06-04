import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchByProjectName } from '../../../Features/Project/projectSlice';
import MenuBar from '../../MenuBar';
import DOMPurify from 'dompurify';

const ProjectIndividual = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.projects);
  const [showMenu, setShowMenu] = useState(false);
console.log(name)
  useEffect(() => {
    dispatch(fetchByProjectName(name));
  }, [dispatch, name]);


const techStacks = project?.technologies?.[0]?.split(',') || []


 console.log(techStacks);
 

if(loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-brown font-bold text-2xl">Loading...</div>
      <title>Project | loading</title>
    </div>
  )}else if(error) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-red-500 font-bold text-2xl">Error: {error}</div>
    </div>
  )}

  document.title = `Project | ${project.name || 'Loading...'}`; 

  return (
    <div className="bg-sand min-h-screen text-brown relative py-10">
    <div className="fixed bottom-2 left-2 z-[10000] ">
        <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    <div className="h-screen p-5 flex flex-col items-center justify-center">

      <div className="text-brown font-bold text-5xl">{project.name}</div>
      <div className="text-brown">{new Date(project.updatedAt).toLocaleString('en-US')}</div>
    </div>
    <div className="">
    <div className="w-[60%] mx-auto text-brown">
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(project.description || ''),
    }}
  />

  <div className="mt-5">
    <h2 className="text-2xl font-bold mb-3">Technologies Used:</h2>
    <ul className="flex gap-3 pl-5">
      {techStacks.map((tech, index) => (
        <li key={index} className="text-lg bg-gray-800 py-1 px-3">
          {tech.trim()}
        </li>
      ))}
    </ul>
  </div>
</div>

    
    </div>
    </div>
  );
}

export default ProjectIndividual;
