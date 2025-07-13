import { useState } from "react";
import api from "../utils/api";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let base64 = "";
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        await new Promise((resolve) => {
          reader.onloadend = () => {
            base64 = reader.result;
            resolve();
          };
        });
      }

      await api.post("/create", {
        content,
        image: base64 || undefined,
      });

      setContent("");
      setImage(null);
      onPostCreated();
    } catch (err) {
      console.error("Create post error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border rounded p-2 mb-2"
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" className="bg-indigo-500 text-white px-4 py-1 rounded mt-2">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
