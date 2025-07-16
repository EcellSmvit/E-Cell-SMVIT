import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  if (!user) return null; 

  return (
    <div className="max-w-xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden border bg-white">
      <div className="relative h-40 bg-gray-200">
        <img
          src={user.bannerImg || "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-10 left-4">
          <img
            src={user.profilePicture || "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="pt-14 pb-6 px-6">
        <h2 className="text-xl font-semibold text-black">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        {user.headline && (
          <p className="text-sm text-gray-900 mt-2 font-medium">{user.headline}</p>
        )}

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
