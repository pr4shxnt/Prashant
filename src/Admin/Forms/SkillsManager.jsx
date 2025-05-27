import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSkill,
  fetchAllSkills,
  setSkillData,
} from "../../Features/Skills/skillsSlice";

const SkillsManager = () => {
  const dispatch = useDispatch();
  const { skills, skillData, loading, error } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(fetchAllSkills());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSkillData({ ...skillData, [name]: value }));
  };

  const handleFileChange = (e) => {
    dispatch(setSkillData({ ...skillData, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skillData.name.trim()) {
      alert("Please enter the skill name.");
      return;
    }

    if (!skillData.image) {
      alert("Please select an image.");
      return;
    }

    const file = skillData.image;
    dispatch(createNewSkill({ skillData, file })).then((res) => {
      if (!res.error) {
        dispatch(fetchAllSkills());
      }
    });
  };

  useEffect(() => {
    return () => {
      if (skillData.image && typeof skillData.image !== "string") {
        URL.revokeObjectURL(skillData.image);
      }
    };
  }, [skillData.image]);

  return (
    <div className="flex relative mt-10 px-10">
      {/* Skills Display */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          {skills?.Skills?.map((skill) => (
            <div key={skill._id} className="text-white flex flex-col">
              <img
                src={skill.image}
                alt={skill.name}
                className="rounded-t-lg bg-gray-200"
              />
              <div className="flex flex-col gap-2 px-3 py-2 w-full text-gray-200 rounded-b-lg text-center bg-gray-600">
                <h1>{skill.name}</h1>
                <p className="text-xs">
                  {skill.description?.slice(0, 110) + "..."}
                </p>
                <a
                  className="text-xs text-purple-500 hover:underline"
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {skill.link?.slice(0, 30) + "..."}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Form */}
      <div className="w-full p-6 h-[650px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 ml-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Add New Skill
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={skillData.name}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Image Upload */}
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
            {skillData.image && typeof skillData.image !== "string" && (
              <img
                src={URL.createObjectURL(skillData.image)}
                alt="Skill Preview"
                className="mt-3 h-32 rounded-lg object-cover"
              />
            )}
          </div>

          {/* Link */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Link
            </label>
            <input
              type="text"
              name="link"
              onChange={handleInputChange}
              value={skillData.link}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleInputChange}
              value={skillData.description}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillsManager;
