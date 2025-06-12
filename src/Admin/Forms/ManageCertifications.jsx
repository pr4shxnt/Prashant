import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCertification,
  deleteCertificate,
  fetchCertificate,
} from '../../Features/Personals/certificationSlice';

const ManageCertification = () => {
  const dispatch = useDispatch();
  const { loading, error, certificates } = useSelector((state) => state.certificate);

  const [formData, setFormData] = useState({
    issuer: '',
    title: '',
    dateIssued: '',
    certificate: '',
    certificateUrl: '',
    credentialId: '',
  });

  useEffect(() => {
    dispatch(fetchCertificate());
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

    const { issuer, title, dateIssued, certificate, credentialId } = formData;
    if (!issuer || !title || !dateIssued || !certificate || !credentialId) {
      alert('Please fill in all required fields.');
      return;
    }

    dispatch(addCertification(formData)).then((res) => {
      if (!res.error) {
        setFormData({
          issuer: '',
          title: '',
          dateIssued: '',
          certificate: '',
          certificateUrl: '',
          credentialId: '',
        });
      }
    });
  };

  console.log(formData);
  

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      dispatch(deleteCertificate(id));
    }
  };

  return (
    <div className="min-h-screen bg-sand py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Certificate List */}
        <div className="w-full md:w-1/2 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">📚 Certification List</h2>
          {certificates?.length > 0 ? (
            certificates.map((cert) => (
              <div key={cert._id} className="mb-4 p-4 bg-brown text-beige rounded-lg shadow">
                <h3 className="text-lg font-bold">{cert.title}</h3>
                <p className="text-sm">🏢 Issued by: {cert.issuer}</p>
                <p className="text-sm">📅 Date Issued: {new Date(cert.dateIssued).toLocaleDateString()}</p>
                <p className="text-sm">🆔 Credential ID: {cert.credentialId}</p>
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-200 underline mt-2 inline-block"
                  >
                    📄 View Certificate
                  </a>
                )}
                <p className="text-xs text-end">
                  <button
                    onClick={() => handleDelete(cert._id)}
                    className="text-red-300 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </p>
              </div>
            ))
          ) : (
            <p className="text-charcoal">No certification data found.</p>
          )}
        </div>

        {/* Certificate Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-beige/30">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-6 text-center">
            🎓 Add Certification
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Issuer</label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  placeholder="e.g. Coursera"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Web Development"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Date Issued</label>
                <input
                  type="date"
                  name="dateIssued"
                  value={formData.dateIssued}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div>
                <label className="block text-charcoal text-sm font-medium mb-1">Credential ID</label>
                <input
                  type="text"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleInputChange}
                  placeholder="e.g. XYZ-12345"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-charcoal text-sm font-medium mb-1">Certificate URL</label>
                <input
                  type="text"
                  name="certificateUrl"
                  value={formData.certificateUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/view"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-charcoal text-sm font-medium mb-1">
                  Certificate File (PDF)
                </label>
                <input
                  type="file"
                  name="certificate"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      certificate: e.target.files[0],
                    }))
                  }
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-brown hover:bg-charcoal text-beige font-medium py-2 rounded-lg transition-all duration-300"
            >
              {loading ? 'Submitting...' : '🚀 Submit Certification'}
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCertification;
