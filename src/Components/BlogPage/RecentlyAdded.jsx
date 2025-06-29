import React, { useEffect } from 'react'
import { BlogCard } from './BlogCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../../Features/Blogs/blogSlice';


const RecentlyAdded = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchBlogs())
    },[])

    const {blogs} = useSelector((state)=> state.blog)
  return (
    <div>
        <div className=""><h1 className="text-center text-3xl font-bold text-charcoal my-10 mt-20">Recently Added</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 w-[85%] mx-auto">
            {
              blogs?.slice(0,4).map((post)=>{
                return (<><BlogCard post={post}/></>)
              })
            }
          </div></div>
    </div>
  )
}

export default RecentlyAdded