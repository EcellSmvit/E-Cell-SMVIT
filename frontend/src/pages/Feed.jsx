import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { AppContext } from "../context/AppContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLogin } = useContext(AppContext);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/feed");
      setPosts(res.data);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) fetchPosts();
  }, [isLogin]);

  if (!isLogin) {
    return <p className="mt-10 text-center text-white">Please log in to see posts.</p>;
  }

  return (
    <div className="px-4 mx-auto max-w-2xl text-black">
      <CreatePost onPostCreated={fetchPosts} />

      {loading ? (
        <p className="mt-4 text-center text-white">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="mt-4 text-center text-gray-400">No posts yet. Start by creating one!</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} onUpdate={fetchPosts} />
        ))
      )}
    </div>
  );
};

export default Feed;
