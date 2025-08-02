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

  const updateUserRole = async (id, role) => {
    try {
      await axios.put(`${backendUrl}/api/admin/users/${id}/role`, { role }, {
        withCredentials: true,
      });
      toast.success("User role updated");
      fetchData();
    } catch (err) {
      console.error("❌ Update role error:", err);
      toast.error("Failed to update role.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>

      <h2 className="mt-6 mb-2 text-xl">All Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="p-4 rounded bg-white/10">
            <p className="text-sm text-gray-300">Author: {post.author?.name}</p>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="post-img" className="mt-2 w-32 rounded" />}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                Likes: {post.likes?.length} | Comments: {post.comments?.length}
              </span>
              <button
                className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 mb-2 text-xl">All Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="p-4 rounded bg-white/10">
            <div className="mb-1 font-medium">{user.name} ({user.email})</div>
            <div className="text-sm text-gray-300">
              Username: {user.username} | Verified: {user.isAccountVerified ? "✅" : "❌"}<br />
              Admin: {user.isAdmin ? "Yes" : "No"} | Alumni: {user.isAlumni ? "Yes" : "No"}<br />
              Joined: {new Date(user.createdAt).toLocaleString()}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => updateUserRole(user._id, "admin")}
                className="px-2 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600">
                Make Admin
              </button>
              <button onClick={() => updateUserRole(user._id, "alumni")}
                className="px-2 py-1 text-sm bg-green-500 rounded hover:bg-green-600">
                Make Alumni
              </button>
              <button onClick={() => updateUserRole(user._id, "removeAdmin")}
                className="px-2 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700">
                Remove Admin
              </button>
              <button onClick={() => updateUserRole(user._id, "removeAlumni")}
                className="px-2 py-1 text-sm bg-yellow-500 rounded hover:bg-yellow-600">
                Remove Alumni
              </button>
              <button onClick={() => deleteUser(user._id)}
                className="px-2 py-1 text-sm bg-red-500 rounded hover:bg-red-600">
                Delete User
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
