import mongoose from "mongoose";

const extraOptionSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {type: String, required: true},
  description: {type: String, required: true},
  price: { type: Number, required: true },
  image: { type: String, required: true },
  extraOptions: [extraOptionSchema],
});

export default mongoose.model("Food", foodSchema);
