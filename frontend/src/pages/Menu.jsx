import React, { useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from '../components/FoodItem';
import { menu_list } from '../new assests/frontend_assets/assets';

const Menu = () => {
  const [category, setCategory] = useState("All");
  const { food_list } = useContext(StoreContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Menu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover our delicious selection of dishes crafted with the finest ingredients 
            and culinary expertise. From fresh salads to decadent desserts, we have 
            something for every taste.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Filter by Category
          </h2>
          
          <div className="flex justify-center gap-6 overflow-x-auto pb-3 no-scrollbar border-b border-gray-300">
            <div
              onClick={() => setCategory("All")}
              className="flex flex-col items-center cursor-pointer min-w-[80px]"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center transition duration-200 ${
                category === "All"
                  ? "border-orange-500 scale-105 bg-orange-50"
                  : "border-gray-300 hover:border-orange-300"
              }`}>
                <span className="text-lg font-semibold text-gray-600">All</span>
              </div>
              <p className="text-gray-600 mt-2 text-center">All Items</p>
            </div>
            
            {menu_list.map((item, index) => (
              <div
                key={index}
                onClick={() => setCategory(item.menu_name)}
                className="flex flex-col items-center cursor-pointer min-w-[80px]"
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 transition duration-200 ${
                    category === item.menu_name
                      ? "border-orange-500 scale-105"
                      : "border-transparent hover:border-orange-300"
                  }`}
                />
                <p className="text-gray-600 mt-2 text-center">{item.menu_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {food_list?.map(
            (item) =>
              (category === "All" || category === item.category) && (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              )
          )}
        </div>
        
        {food_list?.filter(item => category === "All" || category === item.category).length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No items found in this category
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;