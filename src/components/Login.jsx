import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Denji from '../assets/Denji.jpg';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handellogin = async (e) => {
    e.preventDefault();
    const userdata = { username, password };

    try {
      const response = await axios.post('https://anime-qww3.onrender.com/api/v1/api/token/', userdata);
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem("username", res.data.username); // on login


      setUsername("");
      setPassword("");

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-cover text-white px-4 sm:px-6' style={{ backgroundImage: `url(${Denji})` }}>
      <div id='sign' className='flex items-center justify-center w-full'>
        <form
          onSubmit={handellogin}
          className='flex flex-col items-center justify-center shadow-xl shadow-black text-zinc-800 border border-white/20 backdrop-filter bg-white/10 rounded-2xl backdrop-blur-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[500px] p-6 sm:p-8 relative top-5'
        >
          <h1 className='text-2xl sm:text-3xl text-white font-bold mb-4'>Login</h1>

          <div className='flex flex-col gap-3 w-full'>
            <label className='text-white text-sm sm:text-base'>Name</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className='rounded-2xl bg-white/70 shadow-md p-3 text-sm sm:text-base'
              type='text'
              placeholder='Enter your name'
            />
            <small>{error.username && <p className='text-red-600'>{error.username}</p>}</small>

            <label className='text-white text-sm sm:text-base'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-2xl bg-white/70 shadow-md p-3 text-sm sm:text-base'
              type='password'
              placeholder='Enter your password'
            />
            <small>{error.password && <p className='text-red-600'>{error.password}</p>}</small>
          </div>

          <button className='bg-black text-white mt-5 py-2 px-8 rounded-3xl text-sm sm:text-base' type='submit'>
            Login
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
