import React, { createContext, useState } from 'react';
import { food_list } from '../new assests/frontend_assets/assets';

export const StoreContext = createContext(null);

const StoreProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]);

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
        addOrder
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;