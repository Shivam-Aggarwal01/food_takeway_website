import React, { useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { useContext } from 'react'

function generateToken() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, getTotalPrice, food_list, addOrder } = useContext(StoreContext);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [orderToken, setOrderToken] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Convert cartItems object to array of items with details
    const cartItemsArray = Object.keys(cartItems).map(itemId => {
        const foodItem = food_list.find(item => item._id === itemId);
        if (foodItem) {
            return {
                ...foodItem,
                quantity: cartItems[itemId]
            };
        }
        return null;
    }).filter(item => item !== null);

    const handleCheckout = () => {
        setShowModal(true);
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        const token = generateToken();
        setOrderToken(token);
        setOrderSuccess(true);
        addOrder({
            name,
            phone,
            token,
            items: cartItemsArray,
            total: getTotalPrice(),
            date: new Date().toISOString()
        });
        setShowModal(false);
        setName("");
        setPhone("");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
            {orderSuccess && orderToken && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded">
                    <p className="text-green-700 font-semibold">Order placed successfully!</p>
                    <p className="text-green-700">Your order token: <span className="font-mono">{orderToken}</span></p>
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
                            <div key={item._id} className="cart-item bg-white rounded-lg shadow p-6 flex items-center gap-4">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="item-details flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-orange-600 font-medium">Price: ${item.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => removeFromCart(item._id)}
                                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-lg font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        onClick={() => addToCart(item._id)}
                                        className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors text-lg font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-800">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Cart Total: ${getTotalPrice().toFixed(2)}
                        </h3>
                        <button 
                            onClick={handleCheckout}
                            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
            {/* Modal for checkout */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter your details</h2>
                        <form onSubmit={handleOrderSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    required
                                    pattern="[0-9]{10,15}"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart