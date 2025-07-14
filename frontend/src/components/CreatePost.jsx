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
      <label
        htmlFor="post-content"
        className="block mb-1 text-sm font-medium"
        style={{ color: "#e0e0e0", letterSpacing: "0.01em" }}
      >
        What's on your mind?
      </label>
      <textarea
        id="post-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="p-3 mb-2 w-full rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        style={{
          background: "rgba(255,255,255,0.22)",
          color: "#f5f5f5",
          border: "1.5px solid rgba(255,255,255,0.28)",
          boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          fontSize: "1.05rem",
          fontWeight: 400,
          letterSpacing: "0.01em",
          resize: "vertical",
        }}
        rows={3}
        disabled={isUploading}
        required
      />

      <label className="block mb-2 text-sm font-medium" style={{ color: "#e0e0e0" }}>
        Optional Image:
      </label>
      <div className="relative mb-2">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
          style={{
            zIndex: 2,
          }}
        />
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded border border-dashed border-indigo-300 bg-white/10 text-indigo-100 cursor-pointer transition hover:bg-indigo-500/20 ${
            isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
          style={{
            fontWeight: 500,
            fontSize: "0.95rem",
            letterSpacing: "0.01em",
            zIndex: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-indigo-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ minWidth: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 16V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zm3-2l3 3 4-4 5 5"
            />
          </svg>
          {isUploading ? "Uploading..." : "Choose Image"}
        </label>
      </div>

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
