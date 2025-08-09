import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

// Generate a secure JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/food-delivery
# For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=${generateJWTSecret()}

# Optional: Stripe Configuration (for payments)
# STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
# STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
`;

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists.');
    console.log('📝 Current JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    
    // Read existing .env file
    const existingContent = fs.readFileSync(envPath, 'utf8');
    if (!existingContent.includes('JWT_SECRET=') || existingContent.includes('JWT_SECRET=your-super-secret-jwt-key')) {
      console.log('🔄 Updating JWT_SECRET in existing .env file...');
      const updatedContent = existingContent.replace(
        /JWT_SECRET=.*/g,
        `JWT_SECRET=${generateJWTSecret()}`
      );
      fs.writeFileSync(envPath, updatedContent);
      console.log('✅ JWT_SECRET updated successfully!');
    } else {
      console.log('✅ JWT_SECRET already properly configured.');
    }
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('🔐 JWT_SECRET generated and configured.');
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Update MONGO_URI with your MongoDB connection string');
  console.log('2. Restart your backend server');
  console.log('3. Test the application');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
} 