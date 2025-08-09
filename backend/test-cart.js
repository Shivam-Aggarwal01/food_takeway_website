import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Test cart functionality
async function testCart() {
  try {
    console.log('🧪 Testing Cart Functionality...\n');

    // 1. Test registration
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${BASE_URL}/api/user/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '+1234567890'
    });
    
    const token = registerResponse.data.token;
    console.log('✅ Registration successful, token:', token.substring(0, 20) + '...\n');

    // 2. Test getting food list
    console.log('2. Testing food list...');
    const foodResponse = await axios.get(`${BASE_URL}/api/food/all`);
    const foods = foodResponse.data.data;
    console.log(`✅ Found ${foods.length} food items`);
    
    if (foods.length === 0) {
      console.log('❌ No food items found. Please add some food items first.');
      return;
    }

    const firstFood = foods[0];
    console.log('First food item:', { id: firstFood._id, name: firstFood.name, price: firstFood.price });

    // 3. Test adding to cart
    console.log('\n3. Testing add to cart...');
    const addToCartResponse = await axios.post(`${BASE_URL}/api/cart/add`, {
      foodId: firstFood._id,
      selectedOptions: [],
      quantity: 1
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Add to cart response:', addToCartResponse.data);

    // 4. Test getting cart
    console.log('\n4. Testing get cart...');
    const getCartResponse = await axios.get(`${BASE_URL}/api/cart/get`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Get cart response:', getCartResponse.data);

    // 5. Test removing from cart
    console.log('\n5. Testing remove from cart...');
    const removeFromCartResponse = await axios.post(`${BASE_URL}/api/cart/remove`, {
      foodId: firstFood._id,
      selectedOptions: []
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Remove from cart response:', removeFromCartResponse.data);

    console.log('\n🎉 All cart tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testCart(); 