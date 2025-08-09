import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginPop = ({ showAdminLogin, setShowAdminLogin, onAdminLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/api/admin/login", formData);
        
        if (response.data.success) {
          const { token, admin } = response.data;
          localStorage.setItem('adminToken', token);
          localStorage.setItem('adminData', JSON.stringify(admin));
          onAdminLoginSuccess(token, admin);
          setShowAdminLogin(false);
          setFormData({ username: '', password: '' });
          setErrors({});
        } else {
          alert('Login failed: ' + (response.data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error("❌ Admin login error:", error.response?.data || error.message);
        alert('Login failed: ' + (error.response?.data?.error || error.message));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeModal = () => {
    setShowAdminLogin(false);
    setFormData({ username: '', password: '' });
    setErrors({});
  };

  if (!showAdminLogin) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-20"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-red-100 transition-colors z-10 p-2 rounded-full hover:bg-white/10"
            type="button"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          <p className="text-red-100 text-center mt-2">Access admin panel</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter admin username"
                disabled={isLoading}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter admin password"
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              } text-white`}
            >
              {isLoading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Only authorized administrators can access this panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPop; 