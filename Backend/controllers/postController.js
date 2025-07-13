import cloudinary from "../config/cloudinary.js";
import Post from "../models/postModel.js";

// ===============================
// Get Feed Posts
// ===============================
export const getFeedPosts = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const user = req.user;
    const connections = Array.isArray(user.connections) ? user.connections : [];

    // Fetch posts from user and their connections
    const posts = await Post.find({ author: { $in: [...connections, user._id] } })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("❌ Error in getFeedPosts:", error);
    res.status(500).json({ message: "Server error while fetching feed posts." });
  }
};

// ===============================
// Create Post
// ===============================
export const createPost = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const { content, image } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Content is required." });
    }

    let newPost;

    if (image) {
      try {
        // Validate image is a base64 string
        if (!/^data:image\/[a-zA-Z]+;base64,/.test(image)) {
          return res.status(400).json({ message: "Invalid image format." });
        }
        const result = await cloudinary.uploader.upload(image, {
          folder: "posts",
          resource_type: "image",
        });

        newPost = new Post({
          author: req.user._id,
          content,
          image: result.secure_url,
        });
      } catch (cloudErr) {
        console.error("❌ Cloudinary upload failed:", cloudErr);
        return res.status(500).json({ message: "Image upload failed." });
      }
    } else {
      newPost = new Post({
        author: req.user._id,
        content,
      });
    }

    await newPost.save();

    // Populate author for frontend consistency
    await newPost.populate("author", "name username profilePicture headline");

    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error in createPost:", error);
    res.status(500).json({ message: "Server error while creating post." });
  }
};

// ===============================
// Delete Post
// ===============================
export const deletePost = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post." });
    }

    if (post.image) {
      // Safely extract public_id for deletion
      try {
        // Extract Cloudinary public_id from URL
        const urlParts = post.image.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const publicId = fileName.split(".")[0];
        await cloudinary.uploader.destroy(`posts/${publicId}`);
      } catch (err) {
        console.warn("⚠️ Failed to delete Cloudinary image:", err);
      }
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("❌ Error in deletePost:", error);
    res.status(500).json({ message: "Server error while deleting post." });
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

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in getPostById:", error);
    res.status(500).json({ message: "Server error while fetching post." });
  }
};

// ===============================
// Create Comment
// ===============================
export const createComment = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const postId = req.params.id;
    const { content } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Comment content is required." });
    }

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
    )
      .populate("author", "name email username headline profilePicture")
      .populate("comments.user", "name profilePicture username headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in createComment:", error);
    res.status(500).json({ message: "Server error while creating comment." });
  }
};

// ===============================
// Like / Unlike Post
// ===============================
export const likePost = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    // Repopulate for updated likes
    await post.populate("author", "name username profilePicture headline");
    await post.populate("comments.user", "name profilePicture username headline");

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in likePost:", error);
    res.status(500).json({ message: "Server error while liking post." });
  }
};
