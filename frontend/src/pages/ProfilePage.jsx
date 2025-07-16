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
    
    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
    });

    const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: async () => {
            const res = await axios.get(`${backendUrl}/api/profile/${username}`);
            return res.data;
        },
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

    if (isLoading || isUserProfileLoading) return <div>Loading...</div>;

    const profileData = userProfile?.data;

console.log("✅ profileData =", profileData);
console.log("🔐 authUser =", authUser);

const isOwnProfile = authUser?.username === profileData?.username;
const userData = isOwnProfile ? authUser : profileData;

if (!userData) {
  console.log("🚨 userData is undefined — show fallback");
  return <div className="text-red-600">Error: user data not found</div>;
}
const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };
    return (
        <div className="bg-white">
            <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <SkillSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        </div>
    );
};

export default ProfilePage;
