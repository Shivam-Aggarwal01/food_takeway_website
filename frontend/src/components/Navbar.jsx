import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { assets } from "../new assests/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { key: "home", label: "Home", path: "/" },
  { key: "menu", label: "Menu", path: "/menu" },
  { key: "mobile-app", label: "Mobile App", path: "/mobile-app" },
  { key: "contact", label: "Contact Us", path: "/contact" },
];

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(StoreContext);
  const cartCount = getTotalCartItems();

  const [userDropdown, setUserDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserDropdown(false);
    nevigate("/"); 
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0 flex items-center">
          <span className="text-2xl md:text-3xl font-extrabold text-orange-600 select-none">
            Tomato.
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-10 text-[#49557e] text-base md:text-lg font-semibold items-center">
          {menuItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `cursor-pointer hover:text-orange-500 transition duration-200 ${isActive
                    ? "pb-[2px] border-b-2 border-orange-500 font-bold text-orange-600"
                    : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="relative">
            <NavLink to="/Cart">
              <img
                src={assets.basket_icon}
                alt="Basket"
                className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>

          <NavLink
            to="/admin"
            className="hidden md:inline-block border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-sm md:text-base"
          >
            Admin
          </NavLink>
          <NavLink
            to="/orders"
            className="hidden md:inline-block border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-sm md:text-base"
          >
            Your Orders
          </NavLink>

          {/* Sign In / User Dropdown */}
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(prev => !prev)}
              className="hidden md:inline-block border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-sm md:text-base"
            >
              Sign In
            </button>
          ) : (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserDropdown((prev) => !prev)}
                className="flex items-center gap-2 border border-orange-600 text-[#49557e] font-semibold rounded-full px-4 py-2 transition hover:bg-orange-100 hover:border-orange-700 shadow-sm text-sm md:text-base"
                style={{ boxShadow: "0 2px 8px 0 rgba(255, 140, 0, 0.10)" }}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 border border-orange-300 shadow-inner">
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </span>
                <span className="font-bold text-orange-600">User</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${userDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-orange-100 rounded-xl shadow-lg z-50 animate-fade-in">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-[#49557e] hover:bg-orange-50 hover:text-orange-600 transition rounded-xl font-semibold"
                  >
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden ml-2 p-2 rounded hover:bg-orange-50 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="h-7 w-7 text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 border-t border-gray-100">
          <ul className="flex flex-col gap-3 text-[#49557e] text-base font-semibold py-4">
            {menuItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `cursor-pointer hover:text-orange-500 transition duration-200 py-2 block ${isActive
                      ? "pb-[2px] border-b-2 border-orange-500 font-bold text-orange-600"
                      : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-base text-center"
            >
              Admin
            </NavLink>
            <NavLink
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-base text-center"
            >
              Your Orders
            </NavLink>
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setShowLogin(prev => !prev);
                  setMenuOpen(false);
                }}
                className="border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-base text-center"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="border border-orange-600 text-[#49557e] font-semibold rounded-full px-6 py-2 transition hover:bg-orange-50 text-base text-center"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
