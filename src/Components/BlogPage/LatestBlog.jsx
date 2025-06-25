import React, { useEffect } from "react";
import { fetchLatestBlog } from "../../Features/Blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { html } from "framer-motion/client";
import { NavLink } from "react-router-dom";

const LatestBlog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestBlog());
  }, [dispatch]);

  const { latestBlog } = useSelector((state) => state.blog);

  console.log(latestBlog);

  return (
    <div className="relative  bg-black/90 md:h-[70vh] py-20 md:p-0 my-auto  overflow-hidden shadow-2xl">
  {/* Overlay */}
  <div className="absolute inset-0 backdrop-blur-xs bg-gradient-to-b from-black/60 to-black/90 z-10" />

  <img
    src={latestBlog.coverImage}
    alt={latestBlog.title}
    className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-500 hover:scale-110"
  />

  {/* Header Badge */}
  <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-purple-400 to-purple-700 px-5 pr-10 py-3 rounded-br-4xl text-xl font-semibold text-white shadow-lg">
    Latest Blog
  </div>

  {/* Content */}
  <div className="relative z-20 w-[75%] mx-auto flex flex-col  justify-center my-auto h-[100%] md:p-8 text-white ">
    <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
      {latestBlog.title}
    </h1>

    <p className="text-base md:text-lg text-white/80 mb-4 md:line-clamp-4 max-w-3xl">
      {latestBlog.metaDescription} 
      <br />
      <NavLink to={`/blogs/${latestBlog.slug}`}>Read More...</NavLink>
    </p>

    <div className="flex gap-2 flex-wrap mt-2">
      {latestBlog.tags?.map((tag) => (
        <span
          key={tag}
          className="bg-white/10 px-3 py-1 text-sm rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition"
        >
          #{tag}
        </span>
      ))}
    </div>
  </div>
</div>

  );
};

export default LatestBlog;
