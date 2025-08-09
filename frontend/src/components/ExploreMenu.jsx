import React from "react";
import { menu_list } from "../new assests/frontend_assets/assets";
const ExploreMenu = ({ category = "All", setCategory }) => {
  return (
    <div className="flex flex-col gap-6 px-2 sm:px-4 md:px-10 mt-10" id="explore-menu">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-semibold text-[#262626]">
        Explore our menu
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 max-w-2xl mb-3 pb-2">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      {/* Menu Items */}
      <div
        className="flex justify-center gap-2 sm:gap-4 overflow-x-auto pb-3 no-scrollbar border-b border-gray-100 mt-8 pt-3 bg-white rounded-xl shadow-sm"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {[{ menu_name: "All", menu_image: null }, ...menu_list].map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(item.menu_name)}
            className={`flex flex-col items-center cursor-pointer min-w-[70px] sm:min-w-[80px] transition-all duration-200 group select-none`}
          >
            <div
              className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-sm
                ${category === item.menu_name
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-orange-200"}
              `}
            >
              {item.menu_image ? (
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-full"
                />
              ) : (
                <span className="text-base sm:text-lg font-bold text-orange-400">All</span>
              )}
            </div>
            <p className={`mt-2 text-center text-xs sm:text-sm font-semibold ${category === item.menu_name ? "text-orange-500" : "text-gray-600 group-hover:text-orange-400"}`}>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;