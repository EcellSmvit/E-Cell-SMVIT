import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';


const UserRouter = express.Router()
UserRouter.get('/data', userAuth, getUserData)
UserRouter.get('/suggested', getSuggestedUsers);
export default UserRouter;