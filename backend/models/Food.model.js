import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     image: {
          type: String,
          required: true
     },
     category: {
          type: String,
          required: true
     },
     available: {
          type: Boolean,
          default: true
     },
     Option: {
          type: String,
          default: "None"
     }
}, { timestamps: true });

const Food = mongoose.models.food || mongoose.model("Food", foodSchema);
export default Food;
