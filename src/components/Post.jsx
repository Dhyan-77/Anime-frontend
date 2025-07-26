import React, { useState } from 'react';
import axios from 'axios';
import giy from "../assets/giyu.jpg";
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [animeImage, setAnimeImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setAnimeImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('animeImage', animeImage);

    const token = localStorage.getItem('accessToken');

    try {
      const res = await axios.post(
        'https://animeback-dv04.onrender.com/api/anime-list/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Post created successfully:", res.data);
      navigate("/home");
    } catch (error) {
      console.error("Failed to create post:", error.response?.data || error.message);
      setError(error.response?.data || { detail: "Unknown error occurred" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Anime Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <input
            type="file"
            accept="image/*"
            className="w-full text-white"
            onChange={handleImageChange}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error.detail || error.code || "Something went wrong"}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded text-white"
          >
            Submit
          </button>
        </form>
        <img src={giy} alt="Giyu" className="mt-6 rounded-md w-full" />
      </div>
    </div>
  );
};

export default Post;
