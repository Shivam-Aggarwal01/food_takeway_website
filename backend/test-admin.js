import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Test admin authentication
async function testAdminAuth() {
  try {
    console.log('🧪 Testing Admin Authentication...\n');

    // Test admin login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful!');
      console.log('Admin data:', loginResponse.data.admin);
      console.log('Token:', loginResponse.data.token.substring(0, 20) + '...');
    } else {
      console.log('❌ Admin login failed:', loginResponse.data.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Possible solutions:');
      console.log('1. Make sure admin account exists - run: npm run setup-admin');
      console.log('2. Check if backend server is running on port 5000');
      console.log('3. Verify username and password are correct');
    }
  }
}

// Test admin creation
async function testAdminCreation() {
  try {
    console.log('\n🔧 Testing Admin Creation...\n');

    const createResponse = await axios.post(`${BASE_URL}/api/admin/create`, {
      username: 'admin',
      password: 'admin123'
    });
    
    if (createResponse.data.success) {
      console.log('✅ Admin account created successfully!');
      console.log('Admin data:', createResponse.data.admin);
    } else {
      console.log('❌ Admin creation failed:', createResponse.data.error);
    }

  } catch (error) {
    console.error('❌ Creation test failed:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🔍 Admin Authentication Debug...\n');
  
  // First try to create admin
  await testAdminCreation();
  
  // Then try to login
  await testAdminAuth();
  
  console.log('\n📋 Next steps:');
  console.log('1. If admin creation failed, check if server is running');
  console.log('2. If login failed, try creating admin again');
  console.log('3. Make sure to use the exact username/password you set');
}

runTests(); 