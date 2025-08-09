import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const FALLBACK_MONGO_URI = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
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
    process.exit(1);
  }
};

const cleanupOrders = async () => {
  try {
    await connectDB();
    
    // Import models
    const Order = (await import('./models/Orders.model.js')).default;
    const User = (await import('./models/User.model.js')).default;
    
    console.log('🧹 Starting order cleanup...\n');
    
    // Find all delivered or cancelled orders
    const oldOrders = await Order.find({
      status: { $in: ['delivered', 'cancelled'] }
    }).populate('user', 'name email');
    
    console.log(`📊 Found ${oldOrders.length} completed orders:`);
    oldOrders.forEach(order => {
      console.log(`- Order ${order.orderToken} (${order.status}) - Customer: ${order.user?.name || 'Unknown'}`);
    });
    
    if (oldOrders.length === 0) {
      console.log('✅ No completed orders to clean up');
      process.exit(0);
    }
    
    console.log('\n⚠️  This will permanently delete all delivered and cancelled orders.');
    console.log('Are you sure you want to continue? (y/N)');
    
    // In a real scenario, you'd want to read from stdin
    // For now, we'll just show what would be deleted
    console.log('\n📋 Orders that would be deleted:');
    oldOrders.forEach(order => {
      console.log(`🗑️  Order ${order.orderToken} - ${order.user?.name || 'Unknown'} - ${order.status}`);
    });
    
    console.log('\n💡 To actually delete these orders, you can:');
    console.log('1. Use the admin panel delete button (🗑️) for individual orders');
    console.log('2. Or manually delete them from the database');
    console.log('3. Or modify this script to actually perform the deletion');
    
  } catch (error) {
    console.error('❌ Cleanup error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

cleanupOrders(); 