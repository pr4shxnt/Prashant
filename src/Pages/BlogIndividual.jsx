import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogBySlug } from '../Features/Blogs/blogSlice'
import LatestBlog from '../Components/BlogPage/LatestBlog'

const BlogIndividual = () => {
    const {slug} = useParams()
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchBlogBySlug(slug))
    },[dispatch])

    const {blog} = useSelector((state)=> state.blog)

    console.log(blog);
    

  return (
    <>
    <div className="pt-32 container w-[95%] md:w-[60%] h-full flex flex-col mx-auto">
      <p className="mb-8 nunito font-light underline text-gray-400">Blog / <span className="text-black"> {  slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span> / {blog.researchId}</p>
      <h1 className="text-2xl font-bold mb-1">{blog.title}</h1>
      <h1 className=" font-light">Authored by {blog?.authors?.map((author)=> {return <span>{author}</span>} )} at {new Date(blog.createdAt).toLocaleDateString()}</h1>
      <img src={blog.coverImage} alt="" className="mt-4" />
      <p className="mt-10 px-3" dangerouslySetInnerHTML={{__html: blog?.content}} ></p>
      <p className="mt-40 text-sm font-light">Last updated at {new Date(blog.updatedAt).toLocaleDateString()} | {blog?.authors?.map((author)=> {return <span>{author}</span>} )} </p>
    </div>
    </>
)
}

export default BlogIndividual