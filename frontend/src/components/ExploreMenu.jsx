import React from "react";
import { menu_list } from "../new assests/frontend_assets/assets";
const ExploreMenu = ({ category = "All", setCategory }) => {
  return (
    <div className="flex flex-col gap-6 px-4 md:px-10 mt-10" id="explore-menu">
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
        className="flex justify-center gap-6 overflow-x-auto pb-3 no-scrollbar border-b border-gray-300 mt-8 pt-3"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                (prev || "").toLowerCase() === item.menu_name.toLowerCase()
                  ? "All"
                  : item.menu_name
              )
            }
            className="flex flex-col items-center cursor-pointer min-w-[80px]"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 transition duration-200 ${
                (category || "").toLowerCase() === item.menu_name.toLowerCase()
                  ? "border-orange-500 scale-105"
                  : "border-transparent"
              }`}
            />
            <p className="text-gray-600 mt-2">{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;