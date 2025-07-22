import React from 'react'
import { assets } from '../assets/admin_assets/assets.js';

const Navbar = ({ toggleSidebar }) => {
  return (
    // Responsive Navbar container with white background, orange border, and shadow
    <nav className="flex items-center justify-between px-4 sm:px-8 py-2 sm:py-3 bg-white border-b-4 border-orange-500 shadow-md cursor-pointer outline-none focus:outline-none caret-transparent">
      {/* Hamburger menu always visible */}
      <button
        className="mr-2 focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Logo and Title */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Logo: Large on desktop, smaller on mobile */}
        <img className="h-10 w-10 sm:h-16 sm:w-16 object-contain" src={assets.logo} alt="Logo" />
        <span className="text-lg sm:text-2xl font-bold text-orange-600 tracking-wide select-none">Admin Panel</span>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden sm:inline text-base font-medium text-gray-700">Admin</span>
        {/* Profile image: Large on desktop, smaller on mobile */}
        <img
          className="h-10 w-10 sm:h-16 sm:w-16 rounded-full border-2 border-orange-400 shadow hover:scale-105 transition-transform duration-200 cursor-pointer object-cover"
          src={assets.profile_image}
          alt="Profile"
          title="Profile"
        />
      </div>
    </nav>
  );
}

export default Navbar