import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

/**
 * PostCard component displays a single post, its comments, and allows
 * liking, commenting, and deleting the post.
 * 
 * This component now provides more helpful error messages for 401 (Unauthorized)
 * and 404 (Not Found) errors, to help users understand why actions may fail.
 */
const PostCard = ({ post, onUpdate }) => {
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
      toast.error(
        err?.response?.data?.message || fallbackMsg
      );
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

  return (
    <div className="p-4 mb-4 bg-white rounded border">
      <div className="flex gap-2 items-center mb-2">
        {post.author?.profilePicture && (
          <img
            src={post.author.profilePicture}
            alt={post.author.username}
            className="object-cover w-8 h-8 rounded-full"
          />
        )}
        <div>
          <h3 className="font-bold">@{post.author?.username}</h3>
          {post.author?.headline && (
            <div className="text-xs text-gray-500">{post.author.headline}</div>
          )}
        </div>
      </div>
      <p className="mb-2">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="object-contain mt-2 w-full max-h-96 rounded"
        />
      )}
      <div className="flex gap-4 mt-2 text-sm">
        <button
          onClick={likePost}
          disabled={isLiking}
          className={`flex items-center gap-1 ${isLiking ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          ❤️ {post.likes.length}
        </button>
        <button
          onClick={deletePost}
          disabled={isDeleting}
          className={`flex items-center gap-1 text-red-500 ${isDeleting ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          🗑️ Delete
        </button>
      </div>
      <div className="mt-2">
        {post.comments && post.comments.length > 0 && (
          <div className="mb-2">
            {post.comments.map((c, i) => (
              <div key={i} className="mb-1 text-sm text-gray-700">
                <b>
                  {c.user?.name
                    ? c.user.name
                    : c.user?.username
                    ? c.user.username
                    : "Unknown"}
                  :
                </b>{" "}
                {c.content}
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
            className="flex-1 px-2 py-1 rounded border"
            disabled={isCommenting}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                commentPost();
              }
            }}
          />
          <button
            onClick={commentPost}
            className={`text-blue-500 ${isCommenting ? "opacity-60 cursor-not-allowed" : ""}`}
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
