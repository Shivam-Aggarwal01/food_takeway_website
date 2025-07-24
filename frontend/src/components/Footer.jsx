import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../new assests/frontend_assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: assets.facebook_icon, url: 'https://facebook.com' },
    { name: 'Twitter', icon: assets.twitter_icon, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: assets.linkedin_icon, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo & Social */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-2xl font-extrabold text-orange-500 select-none">
            Tomato.
          </span>
          <div className="flex space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <img src={social.icon} alt={social.name} className="w-4 h-4 opacity-80" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <ul className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
          {quickLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <div className="text-gray-400 text-xs text-center md:text-right">
          © {currentYear} Tomato. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;