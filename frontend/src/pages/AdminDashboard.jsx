// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const postRes = await api.get("/admin/posts");
      const userRes = await api.get("/admin/users");
      setPosts(postRes.data);
      setUsers(userRes.data);
    } catch (err) {
      toast.error("Failed to load admin data.");
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/admin/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
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
          <li key={post._id} className="flex justify-between items-center p-3 rounded bg-white/10">
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
          <li key={user._id} className="flex justify-between items-center p-3 rounded bg-white/10">
            <span>{user.name} ({user.email})</span>
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
