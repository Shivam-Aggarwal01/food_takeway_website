import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    options: [],
    description: '',
    image: null,
    imagePreview: null,
    foodType: '',
  });
  const [optionInput, setOptionInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({
        ...form,
        image: files[0],
        imagePreview: files[0] ? URL.createObjectURL(files[0]) : null,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleOptionAdd = (e) => {
    e.preventDefault();
    const trimmed = optionInput.trim();
    if (trimmed && !form.options.includes(trimmed)) {
      setForm({ ...form, options: [...form.options, trimmed] });
      setOptionInput('');
    }
  };

  const handleOptionDelete = (option) => {
    setForm({ ...form, options: form.options.filter((opt) => opt !== option) });
  };

  const handleOptionInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOptionAdd(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('description', form.description);
      formData.append('category', form.foodType);
      formData.append('Option', form.options.join(','));
      if (form.image) {
        formData.append('image', form.image);
      }
    
      const apiUrl = 'http://localhost:5000/api/food/add';
      const res = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false,
      });
      setMessage({ type: 'success', text: 'Item added successfully!' });
      setForm({
        name: '',
        price: '',
        options: [],
        description: '',
        image: null,
        imagePreview: null,
        foodType: '',
      });
    } catch (err) {
      console.error('Add item error:', err, err.response);
      setMessage({ type: 'error', text: err.response?.data?.error || err.message || 'Failed to add item.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Add New Food Item</h2>
      {message && (
        <div className={`mb-4 p-2 rounded text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image upload */}
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          />
          {form.imagePreview && (
            <img src={form.imagePreview} alt="Preview" className="mt-2 h-32 object-contain rounded" />
          )}
        </div>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
            required
            min="0"
            step="0.01"
          />
        </div>
        {/* Food Type */}
        <div>
          <label className="block font-medium mb-1">Food Type</label>
          <select
            name="foodType"
            value={form.foodType}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="" disabled>Select type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>
        {/* Options (dynamic) */}
        <div>
          <label className="block font-medium mb-1">Options</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              onKeyDown={handleOptionInputKeyDown}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Onions, No Onions, Bread, etc."
            />
            <button
              type="button"
              onClick={handleOptionAdd}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded"
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.options.map((option, idx) => (
              <span
                key={option}
                className="flex items-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium shadow"
              >
                {option}
                <button
                  type="button"
                  onClick={() => handleOptionDelete(option)}
                  className="ml-2 text-orange-500 hover:text-orange-700 font-bold focus:outline-none"
                  aria-label={`Remove ${option}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default Add;