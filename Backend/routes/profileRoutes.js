import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {getPublicProfile,updateProfile} from '../controllers/profileController.js'

const profileRouter = express.Router();

profileRouter.get("/:username",userAuth,getPublicProfile);
profileRouter.put("/profile",userAuth,updateProfile);

export default profileRouter;