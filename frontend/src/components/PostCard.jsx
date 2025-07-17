import React, { useContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Trash, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, onUpdate }) => {
  const { userData } = useContext(AppContext);
  const currentUserId = userData?._id;
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleApiError = (err, fallbackMsg) => {
    const status = err?.response?.status;
    if (status === 401) {
      toast.error("You must be logged in to perform this action.");
    } else if (status === 404) {
      toast.error("Post not found. It may have been deleted.");
    } else {
      toast.error(err?.response?.data?.message || fallbackMsg);
    }
  };

  const likePost = async () => {
    setIsLiking(true);
    try {
      await api.post(`/${post._id}/like`);
      onUpdate?.();
    } catch (err) {
      handleApiError(err, "Failed to like post.");
    } finally {
      setIsLiking(false);
    }
  };

  const commentPost = async () => {
    if (!comment.trim()) return;
    setIsCommenting(true);
    try {
      await api.post(`/${post._id}/comment`, { content: comment });
      setComment("");
      onUpdate?.();
      setShowComments(true); // Show comments after adding one
    } catch (err) {
      handleApiError(err, "Failed to comment.");
    } finally {
      setIsCommenting(false);
    }
  };

  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsDeleting(true);
    try {
      await api.delete(`/delete/${post._id}`);
      toast.success("Post deleted.");
      onUpdate?.();
    } catch (err) {
      handleApiError(err, "Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

  const goToUserProfile = (e) => {
    e.stopPropagation();
    if (post.author?._id) {
      navigate(`/profile/${post.author.username}`);
    }
  };

  return (
    <div
      className="rounded-2xl p-6 mb-6 transition-transform hover:scale-[1.01] duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.author?.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
          alt="User"
          onClick={goToUserProfile}
          className="w-12 h-12 rounded-full object-cover border-2 border-white cursor-pointer hover:shadow-xl transition-shadow"
        />
        <div>
          <h2
            onClick={goToUserProfile}
            className="text-white font-semibold text-lg cursor-pointer hover:underline"
          >
            {post.author?.name}
          </h2>
          {post.author?.headline && (
            <p className="text-sm text-gray-300">{post.author.headline}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-white text-base mb-3 whitespace-pre-line">{post.content}</p>

      {/* Image */}
      {post.image && (
        <div className="rounded-lg overflow-hidden mb-4 border border-white/20">
          <img
            src={post.image}
            alt="Post"
            className="object-cover w-full max-h-[400px] transition-transform duration-200 hover:scale-[1.01]"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-5 text-sm text-white mb-4">
        <button
          onClick={likePost}
          disabled={isLiking}
          className={`flex items-center gap-1 hover:text-red-400 transition-all ${post.likes.includes(currentUserId) ? "text-red-400" : ""} ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart size={18} color={post.likes.includes(currentUserId) ? "red" : "white"} />
          {post.likes.length}
        </button>

        {post.author?._id === currentUserId && (
          <button
            onClick={deletePost}
            disabled={isDeleting}
            className={`flex items-center gap-1 text-red-300 hover:text-red-500 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Trash size={18} />
            Delete
          </button>
        )}
      </div>

      {/* Toggle Comments */}
      {post.comments?.length > 0 && (
        <>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="text-sm text-blue-300 hover:underline mb-2"
          >
            {showComments ? "Hide Comments" : `View Comments (${post.comments.length})`}
          </button>

          {showComments && (
            <div className="space-y-2 mb-3 transition-all duration-300">
              {post.comments.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-100">
                  <img
                    src={
                      c.user?.profilePicture ||
                      "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
                    }
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                  />
                  <span>
                    <strong>{c.user?.name || "Unknown"}:</strong> {c.content}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Add Comment */}
      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={(e) => e.key === "Enter" && commentPost()}
          disabled={isCommenting}
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 placeholder:text-gray-300 text-white border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        />
        <button
          onClick={commentPost}
          disabled={isCommenting}
          className={`px-4 py-1 text-sm rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all ${isCommenting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
