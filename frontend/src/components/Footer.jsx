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
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Track Order', path: '/track' },
    { name: 'Returns', path: '/returns' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Customer Support', path: '/support' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: assets.facebook_icon, url: 'https://facebook.com' },
    { name: 'Twitter', icon: assets.twitter_icon, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: assets.linkedin_icon, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-3xl font-extrabold text-orange-500 select-none">
                Tomato.
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Delivering delicious food right to your doorstep. Fresh ingredients, 
              quick delivery, and exceptional taste - that's what we promise.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 opacity-80"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & App Download */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">Get Our App</h3>
            <p className="text-gray-300 text-sm mb-6">
              Download our mobile app for the best experience
            </p>
            <div className="space-y-3">
              <a
                href="#"
                className="block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={assets.app_store}
                  alt="Download on App Store"
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="#"
                className="block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={assets.play_store}
                  alt="Get it on Google Play"
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Get updates about new menu items and special offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-r-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Tomato. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <NavLink
                to="/privacy"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/cookies"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Cookie Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;