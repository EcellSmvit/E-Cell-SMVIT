import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

import AboutSection from "@/components/AboutSection/AboutSection";
import ExperienceSection from "@/components/ExperienceSection/ExperienceSection";
import EducationSection from "@/components/EducationSection/EducationSection";
import SkillSection from "@/components/skillsection/SkillSection";

const ProfilePage = () => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { username } = useParams();
  const queryClient = useQueryClient();

  // Query to get authenticated user (if logged in)
  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/user/data`);
      return res.data.user;
    },
    retry: false
  });

  // Query to get public profile data
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
        <div className="backdrop-blur-md bg-white/40 rounded-xl px-8 py-6 shadow-xl border border-white/30">
          <span className="text-lg font-semibold text-indigo-700">Loading...</span>
        </div>
      </div>
    );

  const isOwnProfile = authUser?.username === userProfile?.username;
  const userData = userProfile || {};

  if (!userData.username) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
        <div className="backdrop-blur-md bg-white/40 rounded-xl px-8 py-6 shadow-xl border border-white/30">
          <span className="text-red-600 text-center">Error: User data not found</span>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 py-10 px-2 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/40 border border-white/30 shadow-2xl rounded-3xl p-6 md:p-10">
          {/* Profile Header Section */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="relative w-full">
              <img
                src={userData.bannerImg || "https://via.placeholder.com/900x200"}
                alt="Banner"
                className="w-full h-48 object-cover rounded-2xl border border-white/40 shadow-lg"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              {isOwnProfile && (
                <label className="absolute top-3 right-4 bg-white/60 hover:bg-white/80 transition p-2 rounded-lg shadow-lg cursor-pointer text-sm font-medium border border-white/40 backdrop-blur-md">
                  <span className="text-indigo-700">Edit Cover</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "bannerImg")}
                  />
                </label>
              )}
            </div>

            <div className="relative -mt-14">
              <img
                src={userData.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl bg-white/60"
                style={{
                  boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.18)",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              {isOwnProfile && (
                <label className="absolute bottom-2 right-2 bg-white/80 hover:bg-white transition p-2 rounded-full shadow-lg cursor-pointer text-xs font-medium border border-white/40 backdrop-blur-md">
                  <span className="text-indigo-700">Edit</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "profilePicture")}
                  />
                </label>
              )}
            </div>

            <div className="text-center mt-2">
              <h1 className="text-3xl font-bold text-indigo-900 drop-shadow-sm">{userData.name}</h1>
              <p className="text-indigo-600 font-medium">@{userData.username}</p>
              <p className="text-gray-800 mt-1 italic">{userData.headline || "No headline provided."}</p>
            </div>
          </div>

          {/* Editable Sections */}
          <div className="space-y-8">
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
