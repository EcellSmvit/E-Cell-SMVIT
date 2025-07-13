import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";

const Dashboard = () => {
  const { userData, setIsLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/");
  };

  if (!userData) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          background: "radial-gradient(circle at 50% 30%, #4F46E5 0%, #000 100%)",
        }}
      >
        <div className="text-xl font-semibold text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen text-white"
      style={{
        background: "radial-gradient(circle at 50% 30%, #4F46E5 0%, #000 100%)",
      }}
    >
      <h1 className="mb-4 text-3xl font-bold">We are coming soon 🚀</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Logout
      </button>
      <div className="p-4">
        <Feed />
      </div>
    </div>
  );
};

export default Dashboard;
