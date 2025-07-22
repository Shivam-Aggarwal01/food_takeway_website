import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const FALLBACK_MONGO_URI = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || FALLBACK_MONGO_URI;
    console.log("Connecting to MongoDB URI:", uri);
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit on failure
  }
};