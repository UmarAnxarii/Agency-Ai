import React from 'react';
import { NavLink } from 'react-router-dom';
import assets from '../assets/assets.js';

const Navbar = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const activeClass = "text-blue-500"; // class for active link
  const logoSrc = theme === 'dark' && assets.logo_dark ? assets.logo_dark : assets.logo;

  return (
    <div className='flex justify-between items-center px-4 sm:px-12 lg:px-24 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>

      <img
        src={logoSrc}
        className='w-32 sm:w-40'
        alt="AgencyAI logo"
      />

      <div className='flex-1 flex justify-center'>
        <nav className='hidden md:flex space-x-8'>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
            About
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
            Services
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? activeClass : "text-gray-900 dark:text-white hover:text-blue-500"}>
            Contact
          </NavLink>
        </nav>
      </div>

      <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'>
        <img src={theme === "dark" ? assets.sun_icon : assets.moon_icon} alt="Toggle theme" className='w-6 h-6' />
      </button>
    </div>
  );
};

export default Navbar;