import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';

const userRouter = express.Router();

// Protect the /data route with userAuth middleware and handle with getUserData controller
userRouter.get('/data', userAuth, getUserData);

export default userRouter;