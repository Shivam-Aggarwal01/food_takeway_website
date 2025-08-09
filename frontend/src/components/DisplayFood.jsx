import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import FoodDetailPopup from './FoodDetailPopup';

const DisplayFood = ({ category = "All" }) => {
  const { food_list } = useContext(StoreContext);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Filter food items by category
  const filteredFood = food_list?.filter(
    (item) => category === "All" || item.category === category
  ) || [];

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setShowPopup(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 pb-16 bg-white min-h-[60vh]">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredFood.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl p-4 shadow hover:shadow-lg cursor-pointer transition-all duration-200 border border-orange-100 hover:border-orange-400 group relative overflow-hidden flex flex-col"
            onClick={() => handleFoodClick(item)}
          >
            <img
              src={`http://localhost:5000/images/${item.image}`}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-3"
              style={{ boxShadow: '0 2px 8px 0 rgba(255, 140, 0, 0.08)' }}
            />
            <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-2 line-clamp-2 min-h-[2.5em]">{item.description}</p>
            <span className="inline-block bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-base shadow absolute top-4 right-4">
              ${item.price}
            </span>
          </div>
        ))}
      </div>
      {filteredFood.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No items found in this category
          </h3>
          <p className="text-gray-500">
            Try selecting a different category or check back later for new items.
          </p>
        </div>
      )}
      {showPopup && selectedFood && (
        <FoodDetailPopup
          food={selectedFood}
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default DisplayFood;
