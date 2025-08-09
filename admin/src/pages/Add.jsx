import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    option: [{ name: "", price: "" }],
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...form.option];
    newOptions[index][e.target.name] = e.target.value;
    setForm({ ...form, option: newOptions });
  };

  const addOption = () => {
    setForm({
      ...form,
      option: [...form.option, { name: "", price: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("price", form.price);
    data.append("extraOptions", JSON.stringify(form.option));
    data.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/food/add", data);
      alert(res.data.message);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to add food");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Food</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Food Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <select
            name="category"
            onChange={handleChange}
            value={form.category}
            className="w-full border border-gray-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Category</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
            <option value="Snack">Snack</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Base Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div>
            <label className="font-semibold block mb-2 text-gray-700">Extra Options</label>
            {form.option.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Option Name"
                  value={opt.name}
                  onChange={(e) => handleOptionChange(idx, e)}
                  className="flex-1 border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={opt.price}
                  onChange={(e) => handleOptionChange(idx, e)}
                  className="w-28 border border-gray-300 p-2 rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-orange-600 text-sm hover:underline"
            >
              + Add another option
            </button>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition duration-200"
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
