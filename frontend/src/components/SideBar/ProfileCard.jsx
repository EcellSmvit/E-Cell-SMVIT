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
        setUser(data.data);
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

  const profileImage =
    user.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558";
  const bannerImage = user.bannerImg || "https://via.placeholder.com/900x200";

  return (
    <div
      className="overflow-hidden mx-auto mt-6 max-w-xl rounded-2xl border border-white/20 shadow-xl transition-transform hover:scale-[1.01]"
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
      }}
    >
      {/* Banner */}
      <div className="relative h-40 bg-gray-300">
        <img src={bannerImage} alt="Banner" className="object-conatin w-full h-full" />
        <div className="absolute left-6 -bottom-10">
          <img
            src={profileImage}
            alt="Profile"
            className="object-cover w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-14 pb-6 text-white">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-200">@{user.username}</p>
        <p className="mt-2 text-sm text-gray-100">{user.headline || "No headline added."}</p>

        <button
          onClick={handleViewProfile}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
