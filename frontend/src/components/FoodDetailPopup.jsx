import React, { useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const FoodDetailPopup = ({ food, isOpen, onClose }) => {
  const { addToCart } = useContext(StoreContext);
  const { _id, name, description, price, image, extraOptions = [] } = food;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]); // store option IDs

  const handleOptionChange = (option) => {
    const id = option._id || option.name;
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(o => o !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const getTotalPrice = () => {
    const basePrice = Number(price) || 0;
    const extrasPrice = extraOptions
      .filter(option => selectedOptions.includes(option._id || option.name))
      .reduce((total, option) => total + (Number(option.price) || 0), 0);
    return ((basePrice + extrasPrice) * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: _id,
      name,
      price: Number(price),
      image,
      quantity,
      selectedOptions: extraOptions
        .filter(option => selectedOptions.includes(option._id || option.name))
        .map(option => option.name),
    };
    console.log("Adding to cart from popup:", cartItem); // Debug log
    addToCart(cartItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-md relative border border-orange-200 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-2xl font-bold bg-white rounded-full shadow p-1"
        >
          ×
        </button>

        <img
          src={`http://localhost:5000/images/${image}`}
          alt={name}
          className="w-full h-40 sm:h-56 object-cover rounded-xl mb-4 border border-orange-100"
        />

        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-3 text-base">{description}</p>
        <p className="text-orange-500 font-bold text-lg sm:text-xl mb-4 px-4 py-2 rounded-full inline-block bg-orange-50">
          ${getTotalPrice()}
        </p>

        {/* Extra Options */}
        {extraOptions.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-gray-700">Choose Extra Options:</h3>
            {extraOptions.map((option) => {
              const id = option._id || option.name;
              return (
                <label key={id} className="flex items-center mb-1 gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(id)}
                    onChange={() => handleOptionChange(option)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-sm">{option.name} <span className="text-orange-500 font-semibold">( +${option.price})</span></span>
                </label>
              );
            })}
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6 mt-2">
          <span className="font-semibold text-gray-700">Quantity:</span>
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-lg font-bold hover:bg-orange-200"
          >-</button>
          <span className="text-lg font-bold text-gray-800">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-lg font-bold hover:bg-orange-200"
          >+</button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl w-full font-bold text-lg shadow transition-all duration-200 mt-2"
        >
          Add to Cart - ${getTotalPrice()}
        </button>
      </div>
    </div>
  );
};

export default FoodDetailPopup;
