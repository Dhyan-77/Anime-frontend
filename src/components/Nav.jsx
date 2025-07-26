import React, { useState } from 'react';
import HHH from '../assets/ooo.webp';
import { Link } from 'react-router-dom';
import "../App.css";
import Logout from './Logout';

const Nav = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id='nav' className="w-full fixed top-0 bg-white/10 border border-white/10 rounded-b-2xl backdrop-filter backdrop-blur-sm px-4 sm:px-8 z-50">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="h-12 w-12 bg-cover bg-center rounded-full"
          style={{ backgroundImage: `url(${HHH})` }}
        ></div>

        {/* Hamburger Icon (Mobile) */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex flex-row gap-6">
          <Link to="/">
            <h1 className="rounded-3xl bg-white/70 text-black shadow-md transition duration-300 ease-in-out hover:underline text-[19px] px-4 py-2 cursor-pointer">
              Home
            </h1>
          </Link>
          <Link to="/create">
            <h1 className="rounded-3xl bg-white/70 text-black shadow-md transition duration-300 ease-in-out hover:underline text-[19px] px-4 py-2 cursor-pointer">
              Create
            </h1>
          </Link>
        </div>

        {/* Desktop Search & Auth */}
        <div className="hidden sm:flex gap-4 items-center">
         
          {isLoggedIn ? (
            <Logout />
          ) : (
            <Link to="/signup">
              <button className="rounded-3xl bg-white/70 text-black shadow-md transition duration-300 ease-in-out hover:underline text-[19px] px-4 py-2 cursor-pointer">
                Sign in
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-4 mt-4 pb-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <h1 className="rounded-3xl bg-white/70 text-black text-center shadow-md transition duration-300 hover:underline text-[17px] px-4 py-2 cursor-pointer">
              Home
            </h1>
          </Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>
            <h1 className="rounded-3xl bg-white/70 text-black text-center shadow-md transition duration-300 hover:underline text-[17px] px-4 py-2 cursor-pointer">
              Create
            </h1>
          </Link>
          
          {isLoggedIn ? (
            <div className="flex justify-center">
              <Logout />
            </div>
          ) : (
            <div className="flex justify-center">
              <Link to="/signup">
                <button className="rounded-3xl bg-white/70 text-black shadow-md transition duration-300 hover:underline text-[17px] px-4 py-2 cursor-pointer">
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
