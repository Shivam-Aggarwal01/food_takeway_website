import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BASE_URL = 'http://localhost:5000';

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function setupAdmin() {
  try {
    console.log('🔧 Setting up Admin Account...\n');

    // Get admin credentials
    const username = await question('Enter admin username: ');
    const password = await question('Enter admin password (min 6 characters): ');

    if (password.length < 6) {
      console.log('❌ Password must be at least 6 characters long');
      rl.close();
      return;
    }

    console.log('\n🔄 Creating admin account...');

    const response = await axios.post(`${BASE_URL}/api/admin/create`, {
      username,
      password
    });

    if (response.data.success) {
      console.log('✅ Admin account created successfully!');
      console.log(`Username: ${username}`);
      console.log('\n📋 Next steps:');
      console.log('1. Start your backend server: npm run server');
      console.log('2. Start your frontend: cd frontend && npm run dev');
      console.log('3. Start your admin panel: cd admin && npm run dev');
      console.log('4. Click "Admin" button in frontend and login');
    } else {
      console.log('❌ Failed to create admin account:', response.data.error);
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data?.error || error.message);
    console.log('\n💡 Make sure your backend server is running on port 5000');
  } finally {
    rl.close();
  }
}

setupAdmin(); 