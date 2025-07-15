import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import { LogOut } from 'lucide-react';
// import Sidebar from "@/components/SideBar/ProfileCard";
import ProfileCard from "@/components/SideBar/ProfileCard";

const ECELL_LOGO_URL =
  "https://ecell.smvitae.org/assets/img/logo/ecell_logo_white.png"; // Replace with your actual logo URL if different

const Dashboard = () => {
  const { userData, setIsLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
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
      className="flex flex-col min-h-screen text-white"
      style={{
        background: "radial-gradient(circle at 50% 30%, #4F46E5 0%, #000 100%)",
      }}
    >
      <nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-indigo-900/80 backdrop-blur-md border-b border-indigo-700"
        style={{
          boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.18)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://www.ecellsmvit.in/images/ecellwhite.png"
            alt="E-Cell Logo"
            className="h-10 w-10 object-contain"
            style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}
          />
        </div>
        <div>
          {userData ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              <LogOut />
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 pt-24 w-full">
        {/* Sidebar */}
        <div className="hidden md:block md:w-64 lg:w-72 xl:w-80 h-full">
        <ProfileCard user={userData} />
        </div>
        {/* Feed/Main Content */}
        <div className="flex-1 flex justify-center items-start w-full">
          <div className="p-4 w-full max-w-3xl">
            <Feed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
