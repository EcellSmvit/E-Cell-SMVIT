import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

import AboutSection from "@/components/AboutSection/AboutSection";
import ExperienceSection from "@/components/ExperienceSection/ExperienceSection";
import EducationSection from "@/components/EducationSection/EducationSection";
import SkillSection from "@/components/skillsection/SkillSection";
import Headline from "@/components/Headline/Headline";

const ProfilePage = () => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/user/data`);
      return res.data.user;
    },
    retry: false
  });

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/profile/${username}`);
      return res.data.data;
    },
    retry: false
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axios.put(`${backendUrl}/api/profile/userprofile`, updatedData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["userProfile", username]);
    },
  });

  if (isAuthLoading || isProfileLoading)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          background: "radial-gradient(circle at 50% 30%, #4E46E4 0%, #000 100%)",
        }}
      >
        <div className="px-8 py-6 rounded-xl border shadow-xl backdrop-blur-md bg-white/40 border-white/30">
          <span className="text-lg font-semibold text-indigo-700">Loading...</span>
        </div>
      </div>
    );

  const isOwnProfile = authUser?.username === userProfile?.username;
  const userData = userProfile || {};

  if (!userData.username) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          background: "radial-gradient(circle at 50% 30%, #4E46E4 0%, #000 100%)",
        }}
      >
        <div className="px-8 py-6 rounded-xl border shadow-xl backdrop-blur-md bg-white/40 border-white/30">
          <span className="text-center text-red-600">Error: User data not found</span>
        </div>
      </div>
    );
  }

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSizeInMB = 3;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast.error(`Image must be under ${maxSizeInMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      toast.loading("Uploading image...");

      updateProfile(
        { [type]: base64 },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success(`${type === "profilePicture" ? "Profile" : "Banner"} updated!`);
            queryClient.invalidateQueries(["userProfile", username]);
          },
          onError: () => {
            toast.dismiss();
            toast.error("Failed to upload image.");
          },
        }
      );
    };

    reader.onerror = () => {
      toast.error("Failed to read the file.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className="flex justify-center items-center px-3 md:px-8 py-10 min-h-screen"
      style={{
        background: "radial-gradient(circle at 50% 30%, #4E46E4 0%, #000 100%)",
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="p-6 md:p-10 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
          {/* Banner */}
          <div className="flex flex-col gap-4 items-center mb-10">
            <div className="relative w-full">
              <img
                src={userData.bannerImg || "https://via.placeholder.com/900x200"}
                alt="Banner"
                className="object-cover w-full h-48 rounded-2xl border border-white/30 shadow-lg transition-transform duration-300 hover:scale-[1.01]"
              />
              {isOwnProfile && (
                <label className="absolute top-3 right-4 px-3 py-1.5 text-xs font-semibold text-indigo-700 rounded-md border border-white/30 shadow-md bg-white/60 backdrop-blur-sm cursor-pointer hover:bg-white/80 transition-all">
                  Edit Cover
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "bannerImg")}
                  />
                </label>
              )}
            </div>

            {/* Profile Picture */}
            <div className="relative -mt-14 group">
              <img
                src={userData.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
                alt="Profile"
                className="object-cover w-28 h-28 rounded-full border-4 border-white bg-white/70 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              {isOwnProfile && (
                <label className="absolute right-1.5 bottom-1.5 p-1 text-xs font-semibold text-indigo-700 bg-white/80 border border-white/40 rounded-full shadow-md backdrop-blur-md cursor-pointer hover:bg-white transition-all">
                  Edit
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "profilePicture")}
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="mt-2 text-center space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">{userData.name}</h1>
              <p className="text-base text-indigo-600">@{userData.username}</p>
              <p className="text-sm italic text-gray-800">{userData.headline || "No headline provided."}</p>
            </div>
          </div>

          {/* Profile Editable Sections */}
          <div className="space-y-8 transition-all duration-300 ease-in-out">
            <Headline headline={userData.headline} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <SkillSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
