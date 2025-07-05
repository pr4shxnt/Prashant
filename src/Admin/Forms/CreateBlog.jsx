import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../Features/Blogs/blogSlice";
import { setBlogData } from "../../Features/Blogs/blogSlice";
import NotepadComp from "../Components/NotepadComp";

const CreateBlog = () => {
  const dispatch = useDispatch();

  const { blogData, loading, error } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    authors: "",
    tags: "",
    researchId: "",
    researchLink: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combinedData = {
      ...formData,
      coverImage,
      content: blogData.content,
      tags: formData.tags,
      authors: formData.authors,
      metaTitle: formData.metaTitle,
    };

    dispatch(createBlog(combinedData));

  };

  return (
    <div className="px-6 py-3 bg-white rounded-3xl m-10 w-[90%] mx-auto">
      <h1 className="text-3xl text-center font-bold text-charcoal mb-6">
        📰 Create a Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-3">
        {[
          ["title", "Title"],
          ["slug", "Slug"],
          ["authors", "Authors (comma-separated)"],
          ["tags", "Tags (comma-separated)"],
          ["researchId", "Research ID"],
          ["researchLink", "Research Link"],
          ["metaTitle", "Meta tags"],
          ["metaDescription", "Meta Description"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-charcoal text-sm font-medium mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-beige rounded-lg bg-white text-charcoal"
              required
            />
          </div>
        ))}

        <div className="col-span-2">
          <label className="block text-charcoal text-sm font-medium mb-1">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full  px-4 py-2 border border-beige rounded-lg bg-white text-charcoal file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-brown file:text-beige hover:file:bg-charcoal"
            required
          />
        </div>

        <div className="col-span-2">
          <NotepadComp />
        </div>

        {error && (
          <p className="col-span-2 text-red-500 text-sm mt-2">Error: {error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-brown w-max text-white font-semibold py-2 px-4 rounded hover:bg-charcoal transition"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
