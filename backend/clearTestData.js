import mongoose from "mongoose";
import Food from "./models/Food.model.js";
import dotenv from "dotenv";

dotenv.config();

const clearTestData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        // Clear all test data
        await Food.deleteMany({});
        console.log("✅ All test data cleared from MongoDB");
        
        // Verify it's empty
        const foods = await Food.find({});
        console.log(`📊 Total items in MongoDB: ${foods.length}`);
        
        mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error:", error);
    }
};

clearTestData(); 