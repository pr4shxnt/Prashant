import React, { useEffect } from "react";
import { useContent } from "../../Utils/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { createNewSkill } from "../../Features/Skills/skillsSlice";

const SkillsManager = () => {
  const {
    allSkills,
    skillsData,
    setSkillsData,
    handleCreateSkills,
    isLoading,
    error,
  } = useContent();


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSkillsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSkillsData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skillsData.name.trim()) {
      alert("Please enter the skill name.");
      return;
    }
    if (!skillsData.image) {
      alert("Please select an image.");
      return;
    }

    handleCreateSkills(skillsData);
  };

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (skillsData.image && typeof skillsData.image !== "string") {
        URL.revokeObjectURL(skillsData.image);
      }
    };
  }, [skillsData.image]);

  return (
    <div className="flex relative mt-10 px-10">
      {/* Scrollable Skills Section */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          {allSkills?.map((skill) => (
            <div key={skill._id} className="text-white flex  flex-col">
              <img src={skill.image} alt="" className="rounded-t-lg bg-gray-200" />
              <div className="flex flex-col gap-2 px-3 py-2 w-full text-gray-200 rounded-b-lg text-center bg-gray-600">
                <h1>{skill.name}</h1>
                <p className="text-xs">{skill.description.slice(0, 110) + "..."}</p>
                <a
                  className="text-xs text-purple-500 hover:underline"
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {skill.link.slice(0, 30) + "..."}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Form Section */}
      <div className="w-full p-6 h-[650px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 ml-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Add New Skill
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={skillsData.name}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {skillsData.image && typeof skillsData.image !== "string" && (
              <img
                src={URL.createObjectURL(skillsData.image)}
                alt="Skill Preview"
                className="mt-3 h-32 rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Link
            </label>
            <input
              type="text"
              name="link"
              onChange={handleInputChange}
              value={skillsData.link}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleInputChange}
              value={skillsData.description}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillsManager;
