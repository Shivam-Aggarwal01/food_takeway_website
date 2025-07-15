import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { assets } from '../new assests/frontend_assets/assets';
import FoodDetailPopup from './FoodDetailPopup';

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const count = cartItems[id] || 0;
  const [showDetail, setShowDetail] = useState(false);

  const handleFoodClick = (e) => {
    // Don't open popup if clicking on cart buttons
    if (e.target.closest('.cart-button')) {
      return;
    }
    setShowDetail(true);
  };

  return (
    <>
      <div
        className="food-item w-full m-auto rounded-2xl shadow-md transition duration-300 animate-fade-in hover:shadow-lg cursor-pointer"
        onClick={handleFoodClick}
      >
        <div className="food-item-img-container relative">
          <img
            className="food-item-image w-full h-48 object-cover rounded-t-2xl"
            src={image}
            alt={name}
          />
          {count === 0 ? (
            <img
              src={assets.add_icon_white}
              alt="Add to Cart"
              className="cart-button absolute top-2 right-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id);
              }}
            />
          ) : (
            <div className="cart-button absolute top-2 right-2 flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-md">
              <img
                src={assets.remove_icon_red}
                alt="Remove from Cart"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(id);
                }}
              />
              <span className="text-sm font-semibold text-gray-700">{count}</span>
              <img
                src={assets.add_icon_green}
                alt="Add to Cart"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(id);
                }}
              />
            </div>
          )}
        </div>
        <div className="food-item-info p-5">
          <div className="food-item-name-rating flex justify-between items-center mb-2">
            <p className="text-xl font-medium text-gray-800">{name}</p>
          </div>
          <p className="food-item-desc text-gray-600 text-sm mb-3">{description}</p>
          <p className="food-item-price text-orange-500 text-xl font-medium">
            ${price}
          </p>
        </div>
      </div>


      {/* Food Detail Popup */}
      <FoodDetailPopup
        food={{ id, name, price, description, image, category }}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
};

export default FoodItem;

