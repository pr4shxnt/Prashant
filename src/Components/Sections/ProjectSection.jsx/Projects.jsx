import React, { useEffect } from 'react'
import { fetchAllProjects } from '../../../Features/Project/projectSlice'
import { useDispatch, useSelector } from 'react-redux'

const Projects = () => {
  const dispatch = useDispatch();
  const {projects} = useSelector((state)=> state.projects)

  useEffect(()=>{
    dispatch(fetchAllProjects())
  },[])


  console.log(projects);
  



  return (
    <div>
      <header>
        <div className="h-screen flex flex-col items-center gap-1.5 justify-center w-screen">
          <h1 className="text-white font-bold text-5xl">Personal projects</h1>
          <p className="text-white font-light ">Home / Projects</p>

        </div>
      </header>
      <div className="w-[85%] mx-auto grid grid-cols-1 gap-4">
      {
        projects.map((project, index)=>{
          return <div className=""></div>
        })
      }
      </div>
    </div>
  )
}

export default Projects