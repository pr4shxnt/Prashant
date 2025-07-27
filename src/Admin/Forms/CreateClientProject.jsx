import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../Features/ClientPortal/projectsSlice";

const initialState = {
  Revenue: 0,
  Cost: 0,
  Agreement: "",
  Name: "",
  Discount: 0,
  ClientId: "",
  RepoName: "",
  RepoOwner: "",
  Completion: 0,
  Deadline: "",
  Description: "",
};

const CreateClientProject = () => {
  const [project, setProject] = useState(initialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(project))
    alert(JSON.stringify(project, null, 2));
  };

  return (
    <div className="min-h-screen bg-sand py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Placeholder for Project List or Info */}
        <div className="w-full md:w-1/2 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">
            📋 Project Info
          </h2>
          <div className="p-4 bg-brown text-beige rounded-lg shadow">
            <p className="text-charcoal">
              You can display project list or info here.
            </p>
          </div>
        </div>

        {/* Project Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-beige/30">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-6 text-center">
            🏗️ Create a new Client Project
          </h2>
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={project.Name}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Revenue
                </label>
                <input
                  type="number"
                  name="Revenue"
                  value={project.Revenue}
                  onChange={handleChange}
                  placeholder="Revenue"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  name="Cost"
                  value={project.Cost}
                  onChange={handleChange}
                  placeholder="Cost"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="Discount"
                  value={project.Discount}
                  onChange={handleChange}
                  placeholder="Discount (%)"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Agreement
                </label>
                <input
                  type="file"
                  name="Agreement"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProject((prev) => ({
                      ...prev,
                      Agreement: file || "",
                    }));
                  }}
                  placeholder="Agreement"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Client ID
                </label>
                <input
                  type="text"
                  name="ClientId"
                  value={project.ClientId}
                  onChange={handleChange}
                  placeholder="Client ID"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Repo Name
                </label>
                <input
                  type="text"
                  name="RepoName"
                  value={project.RepoName}
                  onChange={handleChange}
                  placeholder="Repo Name"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Repo Owner
                </label>
                <input
                  type="text"
                  name="RepoOwner"
                  value={project.RepoOwner}
                  onChange={handleChange}
                  placeholder="Repo Owner"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Completion (%)
                </label>
                <input
                  type="number"
                  name="Completion"
                  value={project.Completion}
                  onChange={handleChange}
                  placeholder="Completion (%)"
                  min={0}
                  max={100}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  name="Deadline"
                  value={project.Deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="Description"
                  value={project.Description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-beige rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 bg-brown hover:bg-charcoal text-beige font-medium py-2 rounded-lg transition-all duration-300"
            >
              🚀 Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientProject;
