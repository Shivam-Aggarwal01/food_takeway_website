import mongoose from "mongoose";
import Food from "./models/Food.model.js";
import dotenv from "dotenv";

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        const foods = await Food.find({});
        console.log(`\n📊 Total items in MongoDB: ${foods.length}`);
        
        foods.forEach((item, index) => {
            console.log(`\n${index + 1}. ${item.name}`);
            console.log(`   ID: ${item._id}`);
            console.log(`   Price: $${item.price}`);
            console.log(`   Category: ${item.category}`);
            console.log(`   Created: ${item.createdAt}`);
        });
        
        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
    }
};

checkData(); 