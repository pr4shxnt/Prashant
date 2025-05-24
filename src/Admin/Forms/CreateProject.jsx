import React, { useState } from 'react';
import Notepad from './Notepad';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProject, setProjectData } from '../../Features/Project/projectSlice';
import { useContent } from '../../Utils/ContextProvider';

const CreateProject = () => {
  const dispatch = useDispatch();
  const { projectData } = useSelector(state => state.projects);
  const { token, isAdminAuthenticated } = useContent()

  // Local state to hold File objects (not in Redux)
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProjectData({ ...projectData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    // Store only filenames (or some metadata) in Redux
    dispatch(setProjectData({ ...projectData, imagesInfo: selectedFiles.map(file => file.name) }));
  };

  const handleSubmit = () => {
    // Dispatch thunk with projectData and actual files
    dispatch(createNewProject({ projectData: { ...projectData, token }, files }));
  };

  return (
    <div className='bg-gray-900 min-h-screen p-5'>
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold text-white pb-2 text-center">Create a new Project.</h1>

        <form className="grid pb-5 grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='Name'
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
          />
          <input
            type="text"
            name="technologies"
            value={projectData.technologies}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='Technologies'
          />
          <input
            type="text"
            name="github"
            value={projectData.github}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='GitHub'
          />
          <input
            type="text"
            name="live"
            value={projectData.live}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='Live'
          />
          <input
            type="text"
            name="status"
            value={projectData.status}
            onChange={handleInputChange}
            className="bg-gray-100/15 py-2 px-3 rounded-lg"
            placeholder='Status'
          />
        </form>

        <h1 className='text-xl font-bold text-white pb-2'>Add a Description to your Project.</h1>
        <Notepad setProjectData={(data) => dispatch(setProjectData(data))} projectData={projectData} />

        <button
          onClick={handleSubmit}
          disabled={!isAdminAuthenticated}
          className="text-white py-2 px-4 cursor-pointer border mt-2 hover:bg-gray-400 hover:border-gray-400 hover:text-gray-900 rounded duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
