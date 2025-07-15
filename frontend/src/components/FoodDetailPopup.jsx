import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { assets } from '../new assests/frontend_assets/assets';

const FoodDetailPopup = ({ food, isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const count = cartItems[food?.id] || 0;

  if (!isOpen || !food) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10 p-2 rounded-full hover:bg-black/20"
            type="button"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Food Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Food name overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {food.name}
              </h2>
              <p className="text-orange-400 text-lg md:text-xl font-semibold">
                ${food.price}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {food.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Category:</span>
                <span className="font-medium text-gray-800">{food.category}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Price:</span>
                <span className="font-medium text-orange-600">${food.price}</span>
              </div>
            </div>
          </div>

          {/* Options Section - Placeholder for user to add */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Customize Your Order</h3>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-center">
                Options and customization will be added here
              </p>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-800">Quantity:</span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                  <button
                    onClick={() => removeFromCart(food.id)}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={count === 0}
                  >
                    <img
                      src={assets.remove_icon_red}
                      alt="Remove"
                      className="w-4 h-4"
                    />
                  </button>
                  <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                    {count}
                  </span>
                  <button
                    onClick={() => addToCart(food.id)}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={assets.add_icon_green}
                      alt="Add"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-2xl font-bold text-orange-600">
                  ${(food.price * count).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                addToCart(food.id);
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPopup; 