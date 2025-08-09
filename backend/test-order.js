import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Test complete order flow
async function testOrderFlow() {
  try {
    console.log('🧪 Testing Complete Order Flow...\n');

    // 1. Register a user
    console.log('1. Registering user...');
    const registerResponse = await axios.post(`${BASE_URL}/api/user/register`, {
      name: 'Test Customer',
      email: 'customer@test.com',
      password: 'password123',
      phone: '+1234567890'
    });
    
    const token = registerResponse.data.token;
    console.log('✅ User registered, token:', token.substring(0, 20) + '...\n');

    // 2. Get food items
    console.log('2. Getting food items...');
    const foodResponse = await axios.get(`${BASE_URL}/api/food/all`);
    const foods = foodResponse.data.data;
    console.log(`✅ Found ${foods.length} food items`);
    
    if (foods.length === 0) {
      console.log('❌ No food items found. Please add some food items first.');
      return;
    }

    const firstFood = foods[0];
    console.log('First food item:', { id: firstFood._id, name: firstFood.name, price: firstFood.price });

    // 3. Add item to cart
    console.log('\n3. Adding item to cart...');
    const addToCartResponse = await axios.post(`${BASE_URL}/api/cart/add`, {
      foodId: firstFood._id,
      selectedOptions: ['Extra Cheese', 'Spicy'],
      quantity: 2
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Add to cart response:', addToCartResponse.data);

    // 4. Get cart
    console.log('\n4. Getting cart...');
    const getCartResponse = await axios.get(`${BASE_URL}/api/cart/get`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Get cart response:', getCartResponse.data);

    // 5. Place order
    console.log('\n5. Placing order...');
    const placeOrderResponse = await axios.post(`${BASE_URL}/api/order/place`, {
      items: [
        {
          food: firstFood._id,
          quantity: 2,
          selectedOptions: ['Extra Cheese', 'Spicy']
        }
      ],
      totalPrice: (firstFood.price + 2) * 2, // Assuming extra options cost $1 each
      status: 'pending'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Place order response:', placeOrderResponse.data);

    // 6. Get user orders
    console.log('\n6. Getting user orders...');
    const getUserOrdersResponse = await axios.get(`${BASE_URL}/api/order/get`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Get user orders response:', getUserOrdersResponse.data);

    // 7. Get all orders (admin)
    console.log('\n7. Getting all orders (admin)...');
    const getAllOrdersResponse = await axios.get(`${BASE_URL}/api/order/admin/all`);
    
    console.log('✅ Get all orders response:', getAllOrdersResponse.data);

    // 8. Test order status update (admin)
    console.log('\n8. Testing order status update...');
    if (getAllOrdersResponse.data.orders.length > 0) {
      const firstOrder = getAllOrdersResponse.data.orders[0];
      const updateStatusResponse = await axios.patch(`${BASE_URL}/api/order/admin/${firstOrder._id}/status`, {
        status: 'delivered'
      });
      console.log('✅ Update order status response:', updateStatusResponse.data);
    }

    // 9. Test order deletion (admin)
    console.log('\n9. Testing order deletion...');
    if (getAllOrdersResponse.data.orders.length > 0) {
      const firstOrder = getAllOrdersResponse.data.orders[0];
      // First update to delivered status
      await axios.patch(`${BASE_URL}/api/order/admin/${firstOrder._id}/status`, {
        status: 'delivered'
      });
      // Then delete
      const deleteOrderResponse = await axios.delete(`${BASE_URL}/api/order/admin/${firstOrder._id}`);
      console.log('✅ Delete order response:', deleteOrderResponse.data);
    }

    console.log('\n🎉 Complete order flow test successful!');
    console.log('\n📋 Summary:');
    console.log('- User registration: ✅');
    console.log('- Food items fetched: ✅');
    console.log('- Cart operations: ✅');
    console.log('- Order placement: ✅');
    console.log('- Order retrieval: ✅');
    console.log('- Admin order view: ✅');
    console.log('- Order status update: ✅');
    console.log('- Order deletion: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testOrderFlow(); 