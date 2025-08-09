import { addToCart, removeFromCart, getCartItems } from "../controllers/Cart.controller.js";
import express from "express";
import authmiddleware from "../middleware/auth.js";

const router = express.Router();

// Add to cart
router.post("/add", authmiddleware, addToCart);

// Remove from cart
router.post("/remove", authmiddleware,  removeFromCart);

// Get cart items
router.get("/get",authmiddleware, getCartItems);

export default router;
