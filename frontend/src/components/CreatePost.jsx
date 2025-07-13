import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleApiError = (err, fallbackMsg) => {
    const status = err?.response?.status;
    if (status === 401) {
      toast.error("You must be logged in to create a post.");
    } else if (status === 404) {
      toast.error("Endpoint not found.");
    } else {
      toast.error(err?.response?.data?.message || fallbackMsg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Post content cannot be empty.");
      return;
    }

    setIsUploading(true);

    try {
      let base64Image = null;

      if (image) {
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      }

      await api.post("/create", {
        content,
        image: base64Image,
      });

      toast.success("Post created successfully!");
      setContent("");
      setImage(null);
      if (typeof onPostCreated === "function") onPostCreated();
    } catch (err) {
      console.error("❌ Error creating post:", err);
      handleApiError(err, "Failed to create post.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mb-6 rounded border"
      style={{
        background: "rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="p-2 mb-2 w-full rounded border"
        style={{
          background: "rgba(255,255,255,0.25)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        rows={3}
        disabled={isUploading}
        required
      />

      <label className="block mb-2 text-sm font-medium" style={{ color: "#e0e0e0" }}>
        Optional Image:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0] || null)}
        className="mb-2"
        disabled={isUploading}
        style={{
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "0.25rem",
          borderRadius: "0.375rem",
        }}
      />

      <button
        type="submit"
        disabled={isUploading}
        className={`bg-indigo-500 text-white px-4 py-1 rounded mt-2 ${
          isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
        style={{
          background: "rgba(99,102,241,0.85)",
          boxShadow: "0 2px 8px 0 rgba(99,102,241,0.15)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {isUploading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
