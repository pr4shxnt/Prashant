import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedBlogs } from '../../Features/Blogs/blogSlice'
import { NavLink } from 'react-router-dom'

export const BlogCard = ({post}) => {
  return (
    <div>
      <div className="group">
        <img src={post.coverImage} alt="" className="h-40 group-hover:rotate-y-[360deg] duration-[2s] ease-in-out transition-all w-full object-cover" />
        <div className="">
          <h1 className="line-clamp-2 font-semibold text-charcoal">{post.title}</h1>
          <p dangerouslySetInnerHTML={{__html: post.content}} className="line-clamp-3 text-sm text-charcoal/60"></p>
          <div className="flex gap-x-2 flex-wrap mb-3">
          {
            post.tags?.map((tag)=>{
              return<NavLink to={`s/${tag}`} className="rounded-full bg-charcoal/60 my-1 w-max py-0.5 px-2 backdrop-blur-3xl text-white text-sm">#{tag}</NavLink>

            })
          }</div>
  
          <NavLink to={`${post.slug}`} className="px-3 py-2 bg-purple-500 duration-300 hover:bg-purple-700 rounded-sm text-white">Read More</NavLink></div>
    
      </div>
    </div>
  )
}

const FeaturedBlogs = () => {
  const dispatch = useDispatch();

  const {featured} = useSelector((state)=> state.blog)

  useEffect(()=>{
    dispatch(fetchFeaturedBlogs())
  },[dispatch])

  console.log(featured)
 return (<div className="relative mb-20">
  <div className="absolute z-0 h-10 w-full top-0 bg-gradient-to-b from-white to-sand"></div>
  <h1 className="text-center text-3xl font-bold text-charcoal py-10 pt-20">Featured Blogs</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 w-[85%] mx-auto">
    {
      featured?.map((post)=>{
        return (<><BlogCard post={post}/></>)
      })
    }
  </div></div>)

}
export default FeaturedBlogs;