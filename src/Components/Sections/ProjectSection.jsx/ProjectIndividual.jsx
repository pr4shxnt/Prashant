import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchByProjectName } from "../../../Features/Project/projectSlice";
import MenuBar from "../../MenuBar";
import DOMPurify from "dompurify";
import { X } from "lucide-react";

const ProjectIndividual = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.projects);
  const [showMenu, setShowMenu] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [imagesModelOpen, setImagesModelOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchByProjectName(name));
  }, [dispatch, name]);

  useEffect(() => {
    document.title = `Project | ${project?.name || "Loading..."}`;
  }, [project]);

  const techStacks = project?.technologies?.[0]?.split(",") || [];

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-brown font-bold text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-500 font-bold text-2xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
    {project.length >= 1 || !loading  && <div className="bg-sand flex flex-col md:flex-row gap-3 min-h-screen text-brown relative pb-10">
    

      <div className="w-full hidden md:block md:w-[70%]">
        <h1 className="text-3xl font-bold pb-7"></h1>
        <div className="text-brown">
          <div
            className="px-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(project?.description || ""),
            }}
          />
        </div>
      </div>

      <div className="images&infodiv w-full md:w-[30%] flex flex-col">
        {project?.images?.length > 0 && (
          <>
            <img
              onClick={() => setImagesModelOpen(true)}
              src={project.images[activeImageIndex]}
              alt={`Main Project Image`}
              className="hidden md:block h-40 object-cover mb-4 rounded-lg"
            />

            <img
              src={project.images[activeImageIndex]}
              alt={`Main Project Image`}
              className=" md:hidden h-40 object-cover mb-4 rounded-lg"
            />
            <div className="flex flex-wrap">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  onClick={() => handleImageClick(index)}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-12 h-12 object-cover m-1 rounded-lg cursor-pointer ${
                    index === activeImageIndex ? "ring-2 ring-brown" : ""
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <div className="mt-4">
         
          {
            techStacks.length >= 1 && (
              <div className="mt-2">
                <h2 className="md:text-lg text-2xl font-bold md:font-semibold">Technologies Used:</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {techStacks.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-beige/70 px-2 py-1 md:text-xs text-sm rounded mr-2"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )
          }

          <h1 className="md:text-lg text-2xl font-bold md:font-semibold mt-6">{project.name}</h1>
           <div className="">
            <p className="md:text-sm text-gray-600">
              Created on: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="md:text-sm text-gray-600">2
              Last updated: {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <h1 className="lg:text-lg text-2xl font-bold md:font-semibold mt-6">Links</h1>

          <p className="lg:text-sm ">
            Live:{" "}
            <a target="_blank" href={project.live} className="text-purple-500 hover:underline">
              {project.live}
            </a>
          </p>
          <p className="lg:text-sm">
            Github:{" "}
            <a target="_blank" href={project.github} className="text-purple-500 hover:underline">
              {project?.github?.slice(0, 29) + "..."}
            </a>
          </p>

                    <h1 className="md:text-lg text-2xl font-bold md:font-semibold mt-6 flex flex-col">Status</h1>
<span className="md:text-sm  font-normal"> {project.status}</span>
        </div>
      </div>

      <div className="w-full md:hidden pt-10">
        <h1 className="text-3xl font-bold pb-7">Description:</h1>
        <div className="text-brown">
          <div
            className="px-4 "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(project?.description || ""),
            }}
          />
        </div>
      </div>
      {imagesModelOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-3xl flex items-center justify-center z-[99999999]">
          <div className="bg-transparent  flex flex-col justify-center items-center w-[85%] rounded-lg">
            <img
              src={project.images[activeImageIndex]}
              alt={`Full Image ${activeImageIndex + 1}`}
              className=" object-cover rounded-xl"
            />
            <div className="flex w-full px-2 py-2 justify-between items-center">
              <button
                onClick={() => setImagesModelOpen(false)}
                className="mt-2 px-2 rounded-full py-2 bg-brown/50 text-white absolute top-0 right-2"
              >
                <X />
              </button>
              <div className="flex gap-2 ml-2 justify-end items-end w-full">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    onClick={() => handleImageClick(index)}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-12 h-12 object-cover m-1 rounded-lg cursor-pointer ${
                      index === activeImageIndex ? "ring-2 ring-brown" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>}
    </>
  );
};

export default ProjectIndividual;
