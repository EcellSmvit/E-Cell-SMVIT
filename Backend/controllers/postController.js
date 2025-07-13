import cloudinary from "../config/cloudinary.js";
import Post from "../models/postModel.js";

// ===============================
// Get Feed Posts
// ===============================
export const getFeedPosts = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const connections = user.connections || [];

    const posts = await Post.find({ author: { $in: [...connections, user._id] } })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("❌ Error in getFeedPosts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Create Post
// ===============================
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    console.log("✅ createPost req.user:", req.user);
    console.log("📷 image preview:", image?.substring?.(0, 100));

    let newPost;

    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image, {
          folder: "posts", // optional, but organized
        });

        newPost = new Post({
          author: req.user._id,
          content,
          image: result.secure_url,
        });
      } catch (cloudErr) {
        console.error("❌ Cloudinary upload failed:", cloudErr.message);
        return res.status(500).json({ message: "Image upload failed" });
      }
    } else {
      newPost = new Post({
        author: req.user._id,
        content,
      });
    }

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error in createPost:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Delete Post
// ===============================
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    if (post.image) {
      // Safely extract public_id for deletion
      const publicId = post.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`posts/${publicId}`);
      } catch (err) {
        console.warn("⚠️ Failed to delete Cloudinary image:", err.message);
      }
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deletePost:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Get Post by ID
// ===============================
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in getPostById:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Create Comment
// ===============================
export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: req.user._id,
            content,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    ).populate("author", "name email username headline profilePicture");

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in createComment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Like / Unlike Post
// ===============================
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in likePost:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
