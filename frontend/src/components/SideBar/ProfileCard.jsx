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

  const profileImage = user.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558";
  const bannerImage = user.bannerImg || "https://via.placeholder.com/900x200";

  return (
    <div className="overflow-hidden mx-auto mt-6 max-w-xl bg-white rounded-2xl border shadow-lg">
      <div className="relative h-40 bg-gray-200">
        <img src={bannerImage} alt="Banner" className="object-cover w-full h-full" />
        <div className="absolute left-4 -bottom-10">
          <img
            src={profileImage}
            alt="Profile"
            className="object-cover w-20 h-20 bg-white rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="px-6 pt-14 pb-6">
        <h2 className="text-xl font-semibold text-black">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="mt-2 text-sm text-gray-700">{user.headline || "No headline added."}</p>

        <button
          onClick={handleViewProfile}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-xl transition hover:bg-blue-700"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
