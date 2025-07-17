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

  const handleApiError = (err, fallbackMsg) => {
    const status = err?.response?.status;
    if (status === 401) {
      toast.error("You must be logged in to perform this action. Please log in.");
    } else if (status === 404) {
      toast.error("Resource not found. The post may have been deleted.");
    } else {
      toast.error(err?.response?.data?.message || fallbackMsg);
    }
  };

  const likePost = async () => {
    setIsLiking(true);
    try {
      await api.post(`/${post._id}/like`);
      if (typeof onUpdate === "function") onUpdate();
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
      if (typeof onUpdate === "function") onUpdate();
    } catch (err) {
      handleApiError(err, "Failed to add comment.");
    } finally {
      setIsCommenting(false);
    }
  };

  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsDeleting(true);
    try {
      await api.delete(`/delete/${post._id}`);
      if (typeof onUpdate === "function") onUpdate();
      toast.success("Post deleted.");
    } catch (err) {
      handleApiError(err, "Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler to go to user profile
  const goToUserProfile = (e) => {
    e.stopPropagation();
    if (post.author?._id) {
      navigate(`/profile/${post.author._id}`);
    }
  };

  return (
    <div
      className="overflow-hidden relative p-4 mb-4 rounded border shadow-lg"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
      }}
    >
      <div className="flex gap-2 items-center mb-2">
        <div className="flex gap-3 items-center">
          <img
            src={
              post.author?.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
            }
            alt="Profile"
            className="object-cover w-10 h-10 rounded-full border-2 border-white shadow cursor-pointer"
            onClick={goToUserProfile}
            style={{ transition: "box-shadow 0.2s" }}
          />
          <div>
            <h1
              className="font-bold text-white drop-shadow cursor-pointer"
              onClick={goToUserProfile}
            >
              {post.author?.name}
            </h1>
            {post.author?.headline && (
              <div className="text-xs text-gray-200 drop-shadow">{post.author.headline}</div>
            )}
          </div>
        </div>
      </div>

      <p className="mb-2 text-white drop-shadow">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="object-contain mt-2 w-full max-h-96 rounded"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
      )}

      <div className="flex gap-4 mt-2 text-sm">
        <button
          onClick={likePost}
          disabled={isLiking}
          className={`flex items-center gap-1 ${post.likes.includes(currentUserId) ? "text-red-500" : "text-white"} ${isLiking ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <Heart color={post.likes.includes(currentUserId) ? "red" : "white"} />
          {post.likes.length}
        </button>

        {post.author?._id === currentUserId && (
          <button
            onClick={deletePost}
            disabled={isDeleting}
            className={`flex items-center gap-1 text-red-300 ${isDeleting ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <Trash />
          </button>
        )}
      </div>

      <div className="mt-2">
        {post.comments && post.comments.length > 0 && (
          <div className="mb-2">
            {post.comments.map((c, i) => (
              <div key={i} className="flex gap-2 items-center mb-1 text-sm text-gray-100 drop-shadow">
                <img
                  src={
                    c.user?.profilePicture ||
                    "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
                  }
                  alt="Profile"
                  className="object-cover w-7 h-7 rounded-full border shadow border-white/40"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
                <span>
                  <b>{c.user?.name || c.user?.username || "Unknown"}:</b> {c.content}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
            className="flex-1 px-2 py-1 text-white rounded border bg-white/30 placeholder:text-gray-200"
            style={{
              background: "rgba(255,255,255,0.25)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            disabled={isCommenting}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commentPost();
              }
            }}
          />
          <button
            onClick={commentPost}
            className={`text-blue-200 ${isCommenting ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={isCommenting}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
