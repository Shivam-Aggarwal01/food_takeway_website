import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Remove = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/food/all');
        setList(response.data.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/food/${id}`);
      setList(prev => prev.filter(item => item._id !== id));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting food item:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Admin Panel — Manage Food Items</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md border border-orange-300 overflow-hidden flex flex-col"
          >
            {/* Image */}
            {item.image ? (
              <img
                src={`http://localhost:5000/images/${item.image}`}
                alt={item.name}
                className="h-40 w-full object-cover rounded-t"
              />
            ) : (
              <div className="w-full h-48 bg-orange-100 flex items-center justify-center text-orange-400">
                No Image
              </div>
            )}

            {/* Details */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-orange-600 font-semibold text-lg mt-1">₹{item.price}</p>
              {item.category && <p className="text-sm text-gray-600 mt-1">Category: {item.category}</p>}
              {item.Option && <p className="text-sm text-gray-600 mt-1">Option: {item.Option}</p>}
              {item.description && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{item.description}</p>
              )}

              {/* Actions */}
              <div className="mt-auto pt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remove;
