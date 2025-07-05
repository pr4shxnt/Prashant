import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPoems, uploadNewPoem } from '../../Features/Art/poemSlice';

const ManagePoems = () => {
  const dispatch = useDispatch();
  const { loading, error,poems } = useSelector((state) => state.poems);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    releaseDate: '',
  });

  console.log(poems);
  

  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  console.log(loading);


  useEffect(() => {
    dispatch(fetchAllPoems());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.releaseDate || !imageFile || !audioFile) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(uploadNewPoem({
      poemData: formData,
      imageFile,
      audioFile
    }));

    // Reset fields after submission (optional)
    setFormData({ title: '', author: '', releaseDate: '' });
    setImageFile(null);
    setAudioFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige to-white py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-2">
         <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[650px] overflow-y-scroll custom-scrollbar pr-4">
          {poems?.map((poem) => (
            <div key={poem._id} className="text-white flex flex-col">
              <img
                src={poem.imageUrl}
                alt={poem.title}
                className="rounded-t-lg h-64 object-cover bg-gray-200"
              />
              <div className="flex flex-col gap-2 px-3 py-2 w-full text-gray-200 rounded-b-lg text-center bg-brown">
                <h1 className="">Title: {poem.title}</h1>
                <p className="text-xs">Author: {poem.author}</p>
                <p className="text-xs">Released: {new Date(poem.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-beige/30">
        <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-6 text-center">📜 Upload New Poem</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-charcoal text-sm font-medium mb-1">Poem Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. K aauxau timi?"
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
            />
          </div>

          <div>
            <label className="block text-charcoal text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="e.g. Prashant Adhikari"
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
            />
          </div>

          <div>
            <label className="block text-charcoal text-sm font-medium mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-beige rounded-lg bg-white text-charcoal file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-brown file:text-beige hover:file:bg-charcoal"
            />
          </div>

          <div>
            <label className="block text-charcoal text-sm font-medium mb-1">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-beige rounded-lg bg-white text-charcoal file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-brown file:text-beige hover:file:bg-charcoal"
            />
          </div>

          <div>
            <label className="block text-charcoal text-sm font-medium mb-1">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-brown hover:bg-charcoal text-beige font-medium py-2 rounded-lg transition-all duration-300"
          >
            {loading ? "Uploading..." : "🚀 Submit Poem"}
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div></div>
    </div>
  );
};

export default ManagePoems;
