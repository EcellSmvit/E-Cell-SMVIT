import { useState } from "react";
import api from "../utils/api"; // already has baseURL set
import { toast } from "react-toastify";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let base64 = "";

      if (image) {
        const reader = new FileReader();
        const fileReadPromise = new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
        reader.readAsDataURL(image);
        base64 = await fileReadPromise;
      }

      // ✅ DO NOT add BACKEND_URL manually here
      await api.post("/create", {
        content,
        image: base64 || undefined,
      });

      toast.success("Post created!");
      setContent("");
      setImage(null);
      onPostCreated();
    } catch (err) {
      console.error("❌ Create post error:", err);
      toast.error("Failed to create post.");
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
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
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
