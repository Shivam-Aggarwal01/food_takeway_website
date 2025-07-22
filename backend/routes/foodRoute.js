import express from "express";
import { addFood, getAllFood, getFoodById, deleteFood } from "../controllers/food.controller.js";
import multer from "multer";
import fs from "fs";

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const foodRouter = express.Router();

// Use single image field, not "any"
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/all", getAllFood);
foodRouter.get("/:id", getFoodById);
foodRouter.delete("/:id", deleteFood);

export default foodRouter;
