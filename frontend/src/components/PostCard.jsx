import React, { useContext, useState } from "react";
// Assuming api and toast are correctly imported and configured elsewhere
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// Mock imports for demonstration purposes as actual imports are not provided
const api = {
  post: async (url, data) => {
    console.log(`API POST: ${url}`, data);
    return new Promise(resolve => setTimeout(resolve, 500));
  },
  delete: async (url) => {
    console.log(`API DELETE: ${url}`);
    return new Promise(resolve => setTimeout(resolve, 500));
  }
};
const toast = {
  error: (msg) => console.error("Toast Error:", msg),
  success: (msg) => console.log("Toast Success:", msg),
};
const AppContext = React.createContext({ userData: { _id: "mockUserId", username: "mockUser" } });
const useNavigate = () => (path) => console.log(`Navigating to: ${path}`);


import { Trash, Heart, MessageSquare } from 'lucide-react'; // Added MessageSquare for consistency

// Custom Modal Component for confirmation
const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white/15 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 text-white max-w-sm w-full"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        }}
      >
        <p className="mb-6 text-lg text-center">{message}</p>
        <div className="flex justify-around gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-all duration-300 text-white font-semibold shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-semibold shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


const PostCard = ({ post, onUpdate }) => {
  // Mock post data for demonstration if not provided
  if (!post) {
    post = {
      _id: "mockPostId",
      content: "This is a sample post content. It's designed to show off the new glassmorphism style!",
      image: "https://placehold.co/600x400/000000/FFFFFF?text=Modern+Post+Image",
      likes: ["anotherUser"],
      comments: [
        { user: { name: "Commenter One" }, content: "Great post!" },
        { user: { name: "Commenter Two", profilePicture: "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558" }, content: "Loving the new look!" },
      ],
      author: {
        _id: "mockAuthorId",
        name: "Jane Doe",
        username: "janedoe",
        headline: "Frontend Developer | UI/UX Enthusiast",
        profilePicture: "https://placehold.co/100x100/A020F0/FFFFFF?text=JD"
      }
    };
  }

  const { userData } = useContext(AppContext);
  // Use mock user ID if actual userData is not available for demonstration
  const currentUserId = userData?._id || "mockUserId";
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

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

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false); // Close modal
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

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Open modal
  };

  // Handler to go to user profile
  const goToUserProfile = (e) => {
    e.stopPropagation();
    if (post.author?._id) {
      navigate(`/profile/${post.author.username}`);
    }
  };

  return (
    <div className="font-inter antialiased bg-gradient-to-br from-purple-700 to-blue-600 min-h-screen flex items-center justify-center p-6">
      <div
        className="relative w-full max-w-xl p-10 rounded-[3.5rem] border border-white/40 shadow-4xl overflow-hidden transform transition-all duration-700 hover:scale-[1.015]"
        style={{
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 100%)",
          backdropFilter: "blur(40px) saturate(200%)", // Increased blur and saturate for maximum glassmorphism
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          boxShadow: "0 18px 60px 0 rgba(31, 38, 135, 0.55)", // Even stronger, more diffused shadow
        }}
      >
        {/* Decorative background circles - for enhanced glassmorphism effect */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>


        <div className="relative z-10"> {/* Ensure content is above background circles */}
          <div className="flex gap-5 items-center mb-8 cursor-pointer" onClick={goToUserProfile}>
            <img
              src={
                post.author?.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
              }
              alt="Profile"
              className="object-cover w-20 h-20 rounded-full border-5 border-white shadow-2xl transform hover:scale-105 transition-all duration-300 ring-4 ring-white/60"
            />
            <div>
              <h1
                className="font-extrabold text-white text-3xl drop-shadow-xl"
              >
                {post.author?.name}
              </h1>
              {post.author?.headline && (
                <div className="text-lg text-gray-100 drop-shadow-lg">{post.author.headline}</div>
              )}
            </div>
          </div>

          <p className="mb-8 text-white text-xl leading-relaxed drop-shadow-lg">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="object-cover mt-6 w-full max-h-[500px] rounded-3xl shadow-2xl border border-white/30"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)", // Slightly more blur for image background
                WebkitBackdropFilter: "blur(10px)",
              }}
            />
          )}

          <div className="flex items-center gap-10 mt-9 text-sm">
            <button
              onClick={likePost}
              disabled={isLiking}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 font-bold text-xl
                ${post.likes.includes(currentUserId) ? "bg-red-600 text-white shadow-xl hover:bg-red-700" : "bg-white/30 text-white shadow-xl hover:bg-white/40"}
                ${isLiking ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
              `}
            >
              <Heart fill={post.likes.includes(currentUserId) ? "white" : "none"} strokeWidth={1.5} size={24} />
              <span>{post.likes.length}</span>
            </button>

            <div className="flex items-center gap-3 text-white text-xl font-bold">
              <MessageSquare size={24} />
              <span>{post.comments.length}</span>
            </div>

            {post.author?._id === currentUserId && (
              <button
                onClick={handleDeleteClick} // Call the handler to open modal
                disabled={isDeleting}
                className={`flex items-center gap-3 px-6 py-3 rounded-full bg-red-500 text-white font-bold shadow-xl hover:bg-red-600 transition-all duration-300 text-xl
                  ${isDeleting ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
                `}
              >
                <Trash size={24} />
                <span>Delete</span>
              </button>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-white/30">
            {post.comments && post.comments.length > 0 && (
              <div className="mb-6 max-h-56 overflow-y-auto custom-scrollbar pr-4"> {/* Increased max-height and padding */}
                {post.comments.map((c, i) => (
                  <div key={i} className="flex gap-5 items-start mb-5 text-lg text-gray-100 drop-shadow">
                    <img
                      src={
                        c.user?.profilePicture ||
                        "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
                      }
                      alt="Profile"
                      className="object-cover w-10 h-10 rounded-full border border-white/50 shadow-md flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    />
                    <div className="flex-grow">
                      <b className="text-white font-bold">{c.user?.name || c.user?.username || "Unknown"}:</b>{" "}
                      <span className="text-gray-200">{c.content}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-5 mt-6">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a sparkling comment..."
                className="flex-1 px-6 py-3 text-white rounded-full border border-white/40 bg-white/25 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/70 transition-all duration-200 text-lg"
                style={{
                  background: "rgba(255,255,255,0.3)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
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
                className={`px-8 py-3 rounded-full bg-blue-600 text-white font-bold shadow-xl hover:bg-blue-700 transition-all duration-300 text-lg
                  ${isCommenting ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
                `}
                disabled={isCommenting}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Tailwind CSS Blob Animation Keyframes and Custom Scrollbar */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        /* Custom Scrollbar for comments */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        `}
      </style>
    </div>
  );
};

export default PostCard;
