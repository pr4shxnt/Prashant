import React, { useEffect } from "react";
import { useContent } from "../../Utils/ContextProvider";

const SkillsManager = () => {
  const {
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

    // Basic validation
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
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
  );
};

export default SkillsManager;
