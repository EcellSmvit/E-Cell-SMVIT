import express from "express";
import userAuth from "../middleware/userAuth.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

const router = express.Router();

// ✅ Login required
router.use(userAuth);

// ✅ Admin-only access
router.use(async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  if (!user?.isAdmin) return res.status(403).json({ message: "Admin only" });
  next();
});

// ✅ Get all posts
router.get("/posts", async (req, res) => {
  const posts = await postModel.find().populate("author", "name email");
  res.json(posts);
});

// ✅ Delete post
router.delete("/posts/:id", async (req, res) => {
  await postModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

// ✅ Get all users
router.get("/users", async (req, res) => {
  const users = await userModel.find({}, "-password");
  res.json(users);
});

// ✅ Delete user
router.delete("/users/:id", async (req, res) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// ✅ Update role
router.put("/users/:id/role", async (req, res) => {
  const { role } = req.body;

  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (role === "admin") {
      user.isAdmin = true;
    } else if (role === "alumni") {
      user.isAlumni = true;
    } else if (role === "remove") {
      user.isAdmin = false;
      user.isAlumni = false;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.save();
    res.status(200).json({ message: "User role updated", user });
  } catch (err) {
    console.error("❌ Error updating role:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
