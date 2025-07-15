import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden border bg-white">
      <div className="relative h-40 bg-gray-200">
        {user.bannerImg && (
          <img
            src={user.bannerImg ? user.bannerImg : "https://www.ecellsmvit.in/images/ecellwhite.png"}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute -bottom-10 left-4">
          <img
            src={user.profilePicture ? user.profilePicture : "https://www.ecellsmvit.in/images/ecellwhite.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="pt-14 pb-6 px-6">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-sm text-gray-700 mt-2">{user.headline}</p>

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
