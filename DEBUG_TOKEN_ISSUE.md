# Debugging "Invalid Token" Issue

## 🔍 Step-by-Step Debugging Guide

### 1. Set up Environment Variables
```bash
cd backend
npm run setup
```

### 2. Test JWT Functionality
```bash
npm run test-token
```

### 3. Test Cart API
```bash
npm run test-cart
```

### 4. Check Browser Console
Open your browser's developer tools and check the console for:
- Token storage messages
- API request logs
- Error messages

### 5. Check Backend Logs
When you start the server, look for:
```
✅ Server is running on http://localhost:5000
Loaded JWT_SECRET: [your-secret-here]
```

### 6. Manual Testing Steps

#### A. Register a New User
1. Open your frontend application
2. Click "Login" 
3. Switch to "Sign up"
4. Fill in the form and register
5. Check browser console for token messages

#### B. Test Login
1. Log out and log back in
2. Check if token is stored in localStorage
3. Check browser console for token validation

#### C. Test Add to Cart
1. Click on a food item
2. Click "Add to Cart"
3. Check browser console for API request logs
4. Check backend terminal for authentication logs

## 🐛 Common Issues and Solutions

### Issue 1: JWT_SECRET not set
**Symptoms:** Backend shows "Loaded JWT_SECRET: undefined"
**Solution:** Run `npm run setup` in backend directory

### Issue 2: Token not being stored
**Symptoms:** Browser console shows "No token found"
**Solution:** Check if login/register is successful

### Issue 3: Token format issues
**Symptoms:** "Invalid token" error
**Solution:** Check if token is being sent with "Bearer " prefix

### Issue 4: Token expiration
**Symptoms:** Token works initially but fails later
**Solution:** Check token expiration time (default: 1 day)

## 🔧 Debugging Commands

### Check Environment Variables
```bash
cd backend
node -e "console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set')"
```

### Test Token Generation
```bash
cd backend
npm run test-token
```

### Test Full Cart Flow
```bash
cd backend
npm run test-cart
```

## 📋 Expected Console Output

### Backend Startup
```
✅ Server is running on http://localhost:5000
Loaded JWT_SECRET: [64-character-hex-string]
```

### Frontend Login
```
✅ Response from backend: {success: true, token: "..."}
✅ Token received: [token-string]
🔍 Checking stored token: [first-20-chars]...
🔄 Token changed: [first-20-chars]...
```

### Add to Cart
```
Adding to cart: {id: "...", name: "...", ...}
Add to cart response: {success: true, message: "..."}
Fetching cart with token: [first-20-chars]...
Fetch cart response: {success: true, cart: [...]}
```

## 🚨 If Still Having Issues

1. **Clear browser data** - Clear localStorage and cookies
2. **Restart backend server** - Stop and restart the server
3. **Check MongoDB connection** - Ensure database is running
4. **Verify all dependencies** - Run `npm install` in both frontend and backend
5. **Check network tab** - Look for failed API requests in browser dev tools 