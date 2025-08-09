import express from "express";
import authmiddleware from "../middleware/auth.js";
import { placeOders, getOrders, getAllOrders, updateOrderStatus, deleteOrder } from "../controllers/Order.controller.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/place", authmiddleware, placeOders);
orderRouter.get("/get", authmiddleware, getOrders);

// Admin routes (no auth for now - you can add admin auth later)
orderRouter.get("/admin/all", getAllOrders);
orderRouter.patch("/admin/:orderId/status", updateOrderStatus);
orderRouter.delete("/admin/:orderId", deleteOrder);

export default orderRouter;
