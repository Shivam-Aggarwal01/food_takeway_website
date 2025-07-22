import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from './FoodItem';
const DisplayFood = ({ category = "All" }) => {
 const  { food_list } = useContext(StoreContext) 

  return (
    <div className="mt-6 px-4 md:px-8 lg:px-16" id="food-display">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white lightcolors:text-black">
        Top dishes near you
      </h2>
      <div
        className="
          grid
          mt-6
          gap-6
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
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
                category={item.category}
              />
            )
        )}
      </div>
    </div>
  );
};

export default DisplayFood;