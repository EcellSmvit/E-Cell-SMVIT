// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const postRes = await axios.get(`${backendUrl}/api/admin/posts`, {
        withCredentials: true,
      });
      const userRes = await axios.get(`${backendUrl}/api/admin/users`, {
        withCredentials: true,
      });
      setPosts(postRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("❌ Admin data fetch error:", err);
      toast.error("Failed to load admin data.");
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/posts/${id}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      console.error("❌ Post delete error:", err);
      toast.error("Failed to delete post.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      console.error("❌ User delete error:", err);
      toast.error("Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>

      <h2 className="mt-6 mb-2 text-xl">All Posts</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post._id}
            className="flex justify-between items-center p-3 rounded bg-white/10"
          >
            <span>{post.content?.slice(0, 50)}...</span>
            <button
              className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 mb-2 text-xl">All Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-3 rounded bg-white/10"
          >
            <span>
              {user.name} ({user.email})
            </span>
            <button
              className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
