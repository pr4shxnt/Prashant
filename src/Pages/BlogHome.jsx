import React from 'react'
import BlogHomePage from '../Components/BlogPage/BlogHomePage'
import LatestBlog from '../Components/BlogPage/LatestBlog'
import FeaturedBlogs from '../Components/BlogPage/BlogCard'
import RecentlyAdded from '../Components/BlogPage/RecentlyAdded'

const BlogHome = () => {
  return (
    <>
    <BlogHomePage/>
    <FeaturedBlogs/>
    <LatestBlog/>
    <RecentlyAdded/>
    </>
)
}

export default BlogHome