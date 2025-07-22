import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

        cart: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1,
                },
                selectedOptions: {
                    type: [String],
                    default: [],
                },
            },
        ],

        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],

        phone: {
            type: String,
            trim: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

