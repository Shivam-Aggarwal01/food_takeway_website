import React, { useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { useContext } from 'react'

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, getTotalPrice, food_list, addOrder, url, cartError, token } = useContext(StoreContext);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Convert cartItems object to array of items with details
    const cartItemsArray = Object.entries(cartItems).map(([key, item]) => {
        return {
            ...item,
            key,
        };
    });

    const handleCheckout = async () => {
        if (!token) {
            alert('Please login to place an order');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const order = await addOrder();
            if (order) {
                setOrderData(order);
                setOrderSuccess(true);
            }
        } catch (error) {
            console.error('Order placement failed:', error);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 bg-white min-h-[70vh]">
            {cartError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow">
                    {cartError}
                </div>
            )}
            <h1 className="text-3xl font-extrabold text-orange-600 mb-8 drop-shadow">Shopping Cart</h1>
            {orderSuccess && orderData && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-xl shadow">
                    <p className="text-green-700 font-semibold">Order placed successfully!</p>
                    <p className="text-green-700">Your order token: <span className="font-mono">{orderData.orderToken}</span></p>
                    <p className="text-green-700">Total: <span className="font-semibold">${orderData.totalPrice.toFixed(2)}</span></p>
                </div>
            )}
            {cartItemsArray.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500">Add some delicious food to your cart!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="cart-items space-y-4">
                        {cartItemsArray.map((item) => (
                            <div key={item.key} className="cart-item bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4 border border-orange-100">
                                <img 
                                    src={item.image ? `${url}/images/${item.image}` : '/placeholder.png'}
                                    alt={item.name} 
                                    className="w-20 h-20 object-cover rounded-xl border border-orange-100 shadow"
                                />
                                <div className="item-details flex-1 w-full">
                                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-orange-600 font-semibold">Price: ${item.price}</p>
                                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                                        <div className="text-sm text-gray-500 mt-1">
                                            Options: {item.selectedOptions.map(opt => opt.name || opt).join(', ')}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => removeFromCart(item.key)}
                                        className="w-8 h-8 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors text-lg font-bold shadow"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        onClick={() => addToCart({
                                            ...item,
                                            selectedOptions: (item.selectedOptions || []).map(opt => typeof opt === 'string' ? opt : opt.name)
                                        })}
                                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors text-lg font-bold shadow"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-800">
                                        ${ (
                                            (Number(item.price) + (item.selectedOptions ? item.selectedOptions.reduce((sum, opt) => sum + (Number(opt.price) || 0), 0) : 0))
                                            * item.quantity
                                        ).toFixed(2) }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total bg-white rounded-2xl shadow-lg p-4 border border-orange-100">
                        <h3 className="text-xl font-extrabold text-orange-600 mb-4">
                            Cart Total: <span className="bg-orange-500 text-white px-4 py-1 rounded-full shadow">${ getTotalPrice().toFixed(2) }</span>
                        </h3>
                        <button 
                            onClick={handleCheckout}
                            disabled={isPlacingOrder || !token}
                            className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 ${
                                isPlacingOrder || !token 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-orange-500 hover:bg-orange-600'
                            } text-white`}
                        >
                            {isPlacingOrder ? 'Placing Order...' : !token ? 'Login to Order' : 'Place Order'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
