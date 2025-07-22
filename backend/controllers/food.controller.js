import Food from "../models/Food.model.js";
import fs from "fs";

// ✅ Add a food item
export const addFood = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.files:", req.files);

    const fileObj =
      req.file || (Array.isArray(req.files) && req.files.length > 0 ? req.files[0] : null);

    if (!fileObj) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const { name, description, price, category, available, Option } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: "Missing required fields: name, description, price, category",
      });
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const foodItem = new Food({
      name,
      description,
      price: numericPrice,
      image: fileObj.filename, // Use fileObj.fileName for single file upload
      category,
      available: available === "true" || available === true,
      Option: Option || "None",
    });

    await foodItem.save();
    res.status(201).json({ message: "Food item added successfully", foodItem });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get all food items
export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get food item by ID
export const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const foodItem = await Food.findById(id);
    if (!foodItem) {
      return res.status(404).json({ error: "Food item not found" });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete food item (with image removal)
export const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: "Food item not found" });
    }

    // Remove image file from uploads folder
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error("Error deleting image file:", err);
    });

    await Food.findByIdAndDelete(id);
    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
