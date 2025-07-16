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
      return res.data.user; // Ensure your backend sends { user: {...} }
    },
    retry: false
  });

  // Query to get public profile data
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/profile/${username}`);
      return res.data.data; // your controller returns { data: user }
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

  if (isAuthLoading || isProfileLoading) return <div className="text-center py-10">Loading...</div>;

  const isOwnProfile = authUser?.username === userProfile?.username;
  const userData = userProfile || {};

  if (!userData.username) {
    return <div className="text-red-600 text-center py-6">Error: User data not found</div>;
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
    <div className="bg-white min-h-screen py-10 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Section */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative w-full">
            <img
              src={userData.bannerImg || "https://via.placeholder.com/900x200"}
              alt="Banner"
              className="w-full h-48 object-cover rounded-lg"
            />
            {isOwnProfile && (
              <label className="absolute top-2 right-2 bg-white p-1 rounded shadow cursor-pointer text-sm">
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

          <div className="relative">
            <img
              src={userData.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-14"
            />
            {isOwnProfile && (
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer text-xs">
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

          <div className="text-center">
            <h1 className="text-2xl font-semibold">{userData.name}</h1>
            <p className="text-gray-600">@{userData.username}</p>
            <p className="text-gray-800 mt-1">{userData.headline || "No headline provided."}</p>
          </div>
        </div>

        {/* Editable Sections */}
        <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        <SkillSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      </div>
    </div>
  );
};

export default ProfilePage;
