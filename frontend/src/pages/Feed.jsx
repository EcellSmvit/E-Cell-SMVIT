import { useContext, useEffect, useState } from "react";
import api from "../utils/api"; // Create this file if you haven’t
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { AppContext } from "../context/AppContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { isLogin } = useContext(AppContext);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/feed");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (isLogin) fetchPosts();
  }, [isLogin]);

  if (!isLogin) return <p className="text-center mt-10">Please log in to see posts.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <CreatePost onPostCreated={fetchPosts} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onUpdate={fetchPosts} />
      ))}
    </div>
  );
};

export default Feed;
