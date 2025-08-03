import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import { LogOut } from 'lucide-react';
// import Sidebar from "@/components/SideBar/ProfileCard";
import ProfileCard from "@/components/SideBar/ProfileCard";
import SuggestedUser from "@/components/SuggestedUser";
import AdminButton from "@/components/AdminButton";

const ECELL_LOGO_URL =
  "https://ecell.smvitae.org/assets/img/logo/ecell_logo_white.png";

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
        className="flex fixed top-0 left-0 z-50 justify-between items-center px-6 py-3 w-full border-b border-indigo-700 backdrop-blur-md bg-indigo-900/80"
        style={{
          boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.18)",
        }}
      >
        <div className="flex gap-3 items-center">
          <img
            src="https://www.ecellsmvit.in/images/ecellwhite.png"
            alt="E-Cell Logo"
            className="object-contain w-10 h-10"
            style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}
          />
        </div>
        <div className="flex items-center gap-4">
          <AdminButton />
          {userData ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded transition hover:bg-blue-700"
            >
              <LogOut />
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded transition hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-row justify-center items-start mt-32 w-full">
        <div className="flex flex-1 justify-end">
          <ProfileCard username={userData.username} />
        </div>
        <div className="flex flex-col items-center mx-8" style={{ minWidth: 400, maxWidth: 600, width: "100%" }}>
          <Feed />
        </div>
        <div className="flex flex-1 justify-start">
          <SuggestedUser />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
