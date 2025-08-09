import Food from "../models/Food.model.js";

export const addFood = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    
    // Validate required fields
    if (!name || !category || !description || !price) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, category, description, and price are required" 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Food image is required" 
      });
    }

    const extraOptions = req.body.extraOptions
      ? JSON.parse(req.body.extraOptions)
      : [];

    const newFood = new Food({
      name,
      category,
      description,
      price: Number(price),
      image: req.file.filename,
      extraOptions,
    });

    await newFood.save();
    res.status(201).json({ success: true, message: "Food added!", data: newFood });
  } catch (err) {
    console.error("Add food error:", err);
    res.status(500).json({ success: false, message: "Failed to add food", error: err.message });
  }
};

export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    console.log("Foods fetched:", foods); // Log to see what's coming from DB
    res.json({ success: true, data: foods });
  } catch (err) {
    console.error("Error fetching food:", err.message); // log actual error
    res.status(500).json({ success: false, message: err.message }); // send error message
  }
};

export const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    await Food.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete error", error: err.message });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });
    res.json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching food" });
  }
};

