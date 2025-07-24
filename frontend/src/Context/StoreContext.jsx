
import React, { createContext, useState } from 'react';
export const StoreContext = createContext(null);

const StoreProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]);
     const [token,setToken] = useState("") // Token for authentication, if needed
     const [food_list, setFoodList] = useState([]); // Initial food list
     const url="http://localhost:5000";
    // Function to fetch food list from backend
    const fetchFoodList = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/food/all');
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

    // Call fetchFoodList on component mount
    React.useEffect(() => {
        fetchFoodList();
       if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        async function loadCartItems() {
            const savedCart = localStorage.getItem("cartItems");
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        }
        loadCartItems();
        return () => {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        };
    }, []);


    const addToCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1;
                if (newCart[itemId] === 0) {
                    delete newCart[itemId];
                }
            }
            return newCart;
        });
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    };

    const getTotalPrice = () => {
        return food_list.reduce((total, item) => {
            const count = cartItems[item._id] || 0;
            return total + (item.price * count);
        }, 0);
    };

    const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
        setCartItems({}); // Clear cart after order
    };
     

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        getTotalPrice,
        orders,
        addOrder,
        token,
        setToken,
        url,
        fetchFoodList,
        setFoodList,
        food_list,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;