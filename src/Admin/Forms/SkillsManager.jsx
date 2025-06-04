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
    <div className="flex relative mt-10 px-10 bg-gradient-to-br ">
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
              <div className="flex flex-col gap-2 px-3 py-2 w-full text-gray-200 rounded-b-lg text-center bg-brown">
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
      <div className="w-full p-6 h-[650px] bg-white/90 border-beige/30 rounded-2xl shadow-xl border  ml-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 ">
          Add New Skill
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-charcoal ">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={skillData.name}
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-charcoal ">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-beige rounded-lg bg-white text-charcoal file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-brown file:text-beige hover:file:bg-charcoal"
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
            <label className="block mb-1 text-sm font-medium text-charcoal ">
              Link
            </label>
            <input
              type="text"
              name="link"
              onChange={handleInputChange}
              value={skillData.link}
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-charcoal ">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleInputChange}
              value={skillData.description}
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
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
            className={`mt-6 bg-brown w-full hover:bg-charcoal text-beige font-medium py-2 rounded-lg transition-all duration-300`}
          >
            {loading ? "Submitting..." : "Submit Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillsManager;
