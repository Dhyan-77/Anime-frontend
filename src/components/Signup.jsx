import React, { useState } from 'react';
import gutsImage from '../assets/guts.png';
import blue from "../assets/blue.jpeg";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Signup = () => {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();
    const userdata = { username, email, password };

    try {
      setLoading(true);
      setError({});

      const response = await axios.post(
        "https://anime-qww3.onrender.com/api/v1/register/",
        userdata
      );

      setEmail("");
      setPassword("");
      setuserName("");
      setError({});

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ general: "Something went wrong. Please try again later." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center px-4" 
      style={{ backgroundImage: `url(${blue})` }}
    >
      <div 
        id="sign" 
        className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl shadow-black border border-white/20 p-6 animate-sign"
      >
        <form 
          id='sign' 
          className="flex flex-col items-center text-zinc-800" 
          onSubmit={handlesignup}
        >
          <h1 className="text-3xl font-bold mb-4">Signup</h1>

          {error.general && (
            <p className="text-red-600 text-sm mb-2">{error.general}</p>
          )}

          <div className="flex flex-col gap-3 w-full">
            <label>Name</label>
            <input
              onChange={(e) => setuserName(e.target.value)}
              value={username}
              className="rounded-2xl bg-white/70 shadow-md p-3"
              type="text"
              placeholder="Enter your name"
              disabled={loading}
            />
            {error.username && <p className="text-red-600 text-sm">{error.username}</p>}

            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-2xl bg-white/70 shadow-md p-3"
              type="email"
              placeholder="Enter your email"
              disabled={loading}
            />
            {error.email && <p className="text-red-600 text-sm">{error.email}</p>}

            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-2xl bg-white/70 shadow-md p-3"
              type="password"
              placeholder="Enter your password"
              disabled={loading}
            />
            {error.password && <p className="text-red-600 text-sm">{error.password}</p>}
          </div>

          <button
            className="bg-black text-white mt-6 shadow-xl py-2 px-8 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <div className="flex gap-2 mt-4 text-sm">
            <p className="text-zinc-800">Already have an account?</p>
            <Link to="/login">
              <p className="text-black underline">Log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
