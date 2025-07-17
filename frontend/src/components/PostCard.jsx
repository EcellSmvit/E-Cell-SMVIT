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
      if (typeof onUpdate === "function") onUpdate();
      toast.success("Post deleted.");
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
      className="rounded-2xl p-6 mb-6 shadow-xl transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.author?.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
          alt="User"
          onClick={goToUserProfile}
          className="w-12 h-12 rounded-full border-2 border-white cursor-pointer object-cover shadow"
        />
        <div>
          <h2
            className="text-lg font-semibold text-white cursor-pointer hover:underline"
            onClick={goToUserProfile}
          >
            {post.author?.name}
          </h2>
          {post.author?.headline && (
            <p className="text-sm text-gray-200">{post.author.headline}</p>
          )}
        </div>
      </div>

      <p className="text-white text-base mb-3">{post.content}</p>

      {post.image && (
        <div className="rounded-lg overflow-hidden mb-4 border border-white/20">
          <img
            src={post.image}
            alt="Post"
            className="object-cover w-full max-h-96 rounded"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(3px)",
            }}
          />
        </div>
      )}

      <div className="flex gap-6 items-center text-white text-sm mb-4">
        <button
          onClick={likePost}
          disabled={isLiking}
          className={`flex items-center gap-2 ${post.likes.includes(currentUserId) ? "text-red-400" : "text-white"} ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart size={18} color={post.likes.includes(currentUserId) ? "red" : "white"} />
          {post.likes.length}
        </button>

        {post.author?._id === currentUserId && (
          <button
            onClick={deletePost}
            disabled={isDeleting}
            className={`flex items-center gap-2 text-red-300 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Trash size={18} />
          </button>
        )}
      </div>

      {post.comments?.length > 0 && (
        <div className="mb-3 space-y-2">
          {post.comments.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-100">
              <img
                src={c.user?.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
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

      <div className="flex gap-3 items-center mt-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          onKeyDown={(e) => e.key === "Enter" && commentPost()}
          disabled={isCommenting}
          className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 placeholder:text-gray-200 text-white border border-white/20 backdrop-blur"
        />
        <button
          onClick={commentPost}
          disabled={isCommenting}
          className={`text-blue-200 font-medium ${isCommenting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
