import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogBySlug } from "../Features/Blogs/blogSlice";
import LoadingPage from "../Utils/loadingpage";
import RecommendedBlogs from "../Components/BlogPage/RecommendedBlogs";
import { fetchRecommendedBlogs } from "../Features/Blogs/blogSlice";

const BlogIndividual = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isScroller, setIsScroller] = useState(null);
  const { blog, loading } = useSelector((state) => state.blog);
  const { recommended } = useSelector((state) => state.blog);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
  }, [dispatch]);

  useEffect(() => {
    if (blog?.tags?.length && blog?._id) {
      dispatch(fetchRecommendedBlogs({ tags: blog.tags, excludeId: blog._id }));
    }
  }, [blog]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsScroller(true);
      } else {
        setIsScroller(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  console.log(blog);

  useEffect(() => {
    if (loading || !blog) {
      setInitialLoad(true);
    } else {
      setInitialLoad(false);
    }
  }, [loading, blog]);


  if (initialLoad || loading || !blog)
    return (
      <>
        <div className="h-screen">
          <LoadingPage />
        </div>
      </>
    );

  return (
    <>
      <div className="w-[80%]  mx-auto flex flex-col md:flex-row gap-6">
        <div className="pt-32 container w-[95%] md:w-[70%] h-full flex flex-col mx-auto">
          <p className="mb-8 nunito font-light underline text-gray-400">
            Blog /{" "}
            <span className="text-black">
              {" "}
              {slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>{" "}
            / {blog.researchId}
          </p>
          <h1 className="text-2xl font-bold mb-1">{blog.title}</h1>
          <h1 className=" font-light">
            Authored by{" "}
            {blog?.authors?.map((author) => {
              return <span>{author}</span>;
            })}{" "}
            at {new Date(blog.createdAt).toLocaleDateString()}
          </h1>
          <img src={blog.coverImage} alt="" className="mt-4" />
          <p
            className="mt-10 px-3 [&_a]:hover:underline [&_a]:text-sm  [&_a]:text-purple-500   [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          ></p>
          <p className="mt-40 text-sm font-light">
            Last updated at {new Date(blog.updatedAt).toLocaleDateString()} |{" "}
            {blog?.authors?.map((author) => {
              return <span>{author}</span>;
            })}{" "}
          </p>
        </div>
        <div
          className={`md:sticky ${
            isScroller
              ? "top-20 transition-all duration-500"
              : "top-60 transition-all duration-500"
          } pt-2 w-full md:w-[30%] h-max  px-3`}
        >
          <h2 className="text-lg nunito text-end font-semibold mb-4">
            Also Read
          </h2>
          <div className="flex flex-col gap-3 ">
            {
              recommended?.map((inx, idx)=>{
                         return   <RecommendedBlogs blog={inx} />

              })
            }
          </div>

          <div className="">
            <h1 className="font-bold text-lg mt-10 nunito text-end">Links</h1>
            <a
              href={blog.researchLink}
              target="_blank"
              className="text-sm hover:underline text-purple-500 mt-2 line-clamp-1"
            >
              {blog.researchLink?.slice(0, 63)}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndividual;
