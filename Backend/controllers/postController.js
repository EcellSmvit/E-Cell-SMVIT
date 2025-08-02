import cloudinary from "../config/cloudinary.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const getFeedPosts = async (req, res) => {
	try {
	  if (!req.userId) {
		return res.status(401).json({ message: "Unauthorized: Please log in." });
	  }
	  const posts = await Post.find({})
		.populate("author", "name username profilePicture headline")
		.populate("comments.user", "name profilePicture username headline")
		.sort({ createdAt: -1 });
  
	  res.status(200).json(posts);
	} catch (error) {
	  console.error("❌ Error in getFeedPosts:", error);
	  res.status(500).json({ message: "Server error while fetching feed posts." });
	}
  };
  
  
export const createPost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.isAdmin && !user.isAlumni) {
      return res.status(403).json({ message: "Permission denied. Only Admins or Alumni can create posts." });
    }
    
    const { content, image } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Content is required." });
    }

    let newPost;

    if (image) {
      try {
        if (!/^data:image\/[a-zA-Z]+;base64,/.test(image)) {
          return res.status(400).json({ message: "Invalid image format." });
        }
        const result = await cloudinary.uploader.upload(image, {
          folder: "posts",
          resource_type: "image",
        });

        newPost = new Post({
          author: req.userId,
          content,
          image: result.secure_url,
        });
      } catch (cloudErr) {
        console.error("❌ Cloudinary upload failed:", cloudErr);
        return res.status(500).json({ message: "Image upload failed." });
      }
    } else {
      newPost = new Post({
        author: req.userId,
        content,
      });
    }

    await newPost.save();

    await newPost.populate("author", "name username headline");

    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error in createPost:", error);
    res.status(500).json({ message: "Server error while creating post." });
  }
};

export const deletePost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== req.userId.toString()) {
		return res.status(403).json({ message: "Not authorized to delete this post." });
	}

    if (post.image) {
      try {
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

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username headline")
      .populate("comments.user", "name username headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in getPostById:", error);
    res.status(500).json({ message: "Server error while fetching post." });
  }
};

export const createComment = async (req, res) => {
  try {
    if (!req.userId) {
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
            user: req.userId,
            content,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    )
      .populate("author", "name email username headline ")
      .populate("comments.user", "name  username headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in createComment:", error);
    res.status(500).json({ message: "Server error while creating comment." });
  }
};

export const likePost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in." });
    }

    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId)
      .populate("author", "name username  headline")
      .populate("comments.user", "name  username headline");

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

    await post.populate("author", "name username headline");
    await post.populate("comments.user", "name username headline");

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error in likePost:", error);
    res.status(500).json({ message: "Server error while liking post." });
  }
};
