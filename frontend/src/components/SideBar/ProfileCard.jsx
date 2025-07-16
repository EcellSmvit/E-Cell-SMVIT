import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  console.log("📦 user in ProfileCard:", user); // Debug

  if (!user) return null;

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  // const profileImage = user.profilePicture || "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=600";
  // const bannerImage = user.bannerImg || "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?fm=jpg&q=60";

  return (
    <div className="max-w-xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden border bg-white">
      <div className="relative h-40 bg-gray-200">
        <img src={user.bannerImg} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute -bottom-10 left-4">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
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
