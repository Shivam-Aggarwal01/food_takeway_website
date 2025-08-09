import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';

const UserOrders = () => {
    const { fetchUserOrders, url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOrders = async () => {
            if (token) {
                setLoading(true);
                try {
                    const userOrders = await fetchUserOrders();
                    setOrders(userOrders);
                } catch (err) {
                    setError('Failed to load orders');
                    console.error('Load orders error:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        loadOrders();
    }, [token, fetchUserOrders]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
            
            {!token ? (
                <div className="text-center py-12">
                    <h2 className="text-xl text-gray-600 mb-4">Please login to view your orders</h2>
                    <p className="text-gray-500">Login to see your order history</p>
                </div>
            ) : loading ? (
                <div className="text-center py-12">
                    <h2 className="text-xl text-gray-600 mb-4">Loading orders...</h2>
                    <p className="text-gray-500">Please wait while we fetch your orders</p>
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <h2 className="text-xl text-red-600 mb-4">Error loading orders</h2>
                    <p className="text-gray-500">{error}</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl text-gray-600 mb-4">No orders yet</h2>
                    <p className="text-gray-500">Place an order to see it here!</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 border border-orange-100">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        Order Token: <span className="font-mono text-orange-600 bg-orange-50 px-2 py-1 rounded">{order.orderToken}</span>
                                    </p>
                                    <p className="text-gray-700">Customer: <span className="font-semibold">{order.user?.name || 'N/A'}</span></p>
                                    <p className="text-gray-700">Email: {order.user?.email || 'N/A'}</p>
                                    <p className="text-gray-700">Phone: {order.user?.phone || 'N/A'}</p>
                                    <p className="text-gray-500 text-sm">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                                    <p className="text-sm">
                                        Status: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'ready' ? 'bg-green-100 text-green-800' :
                                            order.status === 'delivered' ? 'bg-green-200 text-green-900' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <p className="text-lg font-bold text-orange-700">Total: ${order.totalPrice.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">
                                        Payment: <span className="font-semibold text-green-600">Cash</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-gray-800">Items Ordered:</h3>
                                <ul className="divide-y divide-gray-200">
                                    {order.items.map((item, idx) => (
                                        <li key={`${item.food._id}-${idx}`} className="py-3 flex items-center gap-4">
                                            <img 
                                                src={item.food.image ? `${url}/images/${item.food.image}` : '/placeholder.png'} 
                                                alt={item.food.name} 
                                                className="w-12 h-12 object-cover rounded border border-orange-100" 
                                            />
                                            <div className="flex-1">
                                                <span className="font-medium">{item.food.name}</span>
                                                {item.selectedOptions && item.selectedOptions.length > 0 && (
                                                    <div className="text-sm text-gray-500">
                                                        Options: {item.selectedOptions.join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-gray-600">x{item.quantity}</span>
                                            <span className="text-gray-800 font-semibold">${(item.food.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserOrders;
