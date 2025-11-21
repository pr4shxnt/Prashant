import React, { useEffect, useState } from 'react';
import Pagination from '../Components/Pagination';
import { SearchedBlogCard } from './SearchedBlogs';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedBlogs } from '../Features/Blogs/blogSlice';

const AllBlogs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); // track current page

  const { paginatedBlogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getPaginatedBlogs(page));
  }, [dispatch, page]);

  return (
    <div className="min-h-screen">
      <div className="md:w-[80%] mx-auto p-6 pt-32">
        <p className="mb-8 nunito font-light underline text-gray-400">
          Blog / <span className="text-black">All Blogs</span> /  {page}
        </p>

        {paginatedBlogs?.blogs?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {paginatedBlogs?.blogs?.map((blog, idx) => (
              <SearchedBlogCard
                key={idx}
                title={blog.title}
                content={blog.content}
                coverImage={blog.coverImage}
                authors={blog.authors}
                createdAt={blog.createdAt}
                slug={blog.slug}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No blogs available.</p>
        )}
      </div>

     
      
        <Pagination
          currentPage={page}
          totalPages={paginatedBlogs?.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      
    </div>
  );
};

export default AllBlogs;
