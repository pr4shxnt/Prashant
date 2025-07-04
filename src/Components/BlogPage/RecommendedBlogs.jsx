import React from 'react'
import { NavLink } from 'react-router-dom'

const RecommendedBlogs = ({blog}) => {
  return (
    <div>
         <div className="bg-white rounded-md shadow-xl">
              <img
                src={blog.coverImage}
                alt=""
                className="w-full h-36 object-cover"
              />
              <h1 className="mt-2 pt-3 text-sm px-3 line-clamp-2">{blog.title}</h1>
              <NavLink to={`/blogs/read/${blog.slug}`} className="px-3 text-end text-purple-500 hover:underline pb-3 text-sm">Read Now</NavLink>
            </div>
    </div>
  )
}

export default RecommendedBlogs