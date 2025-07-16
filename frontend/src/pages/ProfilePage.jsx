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
      className="flex justify-center items-center px-2 py-10 min-h-screen md:px-8"
      style={{
        background: "radial-gradient(circle at 50% 30%, #4E46E4 0%, #000 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="p-6 rounded-3xl border shadow-2xl backdrop-blur-lg bg-white/40 border-white/30 md:p-10">
          {/* Profile Header Section */}
          <div className="flex flex-col gap-4 items-center mb-10">
            <div className="relative w-full">
              <img
                src={userData.bannerImg || "https://via.placeholder.com/900x200"}
                alt="Banner"
                className="object-cover w-full h-48 rounded-2xl border shadow-lg border-white/40"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              {isOwnProfile && (
                <label className="absolute top-3 right-4 p-2 text-sm font-medium rounded-lg border shadow-lg backdrop-blur-md transition cursor-pointer bg-white/60 hover:bg-white/80 border-white/40">
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
                className="object-cover w-28 h-28 rounded-full border-4 border-white shadow-xl bg-white/60"
                style={{
                  boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.18)",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              {isOwnProfile && (
                <label className="absolute right-2 bottom-2 p-2 text-xs font-medium rounded-full border shadow-lg backdrop-blur-md transition cursor-pointer bg-white/80 hover:bg-white border-white/40">
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

            <div className="mt-2 text-center">
              <h1 className="text-3xl font-bold text-indigo-900 drop-shadow-sm">{userData.name}</h1>
              <p className="font-medium text-indigo-600">@{userData.username}</p>
              <p className="mt-1 italic text-gray-800">{userData.headline || "No headline provided."}</p>
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
