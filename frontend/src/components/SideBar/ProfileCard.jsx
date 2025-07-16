import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileCard = ({ username }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const { data } = await axios.get(`${backendUrl}/api/profile/${username}`, {
          withCredentials: true,
        });
        setUser(data.data); // ⬅️ the `user` object
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      }
    };

    if (username) fetchUser();
  }, [username]);

  if (!user) return null;

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  const profileImage = user.profilePicture || "https://via.placeholder.com/150";
  const bannerImage = user.bannerImg || "https://via.placeholder.com/900x200";

  return (
    <div className="max-w-xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden border bg-white">
      <div className="relative h-40 bg-gray-200">
        <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute -bottom-10 left-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
          />
        </div>
      </div>

      <div className="pt-14 pb-6 px-6">
        <h2 className="text-xl font-semibold text-black">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-sm text-gray-700 mt-2">{user.headline || "No headline added."}</p>

        <button
          onClick={handleViewProfile}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
