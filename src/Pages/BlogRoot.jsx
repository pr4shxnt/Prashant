import React from 'react'
import Navbar from '../Components/BlogPage/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Sections/Roots/Footer'
import ScrollToTop from '../Utils/ScrollToTop'

const BlogRoot = () => {
  return (
    <>
    <ScrollToTop/>
    <title>Blogs | Prashant Adhikari</title>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default BlogRoot