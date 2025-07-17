import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuggestedUser = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/user/suggested`);
      return res.data.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleNavigate = (username) => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  if (isLoading) return <p className="text-white">Loading suggestions...</p>;
  if (error) return <p className="text-red-500">Failed to load suggestions.</p>;

  return (
    <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 shadow">
      <h2 className="text-lg font-semibold text-white mb-4">Suggested Users</h2>
      <div className="space-y-4">
        {data?.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer transition"
          >
            <img
              src={
                user.profilePicture ||
                "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-white/30 shadow"
              onClick={() => handleNavigate(user.username)}
            />
            <div>
              <p
                className="text-white font-medium leading-tight"
                onClick={() => handleNavigate(user.username)}
              >
                {user.name || "No Name"}
              </p>
              <p className="text-sm text-gray-300">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUser;
