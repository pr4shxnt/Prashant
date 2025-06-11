import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEducation, addEducation } from '../../Features/Personals/educationSlice';

const ManageEducation = () => {
  const dispatch = useDispatch();
  const { loading, error, educations } = useSelector((state) => state.education);

  const [formData, setFormData] = useState({
    Institution: "",
    Level: "",
    Field: "",
    Address: "",
    Website: "",
    Grade: "",
    From: "",
    To: ""
  });

  useEffect(() => {
    dispatch(fetchAllEducation());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some((value) => value.trim() === "");
    if (isEmpty) {
      alert("Please fill in all fields.");
      return;
    }

  
    dispatch(addEducation(formData));

    
  };

  
  

  return (
    <div className="min-h-screen bg-sand py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Education List */}
        <div className="w-full md:w-1/2 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">📚 Education List</h2>
          {educations?.length > 0 ? (
            educations.map((edu) => (
              <div key={edu._id} className="mb-4 p-4 bg-brown text-beige rounded-lg shadow">
                <h3 className="text-lg font-bold">{edu.Level} in {edu.Field} @ {edu.Institution}</h3>
                <p className="text-sm">📅 {new Date(edu.From).toLocaleDateString()} - {new Date(edu.To).toLocaleDateString()}</p>
                <div className="text-sm mt-2 opacity-80">
                  <p>📍 {edu.Address}</p>
                  <p>🌐 {edu.Website}</p>
                  <p>🎓 Grade: {edu.Grade}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-charcoal">No education data found.</p>
          )}
        </div>

        {/* Education Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-beige/30">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-6 text-center">🎓 Add Education</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Institution</label>
                <input
                  type="text"
                  name="Institution"
                  value={formData.Institution}
                  onChange={handleInputChange}
                  placeholder="e.g. MIT"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Level</label>
                <input
                  type="text"
                  name="Level"
                  value={formData.Level}
                  onChange={handleInputChange}
                  placeholder="e.g. Bachelor's"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Field</label>
                <input
                  type="text"
                  name="Field"
                  value={formData.Field}
                  onChange={handleInputChange}
                  placeholder="e.g. Computer Science"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleInputChange}
                  placeholder="e.g. 77 Massachusetts Ave, Cambridge, MA"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  name="Website"
                  value={formData.Website}
                  onChange={handleInputChange}
                  placeholder="e.g. https://mit.edu"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Grade</label>
                <input
                  type="text"
                  name="Grade"
                  value={formData.Grade}
                  onChange={handleInputChange}
                  placeholder="e.g. 3.9 GPA"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">From</label>
                <input
                  type="date"
                  name="From"
                  value={formData.From}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">To</label>
                <input
                  type="date"
                  name="To"
                  value={formData.To}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-brown hover:bg-charcoal text-beige font-medium py-2 rounded-lg transition-all duration-300"
            >
              {loading ? "Submitting..." : "🚀 Submit Education"}
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageEducation;
