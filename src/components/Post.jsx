import React, { useState } from 'react';
import axios from 'axios';
import giy from "../assets/eren.jpg";
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState(null);

  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photos", photos);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v1/post/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      setTimeout(() => {
        navigate('/');
      }, 1000);

      console.log("Post created!", res.data);
    } catch (error) {
      console.error("Failed to create post", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${giy})` }}
    >
      <form
        id="sign"
        onSubmit={create}
        className="w-full max-w-md relative top-5 flex flex-col gap-4 p-6 shadow-lg rounded-lg border border-white/10 bg-white/20 backdrop-filter backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold text-white text-center">Create a Post</h1>

        <label className="text-white font-semibold">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded border"
          required
        />

        <label className="text-white font-semibold">Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded border resize-none"
          required
        ></textarea>

        <label className="text-white font-semibold">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotos(e.target.files[0])}
          className="bg-black text-white px-5 py-2 rounded-2xl"
          required
        />

        {photos && (
          <img
            src={URL.createObjectURL(photos)}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-zinc-800 text-white py-2 rounded hover:bg-zinc-900"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default Post;
