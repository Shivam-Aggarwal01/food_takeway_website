import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const UserOrders = () => {
    const { orders } = useContext(StoreContext);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl text-gray-600 mb-4">No orders yet</h2>
                    <p className="text-gray-500">Place an order to see it here!</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, idx) => (
                        <div key={order.token} className="bg-white rounded-lg shadow p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">Order Token: <span className="font-mono text-orange-600">{order.token}</span></p>
                                    <p className="text-gray-700">Name: {order.name}</p>
                                    <p className="text-gray-700">Phone: {order.phone}</p>
                                    <p className="text-gray-500 text-sm">Date: {new Date(order.date).toLocaleString()}</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <p className="text-lg font-bold text-orange-700">Total: ${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-gray-800">Items Ordered:</h3>
                                <ul className="divide-y divide-gray-200">
                                    {order.items.map(item => (
                                        <li key={item._id} className="py-2 flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                            <span className="flex-1">{item.name}</span>
                                            <span className="text-gray-600">x{item.quantity}</span>
                                            <span className="text-gray-800 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
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