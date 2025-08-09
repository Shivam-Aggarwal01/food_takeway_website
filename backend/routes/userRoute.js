import express from 'express';
import { registerUser, loginUser, refreshToken} from '../controllers/User.controller.js';

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);
// User login route
userRouter.post('/login', loginUser);
// Token refresh route
userRouter.post('/refresh-token', refreshToken);

export default userRouter;