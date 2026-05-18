import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import assets from '../assets/assets.js';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const activeClass = "text-blue-500";
  const logoSrc = theme === 'dark' ? (assets.logo_dark || assets.logo) : assets.logo;

  return (
    <nav className='relative flex justify-between items-center px-4 sm:px-12 lg:px-24 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>
      <img src={logoSrc} className='w-32 sm:w-40' alt="AgencyAI logo" />

      {/* Desktop Links */}
      <div className='hidden lg:flex flex-1 justify-center space-x-8'>
        <NavLink to="/" className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
          About
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
          Services
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
          Contact
        </NavLink>
      </div>

      {/* Desktop Right Side — Theme + Logout */}
      <div className='hidden lg:flex items-center gap-4'>
        <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'>
          <img src={theme === "dark" ? assets.sun_icon : assets.moon_icon} alt="Toggle theme" className='w-6 h-6' />
        </button>
        <button
          onClick={handleLogout}
          className='bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-sky-800 transition duration-300 text-sm'
        >
          Logout
        </button>
      </div>

      {/* Mobile Icons */}
      <div className="lg:hidden flex items-center gap-4">
        <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'>
          <img src={theme === "dark" ? assets.sun_icon : assets.moon_icon} alt="Toggle theme" className='w-6 h-6' />
        </button>
        <button onClick={toggleMenu} className="text-gray-900 dark:text-white focus:outline-none">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 z-50 shadow-lg">
          <div className="flex flex-col p-6 space-y-4">
            <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => `text-lg py-2 border-b dark:border-zinc-800 ${isActive ? activeClass : "text-gray-900 dark:text-zinc-200"}`}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => `text-lg py-2 border-b dark:border-zinc-800 ${isActive ? activeClass : "text-gray-900 dark:text-zinc-200"}`}>
              About
            </NavLink>
            <NavLink to="/services" onClick={toggleMenu} className={({ isActive }) => `text-lg py-2 border-b dark:border-zinc-800 ${isActive ? activeClass : "text-gray-900 dark:text-zinc-200"}`}>
              Services
            </NavLink>
            <NavLink to="/contact" onClick={toggleMenu} className={({ isActive }) => `text-lg py-2 border-b dark:border-zinc-800 ${isActive ? activeClass : "text-gray-900 dark:text-zinc-200"}`}>
              Contact
            </NavLink>

            {/* Logout in Mobile Menu */}
            <button
              onClick={handleLogout}
              className='text-left text-lg py-2 text-red-500 hover:text-red-600 font-medium'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;