import { useState } from "react";
import api from "../utils/api";

const PostCard = ({ post, onUpdate }) => {
  const [comment, setComment] = useState("");

  const likePost = async () => {
    await api.post(`/${post._id}/like`);
    onUpdate();
  };

  const commentPost = async () => {
    if (!comment.trim()) return;
    await api.post(`/${post._id}/comment`, { content: comment });
    setComment("");
    onUpdate();
  };

  const deletePost = async () => {
    await api.delete(`/delete/${post._id}`);
    onUpdate();
  };

  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="font-bold">@{post.author?.username}</h3>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="post" className="w-full mt-2 rounded" />}
      <div className="flex gap-4 mt-2 text-sm">
        <button onClick={likePost}>❤️ {post.likes.length}</button>
        <button onClick={deletePost}>🗑️ Delete</button>
      </div>
      <div className="mt-2">
        {post.comments.map((c, i) => (
          <div key={i} className="text-sm text-gray-700">
            <b>{c.user?.name}:</b> {c.content}
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
            className="border rounded px-2 py-1 flex-1"
          />
          <button onClick={commentPost} className="text-blue-500">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
