import Order from "../models/Orders.model.js";
import User from "../models/User.model.js";
import Food from "../models/Food.model.js";

// Helper function to generate order token
const generateOrderToken = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
};

// ✅ Create a new order
const placeOders = async (req, res) => {
    try {
        const { items, paymentStatus, status, totalPrice } = req.body;
        
        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Items are required" });
        }
        
        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).json({ success: false, message: "Valid total price is required" });
        }

        const newOrder = new Order({
            user: req.body.userId,
            orderToken: generateOrderToken(),
            items: items,
            status: status || "pending",
            totalPrice: totalPrice,
        });
        
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { orders: newOrder._id },
        });

        // Populate the order with user and food details for response
        const populatedOrder = await Order.findById(newOrder._id)
            .populate({
                path: 'user',
                select: 'name email phone'
            })
            .populate({
                path: 'items.food',
                model: 'Food'
            });

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully",
            order: populatedOrder
        });

    } catch (err) {
        console.error("Place order error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.body.userId || req.query.userId || req.userId;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        
        const user = await User.findById(userId).populate({
            path: "orders",
            populate: [
                {
                    path: "items.food",
                    model: "Food"
                },
                {
                    path: "user",
                    select: "name email phone"
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, orders: user.orders || [] });
    } catch (err) {
        console.error("Cannot fetch the orders:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// ✅ Get all orders (admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'user',
                select: 'name email phone'
            })
            .populate({
                path: 'items.food',
                model: 'Food'
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (err) {
        console.error("Get all orders error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// ✅ Update order status (admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status || !['pending', 'preparing', 'ready', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate({
            path: 'user',
            select: 'name email phone'
        }).populate({
            path: 'items.food',
            model: 'Food'
        });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, order });
    } catch (err) {
        console.error("Update order status error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// ✅ Delete order (admin)
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Only allow deletion of delivered or cancelled orders
        if (!['delivered', 'cancelled'].includes(order.status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Can only delete delivered or cancelled orders" 
            });
        }

        await Order.findByIdAndDelete(orderId);
        
        // Remove order from user's orders array
        await User.findByIdAndUpdate(order.user, {
            $pull: { orders: orderId }
        });

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (err) {
        console.error("Delete order error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export {placeOders, getOrders, getAllOrders, updateOrderStatus, deleteOrder} 