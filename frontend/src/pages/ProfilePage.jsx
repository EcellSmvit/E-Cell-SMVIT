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

    // Fetch authenticated user
    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
    });

    // Fetch profile data for the username in the URL
    const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: async () => {
            const res = await axios.get(`${backendUrl}/api/profile/${username}`);
            return res.data;
        },
    });

    // Mutation for updating profile
    const { mutate: updateProfile } = useMutation({
        mutationFn: async (updatedData) => {
            await axios.put(`${backendUrl}/api/profile/userprofile`, updatedData);
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries(["userProfile", username]);
        },
    });

    if (isLoading || isUserProfileLoading) return null;

    // Check if the profile belongs to the authenticated user
    const isOwnProfile = authUser?.username === userProfile?.data?.username;
    const userData = isOwnProfile ? authUser : userProfile.data;

    const handleSave = (updatedData) => {
        updateProfile(updatedData);
    };

    return (
        <div>
            <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <SkillSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        </div>
    );
};

export default ProfilePage;
