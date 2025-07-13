import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

/**
 * CreatePost component allows users to create a new post with optional image.
 * 
 * This version provides more helpful error messages for 401 (Unauthorized)
 * and 404 (Not Found) errors, to help users understand why actions may fail.
 */
const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Helper to show user-friendly error messages
  const handleApiError = (err, fallbackMsg) => {
    const status = err?.response?.status;
    if (status === 401) {
      toast.error("You must be logged in to create a post. Please log in.");
    } else if (status === 404) {
      toast.error("Resource not found. The endpoint may be incorrect.");
    } else {
      toast.error(
        err?.response?.data?.message || fallbackMsg
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Content is required.");
      return;
    }
    setIsUploading(true);

    try {
      let base64 = undefined;

      if (image) {
        base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      }

      await api.post("/create", {
        content,
        image: base64,
      });

      toast.success("Post created!");
      setContent("");
      setImage(null);
      if (typeof onPostCreated === "function") onPostCreated();
    } catch (err) {
      console.error("❌ Create post error:", err);
      handleApiError(err, "Failed to create post.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-6 text-black bg-white rounded border">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="p-2 mb-2 w-full rounded border"
        required
        disabled={isUploading}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0] || null)}
        className="mb-2"
        disabled={isUploading}
      />
      <button
        type="submit"
        disabled={isUploading}
        className={`bg-indigo-500 text-white px-4 py-1 rounded mt-2 ${
          isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {isUploading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
