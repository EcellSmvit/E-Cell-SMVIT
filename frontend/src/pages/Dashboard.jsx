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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">We are coming soon 🚀</h1>
      <button
        onClick={handleLogout}
        className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
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
