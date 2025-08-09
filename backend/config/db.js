import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const FALLBACK_MONGO_URI = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || FALLBACK_MONGO_URI;
    
    if (!uri || uri === FALLBACK_MONGO_URI) {
      console.error("❌ MONGO_URI not found in environment variables");
      console.log("Please create a .env file with your MongoDB connection string");
      process.exit(1);
    }
    
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("Please check your MongoDB connection string and ensure MongoDB is running");
    process.exit(1);
  }
};