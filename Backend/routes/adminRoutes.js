import express from "express";
import userAuth from "../middlewares/userAuth.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

const router = express.Router();

router.use(userAuth); // Ensure login

// Only allow if user is admin
router.use(async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  if (!user?.isAdmin) return res.status(403).json({ message: "Admin only" });
  next();
});

router.get("/posts", async (req, res) => {
  const posts = await postModel.find().populate("author", "name email");
  res.json(posts);
});

router.delete("/posts/:id", async (req, res) => {
  await postModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

router.get("/users", async (req, res) => {
  const users = await userModel.find({}, "-password");
  res.json(users);
});

router.delete("/users/:id", async (req, res) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
