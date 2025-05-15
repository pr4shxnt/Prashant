import React from 'react'
import Notepad from './Notepad'

const CreateProject = () => {
  return (
    <div className='bg-gray-900 min-h-screen p-5 '>
      <div className="w-[80%] mx-auto">
              <div className=""><h1 className="text-3xl font-bold text-white pb-2 text-center">Create a new Project.</h1></div>

      <div className="grid pb-5 grid-cols-2  gap-4">
        <input type="text" className="bg-gray-100/15 py-2 px-3 rounded-lg " placeholder='name' />
        <input type="file" className="bg-gray-100/15 py-2 px-3 rounded-lg " placeholder='images' />
        <input type="text" className="bg-gray-100/15 py-2 px-3 rounded-lg " placeholder='technologies' />
        <input type="text" className="bg-gray-100/15 py-2 px-3 rounded-lg " placeholder='github' />
        <input type="text" className="bg-gray-100/15 py-2 px-3 rounded-lg " placeholder='live' />
        <input type="text" className="bg-gray-100/15 py-2 px-3 rounded-lg " placeholder='date' />
      </div>
      <h1 className='text-xl font-bold text-white pb-2'>Add a Description to your Project.</h1>
      <Notepad/>
      <button className="text-white py-2 px-4 cursor-pointer border mt-2 hover:bg-gray-400 hover:border-gray-400 hover:text-gray-900 rounded duration-500">Create</button>
    </div></div>
  )
}

export default CreateProject