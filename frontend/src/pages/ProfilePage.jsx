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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-700 via-purple-900 to-black">
        <div className="px-8 py-6 rounded-xl border shadow-xl backdrop-blur-xl bg-white/10 border-white/20">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-10 w-10 animate-spin"></div>
        </div>
      </div>
    );

  const isOwnProfile = authUser?.username === userProfile?.username;
  const userData = userProfile || {};

  if (!userData.username) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-700 via-purple-900 to-black">
        <div className="px-8 py-6 rounded-xl border shadow-xl backdrop-blur-xl bg-white/10 border-white/20">
          <span className="text-center text-red-500 font-semibold">Error: User data not found</span>
        </div>
      </div>
    );
  }

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected.");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) return toast.error("Only JPG, PNG, or WEBP allowed.");

    if (file.size > 3 * 1024 * 1024) return toast.error("Image must be under 3MB.");

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      toast.loading("Uploading...");
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
            toast.error("Upload failed.");
          },
        }
      );
    };
    reader.onerror = () => toast.error("Failed to read the file.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center px-2 py-10 min-h-screen md:px-8 bg-gradient-to-b from-indigo-700 via-purple-900 to-black">
      <div className="mx-auto w-full max-w-5xl">
        <div className="p-8 rounded-3xl border shadow-2xl backdrop-blur-2xl bg-white/10 border-white/20 md:p-12">
          {/* Profile Header Section */}
          <div className="flex flex-col gap-4 items-center mb-10">
            <div className="relative w-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent z-10 rounded-2xl" />
              <img
                src={userData.bannerImg || "https://via.placeholder.com/900x200"}
                alt="Banner"
                className="object-cover w-full h-48 rounded-2xl border border-white/20 shadow-xl"
              />
              {isOwnProfile && (
                <label className="absolute top-3 right-4 z-20 p-2 text-xs font-semibold rounded-md border shadow-md backdrop-blur-md cursor-pointer bg-white/70 hover:bg-white border-white/30">
                  <span className="text-indigo-800">Edit Cover</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "bannerImg")}
                  />
                </label>
              )}
            </div>

            <div className="relative -mt-14 z-30">
              <img
                src={userData.profilePicture || "https://ik.imagekit.io/jwt52yyie/20171206_01.jpg?updatedAt=1752695077558"}
                alt="Profile"
                className="object-cover w-28 h-28 rounded-full border-4 border-white shadow-xl bg-white/40"
              />
              {isOwnProfile && (
                <label className="absolute right-0 bottom-0 p-1 text-xs font-semibold rounded-full border shadow-md backdrop-blur-md cursor-pointer bg-white/70 hover:bg-white border-white/30">
                  <span className="text-indigo-800">Edit</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "profilePicture")}
                  />
                </label>
              )}
            </div>

            <div className="mt-4 text-center text-white">
              <h1 className="text-3xl font-bold drop-shadow-md">{userData.name}</h1>
              <p className="text-sm text-indigo-200">@{userData.username}</p>
              <p className="mt-1 italic text-sm text-white/80">{userData.headline || "No headline provided."}</p>
            </div>
          </div>

          {/* Editable Sections */}
          <div className="space-y-8">
            <Headline headline={userData.headline} isOwnProfile={isOwnProfile} onSave={handleSave}/>
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
