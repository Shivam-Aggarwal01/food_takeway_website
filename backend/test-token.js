import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🧪 Testing JWT Token Functionality...\n');

// Check if JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set in environment variables');
  console.log('Please run: npm run setup');
  process.exit(1);
}

console.log('✅ JWT_SECRET is configured');
console.log('Secret length:', process.env.JWT_SECRET.length);

// Test token generation
const testUserId = '507f1f77bcf86cd799439011';
console.log('\n🔑 Testing token generation...');

try {
  const token = jwt.sign({ id: testUserId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  console.log('✅ Token generated successfully');
  console.log('Token (first 50 chars):', token.substring(0, 50) + '...');
  
  // Test token verification
  console.log('\n🔍 Testing token verification...');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('✅ Token verified successfully');
  console.log('Decoded payload:', decoded);
  
  // Test with invalid secret
  console.log('\n🚫 Testing with invalid secret...');
  try {
    jwt.verify(token, 'invalid-secret');
    console.log('❌ Should have failed with invalid secret');
  } catch (error) {
    console.log('✅ Correctly failed with invalid secret:', error.message);
  }
  
  console.log('\n🎉 JWT functionality is working correctly!');
  
} catch (error) {
  console.error('❌ JWT test failed:', error.message);
} 