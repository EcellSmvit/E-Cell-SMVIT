import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import {
  AboutSection,
  ExperienceSection,
  EducationSection,
  SkillSection,
  Headline,
} from "@/components"; // optional: central export
import { Pencil } from "lucide-react";

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
    retry: false,
  });

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/profile/${username}`);
      return res.data.data;
    },
    retry: false,
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

  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-700 to-black">
        <div className="px-8 py-6 rounded-xl border shadow-xl backdrop-blur-md bg-white/40 border-white/30">
          <span className="text-lg font-semibold text-indigo-700">Loading...</span>
        </div>
      </div>
    );
  }

  const isOwnProfile = authUser?.username === userProfile?.username;
  const userData = userProfile || {};

  if (!userData.username) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-700 to-black">
        <div className="px-8 py-6 rounded-xl border shadow-xl backdrop-blur-md bg-white/40 border-white/30">
          <span className="text-center text-red-600">Error: User data not found</span>
        </div>
      </div>
    );
  }

  const handleSave = (updatedData) => updateProfile(updatedData);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected.");

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) return toast.error("Only JPG, PNG or WEBP allowed.");
    if (file.size > 3 * 1024 * 1024) return toast.error("Image must be under 3MB.");

    const reader = new FileReader();
    reader.onloadend = () => {
      toast.loading("Uploading image...");
      updateProfile(
        { [type]: reader.result },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success(`${type === "profilePicture" ? "Profile" : "Banner"} updated!`);
            queryClient.invalidateQueries(["userProfile", username]);
          },
          onError: () => {
            toast.dismiss();
            toast.error("Image upload failed.");
          },
        }
      );
    };
    reader.onerror = () => toast.error("File reading failed.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 bg-gradient-to-b from-indigo-700 to-black">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg">
          <div className="relative">
            <img
              src={userData.bannerImg || "https://via.placeholder.com/900x200"}
              alt="Banner"
              className="w-full h-52 md:h-64 object-cover"
            />
            {isOwnProfile && (
              <label className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-white/70 hover:bg-white text-indigo-800 border border-white/30 rounded-md cursor-pointer shadow-md backdrop-blur-sm transition">
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

          <div className="px-6 md:px-10 pb-6 -mt-16 flex flex-col md:flex-row items-center md:items-end gap-4">
            <div className="relative">
              <img
                src={userData.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white/80 object-cover"
              />
              {isOwnProfile && (
                <label className="absolute right-1.5 bottom-1.5 p-1 text-xs bg-white text-indigo-700 border border-white/40 rounded-full cursor-pointer shadow-sm">
                  <Pencil size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "profilePicture")}
                  />
                </label>
              )}
            </div>

            <div className="text-center md:text-left space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">{userData.name}</h1>
              <p className="text-indigo-200">@{userData.username}</p>
              <p className="text-sm text-white/80 italic">
                {userData.headline || "No headline provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Editable Profile Sections */}
        <div className="space-y-6">
          <Headline headline={userData.headline} isOwnProfile={isOwnProfile} onSave={handleSave} />
          <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
          <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
          <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
          <SkillSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
