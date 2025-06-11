import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExperience, addExperience } from '../../Features/Personals/experienceSlice';

const ManageExperience = () => {
  const dispatch = useDispatch();
  const { loading, error, experiences } = useSelector((state) => state.experience);

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startingDate: "",
    endDate: "",
    description: "",
    companyEmail: "",
    companySite: "",
    companyPhone: "",
    companyAddress: "",
  });

  useEffect(() => {
    dispatch(fetchAllExperience());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some(value => value.trim() === "");
    if (isEmpty) {
      alert("Please fill in all fields.");
      return;
    }
    

    dispatch(addExperience(formData));

  
  };

  return (
    <div className="min-h-screen bg-sand py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Experience List */}
        <div className="w-full md:w-1/2 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">💼 Experience List</h2>
          {experiences?.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp._id} className="mb-4 p-4 bg-brown text-beige rounded-lg shadow">
                <h3 className="text-lg font-bold">{exp.role} @ {exp.company}</h3>
                <p className="text-sm">📅 {new Date(exp.startingDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}</p>
                <p className="mt-1">{exp.description}</p>
                <div className="text-sm mt-2 opacity-80">
                  <p>📧 {exp.companyEmail}</p>
                  <p>🌐 {exp.companySite}</p>
                  <p>📞 {exp.companyPhone}</p>
                  <p>🏢 {exp.companyAddress}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-charcoal">No experience data found.</p>
          )}
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-beige/30">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-6 text-center">🧩 Add Experience</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Google"
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startingDate"
                value={formData.startingDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                placeholder="e.g. hr@company.com"
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Company Website</label>
              <input
                type="url"
                name="companySite"
                value={formData.companySite}
                onChange={handleInputChange}
                placeholder="e.g. https://company.com"
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Company Phone</label>
              <input
                type="tel"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                placeholder="e.g. +1 234-567-8900"
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                placeholder="e.g. 123 Tech Lane, NY"
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities, achievements..."
                rows={4}
                className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-brown hover:bg-charcoal text-beige font-medium py-2 rounded-lg transition-all duration-300"
            >
              {loading ? "Submitting..." : "🚀 Submit Experience"}
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageExperience;
