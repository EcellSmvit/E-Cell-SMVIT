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

  if (isLoading) return <p className="text-sm text-white">Loading suggestions...</p>;
  if (error) return <p className="text-sm text-red-400">Error loading suggestions</p>;
  if (!data || data.length === 0) return <p className="text-sm text-white">No suggestions available</p>;

  return (
    <div className="rounded-xl border shadow  bg-white/10 border-white/20">
      <h2 className="mb-3 text-lg font-semibold text-white">Suggested Users</h2>
      <ul className="space-y-3">
        {data.map((user) => (
          <li
            key={user._id}
            className="flex gap-3 items-center p-2 rounded cursor-pointer hover:bg-white/10"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <img
              src={user.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
              alt="Profile"
              className="object-cover w-10 h-10 rounded-full border shadow"
            />
            <div>
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-sm text-gray-300">@{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUser;
