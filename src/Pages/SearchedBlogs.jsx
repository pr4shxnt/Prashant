import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchBlogsByQuery } from "../Features/Blogs/blogSlice";

const SearchedBlogCard = ({ title, content, coverImage, authors, createdAt, slug }) => (
    <><div className="flex flex-col md:flex-row w-full  bg-gray-50/70 shadow-xl rounded-md">
        <img src={coverImage} alt="" className="md:w-[20%] h-44 object-cover rounded-l-md" />
    <div className=" md:w-[80%]  p-3">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p dangerouslySetInnerHTML={{__html: content}} className="text-gray-700 m-0 line-clamp-2"></p>
    <div className="flex gap-1 text-sm mt-6">
    {
        authors?.slice(0,1).map((a)=>{
          return  <p className="">by {a}</p>
        })
    }
    <p className="">on {new Date(createdAt).toLocaleDateString()}</p></div>
    <NavLink className="text-sm text-purple-500 hover:underline" to={`/blogs/read/${slug}`}>Read</NavLink>
  </div>
    </div>
    </>
  
);

const SearchedBlogs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchBlogsByQuery(query))
  },[dispatch, query])


  const {queriedBlogs} = useSelector((state)=> state.blog)

  console.log(queriedBlogs);
  

  if (typeof query !== "string" || query.trim() === "") {
    return (
      <div className="text-center text-gray-500 pt-20">
        Invalid search query.
      </div>
    );
  }


  return (
    <div className="md:w-[80%] mx-auto p-6 pt-32">
       <p className="mb-8 nunito font-light underline text-gray-400">
            Blog /{" "}
            <span className="text-black">
             {query}
            </span>{" "}
           
          </p>
     { queriedBlogs.length > 0? <div className="flex flex-col gap-4">
        
      {queriedBlogs.map((blog, idx) => (
        <SearchedBlogCard key={idx} title={blog.title} content={blog.content} coverImage={blog.coverImage} authors={blog.authors} createdAt={blog.createdAt} slug={blog.slug} />
      ))}</div>: <p className="text-center text-lg">No results for "{query}"</p>}
    </div>
  );
};

export default SearchedBlogs;
