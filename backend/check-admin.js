import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/food-delivery";
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const checkAdmin = async () => {
  try {
    await connectDB();
    
    // Import Admin model
    const Admin = (await import('./models/Admin.model.js')).default;
    
    console.log('🔍 Checking Admin Accounts...\n');
    
    // Find all admin accounts
    const admins = await Admin.find({}).select('-password');
    
    if (admins.length === 0) {
      console.log('❌ No admin accounts found in database');
      console.log('\n💡 To create an admin account:');
      console.log('1. Make sure backend server is running');
      console.log('2. Run: npm run setup-admin');
    } else {
      console.log(`✅ Found ${admins.length} admin account(s):`);
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Created: ${admin.createdAt}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

checkAdmin(); 