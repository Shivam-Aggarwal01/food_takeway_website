import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const url = "http://localhost:5000";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/admin/all`);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${url}/api/order/admin/${orderId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        // Update the order in the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (err) {
      console.error('Update order status error:', err);
      alert('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/order/admin/${orderId}`);
      
      if (response.data.success) {
        // Remove the order from the local state
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        alert('Order deleted successfully');
      }
    } catch (err) {
      console.error('Delete order error:', err);
      alert(err.response?.data?.message || 'Failed to delete order');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-200 text-green-900';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <div className="flex gap-2">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button 
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order.orderToken}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  {/* Customer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">Customer Details:</p>
                      <p className="text-gray-600">Name: {order.user?.name || 'N/A'}</p>
                      <p className="text-gray-600">Email: {order.user?.email || 'N/A'}</p>
                      <p className="text-gray-600">Phone: {order.user?.phone || 'N/A'}</p>
                    </div>
                                         <div>
                       <p className="font-semibold text-gray-700">Order Info:</p>
                       <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
                       <p className="text-gray-600">Items: {order.items.length}</p>
                       <p className="text-gray-600">Cash Payment</p>
                     </div>
                    <div>
                      <p className="font-semibold text-gray-700">Total Amount:</p>
                      <p className="text-2xl font-bold text-orange-600">${order.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                                 {/* Status Update and Delete */}
                 <div className="mt-4 md:mt-0 md:ml-4 flex gap-2">
                   <select 
                     value={order.status}
                     onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                     className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                   >
                     <option value="pending">Pending</option>
                     <option value="preparing">Preparing</option>
                     <option value="ready">Ready</option>
                     <option value="delivered">Delivered</option>
                     <option value="cancelled">Cancelled</option>
                   </select>
                   
                   {/* Delete button - only show for delivered or cancelled orders */}
                   {['delivered', 'cancelled'].includes(order.status) && (
                     <button
                       onClick={() => deleteOrder(order._id)}
                       className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                       title="Delete order"
                     >
                       🗑️
                     </button>
                   )}
                 </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Order Items:</h4>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={`${item.food._id}-${idx}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={item.food.image ? `${url}/images/${item.food.image}` : '/placeholder.png'} 
                        alt={item.food.name} 
                        className="w-16 h-16 object-cover rounded border border-gray-200" 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{item.food.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            {item.selectedOptions && item.selectedOptions.length > 0 && (
                              <div className="text-sm text-gray-500 mt-1">
                                <span className="font-medium">Selected Options:</span>
                                <ul className="list-disc list-inside ml-2">
                                  {item.selectedOptions.map((option, optIdx) => (
                                    <li key={optIdx}>{option.name || option}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              ${((item.food.price + (item.selectedOptions?.reduce((sum, opt) => sum + (opt.price || 0), 0) || 0)) * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${(item.food.price + (item.selectedOptions?.reduce((sum, opt) => sum + (opt.price || 0), 0) || 0)).toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;