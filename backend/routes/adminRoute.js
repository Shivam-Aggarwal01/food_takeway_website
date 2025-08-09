import express from 'express';
import { adminLogin, createDefaultAdmin } from '../controllers/Admin.controller.js';

const adminRouter = express.Router();

// Admin authentication routes
adminRouter.post('/login', adminLogin);
adminRouter.post('/create', createDefaultAdmin);

export default adminRouter; 