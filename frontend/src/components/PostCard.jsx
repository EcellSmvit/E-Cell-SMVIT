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
          className="object-cover w-12 h-12 transition-shadow border-2 border-white rounded-full cursor-pointer hover:shadow-xl"
        />
        <div>
          <h2
            onClick={goToUserProfile}
            className="text-lg font-semibold text-white cursor-pointer hover:underline"
          >
            {post.author?.name}
          </h2>
          {post.author?.headline && (
            <p className="text-sm text-gray-300">{post.author.headline}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="mb-3 text-base text-white whitespace-pre-line">{post.content}</p>

      {/* Image */}
      {post.image && (
        <div className="mb-4 overflow-hidden border rounded-lg border-white/20">
          <img
            src={post.image}
            alt="Post"
            className="object-contain w-full max-h-[400px] transition-transform duration-200  bg-black"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-5 mb-4 text-sm text-white">
        <button
          onClick={likePost}
          disabled={isLiking}
          className={`flex items-center gap-1 hover:text-red-400 transition-all ${post.likes.includes(currentUserId) ? "text-red-400" : ""} ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart size={18} color={post.likes.includes(currentUserId) ? "red" : "white"} fill={post.likes.includes(currentUserId) ? "red" : "none"} />
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
            className="mb-2 text-sm text-blue-300 hover:underline"
          >
            {showComments ? "Hide Comments" : `View Comments (${post.comments.length})`}
          </button>

          {showComments && (
            <div className="mb-3 space-y-2 transition-all duration-300">
              {post.comments.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-100">
                  <img
                    src={
                      c.user?.profilePicture ||
                      "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
                    }
                    alt="User"
                    className="object-cover border rounded-full w-7 h-7 border-white/30"
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
          className="flex-1 px-3 py-2 text-white transition-all border rounded-2xl bg-white/10 placeholder:text-gray-300 border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={commentPost}
          disabled={isCommenting}
          className={`px-4 py-2 text-sm rounded-2xl font-medium bg-[#4F47E4] text-white transition-all ${isCommenting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
