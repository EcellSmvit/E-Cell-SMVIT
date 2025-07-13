import express from 'express';
import userAuth from '../middleware/userAuth.js'
import { createComment, createPost, deletePost, getFeedPosts, getPostById, likePost } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/feed', userAuth, getFeedPosts);
postRouter.post("/create", userAuth, createPost);
postRouter.delete('/delete/:id', userAuth, deletePost);
postRouter.get("/:id", userAuth, getPostById);
postRouter.post("/:id/comment", userAuth, createComment);
postRouter.post("/:id/like", userAuth, likePost);

export default postRouter;