import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/admin_assets/assets.js';

const navLinks = [
  { name: 'Add Items', to: '/', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> },
  { name: 'Remove Items', to: '/remove-items', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> },
  { name: 'Orders', to: '/orders', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg> },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-56 bg-white border-r-4 border-orange-500 shadow-lg flex flex-col items-center py-6 z-30
        transition-transform duration-300 outline-none focus:outline-none caret-transparent
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Close button always visible */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 focus:outline-none caret-transparent"
        onClick={closeSidebar}
        aria-label="Close sidebar"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Logo at the top */}
      <div className="mb-10 flex flex-col items-center outline-none focus:outline-none caret-transparent">
        <img src={assets.logo} alt="Logo" className="h-12 w-12 object-contain mb-2" />
        <span className="text-lg font-bold text-orange-600 tracking-wide select-none">Admin</span>
      </div>
      {/* Navigation links */}
      <nav className="flex flex-col gap-6 w-full items-center">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 w-44 px-2 py-2 rounded-lg transition-colors group font-medium text-base
               hover:bg-orange-50 group-hover:text-orange-600
               ${isActive ? 'bg-orange-500 text-white font-bold shadow-md' : 'text-gray-700'}`
            }
            onClick={closeSidebar}
          >
            <span className="text-orange-500 group-hover:text-orange-600">{link.icon}</span>
            <span className="inline">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;