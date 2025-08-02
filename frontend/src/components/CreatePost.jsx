import { useState } from "react";
import { useContext } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const CreatePost = ({ onPostCreated }) => {
  const { userData } = useContext(AppContext);
  const isAuthorized = userData?.isAdmin || userData?.isAlumni;

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

  if (!isAuthorized) {
    return (
      <div className="my-6 italic text-center text-gray-400">
        Only <span className="font-semibold text-indigo-300">Admins</span> or{" "}
        <span className="font-semibold text-indigo-300">Alumni</span> can post jobs or internships.
      </div>
    );
  }

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
      className="p-6 mb-6 text-white bg-gradient-to-br from-indigo-700 via-purple-800 to-indigo-900 rounded-xl border border-indigo-400 shadow-xl"
    >
      <h2 className="mb-2 text-xl font-bold">Post Job / Internship Opportunity</h2>
      <p className="mb-4 text-sm text-indigo-200">Alumni can share job or internship opportunities from their companies with the student community.</p>

      <label htmlFor="post-content" className="block mb-1 text-sm font-medium">
        Details:
      </label>
      <textarea
        id="post-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Describe the opportunity (e.g., position, requirements, apply link)..."
        className="p-3 mb-3 w-full placeholder-indigo-200 text-white rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows={4}
        disabled={isUploading}
        required
      />

      <label className="block mb-2 text-sm font-medium text-indigo-200">
        Upload Poster / Logo (optional):
      </label>
      <div className="relative mb-4">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded border border-dashed border-indigo-400 bg-white/5 text-indigo-100 cursor-pointer transition hover:bg-indigo-500/10 ${
            isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-indigo-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
        className={`w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded transition-all duration-200 ${
          isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {isUploading ? "Posting..." : "Post Opportunity"}
      </button>
    </form>
  );
};

export default CreatePost;
