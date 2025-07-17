import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const SuggestedUser = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/user/suggested`);
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-white text-sm">Loading suggestions...</p>;
  if (error) return <p className="text-red-400 text-sm">Error loading suggestions</p>;
  if (!data || data.length === 0) return <p className="text-white text-sm">No suggestions available</p>;

  return (
    <div className="p-4 bg-white/10 border border-white/20 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-3">Suggested Users</h2>
      <ul className="space-y-3">
        {data.map((user) => (
          <li
            key={user._id}
            className="flex gap-3 items-center cursor-pointer hover:bg-white/10 p-2 rounded"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <img
              src={user.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
              alt="Profile"
              className="w-10 h-10 rounded-full border shadow object-cover"
            />
            <div>
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-sm text-gray-300">@{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUser;
