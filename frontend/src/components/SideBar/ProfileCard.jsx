import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  // Safe image rendering with fallback
  const profileImage =
    user.profilePicture?.startsWith("http")
      ? user.profilePicture
      : "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=600&auto=format&fit=crop&q=60";

  const bannerImage =
    user.bannerImg?.startsWith("http")
      ? user.bannerImg
      : "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8";

  return (
    <div className="max-w-xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden border bg-white">
      {/* Banner */}
      <div className="relative h-40 bg-gray-200">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-10 left-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="pt-14 pb-6 px-6">
        <h2 className="text-xl font-semibold text-black">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-sm text-gray-700 mt-2">
          {user.headline || "No headline added."}
        </p>

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
