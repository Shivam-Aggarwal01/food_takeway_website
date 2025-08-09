import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderToken: {
            type: String,
            required: true,
            unique: true,
        },

        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                selectedOptions: {
                    type: [String],
                    default: [],
                },
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "preparing", "ready", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
