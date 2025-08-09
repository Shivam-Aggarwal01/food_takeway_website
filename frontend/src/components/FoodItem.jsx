import React, { useState } from 'react';
import FoodDetailPopup from './FoodDetailPopup';

const FoodItem = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const {
    _id,
    name,
    description,
    price,
    image,
    category,
    extraOptions = [],
  } = props;

  return (
    <>
      <div
        className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <img
          src={`http://localhost:5000/images/${image}`}
          alt={name}
          className="w-full h-40 object-cover rounded-xl"
        />
        <h3 className="mt-2 text-lg font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-orange-500 font-semibold">₹{price}</p>
      </div>

      {showPopup && (
        <FoodDetailPopup
          food={{
            _id,
            name,
            description,
            price,
            image,
            category,
            extraOptions, // ✅ Send options correctly here
          }}
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default FoodItem;
