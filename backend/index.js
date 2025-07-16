import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();


//app config 
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());

//database config
connectDB();



//API routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the backend server!");
});

//listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



export default app;
