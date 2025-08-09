import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
  addFood,
  getAllFood,
  deleteFood,
  getFoodById,
} from "../controllers/food.controller.js";

const router = express.Router();

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addFood);
router.get("/all", getAllFood);
router.delete("/:id", deleteFood);
router.get("/:id", getFoodById);

export default router;
