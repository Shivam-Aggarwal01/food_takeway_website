import React, { createContext, useState, useEffect } from 'react';
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [cartError, setCartError] = useState("");

    const url = "http://localhost:5000";

    const fetchFoodList = async () => {
        try {
            const response = await fetch(`${url}/api/food/all`);
            const data = await response.json();
            if (data.success) {
                setFoodList(data.data);
            } else {
                console.error("Failed to fetch food list:", data.message);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    useEffect(() => {
        fetchFoodList();
        const storedToken = localStorage.getItem("token");
        console.log("🔍 Checking stored token:", storedToken ? storedToken.substring(0, 20) + "..." : "No token found");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        console.log("🔄 Token changed:", token ? token.substring(0, 20) + "..." : "No token");
        if (token) {
            fetchCart();
        }
    }, [token]);

    const refreshTokenIfNeeded = async () => {
        if (!token) return false;
        
        try {
            const response = await axios.post(`${url}/api/user/refresh-token`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.success) {
                const newToken = response.data.token;
                setToken(newToken);
                localStorage.setItem('token', newToken);
                console.log("✅ Token refreshed successfully");
                return true;
            }
        } catch (error) {
            console.log("❌ Token refresh failed:", error.response?.data?.error || error.message);
            // Clear invalid token
            setToken("");
            localStorage.removeItem('token');
            return false;
        }
        return false;
    };

    const addToCart = async (foodItem) => {
        setCartError("");
        console.log("Adding to cart:", foodItem); // Debug log
        
        if (!foodItem.id && !foodItem._id) {
            setCartError('Invalid food item: missing ID');
            return;
        }
        
        const foodId = foodItem.id || foodItem._id;
        const key = `${foodId}-${JSON.stringify((foodItem.selectedOptions || []).map(opt => typeof opt === 'string' ? opt : opt.name))}`;
        
        if (token) {
            try {
                const response = await axios.post(`${url}/api/cart/add`, {
                    foodId: foodId,
                    selectedOptions: (foodItem.selectedOptions || []).map(opt => typeof opt === 'string' ? opt : opt.name),
                    quantity: foodItem.quantity || 1
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                console.log("Add to cart response:", response.data); // Debug log
                await fetchCart();
            } catch (err) {
                console.error("Add to cart error:", err.response?.data || err.message);
                
                // Check if token expired
                if (err.response?.status === 401 && err.response?.data?.message?.includes('expired')) {
                    console.log("🔄 Token expired, attempting refresh...");
                    const refreshed = await refreshTokenIfNeeded();
                    if (refreshed) {
                        // Retry the request with new token
                        return addToCart(foodItem);
                    } else {
                        setCartError('Session expired. Please login again.');
                        return;
                    }
                }
                
                const msg = err?.response?.data?.message || err?.response?.data?.error || err.message;
                setCartError('Add to cart failed: ' + msg);
            }
        } else {
            setCartError('You must be logged in to add to cart.');
        }
    };

    const removeFromCart = async (key) => {
        setCartError("");
        const item = cartItems[key];
        if (!item) return;
        
        const foodId = item.id || item.foodId;
        if (!foodId) {
            setCartError('Invalid food item: missing ID');
            return;
        }
        
        if (token) {
            try {
                const response = await axios.post(`${url}/api/cart/remove`, {
                    foodId: foodId,
                    selectedOptions: (item.selectedOptions || []).map(opt => typeof opt === 'string' ? opt : opt.name)
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                console.log("Remove from cart response:", response.data); // Debug log
                await fetchCart();
            } catch (err) {
                console.error("Remove from cart error:", err.response?.data || err.message);
                
                // Check if token expired
                if (err.response?.status === 401 && err.response?.data?.message?.includes('expired')) {
                    console.log("🔄 Token expired, attempting refresh...");
                    const refreshed = await refreshTokenIfNeeded();
                    if (refreshed) {
                        // Retry the request with new token
                        return removeFromCart(key);
                    } else {
                        setCartError('Session expired. Please login again.');
                        return;
                    }
                }
                
                const msg = err?.response?.data?.message || err?.response?.data?.error || err.message;
                setCartError('Remove from cart failed: ' + msg);
            }
        } else {
            setCartError('You must be logged in to remove from cart.');
        }
    };

    const fetchCart = async () => {
        setCartError("");
        if (token) {
            try {
                console.log("Fetching cart with token:", token); // Debug log
                const res = await axios.get(`${url}/api/cart/get`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                console.log("Fetch cart response:", res.data); // Debug log
                
                if (res.data.success) {
                    const backendCart = res.data.cart || [];
                    const cartObj = {};
                    backendCart.forEach(item => {
                        const key = `${item.foodId}-${JSON.stringify((item.selectedOptions || []).map(opt => typeof opt === 'string' ? opt : opt.name))}`;
                        cartObj[key] = {
                            id: item.foodId,
                            name: item.name,
                            image: item.image,
                            quantity: item.quantity,
                            price: item.basePrice,
                            selectedOptions: (item.selectedOptions || []).map(opt => typeof opt === 'string' ? opt : opt.name)
                        };
                    });
                    setCartItems(cartObj);
                } else {
                    setCartError('Fetch cart failed: ' + res.data.message);
                    console.error('Fetch cart failed:', res.data.message);
                }
            } catch (err) {
                console.error("Fetch cart error:", err.response?.data || err.message);
                
                // Check if token expired
                if (err.response?.status === 401 && err.response?.data?.message?.includes('expired')) {
                    console.log("🔄 Token expired, attempting refresh...");
                    const refreshed = await refreshTokenIfNeeded();
                    if (refreshed) {
                        // Retry the request with new token
                        return fetchCart();
                    } else {
                        setCartError('Session expired. Please login again.');
                        return;
                    }
                }
                
                const msg = err?.response?.data?.message || err?.response?.data?.error || err.message;
                setCartError('Fetch cart failed: ' + msg);
            }
        }
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return Object.values(cartItems).reduce((total, item) => {
            const optionsTotal = item.selectedOptions ? item.selectedOptions.reduce((sum, opt) => sum + (Number(opt.price) || 0), 0) : 0;
            return total + (Number(item.price) + optionsTotal) * item.quantity;
        }, 0);
    };

    const addOrder = async () => {
        if (!token) {
            throw new Error('You must be logged in to place an order');
        }

        if (Object.keys(cartItems).length === 0) {
            throw new Error('Your cart is empty');
        }

        try {
            // Convert cart items to order format
            const orderItems = Object.values(cartItems).map(item => ({
                food: item.id,
                quantity: item.quantity,
                selectedOptions: item.selectedOptions || []
            }));

            const totalPrice = getTotalPrice();

            const response = await axios.post(`${url}/api/order/place`, {
                items: orderItems,
                totalPrice: totalPrice,
                status: 'pending'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Clear cart after successful order
                setCartItems({});
                console.log('✅ Order placed successfully:', response.data.order);
                return response.data.order;
            } else {
                throw new Error(response.data.message || 'Failed to place order');
            }
        } catch (err) {
            console.error('Place order error:', err.response?.data || err.message);
            
            // Check if token expired
            if (err.response?.status === 401 && err.response?.data?.message?.includes('expired')) {
                console.log("🔄 Token expired, attempting refresh...");
                const refreshed = await refreshTokenIfNeeded();
                if (refreshed) {
                    // Retry the request with new token
                    return addOrder();
                } else {
                    throw new Error('Session expired. Please login again.');
                }
            }
            
            throw new Error(err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to place order');
        }
    };

    const fetchUserOrders = async () => {
        if (!token) return [];
        
        try {
            const response = await axios.get(`${url}/api/order/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.success) {
                return response.data.orders || [];
            } else {
                console.error('Fetch orders failed:', response.data.message);
                return [];
            }
        } catch (err) {
            console.error('Fetch orders error:', err.response?.data || err.message);
            
            // Check if token expired
            if (err.response?.status === 401 && err.response?.data?.message?.includes('expired')) {
                console.log("🔄 Token expired, attempting refresh...");
                const refreshed = await refreshTokenIfNeeded();
                if (refreshed) {
                    // Retry the request with new token
                    return fetchUserOrders();
                }
            }
            
            return [];
        }
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        fetchCart,
        getTotalCartItems,
        getTotalPrice,
        addOrder,
        fetchUserOrders,
        token,
        setToken,
        url,
        fetchFoodList,
        setFoodList,
        cartError,
        setCartError,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;

