import express from 'express';
import { registerUser, loginUser } from '../controllers/User.controller.js';

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);
// User login route
userRouter.post('/login', loginUser);

export default userRouter;