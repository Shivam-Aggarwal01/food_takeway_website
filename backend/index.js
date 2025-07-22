import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware — these must come BEFORE your routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Serve static images
app.use("/images", express.static(uploadDir));

// ✅ API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Food Delivery API!");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
