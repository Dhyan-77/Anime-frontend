import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Denji from '../assets/Denji.jpg';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handellogin = async (e) => {
    e.preventDefault();
    const userdata = { username, password };

    try {
      setLoading(true);
      setError({});

      const response = await axios.post(
        'https://anime-qww3.onrender.com/api/v1/api/token/',
        userdata
      );

      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('username', response.data.username || username);

      setUsername('');
      setPassword('');

      setTimeout(() => {
        navigate('/');
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
      className='flex justify-center items-center min-h-screen bg-cover text-white px-4 sm:px-6'
      style={{ backgroundImage: `url(${Denji})` }}
    >
      <div id='sign' className='flex items-center justify-center w-full'>
        <form
          onSubmit={handellogin}
          className='flex flex-col items-center justify-center shadow-xl shadow-black text-zinc-800 border border-white/20 backdrop-filter bg-white/10 rounded-2xl backdrop-blur-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[500px] p-6 sm:p-8 relative top-5'
        >
          <h1 className='text-2xl sm:text-3xl text-white font-bold mb-4'>Login</h1>

          {error.general && (
            <p className="text-red-600 text-sm mb-2 text-center">{error.general}</p>
          )}

          <div className='flex flex-col gap-3 w-full'>
            <label className='text-white text-sm sm:text-base'>Name</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className='rounded-2xl bg-white/70 shadow-md p-3 text-sm sm:text-base'
              type='text'
              placeholder='Enter your name'
              disabled={loading}
              required
            />
            {error.username && <p className='text-red-600 text-sm'>{error.username}</p>}

            <label className='text-white text-sm sm:text-base'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-2xl bg-white/70 shadow-md p-3 text-sm sm:text-base'
              type='password'
              placeholder='Enter your password'
              disabled={loading}
              required
            />
            {error.password && <p className='text-red-600 text-sm'>{error.password}</p>}
          </div>

          <button
            className='bg-black text-white mt-5 py-2 px-8 rounded-3xl text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-3'>
            <p className='text-white text-sm'>Don't have an account?</p>
            <Link to="/signup">
              <p className='text-black underline text-sm'>Sign up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
