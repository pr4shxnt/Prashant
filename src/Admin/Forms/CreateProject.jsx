import React from 'react'
import Notepad from './Notepad'
import { useContent } from '../../Utils/ContextProvider'

const CreateProject = () => {
  const {
    handleCreateProject,
    projectData,
    setProjectData,
    isAdminAuthenticated
  } = useContent()

  console.log(isAdminAuthenticated)

  // Handler for input changes (text)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProjectData(prev => ({ ...prev, [name]: value }))
  }

  console.log("Project Data:", (projectData));

  // Handler for file input change (multiple files)
  const handleFileChange = (e) => {
    setProjectData(prev => ({ ...prev, images: Array.from(e.target.files) }))
  }

  return (
    <div className='bg-gray-900 min-h-screen p-5 '>
      <div className="w-[80%] mx-auto">
        <div className=""><h1 className="text-3xl font-bold text-white pb-2 text-center">Create a new Project.</h1></div>

        <form className="grid pb-5 grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='name'
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='images'
          />
          <input
            type="text"
            name="technologies"
            value={projectData.technologies}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='technologies'
          />
          <input
            type="text"
            name="github"
            value={projectData.github}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='github'
          />
          <input
            type="text"
            name="live"
            value={projectData.live}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='live'
          />
          <input
            type="text"
            name="status"
            value={projectData.status}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='status'
          />
        </form>

        <h1 className='text-xl font-bold text-white pb-2'>Add a Description to your Project.</h1>
        <Notepad setProjectData={setProjectData} projectData={projectData} />

       <button
  onClick={() => handleCreateProject(projectData)}
  disabled={!isAdminAuthenticated}
  className="text-white py-2 px-4 cursor-pointer border mt-2 hover:bg-gray-400 hover:border-gray-400 hover:text-gray-900 rounded duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Create
</button>

      </div>
    </div>
  )
}

export default CreateProject
