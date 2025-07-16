import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  // ✅ DEBUG: Log image URLs
  console.log("👤 ProfileCard User:", user);
  console.log("🖼️ profilePicture URL:", user.profilePicture);
  console.log("🖼️ bannerImg URL:", user.bannerImg);

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  // ✅ Use fallback images if not available
  const profileImage = user.profilePicture || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600";
  const bannerImage = user.bannerImg || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200";

  return (
    <div className="max-w-xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden border bg-white">
      {/* Banner Image */}
      <div className="relative h-40 bg-gray-200">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        {/* Profile Image */}
        <div className="absolute -bottom-10 left-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="pt-14 pb-6 px-6 text-center md:text-left">
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
